import { getInitialState } from './helper';
import { Inputs, State, FieldForm } from './type';
import React, { useState, useCallback, useMemo } from 'react';
import style from './style.module.sass';
import { send } from '../../tools/function';
import Loading from '../Loading';

interface Props {
  api: string;
  buttonText?: string;
  inputs: Inputs;
  onData: (data: any) => void;
};

const Form: React.FC<Props> = ({ inputs, api, buttonText = 'Enviar', onData }): JSX.Element => {
  const keys: string[] = useMemo(() => Object.keys(inputs), []);
  const [state, setState] = useState<State>(useMemo(() => getInitialState(keys, inputs), []));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatName = (key: string, value: string | undefined = ''): string =>
    ['name', 'lastName'].includes(key)
      ? value.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase())
      : value;

  const canSend = useCallback((): boolean => {
    let isValid: boolean = true;

    keys.forEach((key: string): void => {
      const field: FieldForm = state[key];

      if (field.validation?.isOpcional === true && !field.value) {
        field.validation = { ...field.validation, emptyErrorMessage: '', isNotValid: false };
      } else if (!field.value) {
        const emptyErrorMessage = field.validation?.emptyErrorMessage || 'Por favor, complete este campo.';
        field.validation = { ...field.validation, emptyErrorMessage, isNotValid: true };
        isValid = false;
      } else if (field.validation) {
        const isNotValid = !!(field.validation.regExp && !field.validation.regExp.test(field.value));
        field.validation = { ...field.validation, isNotValid, emptyErrorMessage: '' };
        if (isNotValid) isValid = false;
      }

      updateState(key, field);
    });

    return isValid;
  }, [state]);

  const onSend = useCallback(async (): Promise<void> => {
    if (canSend()) {
      setIsLoading(true);
      const data: Response = await send({ api, data: getPayload() }).post();
      /*
        const field = {...state.email};
        field.validation.isNotValid = true;
        field.validation.serverErrorMessage = 'esto esta repetido mi loco';
        updateState('email', field);
      */
      if (true) {
        onData(data);
      }
      setIsLoading(false);
    }
  }, [canSend]);

  const getPayload = (): Inputs =>
    keys.reduce((prevState: any, key: string) =>
      ({ ...prevState, [key]: formatName(key, state[key].value) }), {});

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name: key, value } = event.target;
    const field: FieldForm = { ...state[key], value };

    updateState(key, field);
  }, []);

  const updateState = (key: string, field: FieldForm): void => {
    setState((prevState: State) => ({ ...prevState, [key]: { ...field } }));
  }

  return (
    <form className={style.form}>
      {Object.values(state).map(({ validation, label, type = 'text', ...inputAttr }: FieldForm, index: number) => (
        <div key={index} className={style.input__container}>
          {label && <label className={style.label}>{label}</label>}
          {type === 'textarea' && <textarea className={style.field} onChange={onChange} {...inputAttr}></textarea>}
          {type !== 'textarea' && <input className={style.field} onChange={onChange} type={type} {...inputAttr} />}
          <div className={style.message__container}>
            {validation?.isNotValid && (
              <span className={style.error__message}>
                {validation.emptyErrorMessage || validation.serverErrorMessage || validation.message}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className={style.button__container}>
        {isLoading ? <Loading /> : (
          <input
            className={style.button}
            onClick={onSend}
            type="button"
            value={buttonText}
          />
        )}
      </div>
    </form>
  );
};

export default Form;
