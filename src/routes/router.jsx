import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';

import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import Layout from '../components/Layout';
const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
