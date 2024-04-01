import { SET_COURSES, SET_USER } from './actionTypes';

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
  dateEnd: null | Date;
  dateStart: null | Date;
  isCompleted: boolean;
  index: { lesson: number; word: number; };
  unlockedWords: { [key: string]: boolean };
  completedWords: { [key: string]: boolean };
  lessons: Lesson[];
};

type Lesson = {
  title: string;
  words: Word[];
};

type Word = {
  _id: string;
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

type State = {
  user: User | null;
  course: Course | null;
};

type Payload = User | Course[] | null;
type Action = typeof SET_COURSES | typeof SET_USER;

type Option = {
  payload: Payload;
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
