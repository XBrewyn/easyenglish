import React, { useState, useEffect } from 'react';

interface Props {
  src: string;
  style: { [key: string]: any };
}

const Audio: React.FC<Props> = ({ src, style = {} }): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <span
      className={style?.audio}
      onClick={handleTogglePlay}
      style={style}
    >
      {isPlaying ? <span>{'>'}</span> : <span>{'||'}</span>}
      {/* <audio ref={audioRef} src={'src'}></audio> */}
    </span>
  );
};

export default Audio;
