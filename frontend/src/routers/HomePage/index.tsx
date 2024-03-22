import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Contact from '../../pages/HomePage/Contact';
import Home from '../../pages/HomePage/Home';
import Login from '../../pages/HomePage/Login';
import Navigator from '../../components/Navigator';
import Register from '../../pages/HomePage/Register';
import { tabs } from './data';

/*
 In the future, we're going to use these lines of code to implement code splitting.

  const Contact: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/HomePage/Contact'))
  );
  const Home: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/HomePage/Home'))
  );
  const Login: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/HomePage/Login'))
  );
  const Navigator: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../components/Navigator'))
  );
  const Register: React.LazyExoticComponent<React.FC<{}>> = (
    React.lazy(() => import('../../pages/HomePage/Register'))
  );
*/

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
