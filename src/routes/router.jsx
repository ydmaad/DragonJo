import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';
import Mypage from '../pages/Mypage/Mypage';
import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/:id" element={<HomePage />} />
        <Route path="/auth/" element={<AuthPage />} />
        <Route path="/mypage/" element={<Mypage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
