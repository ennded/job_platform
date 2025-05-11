import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplication = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  // Debugging: Log `isAuthorized`
  useEffect(() => {
    console.log("isAuthorized:", isAuthorized); // Debugging line
    if (isAuthorized) {
      const fetchApplications = async () => {
        try {
          const url =
            user && user.role === "Employer"
              ? "https://job-seeking-backend-deployment-1-yttk.onrender.com/api/v1/application/employer/getall"
              : "https://job-seeking-backend-deployment-1-yttk.onrender.com/api/v1/application/jobseeker/getall";

          console.log("Fetching from URL:", url); // Debugging line
          const res = await axios.get(url, { withCredentials: true });
          console.log("Fetched applications:", res.data); // Debugging line
          setApplications(res.data.applications || []);
        } catch (error) {
          console.error("Error fetching applications:", error); // Debugging line
          toast.error(error.response?.data?.message || "An error occurred");
        }
      };

      fetchApplications();
    } else {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`https://job-seeking-backend-deployment-1-yttk.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplications) =>
            prevApplications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p>
        <span>Name:</span> {element.name}
      </p>
      <p>
        <span>Email:</span> {element.email}
      </p>
      <p>
        <span>Phone:</span> {element.phone}
      </p>
      <p>
        <span>Address:</span> {element.address}
      </p>
      <p>
        <span>CoverLetter:</span> {element.coverLetter}
      </p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>
        Delete Application
      </button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p>
        <span>Name:</span> {element.name}
      </p>
      <p>
        <span>Email:</span> {element.email}
      </p>
      <p>
        <span>Phone:</span> {element.phone}
      </p>
      <p>
        <span>Address:</span> {element.address}
      </p>
      <p>
        <span>CoverLetter:</span> {element.coverLetter}
      </p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);

export default MyApplication;
