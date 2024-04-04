import { CLEAR_LOAD, SET_COURSES, SET_USER } from './actionTypes';

type User = {
  _id: string;
  dateStart: Date;
  email: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  photo: string;
  status: boolean | null;
};

type Course = {
  _id: string;
  picture: string;
  title: string;
  description: string;
  isCompleted: boolean;
  index: {
    lesson: number;
    word: number;
    sentence: number;
  };
  unlockedWords: { [key: string]: boolean };
  completedWords: { [key: string]: boolean };
  lessons: Lesson[];
};

type Lesson = {
  title: string;
  words: Word[];
};

type Word = {
  _id: number;
  englishWord: string;
  spanishTranslation: string;
  audioUrl: string;
  sentences: Sentence[];
};

type Sentence = {
  spanishTranslation: string;
  englishWord: string;
  imageUrl: string;
  audioUrl: string;
  isCompleted?: boolean;
};

type Loading = {
  canShow: boolean;
  text: string;
};

type State = {
  user: User | null;
  course: Course | null;
  loading: Loading;
};

type Payload = User | Course[] | null;
type Action = typeof SET_COURSES | typeof SET_USER | typeof CLEAR_LOAD;

type Option = {
  payload?: Payload;
  type: Action;
};

export type {
  State,
  Sentence,
  Word,
  Lesson,
  Course,
  User,
  Payload,
  Action,
  Option
};
