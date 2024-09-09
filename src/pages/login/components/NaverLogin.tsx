import React from "react";
import naver from "../../../images/login/naver.svg";
import { NaverBtn } from "./Login.style";

const NaverLogin = () => {
  return (
    <>
      <NaverBtn>
        <img src={naver} alt="naver login" />
        <span>네이버로 로그인</span>
      </NaverBtn>
    </>
  );
};

export default NaverLogin;
