import { Field } from '../../../components/Form/type';
import { REGEXP } from '../../../tools/constant';

type Inputs = {
  email: Field;
  password: Field;
};

const inputs: Inputs = {
  email: {
    label: 'Nombre de usuario o email',
    name: 'email',
    type: 'email',
    placeholder: 'Escriba su correo electrónico',
    validation: {
      message: 'Please enter a valid email address.',
      regExp: REGEXP.EMAIL,
    },
  },

  password: {
    label: 'Contraseña',
    name: 'password',
    type: 'password',
    placeholder: 'Escriba su correo contraseña',
  },
};

export {
  inputs
}