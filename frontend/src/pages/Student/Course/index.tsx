import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Course, Lesson, Payload, Sentence, State, Word } from '../../../global/state/type';
import context from '../../../global/state/context';
import Aside from './aside';
import Speech from '../../../components/Speech';
import SVGArrowLeft from '../../../public/svg/arrowLeft.svg';
import SVGArrowRight from '../../../public/svg/arrowRight.svg'
import style from './style.module.sass';
import Modal from '../../../components/Modal';

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
  const [canShowModal, setCanShowModal] = useState<boolean>(false);

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
      const currentWord = lessons[currentIndexLesson].words[wordIndex];

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
      } else {
        setCanShowModal(true);
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
                {sentenceIndex > 0 && (
                  <img
                    alt="Previous arrow"
                    className={style.course__arrowLeft}
                    onClick={onPrev}
                    src={SVGArrowLeft}
                  />
                )}
                <img
                  src={sentence?.imageUrl}
                  alt="Sentence"
                  className={style.course__image}
                />
                {sentence?.isCompleted && (
                  <img
                    alt="Next arrow"
                    className={style.course__arrowRight}
                    onClick={onNext}
                    src={SVGArrowRight}
                  />
                )}
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
      <Modal
        canShow={canShowModal}
        text="Has completado el curso."
        title="¡Felicidades!"
      >
        <Link to="/">volver a los cursos</Link>
      </Modal>
    </section>
  );
};

export default Course;
