import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

function GiftCard({ item, index, onCopy, copiedId }) {
  const isCopied = copiedId === item.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="card-surface relative flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-gold/30 p-6 text-left shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Decorative top accent line with brand color */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      />

      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            {item.type}
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold tracking-wider text-white shadow-sm"
            style={{ backgroundColor: item.color }}
          >
            {item.bank}
          </span>
        </div>

        <p className="font-display mt-4 text-sm text-ink/70">{item.bankFullName}</p>

        {/* Account Number Box */}
        <div className="mt-2 flex items-center justify-between rounded-xl bg-ivory/80 px-4 py-3 border border-gold/20">
          <span className="font-mono text-lg font-semibold tracking-wider text-emerald-deep">
            {item.accountNumber}
          </span>
          <button
            type="button"
            id={`copy-btn-${item.id}`}
            onClick={() => onCopy(item.accountNumber, item.id)}
            aria-label={`Salin nomor rekening ${item.bank}`}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
              isCopied
                ? "bg-emerald text-white shadow-sm"
                : "bg-gold/15 text-emerald hover:bg-gold/30 hover:text-emerald-deep"
            }`}
          >
            {isCopied ? (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Account Holder Name */}
        <div className="mt-3">
          <span className="text-[0.7rem] uppercase tracking-wider text-ink/50">Atas Nama:</span>
          <p className="font-display text-base font-semibold text-emerald-deep">
            {item.accountName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DigitalGift() {
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = (accountNumber, id) => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setCopiedId(id);
        const item = weddingData.gift.find((g) => g.id === id);
        setToastMessage(`Nomor ${item ? item.bank : ""} berhasil disalin!`);
        window.setTimeout(() => {
          setCopiedId(null);
          setToastMessage("");
        }, 2500);
      })
      .catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = accountNumber;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedId(id);
        setToastMessage("Nomor berhasil disalin!");
        window.setTimeout(() => {
          setCopiedId(null);
          setToastMessage("");
        }, 2500);
      });
  };

  return (
    <section
      id="hadiah"
      aria-label="Tanda kasih digital"
      className="section-pad relative flex flex-col items-center bg-ivory text-center"
    >
      <div className="flex flex-col items-center max-w-2xl text-center">
        <p className="eyebrow">Tanda Kasih</p>
        <h3 className="font-display mt-3 text-3xl text-emerald-deep sm:text-4xl">
          Amplop Digital
        </h3>
        <SprigDivider className="my-6" />
        <p className="font-display max-w-lg mx-auto text-base italic text-emerald-soft sm:text-lg">
          Terima kasih atas doa restu dan perhatian yang Anda berikan. Bagi Bapak/Ibu/Saudara/i yang
          berhalangan hadir namun ingin menitipkan tanda kasih, Anda dapat mengirimkannya melalui
          rekening atau dompet digital di bawah ini:
        </p>
      </div>

      {/* Gift Cards Grid */}
      <div className="mt-10 flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">
        {weddingData.gift.map((item, index) => (
          <GiftCard
            key={item.id}
            item={item}
            index={index}
            onCopy={handleCopy}
            copiedId={copiedId}
          />
        ))}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-deep px-6 py-2.5 text-xs font-medium tracking-wide text-ivory shadow-lg backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            ✓ {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
