import { SET_COURSES, SET_USER } from './actionTypes';
import { ROLE } from '../../tools/constant';

type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  photo: string;
  phoneNumber: string;
  status: boolean;
  dateStart: Date | null;
  role: typeof ROLE.STUDENT | typeof ROLE.ADMIN;
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
  isCompleted: false;
  words: Word[];
}

type Quiz = {
  isCompeted: boolean;
  completedAt: Date | null;
}

type Word = {
  englishWord: string;
  spanishTranslation: string;
  isCompleted: boolean;
  audioUrl: string;
  currentSentencesIndex: number;
  canTake: boolean;
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
  courses: any //Course[] | null;
}

type Payload = User | Course[];
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
