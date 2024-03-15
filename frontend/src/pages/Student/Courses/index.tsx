import React, { useContext } from 'react';
import Header from '../../../components/Header';
import { Course, Payload, State } from '../../../global/state/type';
import context from '../../../global/state/context';
import GoogleDriveImage from '../../../components/Image';
import style from './style.module.sass';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  const [{ courses }] = useContext<[State, Payload]>(context);

  const canTakeCourse = (key: number | null) => {
    const courseAvalidables: { [key: number]: boolean } = {
      1: true,
      2: false
    }

    if (key === null) return true;

    return courseAvalidables[key] || false;
  }

  return (
    <section className={style.course}>
      <Header title="Course" />
      <div className={style.items}>
        {courses?.map(({
          id,
          picture,
          title,
          description,
          dateEnd,
          dateStart,
          isCompleted,
          idRequired,
          progress
        }: Course, index: number) => {
          const progressFormated: string = `${progress * 100}%`;
          const classNameCourseValid = canTakeCourse(idRequired) ? '' : style.course__invalid;

          return (
            <article key={index} className={`${style.item} ${classNameCourseValid}`}>
              <header>
                <GoogleDriveImage id={picture} alt={title}  />
                <h2>{title}</h2>
                <p className={style.description}>{description}</p>
              </header>
              {canTakeCourse(id) && (
                <>
                  <div className={style.button__container}>
                    <Link className={style.button} to={`course/${id}`}>
                      ¡Comienza ya!
                    </Link>
                  </div>
                  <div className={style.progress}>
                    <div className={style.progress__container}>
                      <div className={style.progress__status} style={{ width: progressFormated }}>
                        <span className={style.progress__value}>{progressFormated}</span>
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
