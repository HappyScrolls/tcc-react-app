import React from "react";
import styled from "styled-components";
import backButton from "../../images/layout/backButton.svg";
import logo from "../../images/layout/logo.svg";
import notificationIcon from "../../images/layout/notificationIcon.svg";
import {useNavigate} from "react-router-dom";

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
        <header>
            <BackButton src={backButton}/>
            <Logo onClick={handleLogoButton} src={logo} />
            <NotificationButton onClick={handleButton} src={notificationIcon} />
        </header>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 393px;
  height: 56px;
  background: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-evenly;
  align-content: center;
`;
const BackButton=styled.img`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    `;
const Logo=styled.img`
      width: 82.054px;
      height: 24px;
      flex-shrink: 0;
    `;
const NotificationButton=styled.img`
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    `;