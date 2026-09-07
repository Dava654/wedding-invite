import { useState } from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

export default function RsvpWhatsApp({
  guestName = "",
  selectedStatus = "attending",
  onStatusChange = () => {},
}) {
  const initialName = guestName && guestName !== "Tamu Undangan" ? guestName : "";
  const [name, setName] = useState(initialName);
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

  const { phoneNumber, attendingText, notAttendingText } = weddingData.whatsappRsvp;

  const getDefaultMessage = (status, senderName) => {
    const baseText = status === "attending" ? attendingText : notAttendingText;
    const trimmed = (senderName || "").trim();

    if (trimmed) {
      if (status === "attending") {
        return `Halo ${weddingData.groom.shortName} & ${weddingData.bride.shortName},\n\nNama: ${trimmed}\nJumlah: 1 Orang\n\n${baseText}`;
      }
      return `Halo ${weddingData.groom.shortName} & ${weddingData.bride.shortName},\n\nNama: ${trimmed}\n\n${baseText}`;
    }

    return baseText;
  };

  const [customMessage, setCustomMessage] = useState(() =>
    getDefaultMessage(selectedStatus, initialName)
  );

  const handleSelectStatus = (status) => {
    onStatusChange(status);
    setCustomMessage(getDefaultMessage(status, name));
    setIsManuallyEdited(false);
  };

  const handleNameChange = (val) => {
    setName(val);
    if (!isManuallyEdited) {
      setCustomMessage(getDefaultMessage(selectedStatus, val));
    }
  };

  const handleResetMessage = () => {
    setCustomMessage(getDefaultMessage(selectedStatus, name));
    setIsManuallyEdited(false);
  };

  // Kirim pesan dari textarea (yang bisa dirubah oleh tamu)
  const handleSendCustomMessage = () => {
    const message = customMessage.trim() || getDefaultMessage(selectedStatus, name);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Langsung chat (pesan otomatis default tanpa terpengaruh perubahan textarea)
  const handleInstantChat = (status) => {
    onStatusChange(status);
    const message = getDefaultMessage(status, name);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="rsvp"
      aria-label="Konfirmasi kehadiran"
      className="section-pad relative flex flex-col items-center bg-ivory-deep text-center"
    >
      <div className="flex flex-col items-center max-w-2xl text-center">
        <p className="eyebrow">Konfirmasi Kehadiran</p>
        <h3 className="font-display mt-3 text-3xl text-emerald-deep sm:text-4xl">
          RSVP & Doa Restu
        </h3>
        <SprigDivider className="my-6" />
        <p className="font-display max-w-lg mx-auto text-base italic text-emerald-soft sm:text-lg">
          Merupakan suatu kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.
          Silakan konfirmasi kehadiran Anda langsung ke WhatsApp kami di bawah ini:
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="card-surface mt-10 w-full max-w-2xl rounded-3xl border border-gold/30 p-6 text-left sm:p-10 shadow-lg"
      >
        {/* Nama Tamu Input */}
        <div className="mb-6">
          <label
            htmlFor="rsvp-name"
            className="block text-xs font-semibold uppercase tracking-wider text-ink/70"
          >
            Nama Anda
          </label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Masukkan nama lengkap Anda..."
            className="mt-2 w-full rounded-xl border border-gold/30 bg-ivory/60 px-4 py-3 text-sm text-ink placeholder-ink/40 focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
          />
        </div>

        {/* Status Selection Cards */}
        <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
          Pilih Kehadiran
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Option: Hadir */}
          <button
            type="button"
            id="rsvp-option-attending"
            onClick={() => handleSelectStatus("attending")}
            className={`group relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${
              selectedStatus === "attending"
                ? "border-emerald bg-emerald/5 ring-2 ring-emerald shadow-sm"
                : "border-gold/30 bg-white/70 hover:border-gold hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-deep">
                <span className="text-base">🌸</span> Bisa Hadir
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs transition-colors ${
                  selectedStatus === "attending"
                    ? "border-emerald bg-emerald text-white"
                    : "border-ink/30"
                }`}
              >
                {selectedStatus === "attending" ? "✓" : ""}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink/70">
              InsyaAllah saya akan hadir di acara pernikahan.
            </p>
          </button>

          {/* Option: Tidak Bisa Hadir */}
          <button
            type="button"
            id="rsvp-option-not-attending"
            onClick={() => handleSelectStatus("not_attending")}
            className={`group relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${
              selectedStatus === "not_attending"
                ? "border-emerald bg-emerald/5 ring-2 ring-emerald shadow-sm"
                : "border-gold/30 bg-white/70 hover:border-gold hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-deep">
                <span className="text-base">💌</span> Belum Bisa Hadir
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs transition-colors ${
                  selectedStatus === "not_attending"
                    ? "border-emerald bg-emerald text-white"
                    : "border-ink/30"
                }`}
              >
                {selectedStatus === "not_attending" ? "✓" : ""}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink/70">
              Mohon maaf belum bisa hadir secara langsung.
            </p>
          </button>
        </div>

        {/* Info Amplop Digital untuk yang berhalangan hadir */}
        {selectedStatus === "not_attending" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3.5 text-xs text-emerald-deep shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">💳</span>
              <span>
                Bagi Anda yang berhalangan hadir, <strong>Amplop Digital</strong> telah dibuka di bawah form ini.
              </span>
            </div>
            <a
              href="#hadiah"
              className="inline-flex shrink-0 items-center justify-center font-semibold text-emerald hover:text-emerald-deep underline"
            >
              Kirim Amplop Digital ↓
            </a>
          </motion.div>
        )}

        {/* Message Preview Box (DAPAT DIRUBAH / DIEDIT) */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
            <label htmlFor="rsvp-message-textarea" className="flex items-center gap-1.5">
              <span>✏️</span>
              <span>Pratinjau Pesan WhatsApp (Dapat Diedit):</span>
            </label>
            {isManuallyEdited && (
              <button
                type="button"
                onClick={handleResetMessage}
                className="text-[0.7rem] text-gold hover:text-emerald font-semibold underline cursor-pointer"
              >
                Reset ke Teks Awal
              </button>
            )}
          </div>
          <textarea
            id="rsvp-message-textarea"
            rows={5}
            value={customMessage}
            onChange={(e) => {
              setCustomMessage(e.target.value);
              setIsManuallyEdited(true);
            }}
            placeholder="Tulis pesan atau ucapan Anda..."
            className="w-full rounded-2xl border border-gold/30 bg-ivory/80 p-4 font-mono text-xs leading-relaxed text-ink shadow-inner focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20 resize-y"
          />
          <p className="mt-1.5 text-[0.72rem] text-ink/60 italic">
            * Anda bebas mengubah atau menambahkan kata-kata doa di dalam kotak pesan di atas sebelum mengirim.
          </p>
        </div>

        {/* Main WhatsApp Submit Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            id="rsvp-submit-wa-btn"
            onClick={handleSendCustomMessage}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:bg-[#1EBE5D] hover:shadow-lg active:scale-[0.99] cursor-pointer"
          >
            {/* Official WhatsApp icon */}
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.55 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.213 8.213 0 01-5.83 2.41c-1.47 0-2.92-.39-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.23-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.3 3.81.6.26 1.07.42 1.44.53.61.2 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29z" />
            </svg>
            <span>Kirim Konfirmasi ke WhatsApp Pengantin</span>
          </button>

          <p className="text-center text-[0.72rem] text-ink/60">
            Membuka WhatsApp dengan pesan yang sudah Anda tentukan/edit di atas.
          </p>
        </div>

        {/* Quick Instant Action Alternative (KECUALI LANGSUNG CHAT - OTOMATIS DEFAULT) */}
        <div className="mt-6 border-t border-gold/20 pt-5">
          <p className="text-center text-xs font-medium text-ink/70 mb-3">
            Atau kirim langsung dengan teks otomatis (tanpa perlu diedit):
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              id="instant-chat-attending"
              onClick={() => handleInstantChat("attending")}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald/10 border border-emerald/30 px-4 py-2.5 text-xs font-semibold text-emerald hover:bg-emerald hover:text-white transition-colors cursor-pointer"
            >
              <span>🌸</span> Langsung Chat: Bisa Hadir
            </button>
            <button
              type="button"
              id="instant-chat-not-attending"
              onClick={() => handleInstantChat("not_attending")}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink/5 border border-ink/20 px-4 py-2.5 text-xs font-semibold text-ink/80 hover:bg-ink/15 transition-colors cursor-pointer"
            >
              <span>💌</span> Langsung Chat: Belum Bisa Hadir
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
