import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const KAKAO_AUTH_URL2 = `http://158.247.198.100:32001/oauth2/authorization/kakao`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL2;
  };
  interface DecodedToken {
    iss: string;
    iat: number;
    exp: number;
    nickname: string;
    uid: string;
    thumbnail: string;
    platform: string;
    sub: string;
  }

  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  if (userInfo) {
    return (
      <div>
        <h1>Welcome, {userInfo.nickname}!</h1>
        <p>
          <strong>Email:</strong> {userInfo.uid}
        </p>
        <p>
          <strong>Platform:</strong> {userInfo.platform}
        </p>
        <img
          src={userInfo.thumbnail}
          alt="Profile Thumbnail"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handleLogin}>
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <span>카카오 아이디로 로그인</span>
        </button>
      </div>
    );
  }
};

export default Home;
