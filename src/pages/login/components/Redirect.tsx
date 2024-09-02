import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 토큰을 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("authToken", token);

      // '/'로 리다이렉트
      navigate("/");
    } else {
      console.error("Token not found in URL");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default Redirect;
