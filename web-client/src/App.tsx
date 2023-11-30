import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Layout from "./Layout";
// import NoPage from "./404";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import { Layout, Spin } from "antd";
import Footer from "./pages/Footer";
import { useAuth } from "./store/authContext";

export default function App() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      auth.checkAuthenticated().then((authenticated) => {
        if (!authenticated) {
          window.location.href = "/login";
          console.log("not authenticated");
        }
      });
    }
  }, [auth.status]);

  if (auth.status !== "authenticated")
    return (
      <Spin
        size="large"
        style={{
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      />
    );

  return (
    <Layout className="flex flex-col w-screen h-screen">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      <Footer />
    </Layout>
  );
}
