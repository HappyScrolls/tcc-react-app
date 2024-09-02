import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { Container, Layout } from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Layout>
        <Header />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </Layout>
    </>
  );
};

export default App;
