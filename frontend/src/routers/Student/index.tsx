import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Navigator from '../../components/Navigator';
import { tabs } from './data';
import Profile from '../../pages/Student/Profile';
import Courses from '../../pages/Student/Courses';
import Course from '../../pages/Student/Course';

/*
 In the future, we're going to use these lines of code to implement code splitting.

  const Profile: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/Student/Profile'))
  );
  const Courses: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/Student/Courses'))
  );
  const Course: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/Student/Course'))
  );
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigator tabs={tabs} />}>
      <Route index element={<Courses />} />
      <Route path="course/:id" element={<Course />} />
      <Route path="profile" element={<Profile />} />
      <Route path="close" element={null} />
    </Route>
  )
);

const RouterStudent: React.FC = () => (
  <RouterProvider router={router} />
);

export default RouterStudent;
