import { Field } from '../../../components/Form/type';
import { REGEXP } from '../../../tools/constant';

type Inputs = {
  username: Field;
  email: Field;
  password: Field;
  phone: Field;
  name: Field;
  lastName: Field;
};

const inputs: Inputs = {
  username: {
    label: 'Nombre de usuario',
    name: 'username',
    type: 'text',
    placeholder: 'Escriba su nombre de usuario.',
    validation: {
      message: 'Por favor, introduzca un nombre de usuario válido.',
      regExp: REGEXP.USERNAME,
    },
  },

  name: {
    label: 'Nombre',
    name: 'name',
    type: 'text',
    placeholder: 'Escriba su nombre.',
    validation: {
      message: 'Por favor, introduzca un nombre válido.',
      regExp: REGEXP.NAME,
    },
  },

  lastName: {
    label: 'Apellido',
    name: 'lastName',
    type: 'text',
    placeholder: 'Escriba su apellido.',
    validation: {
      message: 'Por favor, introduzca un apellido válido.',
      regExp: REGEXP.LAST_NAME,
    },
  },

  email: {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Escriba su email.',
    validation: {
      message: 'Por favor, introduzca una dirección de correo electrónico válida.',
      regExp: REGEXP.EMAIL,
    },
  },

  phone: {
    label: 'Teléfono (opcional)',
    name: 'phone',
    type: 'text',
    placeholder: 'Escriba su teléfono.',
    validation: {
      message: 'Por favor, introduzca un número de teléfono.',
      regExp: REGEXP.PHONE_NUMBER,
    },
  },

  password: {
    label: 'Contraseña',
    name: 'password',
    type: 'password',
    placeholder: 'Escriba su contraseña',
  },
};

export {
  inputs
}