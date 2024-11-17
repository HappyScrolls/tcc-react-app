import React from "react";
import styled from "styled-components";
import {Container} from "../../../components/layout/Layout";
import profileEdit from "../../../images/mypage/profileEdit.svg";
import defaultCat from "../../../images/signup/defaultCat.svg";
import {useNavigate} from "react-router-dom";
import {fetchLoverInfo} from "../../../api/couple/coupleInfo";
import {useFetchMyLoverInfo} from "../../../hooks/useCoupleInfo";
import {useMemberInfoQuery} from "../../../hooks/useMemberInfo";
interface PersonalProfileProps {
    name:string | null,
    profileImg:string | null,
    birthDate:string | null,
    isMine: boolean;
}
const PersonalProfile = ({ name,profileImg,birthDate,isMine }:PersonalProfileProps) => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate("/signup");
    };
    return (
        <>
            <ProfileBorder>
                <ProfileHeader>
                    <HeaderText>내 프로필</HeaderText>
                    {
                        isMine===true?<ProfileEditIcon onClick={handleButton} src={profileEdit}/>:null
                    }

                </ProfileHeader>
                <ProfileIconBox>
                    <ProfileIcon src={profileImg?profileImg:defaultCat}/>
                </ProfileIconBox>
                <ProfileFooter>
                    <FooterText>{name}</FooterText>
                    <FooterText>{birthDate}</FooterText>
                </ProfileFooter>
            </ProfileBorder>
        </>
);
};

export default PersonalProfile;

const ProfileBorder = styled(Container)`
  width: 139px;
  height: 176px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #878678;
  background: #FFF;
  display: flex;
  flex-direction: column;
`;

const ProfileHeader = styled.div`
  display: flex;
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
  padding: 14px 12px 13.244px 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: #FFF;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
`;

const ProfileIcon = styled.img`
  display: flex;
  width: 48px;
  height: 44.756px;
  flex-shrink: 0;
`;

const HeaderText = styled.text`
  color: var(--Black, #3B3634);
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
`;

const FooterText = styled.text`
  color: var(--Black, #3B3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
