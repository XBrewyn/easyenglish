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

interface OnWord {
  word: any;
  indexLesson: number;
}

const Course: React.FC = (): JSX.Element => {
  // const { id = 0 } = useParams<string>();
  const [globalState] = useContext<[State, Payload]>(context);
  const [feedback, setFeedback] = useState({ canShow: false, message: '' });
  const [isPlaySpeech, setPlaySpeech] = useState<boolean>(false);
  const [lessionTitle, setLessionTitle] = useState<string>('');
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [course, setCourse] = useState<Course>();
  const [sentence, setSentence] = useState<Sentence>();
  const [word, setWord] = useState<Word>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [canShowModal, setCanShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (globalState.course) {
      const course: Course = Object.assign({}, globalState.course);
      const currentLession: Lesson = course.lessons[course.index.lesson];
      const word: Word = currentLession.words[course.index.word];

      setLessons(course.lessons);
      setWord(word);
      setLessionTitle(currentLession.title);
      setSentence(word.sentences[sentenceIndex]);
      setCourse(course);
    }
  }, []);

  const onWord = ({ word, indexLesson }: OnWord): void => {
    const index: number = 0;

    if (course?.unlockedWords[word._id]) {
      setWord(word);
      setSentence(word.sentences[index]);
      setSentenceIndex(index);
      setLessionTitle(lessons[indexLesson].title);
      cleanFeedback();
    }
  }

  const onPrev = (): void => {
    (sentenceIndex > 0) && update(sentenceIndex - 1);
  }

  const onNext = (): void => {
    const len: number = word ? (word.sentences.length - 1) : 0;

    if (sentenceIndex < len && sentence?.isCompleted) {
      update(sentenceIndex + 1);
    } else if (sentenceIndex === len && course) {
      const { lesson: currentIndexLesson, word: currentIndexWord } = course.index;
      const nextWordIndex: number = currentIndexWord + 1;
      const nextLessionIndex: number = currentIndexLesson + 1;
      const nextWord: Word = lessons[currentIndexLesson].words[nextWordIndex];
      const nextLession: Lesson = lessons[nextLessionIndex];

      if (nextWord) {
        handleNextWord(nextWord, nextWordIndex, currentIndexLesson);
      } else if (nextLession) {
        const nextWord: Word = course.lessons[nextLessionIndex].words[0];

        handleNextWord(nextWord, 0, nextLessionIndex);
      } else {
        handleNextWord(word, 0, currentIndexLesson, true);
      }
    }
  }

  const handleNextWord = (
    nextWord: any,
    nextWordIndex: number,
    nextLessonIndex: number,
    isCourseComplete?: boolean,
  ): void => {
    setCourse((currentState: any) => {
      const newState = currentState;
      newState.index = { lesson: nextLessonIndex, word: nextWordIndex };

      if (!newState.unlockedWords[nextWord._id] && word) {
        newState.unlockedWords[nextWord._id] = true;
        newState.completedWords[word._id] = true;
      }

      if (isCourseComplete) {
        newState.completedWords[nextWord._id] = true;
        newState.isCompleted = true;
        setCanShowModal(true);
      } else {
        onWord({ word: nextWord, indexLesson: nextLessonIndex });
      }

      return newState;
    });
  }

  const update = (index: number): void => {
    if (!isPlaySpeech) {
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

    if (isCorrect && !word?.sentences[sentenceIndex]?.isCompleted) {
      setWord((currentState: any) => {
        const newState = currentState;

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
    else if (course?.completedWords[word._id]) return word.sentences.length;

    return word.sentences.reduce((currentState: number, nextState: any): number =>
      nextState.isCompleted ? currentState + 1 : currentState
      , 0);
  }

  return (
    <section className={style.course}>
      <Aside
        course={globalState.course}
        onClick={onWord}
        title={course ? course.title : ''}
      />
      <div className={style.course__container}>
        <div className={style.course__content}>
          <div className={style.course__vocabularies}>
            <Link to="/vocabularies">
              Vocabularios
            </Link>
          </div>
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
        <Link
          to="/"
          className={style.course__modal_button}
        >
          Volver a los cursos
        </Link>
      </Modal>
    </section>
  );
};

export default Course;
