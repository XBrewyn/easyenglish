import React from 'react';
import style from './style.module.sass';
import Confetti from '../Confetti/index';

interface Prop {
  canShow: boolean;
  title: string;
  text: string;
  children?: JSX.Element | null | JSX.Element[]
};

const Modal: React.FC<Prop> = ({ canShow, title, text, children }) => (
  <>
    {canShow && (
      <div className={style.modal}>
        <div className={style.modal__container}>
          <header>
            <h2 className={style.modal__title}>
              {title}
            </h2>
          </header>
          <p className={style.modal__paragraph}>
            {text}
          </p>
          {children}
        </div>
        <Confetti />
      </div>
    )}
  </>
);

export default Modal;
