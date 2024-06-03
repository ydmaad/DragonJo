import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';
import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import HomePage from '../pages/HomePage/HomePage';
import Mypage from '../pages/Mypage/Mypage';
import WritePostPage from '../pages/WritePostPage/WritePostPage';

const Router = () => {
  // const { userInfo } = useSelector((state) => state.user);
  // console.log('ROUTER', userInfo);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/write" element={<WritePostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
