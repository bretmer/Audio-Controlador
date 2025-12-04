import { useRef, useState} from 'react'
import './Audio.css'
import will from './assets/will.jpg'
import camilo from './assets/camilo.png'
import adexe from './assets/no-me-dejes.jpg'
export default function Audio() {
    const audioRef = useRef(null);

    const songs = [
        {
            title: "Te Extraño Tanto",
            artist: "Antologia",
            img: will,
            src: "/music/te-extraño.mp3",
        },
        {
            title: "Millones",
            artist: "Camilo",
            img: camilo,
            src: "/music/millones.mp3",
        },
        {
            title: "No Me Dejes Así",
            artist: "Adexe & Nau",
            img: adexe,
            src: "/music/dejes-así.mp3",
        }
    ];

    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);

    const currentSong = songs[index];

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        const newIndex = (index + 1) % songs.length;
        setIndex(newIndex);
        setIsPlaying(false);
        setProgress(0);
        setTimeout(() => audioRef.current.play(), 100);
        setIsPlaying(true);
    };

    const prevSong = () => {
        const newIndex = (index - 1 + songs.length) % songs.length;
        setIndex(newIndex);
        setIsPlaying(false);
        setProgress(0);
        setTimeout(() => audioRef.current.play(), 100);
        setIsPlaying(true);
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

    const handleVolume = (e) => {
        const v = e.target.value;
        setVolume(v);
        audioRef.current.volume = v;
    };
  return (
    <div className='audio-card'>

        <img src={currentSong.img} className='album-cover'/>

        <h3 className='song-title'>{currentSong.title}</h3>
        <p className='song-artist'>{currentSong.artist}</p>

        <input 
        type="range" 
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="progress-bar"
        />

        <div className='controls'>
            <button className='former' onClick={prevSong}>⏮</button>
            <button onClick={togglePlay} className='play-btn'>{isPlaying ? '❚❚' : '▶'}</button>
            <button className='next' onClick={nextSong}>⏭</button>
        </div>

        <div className='volume-control'>
            <span>🔈</span>
            <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolume}
            className='volume-bar'
            />
        </div>

        <audio 
        ref={audioRef} 
        src={currentSong.src} 
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
        />
    </div>
  )
}
