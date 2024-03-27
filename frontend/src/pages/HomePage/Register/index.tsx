import React, { useContext } from 'react';
import Form from '../../../components/Form';
import { inputs } from './data';
import { call } from '../../../tools/function';
import { HTTP_STATUS_CODES } from '../../../tools/constant';
import style from './style.module.sass';
import { SET_USER } from '../../../global/state/actionTypes';
import { Payload, State, User } from '../../../global/state/type';
import context from '../../../global/state/context';

const Register: React.FC = () => {
  const [_, dispatch] = useContext<[State, Payload]>(context);

  const onData = (data: User): void => {
    //@ts-ignore
    dispatch({ type: SET_USER, payload: data });
  }

  return (
    <section className={style.register}>
      <div>
        <header>
          <h1>Inscripción</h1>
        </header>
        <Form
          api="users"
          buttonText="Inscribirme ahora"
          inputs={inputs}
          onData={onData}
        />
      </div>
    </section>
  );
}

export default Register;
