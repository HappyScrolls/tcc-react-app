import styled from "styled-components";

// 전체 레이아웃
export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;
  background-color: #fff;
`;

// 콘텐츠 영역
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  /* max-width: 390px; */
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
`;

export const MainContent = styled.div`
  flex-grow: 1;
  /* padding-bottom: 80px; */
`;
