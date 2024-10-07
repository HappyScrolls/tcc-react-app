import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import { useNavigate } from "react-router-dom";
import { getBusyColor } from "../../../utils/colors";

import {
  calculateDaysTogether,
  formatTodayHypen,
  getCurrentSchedule,
  getDay,
  getMonth,
  getYear,
} from "../../../utils/date";
import { useQueryClient } from "@tanstack/react-query";
import { ScheduleData } from "../../../types/ISchedule";
import { IMemberInfo } from "../../../types/IMemberInfo";
import { LoverInfo } from "../../../types/ILoverInfo";
import { CoupleInfo } from "../../../types/ICoupleInfo";

const ScheduleList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const formattedDate = formatTodayHypen();

  // 내 일정
  const myScheduleList = queryClient.getQueryData<ScheduleData[]>([
    "myScheduleList",
    formattedDate,
  ]);

  // 애인 일정
  const partnerScheduleList = queryClient.getQueryData<ScheduleData[]>([
    "partnerScheduleList",
    formattedDate,
  ]);

  // 내 정보
  const myInfo = queryClient.getQueryData<IMemberInfo>(["memberInfo"]);

  // 애인 정보
  const loverInfo = queryClient.getQueryData<LoverInfo>(["myLoverInfo"]);

  // 커플 정보
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  // 현재 시간 일정
  const currentMySchedule = getCurrentSchedule(myScheduleList);
  const currentPartnerSchedule = getCurrentSchedule(partnerScheduleList);

  const handleTodaySchedule = () => {
    navigate(`/calendar/${formattedDate}`);
  };

  const partnerName = coupleInfo
    ? coupleInfo.nickNameB
    : "커플로 등록해주세요!";

  return (
    <ScheduleBox>
      <DayWrapper>
        <DateText>
          {getYear()}.{getMonth()}.{getDay()}
        </DateText>
        <DdayText>
          {coupleInfo ? `D+${calculateDaysTogether(coupleInfo.startedAt)}` : ""}
        </DdayText>
      </DayWrapper>

      <ScheduleContainer>
        <ScheduleWrapper>
          {/* 내 일정  */}
          {currentMySchedule && myInfo ? (
            <ScheduleInfo
              borderColor={
                currentMySchedule
                  ? getBusyColor(currentMySchedule.busyLevel)
                  : "#F25454"
              }
            >
              <ProfileImage>
                <img
                  src={myInfo.profilePhoto ? myInfo.profilePhoto : defaultCat}
                  alt="Profile"
                />
              </ProfileImage>
              <TextWrapper>
                <NameText>{myInfo.name}의 일정</NameText>
                <Wrapper>
                  <Status color={getBusyColor(currentMySchedule.busyLevel)} />
                  <ScheduleTitle>
                    {currentMySchedule.scheduleName}
                  </ScheduleTitle>
                </Wrapper>
              </TextWrapper>
            </ScheduleInfo>
          ) : (
            <>
              {/* 내 일정 없는 경우  */}
              <ScheduleInfo
                borderColor={
                  currentMySchedule
                    ? getBusyColor(currentMySchedule.busyLevel)
                    : "#F25454"
                }
              >
                <ProfileImage>
                  <img
                    src={
                      myInfo?.profilePhoto ? myInfo.profilePhoto : defaultCat
                    }
                    alt="Profile"
                  />
                </ProfileImage>
                <TextWrapper>
                  <NameText>{myInfo?.name}의 일정</NameText>
                  <NoText>현재 등록된 일정이 없습니다.</NoText>
                </TextWrapper>
              </ScheduleInfo>
            </>
          )}

          {/* 애인 일정  */}
          {coupleInfo ? (
            // 커플 프로필 있는 경우
            currentPartnerSchedule ? (
              <ScheduleInfo
                borderColor={
                  currentPartnerSchedule
                    ? getBusyColor(currentPartnerSchedule.busyLevel)
                    : "#F25454"
                }
              >
                <ProfileImage>
                  <img
                    src={
                      loverInfo?.profilePhoto
                        ? loverInfo.profilePhoto
                        : defaultCat
                    }
                    alt="Profile"
                  />
                </ProfileImage>
                <TextWrapper>
                  <NameText>{partnerName}의 일정</NameText>
                  <Wrapper>
                    <Status
                      color={getBusyColor(currentPartnerSchedule.busyLevel)}
                    />
                    <ScheduleTitle>
                      {currentPartnerSchedule.scheduleName}
                    </ScheduleTitle>
                  </Wrapper>
                </TextWrapper>
              </ScheduleInfo>
            ) : (
              // 커플 프로필은 있지만 일정이 없는 경우
              <>
                <ScheduleInfo borderColor={"#F25454"}>
                  <ProfileImage>
                    <img
                      src={
                        loverInfo?.profilePhoto
                          ? loverInfo.profilePhoto
                          : defaultCat
                      }
                      alt="Profile"
                    />
                  </ProfileImage>
                  <TextWrapper>
                    <NameText>{partnerName}의 일정</NameText>
                    <NoText>현재 등록된 일정이 없습니다.</NoText>
                  </TextWrapper>
                </ScheduleInfo>
              </>
            )
          ) : (
            //  커플 프로필 등록 X
            <>
              <ScheduleInfo borderColor={"#F25454"}>
                <CoupleRegisterText>{partnerName}</CoupleRegisterText>
              </ScheduleInfo>
            </>
          )}
        </ScheduleWrapper>
      </ScheduleContainer>

      <Button onClick={handleTodaySchedule}>오늘의 일정 확인</Button>
    </ScheduleBox>
  );
};

export default ScheduleList;

const ScheduleBox = styled.div`
  width: 320px;
  padding: 15px 20px 2px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const DateText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 700;
`;

const DdayText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 700;
`;

const ScheduleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
`;

const Button = styled.button`
  display: flex;
  width: 223px;
  padding: 8px 72px;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f25454;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: #fff;
  font-family: SUIT;
  font-size: 12px;
  font-weight: 700;
`;

const ScheduleInfo = styled.div<{ borderColor: string }>`
  display: flex;
  align-items: center;
  width: 223px;
  height: 65px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid ${(props) => props.borderColor};
  gap: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NameText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Status = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProfileImage = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 23px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`;

const ScheduleTitle = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 8px;
  font-weight: 700;
`;

const NoText = styled.div`
  color: var(--Primary, #f14040);
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CoupleRegisterText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 60px;
  width: 120px;
`;
