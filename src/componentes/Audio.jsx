import { useRef, useState} from 'react'
import './Audio.css'
export default function Audio() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };
    const updateProgress = () => {
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setProgress((current / total) * 100);
    };
    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };
  return (
    <div>
        <h2>Audio Player</h2>
        <audio ref={audioRef} src="./music/playMusic.mp3" onTimeUpdate={updateProgress} onEnded={() => setIsPlaying(false)}/>
        <button onClick={togglePlay}>{isPlaying ? '❚❚' : '▶'}</button>
        <div>
            <label>Volumen </label>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}/>
        </div>
        <div>
            <label>Progreso </label>
            <input type="range" min="0" max="100" value={progress} onChange={handleSeek}/>
        </div>
    </div>
  )
}
