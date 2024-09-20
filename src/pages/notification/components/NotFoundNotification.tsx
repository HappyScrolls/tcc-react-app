import React from "react";
import styled from "styled-components";
import notFoundNotification from "../../../images/notification/notFoundNotification.svg";

const NotFoundNotification = () => {

    return (
        <Container>
            <NotFoundImg src={notFoundNotification}/>
            <Text>새 알림이 없습니다.</Text>
        </Container>
    );
};

export default NotFoundNotification;
export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
export const NotFoundImg = styled.img`
  width: 58px;
  height: 87.741px;
  flex-shrink: 0;
`;
export const Text = styled.span`
  color: var(--Black, #3B3634);
  font-family: "Hakgyoansim KkokkomaOTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
