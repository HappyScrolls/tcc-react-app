import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Layout } from "./components/layout/Layout";
import { Suspense } from "react";

const App = () => {
  const location = useLocation();
  const hidePage = ["/", "/signup"].includes(location.pathname);
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Layout>
          {!hidePage && <Header />}
          <Outlet />
          {!hidePage && <Footer />}
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
