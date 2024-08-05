import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import KakaoLogin from "./pages/KakaoLogin";
import { useNavigate } from 'react-router-dom';
const OAuth2RedirectHandler = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        // 현재 URL에서 토큰을 추출합니다.
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // 토큰을 로컬 스토리지에 저장합니다.
            localStorage.setItem('authToken', token);

            // '/'로 리다이렉트합니다.
            navigate('/');
        } else {
            console.error('Token not found in URL');
        }
    }, [navigate]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
};
const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<KakaoLogin/>} />
                    <Route path="/redirect" element={<OAuth2RedirectHandler/>} />
                </Routes>
            </Layout>
        </Router>
    );
};


export default App;
