import React from "react";
import styled from "styled-components";
import notFoundNotification from "../../../images/notification/notFoundNotification.svg";

const NotFoundNotification = () => {
  return (
    <Container>
      <NotFoundImg src={notFoundNotification} />
      <Text>새 알림이 없습니다.</Text>
    </Container>
  );
};

export default NotFoundNotification;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

export const NotFoundImg = styled.img`
  width: 58px;
  height: 87.741px;
`;

export const Text = styled.div`
  color: var(--Black, #3b3634);
  font-family: "Hakgyoansim KkokkomaOTF"; // TODO: 폰트 추가
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
