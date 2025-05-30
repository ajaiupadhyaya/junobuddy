import { useEffect } from 'react';
import { useJunoState } from './utils/useJunoState';
import FeedButton from './components/FeedButton';
import PlayButton from './components/PlayButton';
import RestButton from './components/RestButton';

export default function App() {
  const [juno, setJuno] = useJunoState();

  const handleFeed = () => {
    const sound = new Audio('/meow.mp3');
    sound.play();
    setJuno(prev => ({
      ...prev,
      hunger: Math.min(prev.hunger + 20, 100),
      mood: 'satisfied',
      activity: 'eating',
      timeOfDay: 'day',
      lastUpdated: Date.now(),
    }));
  };

  const handlePlay = () => {
    const sound = new Audio('/sparkle.wav');
    sound.play();
    setJuno(prev => ({
      ...prev,
      hunger: Math.max(prev.hunger - 10, 0),
      energy: Math.max(prev.energy - 15, 0),
      mood: 'playful',
      activity: 'playing',
      timeOfDay: 'day',
      lastUpdated: Date.now(),
    }));
  };

  const handleRest = () => {
    const sound = new Audio('/sleep.wav');
    sound.play();
    setJuno(prev => ({
      ...prev,
      energy: Math.min(prev.energy + 25, 100),
      mood: 'rested',
      activity: 'sleeping',
      timeOfDay: 'night',
      lastUpdated: Date.now(),
    }));
  };

  const background = juno.timeOfDay === 'night' ? '/room_night.png' : '/room_day.png';

  let junoSprite = '/juno_idle.png';
  if (juno.activity === 'eating') junoSprite = '/juno_eat.png';
  if (juno.activity === 'playing') junoSprite = '/juno_play.png';
  if (juno.activity === 'sleeping') junoSprite = '/juno_sleep.png';

  return (
    <div
      className="scene"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingTop: '2rem',
        textAlign: 'center',
      }}
    >
      <h1>🐱 JunoBuddy</h1>
      <p>{juno.activity === 'sleeping' ? 'Zzz...' : 'Juno is here for you!'}</p>

      <img
        src={junoSprite}
        alt="Juno"
        className={`juno-image ${juno.mood === 'very happy' ? 'sparkle' : ''} ${juno.hunger < 30 ? 'shake' : ''}`}
        style={{ width: '128px', imageRendering: 'pixelated', margin: '20px auto' }}
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
