import { useEffect, useState } from "react";

function computeRemaining(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

export default function useCountdown(targetDate) {
  const [time, setTime] = useState(() => computeRemaining(targetDate));

  useEffect(() => {
    if (time.done) return undefined;
    const interval = setInterval(() => {
      setTime(computeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate, time.done]);

  return time;
}
