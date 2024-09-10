import React from "react";
import SignUpForm from "./components/SignUpForm";
import { useLocation } from "react-router-dom";

const SignUpPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const memberCode = searchParams.get("memberCode");
  if (!memberCode) {
    return <div>Error: 멤버코드 없음 </div>;
  }
  return (
    <>
      <SignUpForm memberCode={memberCode} />
    </>
  );
};

export default SignUpPage;
