import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

export default function OpeningCover({ guestName, onOpen }) {
  const [breaking, setBreaking] = useState(false);

  const handleOpen = () => {
    if (breaking) return;
    setBreaking(true);
    window.setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <AnimatePresence>
      <motion.section
        aria-label="Sampul undangan"
        className="relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-emerald px-6 py-12 text-ivory"
        exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #fff 0, transparent 45%), radial-gradient(circle at 80% 75%, #fff 0, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-4 rounded-[2rem] border border-gold/30 md:inset-8" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center text-center"
        >
          <p className="eyebrow text-gold-soft">The Wedding Of</p>
          <h1 className="font-display mt-4 text-5xl italic leading-none text-ivory sm:text-6xl">
            {weddingData.groom.shortName}
            <span className="mx-3 font-body text-2xl not-italic text-gold sm:text-3xl">&amp;</span>
            {weddingData.bride.shortName}
          </h1>
          <p className="mt-5 font-display text-lg tracking-[0.2em] text-clay">
            {weddingData.weddingDateLabel}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <SprigDivider className="mb-6 text-gold-soft" />
          <p className="eyebrow text-clay">Kepada Yth.</p>
          <p className="font-display mt-2 max-w-xs break-words text-2xl text-ivory sm:text-3xl">
            {guestName}
          </p>
          <p className="mt-1 text-xs tracking-[0.2em] text-clay/80">di Tempat</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mb-4 flex flex-col items-center gap-5"
        >
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Buka undangan"
            className="group relative flex h-20 w-20 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-gold"
              animate={
                breaking
                  ? { scale: [1, 1.15, 0], rotate: 8, opacity: [1, 1, 0] }
                  : { scale: [1, 1.04, 1] }
              }
              transition={
                breaking
                  ? { duration: 0.7, ease: "easeIn" }
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span className="relative font-display text-xl italic text-emerald-deep">
              {weddingData.groom.shortName[0]}
              {weddingData.bride.shortName[0]}
            </span>
          </button>
          <span className="eyebrow text-gold-soft">
            {breaking ? "Membuka…" : "Buka Undangan"}
          </span>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
