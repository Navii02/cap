// FacultyHome.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {baseurl} from '../../url';
import Navbar from "./FacultyNavbar";
import "./FacultyHome.css";

function FacultyHome() {
  const [teachername, setTeacherName] = useState('');
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = localStorage.getItem('email');
      
      if (!userEmail) {
        console.error('User email not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`${baseurl}/api/teacher-profile?email=${userEmail}`);
        

        const { teachername, branches, semesters, subjects } = response.data;

     

        // Set state with the fetched data
        setTeacherName(teachername);
        setBranches(branches);
        setSemesters(semesters);
        setSubjects(subjects);

        // Save branches, semesters, and subjects to localStorage
        localStorage.setItem('branches', JSON.stringify(branches));
        localStorage.setItem('semesters', JSON.stringify(semesters));
        localStorage.setItem('subjects', JSON.stringify(subjects));

        
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the updated state
    
  }, [teachername]);

  return (
    <div>
      <Navbar/>
      <div className="faculty-home-container">
        <div className="welcome-section">
          <h1 className="welcome-header">Welcome, {teachername}!</h1>
          <p className="welcome-text">
            This is your faculty home page. Explore the features and modules available for you.
          </p>
          <div className="associated-data">
            <h2>Your Associated Data:</h2>
            <p><strong>Branches:</strong> {branches.join(", ")}</p>
            <p><strong>Semesters:</strong> {semesters.join(", ")}</p>
            <p><strong>Subjects:</strong> {subjects.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyHome;
