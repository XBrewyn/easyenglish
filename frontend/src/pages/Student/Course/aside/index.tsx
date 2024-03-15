import React, { useRef, useState } from 'react';
import { Lesson, Word } from '../../../../global/state/type';
import style from './style.module.sass';

interface Props {
  lessons: Lesson[];
  onClick: (word: Word) => void;
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
    if (target.classList.contains(style.lession__title)) {
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
          className={style.button}
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
      <div className={style.title}>
        <h4>{title}</h4>
      </div>
      <ul className={style.lessions}>
        {lessons.map(({ title, words }: Lesson, keyLesson: number) => (
          <li
            key={keyLesson}
            onClick={toggleLessonWords}
            className={style.lession}
          >
            <span className={style.lession__title}>{title}</span>
            <ul className={style.words}>
              {words.map((word: Word, keyWord: number) =>
                <li
                  key={keyWord}
                  onClick={() => onClick(word)}
                  className={style.word}
                >
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