import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import getMemberInfo from "../../../api/query/get/getMemberInfo";

const Redirect = () => {
  const navigate = useNavigate();

  interface DecodedToken {
    iss: string;
    iat: number;
    exp: number;
    nickname: string;
    uid: string;
    thumbnail: string;
    platform: string;
    "Member-Code": string;
    sub: string;
  }

  useEffect(() => {
    // 현재 URL에서 토큰을 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("authToken", token);
      const decodedToken = jwtDecode<DecodedToken>(token);

      const fetchMemberInfo = async () => {
        try {
          const memberCode = decodedToken["Member-Code"];
          const memberInfo = await getMemberInfo({ memberCode });
          if (memberInfo?.birthDate === null) {
            navigate(`/signup?memberCode=${memberCode}`);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching member info:", error);
          navigate("/login");
        }
      };
      fetchMemberInfo();
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
