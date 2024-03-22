import React, { useState } from 'react';
import SVGStopAudio from '../../public/svg/stopAudio.svg';
import SVGSPlayAudio from '../../public/svg/playAudio.svg';
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
        <img
          alt="Stop pronunciation"
          className={style.speech__icon}
          onClick={onStop}
          src={SVGStopAudio}
        />
      ) : (
        <img
          alt="Play pronunciation"
          className={style.speech__icon}
          onClick={startListening}
          src={SVGSPlayAudio}
        />
      )}
      <p>{output || 'Pronunciar'}</p>
    </div>
  );
}

export default Speech;
