import React from "react";
import KakaoLogin from "./KakaoLogin";

import logoImg from "../../../images/logo.svg";
import logoText from "../../../images/logotext.svg";
import * as L from "./Login.style";
import BackgroundDesign from "./BackgroundDesign";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
export const Login = () => {
  // const navigate = useNavigate();

  // const handle1 = () => {
  //   localStorage.setItem(
  //     "memberCode",
  //     "eyJubyI6MiwibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9"
  //   );
  //   navigate("/main");
  // };
  // const handle2 = () => {
  //   localStorage.setItem(
  //     "memberCode",
  //     "eyJubyI6MSwibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9"
  //   );
  //   navigate("/main");
  // };
  // const handle3 = () => {
  //   localStorage.setItem(
  //     "memberCode",
  //     "eyJubyI6MywibmFtZSI6Im5hbWUiLCJhY2NvdW50IjoiYWNjb3VudCJ9"
  //   );
  //   navigate("/main");
  // };
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
          {/* <NaverLogin />
          <GoogleLogin /> */}
          <br />
          {/*<Buttons>*/}
          {/*  <button onClick={handle1}>예지</button>*/}
          {/*  <button onClick={handle2}>혜진</button>*/}
          {/*  <button onClick={handle3}>혁순</button>*/}
          {/*</Buttons>*/}
        </L.LoginBtnWrapper>
        <BackgroundDesign />
      </L.ColorContainer>
    </>
  );
};
export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;
