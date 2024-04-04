import React, { useState } from 'react';
import { formatData } from '../data';
import style from './style.module.sass';

interface Props {
  state: [{ [key: string]: any }, any];
  onClick: (data: { [key: string]: any }) => void;
};

const Form: React.FC<Props> = ({ state, onClick }): JSX.Element => {
  const [formState, setFormState] = state;

  const handlerOnChange = ({ target: { name, value } }: any): void => {
    setFormState((state: any) => ({ ...state, [name]: value }));
  };

  const handlerOnSend = (event: any): void => {
    onClick(formState);
  };

  return (
    <form className={style.form}>
      {Object.keys(formState).map((key: string, index: number): JSX.Element => (
        <React.Fragment key={index}>
          {key !== '_id' && (
            <div className={style.form__field} >
              <label className={style.form__label}>
                {formatData[key] || key}:
              </label>
              <input
                name={key}
                type="text"
                value={formState[key]}
                onChange={handlerOnChange}
              />
            </div>
          )}
        </React.Fragment>
      )
      )}
      <div className={style.form__field}>
        <input
          className={style.form__button}
          type="button"
          value="Guardar"
          onClick={handlerOnSend}
        />
      </div>
    </form>
  )
}

export default Form;