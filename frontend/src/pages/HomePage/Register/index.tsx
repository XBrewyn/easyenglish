import React from 'react';
import Form from '../../../components/Form';
import { inputs } from './data';
import { call } from '../../../tools/function';
import { HTTP_STATUS_CODES } from '../../../tools/constant';
import style from './style.module.sass';

const Register: React.FC = () => {
  const onData = (data: any) => {
    call({
      [HTTP_STATUS_CODES.OK]: () => {
        console.log(data)
      },
      [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: () => { }
    }, data?.status);
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
