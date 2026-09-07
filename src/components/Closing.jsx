import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

export default function Closing() {
  return (
    <footer
      aria-label="Penutup"
      className="section-pad flex flex-col items-center bg-emerald-deep text-center text-ivory"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="flex max-w-md flex-col items-center"
      >
        <p className="eyebrow">Terima Kasih</p>
        <SprigDivider className="my-6 text-gold-soft" />
        <p className="font-display text-lg italic leading-relaxed text-clay">
          {weddingData.closingMessage}
        </p>
        <p className="font-display mt-8 text-3xl">
          {weddingData.groom.shortName} &amp; {weddingData.bride.shortName}
        </p>
      </motion.div>
    </footer>
  );
}
