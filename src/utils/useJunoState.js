import { useState, useEffect } from "react";

const defaultState = {
  hunger: 70,
  energy: 70,
  mood: "neutral",
  lastUpdated: Date.now(),
};

export function useJunoState() {
  const [juno, setJuno] = useState(() => {
    const saved = localStorage.getItem("junoState");
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    const now = Date.now();
    const minutesPassed = Math.floor((now - juno.lastUpdated) / 60000);
    if (minutesPassed > 0) {
      setJuno(prev => ({
        ...prev,
        hunger: Math.max(prev.hunger - minutesPassed * 2, 0),
        energy: Math.max(prev.energy - minutesPassed * 1, 0),
        mood: "needs attention",
        lastUpdated: now
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("junoState", JSON.stringify(juno));
  }, [juno]);

  return [juno, setJuno];
}