// utils/encryption.js
// const ENC_KEY = import.meta.env.VITE_ENCRYPT_KEY; // Must match backend key (Base64 or hex)
// const IV = import.meta.env.VITE_ENCRYPT_IV;       // Must match backend IV

// function base64ToArrayBuffer(base64) {
//   const binaryString = atob(base64);
//   const bytes = new Uint8Array(binaryString.length);
//   for (let i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes;
// }

// async function getKey() {
//   const keyData = base64ToArrayBuffer(ENC_KEY);
//   return await crypto.subtle.importKey(
//     "raw",
//     keyData,
//     { name: "AES-CBC" },
//     false,
//     ["encrypt", "decrypt"]
//   );
// }

// export async function encryptName(plainText) {
//   const iv = base64ToArrayBuffer(IV);
//   const key = await getKey();
//   const encoder = new TextEncoder();
//   const data = encoder.encode(plainText);

//   const encrypted = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, data);
//   return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
// }


// src/utils/webcryptoTest.js
// -----------------------------------------------------------
// Web Crypto AES-CBC test utilities (frontend only).
// NOT compatible with your current Java AES-ECB backend.
// Use this just to see an encrypted payload from the browser.
// -----------------------------------------------------------

const RAW_KEY = import.meta.env.VITE_ENCRYPT_KEY || "";
const RAW_KEY_FMT = (import.meta.env.VITE_ENCRYPT_KEY_FMT || "auto").toLowerCase();
const RAW_IV = import.meta.env.VITE_ENCRYPT_IV || ""; // optional

// ---------- helpers ----------
function b64ToU8(b64) {
  const str = atob(b64);
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i);
  return out;
}
function u8ToB64(u8) {
  let s = "";
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}
function hexToU8(hex) {
  const clean = hex.replace(/[^0-9a-f]/gi, "");
  if (clean.length % 2) throw new Error("Invalid hex length");
  const u8 = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    u8[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return u8;
}
function utf8ToU8(str) {
  return new TextEncoder().encode(str);
}

// auto/forced decode for key
function decodeKey(raw, fmtHint) {
  if (!raw) return new Uint8Array();
  const hint = fmtHint.toLowerCase();
  try {
    if (hint === "base64") return b64ToU8(raw);
    if (hint === "hex") return hexToU8(raw);
    if (hint === "utf8") return utf8ToU8(raw);
  } catch {
    /* ignore and auto-detect below */
  }
  // auto detect
  try { return b64ToU8(raw); } catch {}
  try { return hexToU8(raw); } catch {}
  return utf8ToU8(raw);
}

// decode IV (if provided)
function decodeIv(raw) {
  if (!raw) return null;
  // try base64 then hex then utf8
  try { return b64ToU8(raw); } catch {}
  try { return hexToU8(raw); } catch {}
  return utf8ToU8(raw);
}

// ensure 16 bytes IV
function normalizeIv(ivU8) {
  if (!ivU8) return null;
  if (ivU8.length === 16) return ivU8;
  console.warn(`[webcryptoTest] Provided IV length=${ivU8.length}; AES-CBC needs 16. Trunc/pad will be applied for testing only.`);
  const out = new Uint8Array(16);
  out.set(ivU8.subarray(0, Math.min(16, ivU8.length)));
  return out;
}

// derive / trim key to 32 bytes for AES-256 if needed
async function normalizeKeyBytes(rawBytes) {
  if (rawBytes.length === 32) return rawBytes; // AES-256
  if (rawBytes.length === 16) {
    // upgrade to 32 via PBKDF2 so user key still works
    return pbkdf2Expand(rawBytes, 32);
  }
  // anything else -> stretch to 32
  return pbkdf2Expand(rawBytes, 32);
}
async function pbkdf2Expand(secretBytes, outLen) {
  const salt = utf8ToU8("webcryptoTest-key-salt");
  const keyMaterial = await crypto.subtle.importKey("raw", secretBytes, { name: "PBKDF2" }, false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    outLen * 8
  );
  return new Uint8Array(bits);
}

// cached CryptoKey
let _keyPromise = null;
async function getKey() {
  if (_keyPromise) return _keyPromise;
  _keyPromise = (async () => {
    if (!RAW_KEY) {
      console.warn("[webcryptoTest] Missing VITE_ENCRYPT_KEY.");
      return null;
    }
    const rawBytes = decodeKey(RAW_KEY, RAW_KEY_FMT);
    const keyBytes = await normalizeKeyBytes(rawBytes);
    return crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC" }, false, ["encrypt", "decrypt"]);
  })();
  return _keyPromise;
}

// pick IV: env or random
function getIv() {
  const decoded = normalizeIv(decodeIv(RAW_IV));
  if (decoded) return decoded;
  const rand = new Uint8Array(16);
  crypto.getRandomValues(rand);
  return rand;
}

// ---------- public encrypt ----------
export async function encryptName(plainText) {
  const key = await getKey();
  if (!key) return plainText;
  const iv = getIv();
  const data = utf8ToU8(plainText);
  const encBuf = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, data);
  const encU8 = new Uint8Array(encBuf);
  // Return iv:cipher format so you can inspect both
  return `${u8ToB64(iv)}:${u8ToB64(encU8)}`;
}

// ---------- public decrypt (matching above) ----------
export async function decryptName(payload) {
  const key = await getKey();
  if (!key) return payload;
  try {
    const [ivB64, ctB64] = payload.split(":");
    if (!ivB64 || !ctB64) return payload;
    const iv = b64ToU8(ivB64);
    const ct = b64ToU8(ctB64);
    const decBuf = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ct);
    return new TextDecoder().decode(decBuf);
  } catch (err) {
    console.error("[webcryptoTest] decrypt error", err);
    return payload;
  }
}

// ---------- convenience quick test ----------
export async function webCryptoTestRun(sample = "Test123") {
  const c = await encryptName(sample);
  const p = await decryptName(c);
  console.log("[webcryptoTest] sample:", sample);
  console.log("[webcryptoTest] encrypted:", c);
  console.log("[webcryptoTest] decrypted:", p);
  return { sample, encrypted: c, decrypted: p };
}

