import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Layout } from "./components/layout/Layout";

const App = () => {
  const location = useLocation();
  const hidePage = ["/", "/signup"].includes(location.pathname);
  return (
    <>
      <Layout>
        {!hidePage && <Header />}
        <Outlet />
        {!hidePage && <Footer />}
      </Layout>
    </>
  );
};

export default App;
