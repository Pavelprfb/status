// Merges ../data/translations/*.js (keyed by English text) into a single
// compact file keyed by numeric status id, for the React Native bundle.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const WEB_ROOT = path.resolve(import.meta.dirname, "../../");
const APP_DATA = path.resolve(import.meta.dirname, "../src/data");

const statuses = (
  await import(pathToFileURL(path.join(WEB_ROOT, "data/statuses.js")).href)
).statuses;
const idByText = new Map(statuses.map((s) => [s.text.en, s.id]));

const dir = path.join(WEB_ROOT, "data/translations");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "index.js");

const byId = {};
let totalKeys = 0;
let missing = 0;

for (const file of files) {
  const code = file.replace(/\.js$/, "");
  const mod = await import(pathToFileURL(path.join(dir, file)).href);
  const map = mod.default || {};
  const out = {};
  for (const [enText, text] of Object.entries(map)) {
    const id = idByText.get(enText);
    totalKeys++;
    if (id == null) {
      missing++;
      continue;
    }
    out[id] = text;
  }
  byId[code] = out;
}

const body = `// AUTO-GENERATED — do not edit. Run: node scripts/build-app-data.mjs
export const translations = ${JSON.stringify(byId)};
`;

fs.writeFileSync(path.join(APP_DATA, "translations.js"), body);
console.log(
  `wrote translations.js: ${files.length} languages, ${totalKeys} keys, ${missing} missing, ${(
    fs.statSync(path.join(APP_DATA, "translations.js")).size / 1024 / 1024
  ).toFixed(1)} MB`
);
