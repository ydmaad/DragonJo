import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';

import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import WritePostPage from '../pages/WritePostPage/WritePostPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/write" element={<WritePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
