import styled from "styled-components";
import { Container } from "../../../components/layout/Layout";

export const SocialBtn = styled.button`
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  width: 270px;
  height: 45px;

  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 14px;
  padding-left: 15px;

  & span {
    flex: 1;
    font-family: SUIT;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const LoginBtnWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const GoogleBtn = styled(SocialBtn)`
  background-color: #fff;

  & > span {
    color: #5c5c5c;
  }
`;

export const KakaoBtn = styled(SocialBtn)`
  background-color: #fee500;

  & > span {
    color: #000;
  }
`;

export const NaverBtn = styled(SocialBtn)`
  background: var(--naver-bg, #03c75a);

  & > span {
    color: var(--naver-text, #fff);
  }
`;

export const LogoImg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    max-width: 100%;
    height: auto;
  }

  img:first-child {
    animation: rollIn 2s ease-in-out forwards;
    transform-origin: center;
  }

  @keyframes rollIn {
    0% {
      transform: translateX(-100vw) rotate(0deg);
      opacity: 0;
    }
    90% {
      transform: translateX(0) rotate(360deg);
      opacity: 1;
    }
    100% {
      transform: translateX(0) rotate(360deg);
      opacity: 1;
    }
  }
`;

export const LoginText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
  margin-bottom: 40px;
`;

export const Text1 = styled.div`
  color: #fff;
  font-family: SUIT;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  :nth-child(1) {
    color: rgba(255, 255, 255, 0.5);
    font-family: SUIT;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Text2 = styled.div`
  color: #fff;
  font-family: SUIT;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  margin-left: 60px;

  :nth-child(1) {
    color: rgba(255, 255, 255, 0.5);
    font-family: SUIT;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Text3 = styled.div`
  margin-top: 30px;

  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  background: linear-gradient(0deg, #fff 0%, #ffcfc7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  div {
    margin-left: 80px;
  }
`;

export const ColorContainer = styled(Container)`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;

  position: relative;
`;
