import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { Course, Payload, State } from '../../../global/state/type';
import context from '../../../global/state/context';
import GoogleDriveImage from '../../../components/Image';
import style from './style.module.sass';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [{ course }] = useContext<[State, Payload]>(context);
  const {
    _id,
    picture,
    title,
    description,
    completedWords,
    lessons,
  } = course;

  useEffect(() => {
    const result: number = lessons.reduce((currentValue: any, nextValue: any) =>
      currentValue + nextValue.words.length, 0);

    setProgress(Math.floor((Object.keys(completedWords).length / result) * 100));
  }, []);

  return (
    <section className={style.course}>
      <Header title="Cursos" />
      <div className={style.course__items}>
        <article className={`${style.course__item}`}>
          <header>
            <GoogleDriveImage id={picture} alt={title} className={style.course__picture} />
          </header>
          <div className={style.course__container}>
            <h2 className={style.course__title}>{title}</h2>
            <p className={style.course__description}>{description}</p>
            <>
              <div className={style.course__button_container}>
                <Link className={style.course__button} to={`course/${_id}`}>
                  ¡Comienza ya!
                </Link>
              </div>
              <div className={style.course__progress}>
                <div className={style.course__progress_container}>
                  <div className={style.course__progress_status} style={{ width: `${progress}%` }}>
                    <span className={style.course__progress_value}>{progress}%</span>
                  </div>
                </div>
              </div>
            </>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Courses;
