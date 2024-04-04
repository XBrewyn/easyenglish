import lessons from '../lessons';
import { State } from './type';

const initialState: State = {
  user: {
    _id: '',
    dateStart: new Date(),
    email: 'test@test.com',
    lastName: 'test',
    name: 'anonymous',
    phoneNumber: '',
    photo: 'https://secure.gravatar.com/avatar/3b314b13ca2c8ed3a56da2620bb25ff4?s=150&d=mm&r=g',
    status: true,
  },

  loading: {
    canShow: false,
    text: '',
  },

  course: {
    _id: '1',
    picture: '18z84mnyK6xQGngcZiXUEeYEUcDd2GcJJ',
    title: 'Inglés Conversacional',
    description: 'Nuestro curso online de inglés conversacional te brinda la oportunidad de mejorar tus habilidades de comunicación en inglés de manera efectiva y práctica. A través de lecciones interactivas y dinámicas, te sumergirás en situaciones cotidianas para aprender a expresarte con confianza.',
    // User data relationship
    isCompleted: false,
    index: {
      lesson: 0,
      word: 0,
      sentence: 0
    },
    unlockedWords: {
      '1': true
    },
    completedWords: {},
    // End
    lessons,
  }
}

export default initialState;
