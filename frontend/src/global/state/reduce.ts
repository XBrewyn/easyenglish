import {
  SET_USER,
  SET_COURSES,
} from './actionTypes';
import { Option, State } from './type';

const reducer = (state: State, { payload, type }: Option): State => ({
  [SET_USER]: (payload: any): State => {
    return { ...state, user: payload };
  },

  [SET_COURSES]: (payload: any): State => {
    return { ...state, courses: payload };
  }
}[type](payload));

export default reducer;
