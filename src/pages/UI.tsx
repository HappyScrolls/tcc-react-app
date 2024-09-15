import React from "react";
import { Container } from "../components/layout/Layout";
import DefaultBtn from "../components/button/DefaultBtn";
import RedBtn from "../components/button/RedBtn";

const UI = () => {
  return (
    <Container style={{ gap: "20px" }}>
      <DefaultBtn />
      <RedBtn />
    </Container>
  );
};

export default UI;
