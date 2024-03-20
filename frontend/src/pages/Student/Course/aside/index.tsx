import React, { useRef, useState } from 'react';
import { Lesson } from '../../../../global/state/type';
import style from './style.module.sass';

interface Props {
  lessons: Lesson[];
  onClick: ({ word, wordIndex, indexLesson }: any) => void;
  title: string;
}

const Aside: React.FC<Props> = ({ lessons = [], onClick, title }) => {
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
    <aside
      className={`${style.aside} ${sideBarClassName}`}
    >
      <div className={style.button__container}>
        <div
          className={style.aside__button}
          onClick={toggleSidebar}>
          {canClose
            ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                width="20px"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path></svg>
            )
            : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                width="20px"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"></path></svg>
            )}
        </div>
      </div>
      <div className={style.aside__title}>
        <h4>{title}</h4>
      </div>
      <ul className={style.aside__lessions}>
        {lessons.map((lesson: Lesson, indexLesson: number) => (
          <li
            key={indexLesson}
            onClick={toggleLessonWords}
            className={style.aside__lession}
          >
            <span className={style.aside__lession_title}>{lesson?.title}</span>
            <ul className={style.aside__words}>
              {lesson?.words.map((word: any, wordIndex: number) =>
                <li
                  key={wordIndex}
                  onClick={() => onClick({ word, wordIndex, indexLesson })}
                  className={style.aside__word}
                >
                  {word?.canTake ? (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      className={style.icon__lock}
                    >
                      <g id="Unlock"><g><path d="M17.44,9.33h-1.1c0-.97.01-1.95,0-2.92A4.343,4.343,0,0,0,8.36,4.04c-.36.53.51,1.03.87.5a3.365,3.365,0,0,1,5.23-.39c1.04,1.11.88,2.57.88,3.96V9.33H6.56a2.5,2.5,0,0,0-2.5,2.5v7.61a2.507,2.507,0,0,0,2.5,2.5H17.44a2.507,2.507,0,0,0,2.5-2.5V11.83A2.5,2.5,0,0,0,17.44,9.33Zm1.5,10.11a1.511,1.511,0,0,1-1.5,1.5H6.56a1.511,1.511,0,0,1-1.5-1.5V11.83a1.5,1.5,0,0,1,1.5-1.5H17.44a1.5,1.5,0,0,1,1.5,1.5Z"></path>
                        <path d="M13,14.95a.984.984,0,0,1-.5.86v1.5a.5.5,0,0,1-1,0v-1.5a.984.984,0,0,1-.5-.86,1,1,0,0,1,2,0Z"></path>
                      </g></g>
                    </svg>
                  ) : (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      className={style.icon__lock}
                    >
                      <g id="Lock"><g>
                        <path d="M17.44,9.33h-1.1V6.4a4.34,4.34,0,0,0-8.68,0V9.33H6.56a2.5,2.5,0,0,0-2.5,2.5v7.61a2.507,2.507,0,0,0,2.5,2.5H17.44a2.507,2.507,0,0,0,2.5-2.5V11.83A2.5,2.5,0,0,0,17.44,9.33ZM8.66,6.4a3.34,3.34,0,0,1,6.68,0V9.33H8.66ZM18.94,19.44a1.511,1.511,0,0,1-1.5,1.5H6.56a1.511,1.511,0,0,1-1.5-1.5V11.83a1.5,1.5,0,0,1,1.5-1.5H17.44a1.5,1.5,0,0,1,1.5,1.5Z"></path><path d="M13,14.95a.984.984,0,0,1-.5.86v1.5a.5.5,0,0,1-1,0v-1.5a.984.984,0,0,1-.5-.86,1,1,0,0,1,2,0Z"></path></g></g></svg>
                  )
                  }
                  <span>{word.englishWord}</span>
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