import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import {
  useFetchMyScheduleList,
  useFetchPartnerScheduleList,
} from "../../../hooks/useScheduleList";
import { getBusyColor } from "../../../utils/colors";
import { ScheduleData } from "../../../types/ISchedule";
import { useUpdateScheduleStatus } from "../../../hooks/useUpdateScheduleStatus";

const ListView: React.FC<{ date: string }> = ({ date }) => {
  const { data: myScheduleList } = useFetchMyScheduleList(date);
  const { data: partnerScheduleList } = useFetchPartnerScheduleList(date);

  const [mySchedules, setMySchedules] = useState<ScheduleData[]>(
    myScheduleList || []
  );
  const [partnerSchedules, setPartnerSchedules] = useState<ScheduleData[]>(
    partnerScheduleList || []
  );

  useEffect(() => {
    if (myScheduleList) {
      setMySchedules(myScheduleList);
    }
  }, [myScheduleList]);

  useEffect(() => {
    if (partnerScheduleList) {
      setPartnerSchedules(partnerScheduleList);
    }
  }, [partnerScheduleList]);

  const { mutate: updateScheduleStatus } = useUpdateScheduleStatus();

  const toggleCompletion = (
    schedules: ScheduleData[],
    setSchedules: React.Dispatch<React.SetStateAction<ScheduleData[]>>,
    index: number,
    otherSchedules: ScheduleData[],
    setOtherSchedules: React.Dispatch<React.SetStateAction<ScheduleData[]>>
  ) => {
    const updatedSchedules: ScheduleData[] = schedules.map((schedule, i) => {
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

    const updatedOtherSchedules: ScheduleData[] = otherSchedules.map(
      (schedule) => {
        if (schedule.isCommon && schedules[index].isCommon) {
          return {
            ...schedule,
            status: updatedSchedules[index].status,
          };
        }
        return schedule;
      }
    );

    setSchedules(updatedSchedules);
    setOtherSchedules(updatedOtherSchedules);
  };

  return (
    <ListContainer>
      {/* 내 일정  */}
      <Container>
        <Header>
          <ProfileImage src={defaultCat} alt="프로필" />{" "}
          <Wrapper>
            <Name>(애칭)의 일정</Name>
            <StatusContainer>
              <StatusItem>일정 {mySchedules.length}개</StatusItem>
              <StatusItem>
                완료 일정
                {myScheduleList.filter((s) => s.status === "완료").length}개
              </StatusItem>
              <StatusItem>
                미완료 일정
                {myScheduleList.filter((s) => s.status === "미완료").length}개
              </StatusItem>
            </StatusContainer>
          </Wrapper>
        </Header>

        {/* 내 일정 목록 */}
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
                  toggleCompletion(
                    mySchedules,
                    setMySchedules,
                    index,
                    partnerSchedules,
                    setPartnerSchedules
                  )
                }
              >
                {schedule.status === "완료" ? "완료" : "미완료"}
              </StatusButton>
            </ScheduleItem>
          ))}
        </ScheduleList>
      </Container>

      {/* 애인의 일정  */}
      <PartnerContainer>
        <Header>
          <ProfileImage src={defaultCat} alt="프로필" />{" "}
          <Wrapper>
            <Name>(애칭)의 일정</Name>
            <StatusContainer>
              <StatusItem>일정 {partnerScheduleList.length}개</StatusItem>
              <StatusItem>
                완료 일정
                {partnerScheduleList.filter((s) => s.status === "완료").length}
                개
              </StatusItem>
              <StatusItem>
                미완료 일정
                {
                  partnerScheduleList.filter((s) => s.status === "미완료")
                    .length
                }
                개
              </StatusItem>
            </StatusContainer>
          </Wrapper>
        </Header>

        {/* 애인 일정 목록 */}
        <ScheduleList>
          {partnerSchedules.map((schedule, index) => (
            <ScheduleItem key={index}>
              <ScheduleInfo>
                <ScheduleColor color={getBusyColor(schedule.busyLevel)} />
                <ScheduleTitle>{schedule.scheduleName}</ScheduleTitle>
              </ScheduleInfo>
              <StatusButton
                status={schedule.status}
                onClick={() =>
                  toggleCompletion(
                    partnerSchedules,
                    setPartnerSchedules,
                    index,
                    mySchedules,
                    setMySchedules
                  )
                }
              >
                {schedule.status === "완료" ? "완료" : "미완료"}
              </StatusButton>
            </ScheduleItem>
          ))}
        </ScheduleList>
      </PartnerContainer>
    </ListContainer>
  );
};

export default ListView;

const ListContainer = styled.div`
  width: 90%;
  gap: 13px;
`;

const Container = styled.div`
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const PartnerContainer = styled(Container)`
  margin-top: 13px;
  background: var(--Secondary, #ffcfc7);
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

const StatusButton = styled.div<{ status: string }>`
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
  cursor: pointer;
`;
