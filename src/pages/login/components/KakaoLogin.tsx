import React from "react";
import kakao from "../../../images/login/kakao.svg";
import { KakaoBtn } from "./Login.style";

const KakaoLogin = () => {
  // const kakaoLoginURL = ``;

  //const kakao_login = () => {
  //   localStorage.clear();
  //   window.open(kakaoLoginURL, "_self");
  // };
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=70f9602918e39f149728c1c18b7fc545&redirect_uri=http://158.247.198.100:32001/login/oauth2/code/kakao&response_type=code`;
  const KAKAO_AUTH_URL = `http://158.247.197.4:8085/oauth2/authorization/kakao`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // const instanceUtil = axios.create({
  //     baseURL:"http://localhost:8080",
  //     headers: {
  //         "Content-type": "application/json",
  //     },
  // });
  // const signUp = async (code:string) => {
  //     try {
  //         const response = await instanceUtil.get(`/user/signin/?code=${code}`);
  //
  //         return response.data;
  //     } catch (error) {
  //         console.error(error);
  //         return error;
  //     }
  // };

  // const sign = async () => {
  //     try {
  //         const response = await instanceUtil.get(`/oauth2/authorization/kakao`);
  //
  //         return response.data;
  //     } catch (error) {
  //         console.error(error);
  //         return error;
  //     }
  // };

  return (
    <>
      <KakaoBtn onClick={handleLogin}>
        <img src={kakao} alt="kakao login" />
        <span>카카오계정으로 시작하기</span>
      </KakaoBtn>
    </>
  );
};

export default KakaoLogin;
