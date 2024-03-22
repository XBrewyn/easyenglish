import React from 'react';
import Form from '../../../components/Form';
import { inputs } from './data';
import { HTTP_STATUS_CODES } from '../../../tools/constant';
import { call } from '../../../tools/function';
import style from './style.module.sass';

const Login: React.FC = () => {
  const onData = (data: any) => {
    call({
      [HTTP_STATUS_CODES.Ok]: () => { },
      [HTTP_STATUS_CODES.Ok]: () => { }
    }, data?.status);
  }

  return (
    <section className={style.register}>
      <div>
        <header>
          <h1>Log in</h1>
        </header>
        <Form
          api="auth"
          buttonText="Log in"
          inputs={inputs}
          onData={onData}
        />
      </div>

    </section>
  );
};

export default Login;
