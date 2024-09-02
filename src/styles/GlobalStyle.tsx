import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}


  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }


  body {
    font-family: Pretendard;
    line-height: 1.6;
    background-color: #f5f5f5;
    color: #333;
  }


  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }


  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
  }


  ul {
    list-style: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
