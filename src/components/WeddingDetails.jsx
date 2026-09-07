import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import SprigDivider from "./SprigDivider";

function EventCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="card-surface w-full max-w-sm rounded-2xl px-8 py-9 text-center"
    >
      <p className="eyebrow">{event.title}</p>
      <p className="font-display mt-4 text-2xl text-emerald-deep">{event.day}</p>
      <p className="font-display text-xl text-emerald-deep">{event.date}</p>
      <div className="mx-auto my-4 h-px w-10 bg-gold/50" aria-hidden="true" />
      <p className="text-sm tracking-wide text-ink/80">{event.time}</p>
      <p className="mt-4 font-display text-lg text-emerald">{event.venue}</p>
      <p className="mt-1 text-sm text-ink/70">{event.address}</p>
    </motion.div>
  );
}

export default function WeddingDetails() {
  return (
    <section
      id="acara"
      aria-label="Detail acara"
      className="section-pad flex flex-col items-center bg-ivory-deep text-center"
    >
      <p className="eyebrow">Save The Date</p>
      <h3 className="font-display mt-3 text-3xl text-emerald-deep sm:text-4xl">Rangkaian Acara</h3>
      <SprigDivider className="my-7" />

      <div className="mt-4 flex w-full max-w-4xl flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
        <EventCard event={weddingData.akad} index={0} />
        <EventCard event={weddingData.reception} index={1} />
      </div>
    </section>
  );
}
