import { useEffect } from 'react';
import { useJunoState } from './utils/useJunoState';
import FeedButton from './components/FeedButton';
import PlayButton from './components/PlayButton';
import RestButton from './components/RestButton';

export default function App() {
  const [juno, setJuno] = useJunoState();

  const handleFeed = () => {
    setJuno(prev => ({
      ...prev,
      hunger: Math.min(prev.hunger + 20, 100),
      mood: "satisfied",
      lastUpdated: Date.now()
    }));
  };

  const handlePlay = () => {
    setJuno(prev => ({
      ...prev,
      energy: Math.max(prev.energy - 15, 0),
      mood: "playful",
      hunger: Math.max(prev.hunger - 10, 0),
      lastUpdated: Date.now()
    }));
  };

  const handleRest = () => {
    setJuno(prev => ({
      ...prev,
      energy: Math.min(prev.energy + 25, 100),
      mood: "rested",
      lastUpdated: Date.now()
    }));
  };

  return (
    <div className="container">
      <h1>🐱 Welcome to JunoBuddy!</h1>
      <p>A cozy care companion for Maya and Juno 💖</p>

      <img
        src="/juno_placeholder.png"
        alt="Juno"
        className="juno-image"
      />

      <div className="status-bars">
        <p>😺 Mood: <strong>{juno.mood}</strong></p>
        <p>🍖 Hunger: <progress value={juno.hunger} max="100"></progress> {juno.hunger}%</p>
        <p>⚡ Energy: <progress value={juno.energy} max="100"></progress> {juno.energy}%</p>
      </div>

      <div className="actions">
        <FeedButton onClick={handleFeed} />
        <PlayButton onClick={handlePlay} />
        <RestButton onClick={handleRest} />
      </div>
    </div>
  );
}