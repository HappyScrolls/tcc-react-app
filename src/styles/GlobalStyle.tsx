import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'SUIT';
    font-weight: 100;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Thin.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Thin.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Thin.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Thin.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Thin.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 200;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraLight.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraLight.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraLight.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraLight.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraLight.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Light.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Light.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Light.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Light.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Light.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 400;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Regular.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Regular.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Regular.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Regular.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Regular.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 600;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Bold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Bold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Bold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Bold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Bold.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 800;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraBold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraBold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraBold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-ExtraBold.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'SUIT';
    font-weight: 900;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Heavy.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Heavy.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Heavy.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Heavy.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Heavy.ttf') format("truetype");
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
