import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import useCountdown from "../hooks/useCountdown";
import SprigDivider from "./SprigDivider";

function TimeBlock({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-gold/40 bg-emerald-deep/95 text-ivory sm:h-24 sm:w-24"
    >
      <span className="font-display text-3xl sm:text-4xl">{String(value).padStart(2, "0")}</span>
      <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-clay">{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(weddingData.weddingDate);

  return (
    <section
      id="countdown"
      aria-label="Hitung mundur"
      className="section-pad flex flex-col items-center bg-emerald text-center text-ivory"
    >
      <p className="eyebrow">Menghitung Hari</p>
      <h3 className="font-display mt-3 text-3xl sm:text-4xl">Menuju Hari Bahagia</h3>
      <SprigDivider className="my-7 text-gold-soft" />

      {done ? (
        <p className="font-display max-w-sm text-xl italic text-clay">
          Acara sedang berlangsung — terima kasih telah menjadi bagian dari hari bahagia kami.
        </p>
      ) : (
        <div className="flex gap-3 sm:gap-5" role="timer" aria-live="polite">
          <TimeBlock value={days} label="Hari" index={0} />
          <TimeBlock value={hours} label="Jam" index={1} />
          <TimeBlock value={minutes} label="Menit" index={2} />
          <TimeBlock value={seconds} label="Detik" index={3} />
        </div>
      )}
    </section>
  );
}
