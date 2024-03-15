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
  dateEnd: Date | null;
  dateStart: Date | null;
  isCompleted: boolean;
  progress: number;
  idRequired: number | null;
  lessons: Lesson[];
}

type Lesson = {
  quizSize: number;
  topicSize: number;
  quizzes: Quiz[];
  title: string;
  words: Word[];
}

type Quiz = {
  isCompeted: boolean;
  completedAt: Date | null;
}

type Word = {
  spanishTranslation: string;
  englishWord: string;
  sentences: Sentence[];
  isCompleted: boolean;
  isReadyForNextWord: boolean;
  audioUrl: string;
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
