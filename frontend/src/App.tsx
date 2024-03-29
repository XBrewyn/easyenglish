import React, { useEffect, useReducer, useState } from 'react';
import RouterHomePage from './routers/HomePage';
import context from './global/state/context';
import initialState from './global/state/state';
import reducer from './global/state/reduce';
import { SET_COURSES, SET_USER } from './global/state/actionTypes';
import RouterStudent from './routers/Student';

const App: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // dispatch({ type: SET_USER, payload: null });
    // dispatch({ type: SET_COURSES, payload: [] });
  }, []);

  return (
    <context.Provider value={[state, dispatch]}>
      {true ? <RouterStudent /> : <RouterHomePage />}
    </context.Provider>
  );
}

export default App;
