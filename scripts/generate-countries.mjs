// Generates data/countries.js (195 countries) from an explicit name table.
// Usage: node scripts/generate-countries.mjs
// Output: data/countries.js (do not edit by hand)

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COUNTRY_LANGUAGE } from "../lib/countries.js";

const NAMES = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AD: "Andorra",
  AO: "Angola", AG: "Antigua and Barbuda", AR: "Argentina", AM: "Armenia",
  AU: "Australia", AT: "Austria", AZ: "Azerbaijan", BS: "Bahamas",
  BH: "Bahrain", BD: "Bangladesh", BB: "Barbados", BY: "Belarus",
  BE: "Belgium", BZ: "Belize", BJ: "Benin", BT: "Bhutan", BO: "Bolivia",
  BA: "Bosnia and Herzegovina", BW: "Botswana", BR: "Brazil", BN: "Brunei",
  BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi", CV: "Cape Verde",
  KH: "Cambodia", CM: "Cameroon", CA: "Canada", CF: "Central African Republic",
  TD: "Chad", CL: "Chile", CN: "China", CO: "Colombia", KM: "Comoros",
  CG: "Republic of the Congo", CR: "Costa Rica", CI: "Côte d'Ivoire",
  HR: "Croatia", CU: "Cuba", CY: "Cyprus", CZ: "Czechia",
  KP: "North Korea", CD: "Democratic Republic of the Congo", DK: "Denmark",
  DJ: "Djibouti", DM: "Dominica", DO: "Dominican Republic", EC: "Ecuador",
  EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea",
  EE: "Estonia", SZ: "Eswatini", ET: "Ethiopia", FJ: "Fiji", FI: "Finland",
  FR: "France", GA: "Gabon", GM: "Gambia", GE: "Georgia", DE: "Germany",
  GH: "Ghana", GR: "Greece", GD: "Grenada", GT: "Guatemala",
  GN: "Guinea", GW: "Guinea-Bissau", GY: "Guyana", HT: "Haiti",
  HN: "Honduras", HU: "Hungary", IS: "Iceland", IN: "India", ID: "Indonesia",
  IR: "Iran", IQ: "Iraq", IE: "Ireland", IL: "Israel", IT: "Italy",
  JM: "Jamaica", JP: "Japan", JO: "Jordan", KZ: "Kazakhstan", KE: "Kenya",
  KI: "Kiribati", KW: "Kuwait", KG: "Kyrgyzstan", LA: "Laos", LV: "Latvia",
  LB: "Lebanon", LS: "Lesotho", LR: "Liberia", LY: "Libya",
  LI: "Liechtenstein", LT: "Lithuania", LU: "Luxembourg", MG: "Madagascar",
  MW: "Malawi", MY: "Malaysia", MV: "Maldives", ML: "Mali", MT: "Malta",
  MH: "Marshall Islands", MR: "Mauritania", MU: "Mauritius", MX: "Mexico",
  FM: "Micronesia", MD: "Moldova", MC: "Monaco", MN: "Mongolia",
  ME: "Montenegro", MA: "Morocco", MZ: "Mozambique", MM: "Myanmar",
  NA: "Namibia", NR: "Nauru", NP: "Nepal", NL: "Netherlands",
  NZ: "New Zealand", NI: "Nicaragua", NE: "Niger", NG: "Nigeria",
  MK: "North Macedonia", NO: "Norway", OM: "Oman", PK: "Pakistan",
  PW: "Palau", PS: "Palestine", PA: "Panama", PG: "Papua New Guinea",
  PY: "Paraguay", PE: "Peru", PH: "Philippines", PL: "Poland", PT: "Portugal",
  QA: "Qatar", RO: "Romania", RU: "Russia", RW: "Rwanda",
  KN: "Saint Kitts and Nevis", LC: "Saint Lucia",
  VC: "Saint Vincent and the Grenadines", WS: "Samoa", SM: "San Marino",
  ST: "São Tomé and Príncipe", SA: "Saudi Arabia", SN: "Senegal",
  RS: "Serbia", SC: "Seychelles", SL: "Sierra Leone", SG: "Singapore",
  SK: "Slovakia", SI: "Slovenia", SB: "Solomon Islands", SO: "Somalia",
  ZA: "South Africa", KR: "South Korea", SS: "South Sudan", ES: "Spain",
  LK: "Sri Lanka", SD: "Sudan", SR: "Suriname", SE: "Sweden",
  CH: "Switzerland", SY: "Syria", TJ: "Tajikistan", TZ: "Tanzania",
  TH: "Thailand", TL: "Timor-Leste", TG: "Togo", TO: "Tonga",
  TT: "Trinidad and Tobago", TN: "Tunisia", TR: "Turkey", TM: "Turkmenistan",
  TV: "Tuvalu", UG: "Uganda", UA: "Ukraine", AE: "United Arab Emirates",
  GB: "United Kingdom", US: "United States", UY: "Uruguay", UZ: "Uzbekistan",
  VU: "Vanuatu", VA: "Vatican City", VE: "Venezuela", VN: "Vietnam",
  YE: "Yemen", ZM: "Zambia", ZW: "Zimbabwe",
};

const DIACRITICS = {
  à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", ā: "a", ą: "a",
  ç: "c", ć: "c", č: "c", đ: "d", è: "e", é: "e", ê: "e", ë: "e", ę: "e", ě: "e",
  ğ: "g", ì: "i", í: "i", î: "i", ï: "i", ı: "i", ł: "l", ñ: "n", ń: "n",
  ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", š: "s", ș: "s", ţ: "t", ț: "t",
  ù: "u", ú: "u", û: "u", ü: "u", ý: "y", ÿ: "y", ž: "z",
};

function slugify(name) {
  return name
    .toLowerCase()
    .split("")
    .map((ch) => DIACRITICS[ch] || ch)
    .join("")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const missing = Object.keys(COUNTRY_LANGUAGE).filter((code) => !NAMES[code]);
const extra = Object.keys(NAMES).filter((code) => !COUNTRY_LANGUAGE[code]);
if (missing.length || extra.length) {
  console.error("Missing names for:", missing, "| Extra codes:", extra);
  process.exit(1);
}

const slugs = new Set();
const countries = Object.entries(COUNTRY_LANGUAGE)
  .map(([code, lang]) => ({
    code,
    name: NAMES[code],
    slug: slugify(NAMES[code]),
    lang,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

for (const c of countries) {
  if (slugs.has(c.slug)) {
    console.error("Duplicate slug:", c.slug, "for", c.code);
    process.exit(1);
  }
  slugs.add(c.slug);
}

const body = `// AUTO-GENERATED by scripts/generate-countries.mjs — DO NOT EDIT BY HAND.
// 195 countries with their primary language (from lib/countries.js).
// Run \`node scripts/generate-countries.mjs\` to regenerate.

export const COUNTRIES = [
${countries.map((c) => `  { code: "${c.code}", name: "${c.name}", slug: "${c.slug}", lang: "${c.lang}" },`).join("\n")}
];
`;

const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "countries.js");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, body, "utf8");

console.log(`Wrote ${countries.length} countries.`);
