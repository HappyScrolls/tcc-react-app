import React from "react";
import google from "../../../images/login/google.svg";
import { GoogleBtn } from "./Login.style";

const GoogleLogin = () => {
  const GoogleLoginUrl = ``;
  const goole_click = () => {
    localStorage.clear();
    window.open(GoogleLoginUrl, "_self");
  };

  return (
    <>
      <GoogleBtn onClick={goole_click}>
        <img src={google} alt="google login" />
        <span>구글계정으로 시작하기</span>
      </GoogleBtn>
    </>
  );
};

export default GoogleLogin;
