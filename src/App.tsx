import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Layout } from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Layout>
         <Header />
        <Outlet />
         <Footer />
      </Layout>
    </>
  );
};

export default App;
