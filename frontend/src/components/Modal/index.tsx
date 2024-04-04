import React from 'react';
import style from './style.module.sass';

interface Prop {
  canShow: boolean;
  title?: string;
  text?: string;
  children?: JSX.Element | null | JSX.Element[];
  onClose?: () => void;
};

const Modal: React.FC<Prop> = ({ canShow, title, text, children, onClose }) => (
  <>
    {canShow && (
      <div className={style.modal}>
        <div className={style.modal__container}>
          <header className={style.modal__header}>
            {onClose && <span onClick={onClose} className={style.modal__close}>X</span>}
            <h2 className={style.modal__title}>
              {title}
            </h2>
          </header>
          <p className={style.modal__paragraph}>
            {text}
          </p>
          {children}
        </div>
      </div>
    )}
  </>
);

export default Modal;
