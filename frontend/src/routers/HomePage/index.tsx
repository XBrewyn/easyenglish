import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Contact from '../../pages/HomePage/Contact';
import Home from '../../pages/HomePage/Home';
import Login from '../../pages/HomePage/Login';
import Navigator from '../../components/Navigator';
import Register from '../../pages/HomePage/Register';
import { tabs } from './data';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigator tabs={tabs} />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

const RouterHomePage: React.FC = () => (
  <RouterProvider router={router} />
);

export default RouterHomePage;
