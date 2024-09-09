import React from "react";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import GoogleLogin from "./GoogleLogin";
import logoImg from "../../../images/logo.svg";
import logoText from "../../../images/logotext.svg";
import * as L from "./Login.style";

export const Login = () => {
  return (
    <>
      <L.ColorContainer>
        <L.LogoImg>
          <img src={logoImg} alt="로고이미지" />
          <img src={logoText} alt="로고텍스트" />
        </L.LogoImg>
        <L.LoginText>
          <L.Text1>
            Togeth<span>er</span>
          </L.Text1>
          <L.Text2>
            <span>ev</span>ery
          </L.Text2>

          <L.Text3>
            사랑하는 사람과
            <div>언제나 함께하는 일정 공유</div>
          </L.Text3>
        </L.LoginText>
        <L.LoginBtnWrapper>
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin />
        </L.LoginBtnWrapper>
      </L.ColorContainer>
    </>
  );
};
