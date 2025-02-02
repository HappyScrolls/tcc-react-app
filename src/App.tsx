import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Layout, MainContent } from "./components/layout/Layout";
import {Suspense, useEffect} from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}
const App = () => {
  const location = useLocation();
  const hidePage = ["/", "/signup"].includes(location.pathname);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Layout>
          {!hidePage && <Header />}
          <MainContent className={hidePage ? "no-padding" : ""}>
            <Outlet />
          </MainContent>
          {!hidePage && <Footer />}
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
