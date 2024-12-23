import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import {
  useFetchCommonScheduleList,
  useFetchMyScheduleList,
  useFetchPartnerScheduleList,
} from "../../../hooks/useScheduleList";
import { getBusyColor } from "../../../utils/colors";
import { ScheduleData } from "../../../types/ISchedule";
import { useUpdateScheduleStatus } from "../../../hooks/useUpdateScheduleStatus";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../../types/ICoupleInfo";
import { IMemberInfo } from "../../../types/IMemberInfo";
import { LoverInfo } from "../../../types/ILoverInfo";
import { getNickNames } from "../../../utils/getNickNames";

const ListView: React.FC<{ date: string }> = ({ date }) => {
  // API 호출
  const queryClient = useQueryClient();
  const { data: myScheduleList } = useFetchMyScheduleList(date);
  const { data: partnerScheduleList } = useFetchPartnerScheduleList(date);
  const { data: commonScheduleList } = useFetchCommonScheduleList(date);

  // 정보 가져오기
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);
  const myInfo = queryClient.getQueryData<IMemberInfo>(["memberInfo"]);
  const loverInfo = queryClient.getQueryData<LoverInfo>(["myLoverInfo"]);

  // 커플 정보 유효성 검사
  const isValidCoupleInfo =
    coupleInfo && coupleInfo.nickNameA && coupleInfo.nickNameB;

  const { myNickName, loverNickName } = getNickNames(
    coupleInfo || null,
    myInfo?.no || 0,
    loverInfo?.no || 0
  );

  // 상태 초기화
  const [mySchedules, setMySchedules] = useState<ScheduleData[]>([]);
  const [partnerSchedules, setPartnerSchedules] = useState<ScheduleData[]>([]);
  const [commonSchedules, setCommonSchedules] = useState<ScheduleData[]>(
    commonScheduleList || []
  );

  // 개인 일정 상태
  useEffect(() => {
    if (myScheduleList) {
      setMySchedules(myScheduleList.filter((schedule) => !schedule.isCommon));
    }
  }, [myScheduleList]);

  // 파트너 일정 상태
  useEffect(() => {
    if (partnerScheduleList) {
      setPartnerSchedules(
        partnerScheduleList.filter((schedule) => !schedule.isCommon)
      );
    }
  }, [partnerScheduleList]);

  // 공통 일정 상태
  useEffect(() => {
    if (commonScheduleList) {
      setCommonSchedules(commonScheduleList);
    }
  }, [commonScheduleList]);

  const { mutate: updateScheduleStatus } = useUpdateScheduleStatus();

  // 완료 상태 변경
  const toggleCompletion = (
    schedules: ScheduleData[],
    setSchedules: React.Dispatch<React.SetStateAction<ScheduleData[]>>,
    index: number
  ) => {
    const updatedSchedules = schedules.map((schedule, i) => {
      if (i === index) {
        const newStatus = schedule.status === "완료" ? "미완료" : "완료";

        if (schedule.scheduleNo !== undefined) {
          updateScheduleStatus({
            scheduleNo: schedule.scheduleNo,
            status: newStatus,
          });
        }

        return {
          ...schedule,
          status: newStatus,
        };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
  };

  return (
    <ListContainer>
      {/* 커플 일정 */}
      {coupleInfo && (
        <CoupleContainer>
          <Header>
            <ProfileImage src={defaultCat} alt="프로필" />
            <Wrapper>
              <Name> {coupleInfo?.name || "공통"} 일정</Name>
              <StatusContainer>
                <StatusItem>일정 {commonSchedules.length}개</StatusItem>
                <StatusItem>
                  완료 일정
                  {commonSchedules.filter((s) => s.status === "완료").length}개
                </StatusItem>
                <StatusItem>
                  미완료 일정
                  {commonSchedules.filter((s) => s.status === "미완료").length}
                  개
                </StatusItem>
              </StatusContainer>
            </Wrapper>
          </Header>

          <ScheduleList>
            {commonSchedules.map((schedule, index) => (
              <ScheduleItem key={index}>
                <ScheduleInfo>
                  <ScheduleColor color={getBusyColor(schedule.busyLevel)} />
                  <ScheduleTitle>{schedule.scheduleName}</ScheduleTitle>
                </ScheduleInfo>
                <StatusButton
                  status={schedule.status}
                  onClick={() =>
                    toggleCompletion(commonSchedules, setCommonSchedules, index)
                  }
                >
                  {schedule.status === "완료" ? "완료" : "미완료"}
                </StatusButton>
              </ScheduleItem>
            ))}
          </ScheduleList>
        </CoupleContainer>
      )}

      {/* 내 일정 */}
      <MyContainer>
        <Header>
          <ProfileImage src={defaultCat} alt="내 프로필" />
          <Wrapper>
            <Name>
              {myNickName || myInfo?.name}
              &nbsp;일정
            </Name>
            <StatusContainer>
              <StatusItem>일정 {mySchedules.length}개</StatusItem>
              <StatusItem>
                완료 일정
                {mySchedules.filter((s) => s.status === "완료").length}개
              </StatusItem>
              <StatusItem>
                미완료 일정
                {mySchedules.filter((s) => s.status === "미완료").length}개
              </StatusItem>
            </StatusContainer>
          </Wrapper>
        </Header>

        <ScheduleList>
          {mySchedules.map((schedule, index) => (
            <ScheduleItem key={index}>
              <ScheduleInfo>
                <ScheduleColor color={getBusyColor(schedule.busyLevel)} />
                <ScheduleTitle>{schedule.scheduleName}</ScheduleTitle>
              </ScheduleInfo>
              <StatusButton
                status={schedule.status}
                onClick={() =>
                  toggleCompletion(mySchedules, setMySchedules, index)
                }
              >
                {schedule.status === "완료" ? "완료" : "미완료"}
              </StatusButton>
            </ScheduleItem>
          ))}
        </ScheduleList>
      </MyContainer>

      {/* 애인 일정 */}
      {coupleInfo! && (
        <PartnerContainer>
          <Header>
            <ProfileImage src={defaultCat} alt="애인 프로필" />
            <Wrapper>
              <Name>
                {loverNickName || loverInfo?.name}
                &nbsp;일정
              </Name>
              <StatusContainer>
                <StatusItem>일정 {partnerSchedules.length}개</StatusItem>
                <StatusItem>
                  완료 일정
                  {partnerSchedules.filter((s) => s.status === "완료").length}개
                </StatusItem>
                <StatusItem>
                  미완료 일정
                  {partnerSchedules.filter((s) => s.status === "미완료").length}
                  개
                </StatusItem>
              </StatusContainer>
            </Wrapper>
          </Header>

          <ScheduleList>
            {partnerSchedules.map((schedule, index) => (
              <ScheduleItem key={index}>
                <ScheduleInfo>
                  <ScheduleColor color={getBusyColor(schedule.busyLevel)} />
                  <ScheduleTitle>{schedule.scheduleName}</ScheduleTitle>
                </ScheduleInfo>
                <StatusButton status={schedule.status} disabled>
                  {schedule.status === "완료" ? "완료" : "미완료"}
                </StatusButton>
              </ScheduleItem>
            ))}
          </ScheduleList>
        </PartnerContainer>
      )}
    </ListContainer>
  );
};

export default ListView;

const ListContainer = styled.div`
  width: 90%;
  min-height: calc(100vh - 300px);
  gap: 13px;

  margin-top: 15px;
`;

const CoupleContainer = styled.div`
  padding: 20px;
  border-radius: 15px;
  background: var(--Secondary, #ffcfc7);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const PartnerContainer = styled(CoupleContainer)`
  margin-top: 13px;
  background: var(--Secondary, #ffcfc7);
`;

const MyContainer = styled(CoupleContainer)`
  margin-top: 13px;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Name = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
  padding: 11.669px 10.5px 12.494px 11.5px;
  margin-right: 10px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 5.7px 0px rgba(0, 0, 0, 0.25);
`;

const StatusContainer = styled.div`
  display: flex;
  padding: 5px 12px 4px 11px;
  justify-content: center;
  gap: 25px;
  border-radius: 20px;
  background: #f25454;
`;

const StatusItem = styled.div`
  color: #fff;
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ScheduleList = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  gap: 9px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ScheduleColor = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 4px;
`;

const ScheduleTitle = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StatusButton = styled.div<{ status: string; disabled?: boolean }>`
  padding: 2px 16px 1px 14px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
  background-color: ${({ status }) => (status === "완료" ? "#FFF" : "#F25454")};
  color: ${({ status }) => (status === "완료" ? "#F25454" : "#FFF")};
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
