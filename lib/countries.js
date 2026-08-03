// Country code (ISO 3166-1 alpha-2) -> primary language code.
// Based on the official/primary languages table. When a country's main
// language is not machine-translatable, a close supported language or
// English is used instead (e.g. Bhutan (Dzongkha) -> en).

export const COUNTRY_LANGUAGE = {
  AF: "fa", AL: "sq", DZ: "ar", AD: "ca", AO: "pt", AG: "en", AR: "es",
  AM: "hy", AU: "en", AT: "de", AZ: "az", BS: "en", BH: "ar", BD: "bn",
  BB: "en", BY: "be", BE: "nl", BZ: "en", BJ: "fr", BT: "en", BO: "es",
  BA: "bs", BW: "en", BR: "pt", BN: "ms", BG: "bg", BF: "fr", BI: "rw",
  CV: "pt", KH: "km", CM: "en", CA: "en", CF: "fr", TD: "ar", CL: "es",
  CN: "zh", CO: "es", KM: "fr", CG: "fr", CR: "es", CI: "fr", HR: "hr",
  CU: "es", CY: "el", CZ: "cs", KP: "ko", CD: "fr", DK: "da", DJ: "ar",
  DM: "en", DO: "es", EC: "es", EG: "ar", SV: "es", GQ: "es", ER: "ar",
  EE: "et", SZ: "en", ET: "am", FJ: "en", FI: "fi", FR: "fr", GA: "fr",
  GM: "en", GE: "ka", DE: "de", GH: "en", GR: "el", GD: "en", GT: "es",
  GN: "fr", GW: "pt", GY: "en", HT: "ht", HN: "es", HU: "hu", IS: "is",
  IN: "hi", ID: "id", IR: "fa", IQ: "ar", IE: "ga", IL: "he", IT: "it",
  JM: "en", JP: "ja", JO: "ar", KZ: "kk", KE: "sw", KI: "en", KW: "ar",
  KG: "ky", LA: "lo", LV: "lv", LB: "ar", LS: "st", LR: "en", LY: "ar",
  LI: "de", LT: "lt", LU: "de", MG: "fr", MW: "en", MY: "ms", MV: "en",
  ML: "fr", MT: "mt", MH: "en", MR: "ar", MU: "en", MX: "es", FM: "en",
  MD: "ro", MC: "fr", MN: "mn", ME: "sr", MA: "ar", MZ: "pt", MM: "my",
  NA: "en", NR: "en", NP: "ne", NL: "nl", NZ: "en", NI: "es", NE: "ha",
  NG: "en", MK: "mk", NO: "no", OM: "ar", PK: "ur", PW: "en", PS: "ar",
  PA: "es", PG: "en", PY: "es", PE: "es", PH: "tl", PL: "pl", PT: "pt",
  QA: "ar", RO: "ro", RU: "ru", RW: "rw", KN: "en", LC: "en", VC: "en",
  WS: "sm", SM: "it", ST: "pt", SA: "ar", SN: "fr", RS: "sr", SC: "en",
  SL: "en", SG: "en", SK: "sk", SI: "sl", SB: "en", SO: "so", ZA: "en",
  KR: "ko", SS: "en", ES: "es", LK: "si", SD: "ar", SR: "nl", SE: "sv",
  CH: "de", SY: "ar", TJ: "tg", TZ: "sw", TH: "th", TL: "pt", TG: "fr",
  TO: "en", TT: "en", TN: "ar", TR: "tr", TM: "tk", TV: "en", UG: "en",
  UA: "uk", AE: "ar", GB: "en", US: "en", UY: "es", UZ: "uz", VU: "en",
  VA: "la", VE: "es", VN: "vi", YE: "ar", ZM: "en", ZW: "en",
};
