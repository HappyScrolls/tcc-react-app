import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import SUITVariableWoff2 from "./font/SUIT-Variable.woff2";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'SUIT';
    font-weight: 100 900;
    font-style: normal;
    src: url(${SUITVariableWoff2}) format('woff2-variations');
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "SUIT";
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

  input {
    font-family: inherit;
    border: none;
    outline: none;

    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyle;
