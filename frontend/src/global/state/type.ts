import { SET_COURSES, SET_USER } from './actionTypes';

type User = {
  _id: string;
  dateStart: Date;
  email: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  photo: string | null;
  status: boolean | null;
}

type Course = {
  id: number;
  picture: string;
  title: string;
  description: string;
  dateEnd: null | Date;
  dateStart: null | Date;
  isCompleted: boolean;
  progress: number;
  currentLessonIndex: number;
  currentWordIndex: number;
  canTake: boolean;
}

type Lesson = {
  title: string;
  words: Word[];
}

type Quiz = {
  isCompeted: boolean;
  completedAt: Date | null;
}

type Word = {
  englishWord: string;
  spanishTranslation: string;
  audioUrl: string;
  sentences: Sentence[];
}

type Sentence = {
  spanishTranslation: string;
  englishWord: string;
  imageUrl: string;
  audioUrl: string;
  isCompleted: boolean;
}

type State = {
  user: any; //User | null;
  course: any //Course[] | null;
}

type Payload = User | Course[] | null;
type Action = typeof SET_COURSES | typeof SET_USER;

type Option = {
  payload: Payload;
  type: Action;
}

export type {
  State,
  Sentence,
  Word,
  Quiz,
  Lesson,
  Course,
  User,
  Payload,
  Action,
  Option
};
