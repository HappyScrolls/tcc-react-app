import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import KakaoLogin from "./pages/KakaoLogin";

const OAuth2RedirectHandler = () => {
    // const location = useLocation();
    //
    // // useEffect(() => {
    // //     const params = new URLSearchParams(location.search);
    // //     const code = params.get('code');
    // //     if (code) {
    // //         // Spring Boot의 /login/oauth2/code/kakao 경로로 리다이렉트
    // //         window.location.href = `http://localhost:8080/login/oauth2/code/kakao?code=${code}`;
    // //     }
    // //
    // //
    // //
    // // }, [location]);


    return <div>Redirecting...</div>;
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
