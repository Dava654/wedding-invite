import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

function GalleryImage({ photo, onOpen, index }) {
  const [errored, setErrored] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      aria-label={`Lihat foto: ${photo.caption}`}
    >
      <img
        src={errored ? "/gallery/fallback.svg" : photo.src}
        onError={() => setErrored(true)}
        alt={photo.caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <span className="pointer-events-none absolute inset-0 bg-emerald-deep/0 transition-colors duration-300 group-hover:bg-emerald-deep/20" />
      <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-emerald-deep/70 px-2.5 py-1 text-[0.6rem] tracking-widest text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        {photo.caption}
      </span>
    </motion.button>
  );
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const photos = weddingData.gallery;

  const close = () => setActiveIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % photos.length);
  };

  return (
    <section id="galeri" aria-label="Galeri foto" className="section-pad bg-ivory text-center">
      <p className="eyebrow">Momen Kami</p>
      <h3 className="font-display mt-3 text-3xl text-emerald-deep sm:text-4xl">Galeri</h3>
      <div className="flex justify-center">
        <SprigDivider className="my-7" />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, index) => (
          <GalleryImage key={photo.id} photo={photo} index={index} onOpen={setActiveIndex} />
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Tampilan foto penuh"
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-deep/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={showPrev}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 text-ivory sm:left-6"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 text-ivory sm:right-6"
            >
              ›
            </button>

            <motion.img
              key={activeIndex}
              src={photos[activeIndex].src}
              alt={photos[activeIndex].caption}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
