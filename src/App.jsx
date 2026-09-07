import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useGuestName from "./hooks/useGuestName";
import OpeningCover from "./components/OpeningCover";
import Hero from "./components/Hero";
import WeddingDetails from "./components/WeddingDetails";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import DigitalGift from "./components/DigitalGift";
import RsvpWhatsApp from "./components/RsvpWhatsApp";
import Closing from "./components/Closing";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const guestName = useGuestName();
  const [opened, setOpened] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState("attending");

  return (
    <div className="relative min-h-screen bg-ivory">
      <AnimatePresence>
        {!opened && (
          <OpeningCover guestName={guestName} onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Hero />
          <WeddingDetails />
          <Countdown />
          <Location />
          <Gallery />
          <RsvpWhatsApp
            guestName={guestName}
            selectedStatus={rsvpStatus}
            onStatusChange={setRsvpStatus}
          />
          <AnimatePresence>
            {rsvpStatus === "not_attending" && (
              <motion.div
                key="digital-gift-section"
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <DigitalGift />
              </motion.div>
            )}
          </AnimatePresence>
          <Closing />
        </motion.main>
      )}

      <MusicPlayer shouldPlay={opened} />
    </div>
  );
}
