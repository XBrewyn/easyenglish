import {
  SET_USER,
  SET_COURSES,
} from './actionTypes';
import { Option, State } from './type';

const reducer = (state: State, { payload, type }: Option): State => ({
  [SET_USER]: (payload: any): State => {
    const photo = payload.photo ? payload.photo : 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

    return { ...state, user: { ...payload, photo } };
  },
  
  [SET_COURSES]: (payload: any): State => {
    return { ...state, course: { ...payload } };
  }
}[type](payload));

export default reducer;
