import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};


export default Router;
