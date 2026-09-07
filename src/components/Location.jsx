import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

export default function Location() {
  return (
    <section
      id="lokasi"
      aria-label="Lokasi acara"
      className="section-pad flex flex-col items-center bg-ivory-deep text-center"
    >
      <p className="eyebrow">Lokasi</p>
      <h3 className="font-display mt-3 text-3xl text-emerald-deep sm:text-4xl">
        {weddingData.reception.venue}
      </h3>
      <SprigDivider className="my-7" />
      <p className="max-w-sm text-sm text-ink/80">{weddingData.reception.address}</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="card-surface mt-8 aspect-video w-full max-w-xl overflow-hidden rounded-2xl"
      >
        <iframe
          title="Lokasi acara pernikahan"
          src={weddingData.mapsEmbedUrl}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      <a
        href={weddingData.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-8"
      >
        Buka Google Maps
      </a>
    </section>
  );
}
