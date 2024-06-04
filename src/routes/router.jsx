import { createBrowserRouter } from 'react-router-dom/dist';
import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import HomePage from '../pages/HomePage/HomePage';
import Mypage from '../pages/Mypage/Mypage';
import WritePostPage from '../pages/WritePostPage/WritePostPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/write',
        element: <WritePostPage />
      },
      {
        path: '/edit/:id',
        element: <EditPostPage />
      },
      {
        path: '/mypage',
        element: <Mypage />
      },
      {
        path: '/detail/:id',
        element: <DetailPage />
      }
    ]
  }
]);

export default router;

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/auth"
//             element={
//                 <AuthPage />
//             }
//           />
//           <Route path="/write" element={<WritePostPage />} />
//           <Route path="/edit/:id" element={<EditPostPage />} />
//           <Route path="/mypage" element={<Mypage />} />
//           <Route path="/detail/:id" element={<DetailPage />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// };

// export default Router;
