import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
  * {
    font-family: "Noto Sans KR", sans-serif;
  }

  html,body{
    height: 100%;
  }

  body > #root {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }
`;
export default GlobalStyle;
