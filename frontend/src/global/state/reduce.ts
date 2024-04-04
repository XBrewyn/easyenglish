import {
  SET_USER,
  SET_COURSES,
  CLEAR_LOAD,
  SET_LOAD,
} from './actionTypes';
import { Option, State } from './type';

const reducer = (state: State, { payload, type }: Option): State => ({
  [SET_USER]: (payload: any): State => {
    const photo = payload.photo ? payload.photo : 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

    return { ...state, user: { ...payload, photo } };
  },

  [SET_COURSES]: (payload: any): State => {
    return { ...state, course: { ...payload } };
  },

  [CLEAR_LOAD]: (payload: any): State => {
    return { ...state, loading: { canShow: false, text: '' } };
  },

  [SET_LOAD]: (payload: any): State => {
    return { ...state, loading: { ...payload } };
  },
}[type](payload));

export default reducer;
