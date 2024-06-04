import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    list-style:none;
    & a {text-decoration:none};
    font-family: “Noto Sans KR”, sans-serif;
  }

  html,body{
    height: 100%;
  }

  body > #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
  }
`;
export default GlobalStyle;
