import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Course, Lesson, Payload, Sentence, State, Word } from '../../../global/state/type';
import context from '../../../global/state/context';
import Aside from './aside';
import Speech from '../../../components/Speech';
import style from './style.module.sass';

const Course: React.FC = (): JSX.Element => {
  const { id = 0 } = useParams<string>();
  const [{ courses = [] }] = useContext<[State, Payload]>(context);
  const [feedback, setFeedback] = useState({ canShow: false, message: '' });
  const [isPlaySpeech, setPlaySpeech] = useState<boolean>(false);
  const [lessionTitle, setLessionTitle] = useState<string>(''); 
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [currentIndexLesson, setCurrentIndexLesson] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [course, setCourse] = useState<Course>();
  const [sentence, setSentence] = useState<Sentence>();
  const [word, setWord] = useState<Word>();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (courses.length) {
      const course = courses[0];
      const currentLession: Lesson = course.lessons[course.currentLessonIndex];
      const word: Word = currentLession.words[course.currentWordIndex];

      setLessons(course.lessons);
      setWord(word);
      setLessionTitle(currentLession.title);
      setSentence(word.sentences[word.currentSentencesIndex]);
      setCourse(course);
      setSentenceIndex(word.currentSentencesIndex);
      setWordIndex(course.currentWordIndex);
      setCurrentIndexLesson(course.currentLessonIndex);
    }
  }, []);

  const onWord = ({ word, wordIndex, indexLesson }: { word: Word; wordIndex: number; indexLesson: number; }): void => {
    const index: number = 0;
    const lessionTitle: string = lessons[indexLesson].title;

    if (word?.canTake) {
      setWord(word);
      setSentence(word.sentences[index]);
      setSentenceIndex(index);
      setCurrentIndexLesson(indexLesson);
      setWordIndex(wordIndex);
      cleanFeedback();
      setLessionTitle(lessionTitle);
    }
  }

  const onPrev = (): void => {
    (sentenceIndex > 0) && update(sentenceIndex - 1);
  }

  const onNext = (): void => {
    const len: number = word ? (word.sentences.length - 1) : 0;

    if (sentenceIndex < len && sentence?.isCompleted) {
      update(sentenceIndex + 1);
    } else if (sentenceIndex === len) {
      const nextWordIndex: number = wordIndex + 1;
      const nextLessionIndex: number = currentIndexLesson + 1;
      const nextWord: any = lessons[currentIndexLesson].words[nextWordIndex];
      const lession = lessons[nextLessionIndex];
      const currentWord =  lessons[currentIndexLesson].words[wordIndex];

      if (nextWord) {
        nextWord.canTake = true;
        currentWord.isCompleted = true;

        onWord({
          word: nextWord,
          wordIndex: nextWordIndex,
          indexLesson: currentIndexLesson
        });

        setCourse((currentState: any) => ({
          ...currentState,
          currentLessonIndex: currentIndexLesson,
          currentWordIndex: nextWordIndex,
        }));

      } else if (lession) {
        const lessionWord = lessons[nextLessionIndex].words[0];

        lessionWord.canTake = true;

        onWord({
          word: lessionWord,
          wordIndex: 0,
          indexLesson: nextLessionIndex
        });

        setCourse((currentState: any) => ({
          ...currentState,
          currentLessonIndex: nextLessionIndex,
          currentWordIndex: 0,
        }));
      }     
    }
  }

  const update = (index: number): void => {
    if (!isPlaySpeech) {
      setWord((currentState: any) => ({
        ...currentState,
        currentSentencesIndex: index
      }));

      setSentenceIndex(index);
      setSentence(word?.sentences[index]);
      cleanFeedback();
    }
  }

  const onSpeechFeedback = (isCorrect: boolean): void => {
    setFeedback({
      message: isCorrect ? '¡Correcto!' : '¡Incorrecto!',
      canShow: true
    });

    if (isCorrect && !word?.sentences[sentenceIndex].isCompleted) {
      setWord((currentState: any) => {
        const newState = { ...currentState };

        newState.sentences[sentenceIndex].isCompleted = true;

        return newState;
      });
    }
  }

  const onPlaySpeech = (isPlay: boolean): void => {
    isPlay && cleanFeedback();
    setPlaySpeech(isPlay);
  }

  const cleanFeedback = (): void => {
    setFeedback({ message: '', canShow: false });
  }

  const getWordProgress = (): string => {
    const totalSentencesCount: number = word?.sentences?.length || 0;

    return `${totalSentencesCount === 0 ? 0 : Math.floor((getCompletedSentencesCount() / totalSentencesCount) * 100)}%`;
  }

  const getCompletedSentencesCount = (): number => {
    if (!word || !word.sentences) return 0;

    return word.sentences.reduce((currentState: number, nextState: any): number =>
      nextState.isCompleted ? currentState + 1 : currentState
    , 0);
  }

  return (
    <section className={style.course}>
      <Aside
        lessons={lessons}
        onClick={onWord}
        title={courses?.length ? courses[0].title : ''}
      />
      <div className={style.course__container}>
        <div className={style.course__content}>
          <div>
            <div className={style.course__word}>
              <span className={style.course__wordLesson}>
                {lessionTitle}
              </span>
              <span className={style.course__wordEnglish}>
                {word?.englishWord}
              </span>
              <span className={style.course__wordSpanish}>
                {word?.spanishTranslation}
              </span>
            </div>
            <div
              className={style.course__progress}
            >
              <div
                className={style.course__bar}
                style={{ width: getWordProgress() }}>
              </div>
              <span>{getWordProgress()} completado</span>
              <span>{getCompletedSentencesCount()} de {word?.sentences.length}</span>
            </div>
          </div>
          <div className={style.course__slideshow}>
            <div>
              <div className={style.course__slideshowWord}>
                <span className={style.course__titleEnglish}>
                  {sentence?.englishWord}
                </span>
                <span className={style.course__titleSpanish}>
                  {sentence?.spanishTranslation}
                </span>
              </div>
              <div className={style.course__buttons}>
                <div className={style.course__buttonLeft}>
                  <div
                    onClick={onPrev}
                  >
                    {sentenceIndex > 0 && (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        width="40px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path>
                      </svg>
                    )}
                  </div>
                </div>
                <img
                  src={sentence?.imageUrl}
                  alt="photo"
                  className={style.course__image}
                />
                <div className={style.course__buttonRight}>
                  {sentence?.isCompleted && (
                    <div
                      onClick={onNext}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        width="40px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.course__pronunciation}>
                <Speech
                  word={sentence?.englishWord || ''}
                  onCheck={onSpeechFeedback}
                  audioUrl={sentence?.audioUrl || ''}
                  onPlaySpeech={onPlaySpeech}
                />
              </div>
            </div>
          </div>
          <div>
            <span className={style.course__result}>Resultados: </span>
            <div className={style.course__feedback}>
              {feedback.canShow && (
                <span
                  style={{ background: (feedback.message === '¡Correcto!') ? '#4caf50' : '#f44336' }}
                  className={style.course__message}>
                  {feedback.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;
