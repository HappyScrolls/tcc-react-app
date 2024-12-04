import React, { useState } from "react";
import styled from "styled-components";
import setting from "../../../images/mypage/setting.svg";
import SettingModal from "../../../components/modal/SettingModal";

const MyPageHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("로그아웃");
    setModalOpen(false);
  };

  const handleDeleteCoupleProfile = () => {
    console.log("커플 프로필 삭제");
    setModalOpen(false);
  };

  const handleWithdraw = () => {
    console.log("회원 탈퇴");
    setModalOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderText>MY PAGE</HeaderText>
        <ButtonDiv>
          <Button onClick={() => setModalOpen(true)}>
            <ButtonIcon src={setting}></ButtonIcon>
          </Button>
        </ButtonDiv>

        {isModalOpen && (
          <SettingModal
            onLogout={handleLogout}
            onDeleteCoupleProfile={handleDeleteCoupleProfile}
            onWithdraw={handleWithdraw}
            onClose={() => setModalOpen(false)}
          />
        )}
      </HeaderContainer>
    </>
  );
};

export default MyPageHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

const HeaderText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--Primary, #f14040);
`;

const Button = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 2.362px 2px 2.414px 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const ButtonIcon = styled.img`
  width: 20px;
  height: 19.224px;
  flex-shrink: 0;
`;
