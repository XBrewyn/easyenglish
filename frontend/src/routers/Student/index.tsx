import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Navigator from '../../components/Navigator';
import { tabs } from './data';
import Profile from '../../pages/Student/Profile';
import Courses from '../../pages/Student/Courses';
import Course from '../../pages/Student/Course';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigator tabs={tabs} />}>
      <Route index element={<Course />} />
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
