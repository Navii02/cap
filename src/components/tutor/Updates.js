import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Updates.css'; // Import the CSS file used in StudentCertificateRequestPage.js
import Navbar from './TutorNavbar'; // Assuming you have a TutorNavbar component

const TutorUpdates = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCheckboxChange = (email) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((selected) => selected !== email)
        : [...prevSelected, email]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents((prevSelected) =>
      prevSelected.length === students.length ? [] : students.map((student) => student.email)
    );
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('/api/sendMessage', {
        selectedStudents,
        message,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Set timeout for success message
    } catch (error) {
      setErrorMessage('Error sending message.');
      setSuccessMessage('');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Set timeout for error message
    }
    // Reset form after submission
    setMessage('');
    setSelectedStudents([]);
  };

  return (
    <>
      <Navbar />
      <div className="update-container">
        <label>
          Update:
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="student-selection">
          {/* Numbered list for students */}
          <div className="select-all">
            <label className="all">
              Select All
              <input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === students.length} />
            </label>
          </div>
          {students.map((student, index) => (
            <div key={student.id} className="student-checkbox">
              <span>{`${index + 1}. ${student.name}`}</span>
              <label htmlFor={`student-${index}`}>
                <input
                  type="checkbox"
                  id={`student-${index}`}
                  onChange={() => handleCheckboxChange(student.email)}
                  checked={selectedStudents.includes(student.email)}
                />
              </label>
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleSendMessage}>
          Send Message
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
};

export default TutorUpdates;
