import React from "react";
import styled from "styled-components";
import { Container } from "../../../components/layout/Layout";
import profileEdit from "../../../images/mypage/profileEdit.svg";
import defaultCat from "../../../images/signup/defaultCat.svg";
import { useNavigate } from "react-router-dom";
import { LoverInfo } from "../../../types/ILoverInfo";
import { IMemberInfo } from "../../../types/IMemberInfo";

const PersonalProfile = ({
  isMyProfile,
  profileData,
  partnerExists,
  inviteLink,
}: {
  isMyProfile: boolean;
  profileData?: IMemberInfo | LoverInfo;
  partnerExists: boolean;
  inviteLink?: string;
}) => {
  const navigate = useNavigate();

  const handleEditButton = () => {
    navigate("/signup");
  };

  const handleInviteButton = () => {
    if (inviteLink) {
      alert("초대 코드")
    }
  };

  return (
    <ProfileBorder>
      <ProfileHeader>
        <HeaderText>{isMyProfile ? "내 프로필" : "애인 프로필"}</HeaderText>
        {isMyProfile && (
          <ProfileEditIcon onClick={handleEditButton} src={profileEdit} />
        )}
      </ProfileHeader>

      {!partnerExists ? (
        <InviteWrapper>
          <ProfileIconBox>
            <ProfileIcon src={defaultCat} />
          </ProfileIconBox>
          <InviteButton onClick={handleInviteButton}>
            카카오톡으로 초대 링크 보내기
          </InviteButton>
        </InviteWrapper>
      ) : (
        <>
          <ProfileIconBox>
            <ProfileIcon src={profileData?.profilePhoto || defaultCat} />
          </ProfileIconBox>
          <ProfileFooter>
            <FooterText>{profileData?.name || "(이름)"}</FooterText>
            <FooterText>{profileData?.birthDate || "2000.00.00"}</FooterText>
          </ProfileFooter>
        </>
      )}
    </ProfileBorder>
  );
};

export default PersonalProfile;

const ProfileBorder = styled(Container)`
  width: 139px;
  height: 176px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #878678;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const ProfileEditIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const ProfileIconBox = styled.div`
  display: flex;
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);

  margin-top: 10px;
`;

const ProfileIcon = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  width: 80px;
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ProfileFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 13px;
`;

const FooterText = styled.text`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InviteWrapper = styled.div``;

const InviteButton = styled.div``;
