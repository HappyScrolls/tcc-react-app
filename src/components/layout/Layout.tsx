import styled from "styled-components";

// 전체 레이아웃
export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  min-height: 100vh;
  padding: 0 20px;
`;

// 콘텐츠 영역
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  /* justify-content: center; */
  align-items: center;

  width: 100%;
  max-width: 390px;
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 20px;

  background-color: #fff;
`;
