import React, { useContext } from 'react';
import Header from '../../../components/Header';
import { Course, Payload, State } from '../../../global/state/type';
import context from '../../../global/state/context';
import GoogleDriveImage from '../../../components/Image';
import style from './style.module.sass';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  const [{ courses }] = useContext<[State, Payload]>(context);

  return (
    <section className={style.course}>
      <Header title="Cursos" />
      <div className={style.course__items}>
        {courses?.map(({
          id,
          picture,
          title,
          description,
          // dateEnd,
          // dateStart,
          // isCompleted,
          canTake,
          progress
        }: Course, index: number) => {
          const progressFormated: string = `${progress * 100}%`;
          const classNameCourseValid: string = canTake ? '' : style.course__invalid;

          return (
            <article key={index} className={`${style.course__item} ${classNameCourseValid}`}>
              <header>
                <GoogleDriveImage id={picture} alt={title} className={style.course__picture} />
                <h2 className={style.course__title}>{title}</h2>
                <p className={style.course__description}>{description}</p>
              </header>
              {canTake && (
                <>
                  <div className={style.course__button_container}>
                    <Link className={style.course__button} to={`course/${id}`}>
                      ¡Comienza ya!
                    </Link>
                  </div>
                  <div className={style.course__progress}>
                    <div className={style.course__progress_container}>
                      <div className={style.course__progress_status} style={{ width: progressFormated }}>
                        <span className={style.course__progress_value}>{progressFormated}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </article>
          )
        })}
      </div>
    </section>
  );
};

export default Courses;
