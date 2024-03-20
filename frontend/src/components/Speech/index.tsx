import React, { useState } from 'react';
import style from './style.module.sass';

interface Props {
  word: string;
  audioUrl: string;
  onCheck: (isCorrect: boolean) => void;
  onPlaySpeech: (isCorrect: boolean) => void;
};

const Speech: React.FC<Props> = ({
  word,
  onCheck,
  audioUrl,
  onPlaySpeech
}): JSX.Element => {
  const [output, setOutput] = useState<string>('');
  const [canPlay, setCanPlay] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);

  const startListening = (): void => {
    const audio: HTMLAudioElement = new Audio(audioUrl);

    audio.play();
    setCanPlay(true);
    onPlaySpeech(true);

    audio.onended = (): void => {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      setRecognition(recognition);

      recognition.continuous = true;

      recognition.onstart = (): void => {
        setOutput('Listening...');
      }

      recognition.onresult = (event: any): void => {
        const transcript: any = event.results[event.results.length - 1][0].transcript;
        const pronunciation = transcript.toLowerCase().replace(/\./g, '');

        onCheck(pronunciation === word.toLowerCase());
        setCanPlay(false);
        setOutput('Pronunciar');
        recognition.stop();
      }

      recognition.onerror = (event: any): void => {       
        setCanPlay(false);

        if (event.error === 'not-allowed') {
          setOutput('Active el microfono.');
        } else {
          console.log(`Error: ${event.error}`);
        }
      }

      recognition.onend = (): void => {
        setCanPlay(false);
        onPlaySpeech(false);
        setOutput('Pronunciar');
      }

      recognition.start();
    }
  }

  const onStop = (): void => {
    recognition && recognition.stop();
  }

  return (
    <div className={style.speech}>
      {canPlay ? (
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          width="40px"
          xmlns="http://www.w3.org/2000/svg"
          className={style.speech__icon}
          onClick={onStop}
        >
          <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"></path></svg>
      ) : (
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          width="40px"
          xmlns="http://www.w3.org/2000/svg"
          onClick={startListening}
          className={style.speech__icon}
        >
          <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"></path>
        </svg>
      )}
      <p>{output || 'Pronunciar'}</p>
    </div>
  );
}

export default Speech;
