import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';

import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import WritePostPage from '../pages/WritePostPage/WritePostPage';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/write" element={<WritePostPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
