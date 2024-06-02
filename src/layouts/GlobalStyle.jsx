import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
  * {
    font-family: "Axiforma", sans-serif;
  }

  html,body{
    height: 100%;
  }

  body > #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export default GlobalStyle;
