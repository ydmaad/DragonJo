import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalStyle from './GlobalStyle';

const Main = styled.main`
  width: 100%;
  flex: 1;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

function Layout() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledDiv>
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </StyledDiv>
    </>
  );
}

export default Layout;
