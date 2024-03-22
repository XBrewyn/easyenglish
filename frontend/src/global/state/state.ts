import { ROLE } from '../../tools/constant';
import { State } from './type';

const initialState: State = {
  user: {
    id: 1,
    name: 'brewyn',
    lastName: 'espinal',
    email: 'brewyn@gmail.com',
    photo: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    phoneNumber: '',
    status: true,
    dateStart: null,
    role: ROLE.STUDENT,
  },

  courses: [
    {
      id: 1,
      picture: '18z84mnyK6xQGngcZiXUEeYEUcDd2GcJJ',
      title: 'Inglés Conversacional',
      description: 'Nuestro curso online de inglés conversacional te brinda la oportunidad de mejorar tus habilidades de comunicación en inglés de manera efectiva y práctica. A través de lecciones interactivas y dinámicas, te sumergirás en situaciones cotidianas para aprender a expresarte con confianza.',
      dateEnd: null,
      dateStart: null,
      isCompleted: false,
      progress: 0.20,
      currentLessonIndex: 0,
      currentWordIndex: 0,
      canTake: true,
      lessons: [
        {
          title: 'Lección uno',
          isCompleted: false,
          words: [
            {
              englishWord: 'The',
              spanishTranslation: 'El /La /Los',
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              currentSentencesIndex: 0,
              canTake: true,
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
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              currentSentencesIndex: 0,
              canTake: false,
              sentences: [
                {
                  spanishTranslation: 'Hola alla',
                  englishWord: 'The pizza',
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
          quizzes: [],
          isCompleted: false,
          words: [
            {
              englishWord: 'The',
              spanishTranslation: 'El /La /Los',
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              canTake: false,
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
      title: 'Inglés Conversacional',
      description: 'Nuestro curso online de inglés conversacional te brinda la oportunidad de mejorar tus habilidades de comunicación en inglés de manera efectiva y práctica. A través de lecciones interactivas y dinámicas, te sumergirás en situaciones cotidianas para aprender a expresarte con confianza.',
      dateEnd: null,
      dateStart: null,
      isCompleted: false,
      progress: 0.20,
      currentLessonIndex: 0,
      currentWordIndex: 0,
      canTake: false,
      lessons: [
        {
          title: 'Lección uno xd',
          quizzes: [],
          isCompleted: false,
          words: [
            {
              englishWord: 'The',
              spanishTranslation: 'El /La /Los',
              isCompleted: false,
              audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              canTake: false,
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
