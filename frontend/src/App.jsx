import React, { useEffect, useContext } from 'react';
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/jobs'
import JobDetails from './components/Job/jobDetails'
import MyJobs from './components/Job/MyJobs'
import PostJobs from './components/Job/PostJob'
import Application from './components/Application/Application'
import MyApplications from './components/Application/MyApplication'
import NotFound from './components/NotFound/NotFound'
import axios from "axios";
import { Toaster } from "react-hot-toast";


const App = () => {


  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://job-seeking-backend-deployment-1-yttk.onrender.com/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    }
    fetchUser();
  }, [isAuthorized]);  // jab bhi page ko refresh krenge tab useefrct k andar ka run hoga->>isAuthorized ki value change hogi tb  useEffect k andr ka run hoga


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/me" element={<MyApplications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App