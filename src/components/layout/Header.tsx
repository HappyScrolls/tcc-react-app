import React from "react";
import styled from "styled-components";
import backButton from "../../images/layout/backButton.svg";
import logo from "../../images/layout/logo.svg";
import notificationIcon from "../../images/layout/notificationIcon.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/notification");
  };
  const handleLogoButton = () => {
    navigate("/main");
  };

  return (
    <>
      <HeaderContainer>
        <Wrapper>
          <BackButton src={backButton} />
          <Logo onClick={handleLogoButton} src={logo} />
        </Wrapper>
        <NotificationButton onClick={handleButton} src={notificationIcon} />
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  padding: calc(10px + env(safe-area-inset-top)) 130px 10px 130px;
  height: 50px;

  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media (max-width: 768px) {
    padding: calc(10px + env(safe-area-inset-top)) 40px 10px 40px;
    height: 56px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 24px;
  flex-shrink: 0;
`;

const NotificationButton = styled.img`
  width: 24px;
  height: 24px;
`;
