import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Sambutan"
      className="section-pad relative flex flex-col items-center justify-center bg-ivory text-center"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="flex flex-col items-center"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto flex h-44 w-36 items-center justify-center rounded-t-[5rem] border border-gold/40 bg-gradient-to-b from-clay/30 to-transparent sm:h-52 sm:w-44"
          aria-hidden="true"
        >
          <span className="font-display text-4xl italic text-emerald-soft">
            {weddingData.groom.shortName[0]}
            &amp;
            {weddingData.bride.shortName[0]}
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="eyebrow mt-8">
          Undangan Pernikahan
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display mt-3 text-4xl text-emerald-deep sm:text-5xl">
          {weddingData.groom.name}
          <span className="mx-2 text-gold">&amp;</span>
          <br className="sm:hidden" />
          {weddingData.bride.name}
        </motion.h2>

        <motion.div variants={fadeUp} className="w-full flex justify-center">
          <SprigDivider className="my-7" />
        </motion.div>

        <motion.p variants={fadeUp} className="font-display max-w-md text-lg italic text-emerald-soft">
          "{weddingData.tagline}"
        </motion.p>
        <motion.p variants={fadeUp} className="eyebrow mt-6 text-emerald">
          {weddingData.weddingDateLabel}
        </motion.p>
      </motion.div>
    </section>
  );
}
