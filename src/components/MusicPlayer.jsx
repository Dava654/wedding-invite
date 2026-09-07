import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData";

export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const userPausedRef = useRef(false);

  const startPlay = useCallback(() => {
    if (!audioRef.current || userPausedRef.current || unavailable) return;
    audioRef.current
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [unavailable]);

  // 1. Coba autoplay langsung saat halaman dimuat
  useEffect(() => {
    startPlay();

    // 2. Jika autoplay terblokir oleh browser policy, putar otomatis pada interaksi pertama (klik/sentuh apapun)
    const handleFirstInteraction = () => {
      if (!userPausedRef.current) {
        startPlay();
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [startPlay]);

  // 3. Putar saat tombol Buka Undangan ditekan (shouldPlay = true)
  useEffect(() => {
    if (shouldPlay && !userPausedRef.current) {
      startPlay();
    }
  }, [shouldPlay, startPlay]);

  const toggle = () => {
    if (!audioRef.current || unavailable) return;
    if (playing) {
      audioRef.current.pause();
      userPausedRef.current = true;
      setPlaying(false);
    } else {
      userPausedRef.current = false;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingData.music.src}
        loop
        preload="auto"
        onError={() => setUnavailable(true)}
      />

      <motion.button
        type="button"
        onClick={toggle}
        disabled={unavailable}
        aria-label={playing ? "Jeda musik latar" : "Putar musik latar"}
        title={playing ? "Jeda Musik" : "Putar Musik"}
        aria-pressed={playing}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: unavailable ? 0.4 : 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-emerald/90 text-ivory shadow-xl backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft disabled:cursor-not-allowed cursor-pointer"
      >
        {/* Animated Equalizer Waves */}
        <motion.span className="flex items-end gap-[3px]" aria-hidden="true">
          {[8, 14, 10, 16].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gold-soft"
              animate={
                playing
                  ? { height: [h * 0.35, h, h * 0.35] }
                  : { height: 4 }
              }
              transition={{
                duration: 0.85,
                repeat: playing ? Infinity : 0,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
              style={{ height: playing ? h * 0.5 : 4 }}
            />
          ))}
        </motion.span>
      </motion.button>
    </>
  );
}
