import React from "react";
import kakao from "../../../images/login/kakao.svg";
import { KakaoBtn } from "./Login.style";

const KakaoLogin = () => {
  const KakaoLogin = () => {
      window.Kakao.Auth.authorize({
          redirectUri: 'https://accounts.togethery.store/login/oauth2/code/kakao',
      });
  }
  return (
    <>
      <KakaoBtn onClick={KakaoLogin}>
        <img src={kakao} alt="kakao login" />
        <span>카카오계정으로 시작하기</span>
      </KakaoBtn>
    </>
  );
};

export default KakaoLogin;
