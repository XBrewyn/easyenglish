import React, { useRef, useState } from 'react';
import { Lesson } from '../../../../global/state/type';
import SVGArrowLeft from '../../../../public/svg/arrowLeftLong.svg';
import SVGArrowRight from '../../../../public/svg/arrowRightLong.svg';
import SVGPadlockUnlocked from '../../../../public/svg/padlockUnlocked.svg';
import SVGPadlockLocked from '../../../../public/svg/padlockLocked.svg';
import style from './style.module.sass';

interface Props {
  course: any;
  onClick: ({ word, wordIndex, indexLesson }: any) => void;
  title: string;
};

const Aside: React.FC<Props> = ({ course, onClick, title }): JSX.Element => {
  const [canClose, setCanClose] = useState<boolean>(true);
  const [sideBarClassName, setSideBarClassName] = useState<string>('');
  const currentLessonRef = useRef<HTMLLIElement | null>(null);

  const toggleSidebar = (): void => {
    const value: boolean = !canClose;

    setCanClose(value);
    setSideBarClassName(value ? style.hide : style.display);
  }

  const toggleLessonWords = ({ target }: any): void => {
    if (target.classList.contains(style.aside__lession_title)) {
      target.nextSibling.classList.add(style.word__display);

      if (currentLessonRef.current && currentLessonRef.current !== target) {
        const nextSibling: HTMLElement | null = currentLessonRef.current.nextSibling as HTMLElement | null;

        nextSibling && nextSibling.classList.remove(style.word__display);
      }

      currentLessonRef.current = target;
    }
  };

  return (
    <aside className={`${style.aside} ${sideBarClassName}`}>
      <div className={style.button__container}>
        <div className={style.aside__button} onClick={toggleSidebar}>
          <img alt="Aside button" src={canClose ? SVGArrowLeft : SVGArrowRight} />
        </div>
      </div>
      <div className={style.aside__title}>
        <h4>{title}</h4>
      </div>
      <ul className={style.aside__lessions}>
        {course.lessons.map((lesson: Lesson, indexLesson: number) => (
          <li
            className={style.aside__lession}
            key={indexLesson}
            onClick={toggleLessonWords}
          >
            <span className={style.aside__lession_title}>
              {lesson?.title}
            </span>
            <ul className={style.aside__words}>
              {lesson?.words.map((word: any, wordIndex: number) =>
                <li
                  className={style.aside__word}
                  key={wordIndex}
                  onClick={() => onClick({ word, wordIndex, indexLesson })}
                >
                  <div  className={style.aside__element}>
                    {course.unlockedWords[word._id] ? (
                      <img
                        alt="Padlock unlocked"
                        className={style.aside__padlock}
                        src={SVGPadlockUnlocked}
                      />
                    ) : (
                      <img
                        alt="Padlock locked"
                        className={style.aside__padlock}
                        src={SVGPadlockLocked}
                      />
                    )
                    }
                    <span>{word.englishWord}</span>
                  </div>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  )
};

export default Aside;