import { State } from './type';

const initialState: State = {
  user: null,

  course: {
    _id: '1',
    picture: '18z84mnyK6xQGngcZiXUEeYEUcDd2GcJJ',
    title: 'Inglés Conversacional',
    description: 'Nuestro curso online de inglés conversacional te brinda la oportunidad de mejorar tus habilidades de comunicación en inglés de manera efectiva y práctica. A través de lecciones interactivas y dinámicas, te sumergirás en situaciones cotidianas para aprender a expresarte con confianza.',
    // User data relationship
    dateEnd: null,
    dateStart: null,
    isCompleted: false,
    index: { lesson: 0, word: 0 },
    unlockedWords: { '1': true },
    completedWords: {},
    // End
    lessons: [
      {
        title: 'Lección uno',
        words: [
          {
            _id: '1',
            englishWord: 'The',
            spanishTranslation: 'El /La /Los',
            audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
            sentences: [
              {
                spanishTranslation: 'La pizza',
                englishWord: 'The pizza',
                imageUrl: 'https://underpizza-image-storage.s3.us-east-2.amazonaws.com/sides/dEcc48jAvLAM5t2KY/0.webp',
                audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              },
              {
                spanishTranslation: 'El iPhone',
                englishWord: 'The iPhone',
                imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818',
                audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-iPhone-11.mp3',
              },
              {
                spanishTranslation: 'El actor',
                englishWord: 'The actor',
                imageUrl: 'https://www.nme.com/wp-content/uploads/2023/07/dwayne-johnson-the-rock-actors-strike-696x442.jpg',
                audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-actor-11.mp3',
              }
            ],
          },
          {
            _id: '2',
            englishWord: 'Hi',
            spanishTranslation: 'Hola/Hello',
            audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
            sentences: [
              {
                spanishTranslation: 'Hola alla',
                englishWord: 'The pizza',
                imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/655/508/non_2x/illustration-of-young-man-with-a-greeting-gesture-man-says-hello-vector.jpg',
                audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              },
            ],
          },
        ],
      },
      {
        title: 'Lección dos',
        words: [
          {
            _id: '3',
            englishWord: 'The',
            spanishTranslation: 'El /La /Los',
            audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
            sentences: [
              {
                spanishTranslation: 'La pizza',
                englishWord: 'The pizza',
                imageUrl: 'https://underpizza-image-storage.s3.us-east-2.amazonaws.com/sides/dEcc48jAvLAM5t2KY/0.webp',
                audioUrl: 'https://easyonlineenglish.com/wp-content/uploads/2016/12/The-pizza12.mp3',
              }
            ],
          }
        ],
      }
    ],
  }
}

export default initialState;
