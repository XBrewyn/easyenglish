import { ROLE } from '../../tools/constant';
import { State } from './type';

const initialState: State = {
  user: {
    id: 1,
    name: 'brewyn',
    lastName: 'espinal',
    email: 'brewyn@gmail.com',
    photo: '',
    phoneNumber: '',
    status: true,
    dateStart: null,
    role: ROLE.STUDENT,
  },

  courses: [
    {
      id: 1,
      picture: 'https://underpizza-image-storage.s3.us-east-2.amazonaws.com/sides/dEcc48jAvLAM5t2KY/0.webp',
      title: 'Inglés Conversacional',
      description: 'Nuestro curso online de inglés conversacional te brinda la oportunidad de mejorar tus habilidades de comunicación en inglés de manera efectiva y práctica. A través de lecciones interactivas y dinámicas, te sumergirás en situaciones cotidianas para aprender a expresarte con confianza.',
      dateEnd: null,
      dateStart: null,
      isCompleted: false,
      idRequired: null,
      progress: 0.20,
      currentLessonIndex: 0,
      currentWordIndex: 0,
      lessons: [
        {
          title: 'Lección uno',
          quizSize: 5,
          topicSize: 30,
          quizzes: [],
          words: [
            {
              englishWord: 'The',
              spanishTranslation: 'El /La /Los',
              idRequired: null,
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              currentSentencesIndex: 0,
              sentences: [
                {
                  spanishTranslation: 'La pizza',
                  englishWord: 'The pizza',
                  imageUrl: 'https://underpizza-image-storage.s3.us-east-2.amazonaws.com/sides/dEcc48jAvLAM5t2KY/0.webp',
                  audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
                  isCompleted: false,
                },
                {
                  spanishTranslation: 'El iPhone',
                  englishWord: 'The iPhone',
                  imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818',
                  audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-iPhone-11.mp3',
                  isCompleted: false,
                },
                {
                  spanishTranslation: 'El actor',
                  englishWord: 'The actor',
                  imageUrl: 'https://www.nme.com/wp-content/uploads/2023/07/dwayne-johnson-the-rock-actors-strike-696x442.jpg',
                  audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-actor-11.mp3',
                  isCompleted: false,
                }
              ],
            },
            {
              englishWord: 'Hi',
              spanishTranslation: 'Hola/Hello',
              idRequired: 1,
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              currentSentencesIndex: 0,
              sentences: [
                {
                  spanishTranslation: 'Hola alla',
                  englishWord: 'Hello there',
                  imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/655/508/non_2x/illustration-of-young-man-with-a-greeting-gesture-man-says-hello-vector.jpg',
                  audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          title: 'Lección dos',
          quizSize: 5,
          topicSize: 30,
          quizzes: [],
          words: [
            {
              englishWord: 'The',
              spanishTranslation: 'El /La /Los',
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              sentences: [
                {
                  spanishTranslation: 'La pizza',
                  englishWord: 'The pizza',
                  imageUrl: 'https://underpizza-image-storage.s3.us-east-2.amazonaws.com/sides/dEcc48jAvLAM5t2KY/0.webp',
                  audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
                  isCompleted: false,
                }
              ],
            }
          ],
        }
      ],

    },
    {
      id: 2,
      picture: '18z84mnyK6xQGngcZiXUEeYEUcDd2GcJJ',
      title: 'Curso de Inglés Conversacional Avanzado',
      description: 'Nuestro curso online de inglés conversacional avanzado te ofrece la oportunidad de perfeccionar tus habilidades de comunicación en inglés de manera efectiva y práctica. A través de lecciones interactivas y dinámicas, te sumergirás en situaciones cotidianas para aprender a expresarte con confianza y fluidez en cualquier entorno conversacional.',
      dateEnd: null,
      dateStart: null,
      isCompleted: false,
      idRequired: 2,
      progress: 0.50,
      lessons: [
        {
          title: 'Lección uno',
          quizSize: 5,
          topicSize: 30,
          quizzes: [],
          words: [
            {
              englishWord: 'The',
              spanishTranslation: 'El /La /Los',
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              sentences: [
                {
                  spanishTranslation: 'The pizza',
                  englishWord: 'La pizza',
                  imageUrl: 'https://underpizza-image-storage.s3.us-east-2.amazonaws.com/sides/dEcc48jAvLAM5t2KY/0.webp',
                  audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
                  isCompleted: false,
                }
              ],
            }
          ],
        }
      ],
    },

  ],
}

export default initialState;
