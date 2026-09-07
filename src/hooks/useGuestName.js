import { useEffect, useState } from "react";
import { getGuestNameFromLocation } from "../utils/guestName";

export default function useGuestName() {
  const [guestName, setGuestName] = useState(() => getGuestNameFromLocation());

  useEffect(() => {
    const handlePopState = () => setGuestName(getGuestNameFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return guestName;
}
