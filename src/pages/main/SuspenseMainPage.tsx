import React, { Suspense } from "react";
import MainPage from "./MainPage";
const SuspenseMainPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
};

export default SuspenseMainPage;
