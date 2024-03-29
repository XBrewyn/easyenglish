import { Inputs, Info } from './type';
import { REGEXP } from '../../../tools/constant';

const infos: Info[] = [
  {
    googleId: '1P2H5fYPO1z9HzTWYKulQy1AkfpTru6O4',
    title: 'Llamanos 24/7',
    info: '+1-234-456-789',
  },
  {
    googleId: '1ukYO8aBYl_kNArkX_hVV2AQlZtaS755P',
    title: 'Envienos un Correo',
    info: 'support@easyonlineenglish.com',
  },
  {
    googleId: '1tMnbRX85F_5DQFDyvz-GeADNXU4tbQJE',
    title: 'Nuestra Sede',
    info: 'República Dominicna',
  }
];

const inputs: Inputs = {
  name: {
    label: 'Nombre',
    name: 'name',
    placeholder: 'Escriba su nombre',
    validation: {
      message: 'Please enter a valid name.',
      regExp: REGEXP.NAME,
    },
  },

  email: {
    label: 'Email',
    name: 'email',
    placeholder: 'Escriba su correo electrónico',
    validation: {
      message: 'Por favor, introduzca una dirección de correo válida.',
      regExp: REGEXP.EMAIL,
    },
  },

  subject: {
    label: 'Subject',
    name: 'subject',
    placeholder: 'Escriba su asunto',
  },

  message: {
    name: 'message',
    label: 'Mensaje',
    type: 'textarea',
    placeholder: 'Escriba su message',
  },
};

export {
  inputs,
  infos,
}
