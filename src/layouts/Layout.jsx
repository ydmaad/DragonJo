import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalStyle from './GlobalStyle';

const Main = styled.main`
  width: 100%;
  flex: 1;
`;

function Layout() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

export default Layout;
