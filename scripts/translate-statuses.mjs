// Build-time translation generator.
// Translates all unique English status texts + UI strings into 70 languages
// using Google's public translate endpoint, and writes:
//   - data/translations/<lang>.js   (status text map, lazy-loaded at runtime)
//   - data/translations/index.js    (static loader map)
//   - data/i18n-langs.js            (UI strings for every language)
// Bangla is skipped: statuses and UI already have hand-written Bangla.
// Resumable: languages with a complete cache are skipped.
//
// Run: node scripts/translate-statuses.mjs

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { statuses } from "../data/statuses.js";
import { translations } from "../lib/i18n.js";
import { categories } from "../data/categories.js";
import { LANGUAGES } from "../lib/languages.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TRANSLATIONS_DIR = join(ROOT, "data", "translations");
const I18N_LANGS_FILE = join(ROOT, "data", "i18n-langs.js");

const EN = translations.en;

const TARGETS = LANGUAGES.filter((l) => l.code !== "en" && l.code !== "bn").map(
  (l) => l.code
);

const BATCH_SIZE = 25;
const CONCURRENCY = 2;
const REQUEST_DELAY_MS = 120;

mkdirSync(TRANSLATIONS_DIR, { recursive: true });

// --- Collect unique English source strings --------------------------------

const statusItems = [...new Set(statuses.map((s) => s.text.en))];

const uiItems = []; // { key, idx|null, text }
for (const [key, value] of Object.entries(EN)) {
  if (Array.isArray(value)) {
    value.forEach((text, idx) => uiItems.push({ key, idx, text }));
  } else {
    uiItems.push({ key, idx: null, text: value });
  }
}
for (const [slug, cat] of Object.entries(categories)) {
  uiItems.push({ key: `cat_${slug}`, idx: null, text: cat.en });
}

const allSources = [...new Set([...statusItems, ...uiItems.map((i) => i.text)])];

console.log(
  `Sources: ${allSources.length} (${statusItems.length} statuses + ${uiItems.length} UI)`
);

// --- Google translate helper ----------------------------------------------

async function fetchJson(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, 800 * i));
    }
  }
  throw new Error("unreachable");
}

function normalizeForMatch(s) {
  return String(s).replace(/\s+/g, " ").trim().toLowerCase();
}

// GT may split one source line into multiple rows (at punctuation) or
// merge several short lines into one row. Align rows to sources greedily
// using the original-text echo (row[1]). Returns null if alignment fails.
function alignRows(rows, texts) {
  const out = [];
  let ri = 0;
  for (let i = 0; i < texts.length; i++) {
    const want = normalizeForMatch(texts[i]);
    let acc = "";
    const frags = [];
    while (ri < rows.length) {
      const orig = normalizeForMatch(rows[ri][1] ?? "");
      const trans = String(rows[ri][0] ?? "");
      const nextAcc = acc ? `${acc} ${orig}` : orig;
      if (acc && nextAcc.length > want.length) break;
      acc = nextAcc;
      frags.push(trans);
      ri++;
      if (acc === want) break;
      if (!want.startsWith(acc)) break;
    }
    if (acc === want) {
      out.push(
        frags
          .map((f) => f.replace(/\s+/g, " ").trim())
          .join(" ")
          .replace(/ +([,.;:!?])/g, "$1")
      );
    } else {
      out.push(null);
    }
  }
  return out;
}

async function translateBatch(texts, tl) {
  const joined = texts.map((t) => t.replace(/\n/g, " ")).join("\n\n");
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(joined)}`;
  const json = await fetchJson(url);
  const rows = Array.isArray(json?.[0]) ? json[0] : [];
  const aligned = alignRows(rows, texts);
  if (!aligned.includes(null)) return aligned;
  if (texts.length <= 1) throw new Error("row mismatch");
  const mid = Math.ceil(texts.length / 2);
  const [a, b] = await Promise.all([
    translateBatch(texts.slice(0, mid), tl),
    translateBatch(texts.slice(mid), tl),
  ]);
  return [...a, ...b];
}

async function translateAll(texts, tl) {
  const out = {};
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const chunk = texts.slice(i, i + BATCH_SIZE);
    const translated = await translateBatch(chunk, tl);
    chunk.forEach((text, k) => (out[text] = translated[k]));
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
  }
  return out;
}

// --- Caching helpers -------------------------------------------------------

function langFile(code) {
  return join(TRANSLATIONS_DIR, `${code}.js`);
}

async function cachedIsComplete(code) {
  try {
    const mod = await import(pathToFileURL(langFile(code)).href);
    const entries = Object.keys(mod.default || {});
    if (entries.length === 0) return false;
    // A complete status map has ~all statuses translated; count matches.
    if (entries.length < statusItems.length * 0.9) return false;
    return true;
  } catch {
    return false;
  }
}

function readI18nData() {
  try {
    const raw = readFileSync(I18N_LANGS_FILE, "utf8");
    const m = raw.match(/export default (\{[\s\S]*\})/);
    return m ? JSON.parse(m[1]) : {};
  } catch {
    return {};
  }
}

function writeI18nData(data) {
  const body = `// AUTO-GENERATED — do not edit. Run: node scripts/translate-statuses.mjs
export default ${JSON.stringify(data)};
`;
  writeFileSync(I18N_LANGS_FILE, body);
}

function writeLangFile(code, statusMap) {
  const body = `// AUTO-GENERATED — do not edit. Run: node scripts/translate-statuses.mjs
export default ${JSON.stringify(statusMap)};
`;
  writeFileSync(langFile(code), body);
}

function buildI18nObject(translated) {
  const obj = {};
  for (const item of uiItems) {
    const val = translated[item.text];
    if (item.idx === null) {
      obj[item.key] = val ?? item.text;
    } else {
      obj[item.key] ||= [];
      obj[item.key][item.idx] = val ?? item.text;
    }
  }
  return obj;
}

function buildStatusMap(translated) {
  const map = {};
  for (const txt of statusItems) {
    const val = translated[txt];
    if (typeof val === "string" && val && val !== txt) map[txt] = val;
  }
  return map;
}

// --- Main loop -------------------------------------------------------------

async function main() {
  const i18nData = readI18nData();
  const queue = [...TARGETS];
  let cursor = 0;
  let cachedCount = 0;

  const worker = async () => {
    while (cursor < queue.length) {
      const code = queue[cursor++];
      try {
        if ((await cachedIsComplete(code)) && i18nData[code]?.appName) {
          console.log(`[${code}] cached — skipping`);
          cachedCount++;
          continue;
        }
        console.log(`[${code}] translating ${allSources.length} strings...`);
        const translated = await translateAll(allSources, code);
        console.log("");
        writeLangFile(code, buildStatusMap(translated));
        i18nData[code] = buildI18nObject(translated);
        writeI18nData(i18nData);
        console.log(`[${code}] done`);
      } catch (err) {
        console.error(`[${code}] FAILED: ${err.message}`);
      }
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const body = `// AUTO-GENERATED — do not edit. Run: node scripts/translate-statuses.mjs
export default {
${TARGETS.map((c) => `  ${c}: () => import("./${c}.js"),`).join("\n")}
};
`;
  writeFileSync(join(TRANSLATIONS_DIR, "index.js"), body);
  writeI18nData(i18nData);
  console.log(
    `\nAll done. ${TARGETS.length - cachedCount} translated, ${cachedCount} cached.`
  );
}

main();
