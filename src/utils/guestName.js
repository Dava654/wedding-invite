const FALLBACK_NAME = "Tamu Undangan";
const MAX_LENGTH = 60;

/**
 * Mengambil nama tamu dari parameter URL `?to=` secara aman.
 * - Mendukung nama dengan spasi (decoding otomatis via URLSearchParams).
 * - Membuang karakter berbahaya agar tidak bisa dipakai untuk HTML/script injection.
 * - Nama HANYA diperlakukan sebagai plain text, tidak pernah dirender sebagai HTML.
 */
export function getGuestNameFromLocation(search = window.location.search) {
  try {
    const params = new URLSearchParams(search);
    const raw = params.get("to");

    if (!raw) return FALLBACK_NAME;

    const cleaned = sanitizeGuestName(raw);
    return cleaned || FALLBACK_NAME;
  } catch {
    return FALLBACK_NAME;
  }
}

export function sanitizeGuestName(raw) {
  return raw
    .replace(/[<>&"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_LENGTH);
}

export const GUEST_FALLBACK_NAME = FALLBACK_NAME;
