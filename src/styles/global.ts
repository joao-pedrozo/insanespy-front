import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap');

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Rubik', sans-serif;
    }

    html, 
    body,
    #__next {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
`;

export default GlobalStyles;
