import React, { createContext, useEffect, useState } from "react";
import "./index.css"
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AskQuestion from "./Components/AskQuestion";
import Answer from "./Components/Answer"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Components/Layout";
import Header from "./Components/Header";
import axios from "./axiosConfig";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkuser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (token) {
      checkuser();
    }
  }, [token]);


 const handleLogout = () => {
   localStorage.removeItem("token");
   setUser({});
   navigate("/login");
 };


  return (
    <AppState.Provider value={{ user, setUser, handleLogout }}>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/answers/:questionid" element={<Answer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </AppState.Provider>
  );
}

export default App;
