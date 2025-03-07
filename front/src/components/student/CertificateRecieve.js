import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CertificateRecieve.css'
import Navbar from './UserNavbar'
import {baseurl} from '../../url';

const CertificateRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userEmailFromLocalStorage = localStorage.getItem('email');
    setUserEmail(userEmailFromLocalStorage);

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/student/certificateRequests/${userEmailFromLocalStorage}`);
        setRequests(response.data.requests);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error fetching requests');
      }
    };

    if (userEmailFromLocalStorage) {
      fetchRequests();
    }
  }, [userEmail]);

  const handleDownload = async (fileUrl) => {
    try {
      const response = await axios.get(`${baseurl}${fileUrl}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `certificate_${requests._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="certificate-requests-page">
        {requests.length === 0 ? (
          <p>No certificate requests found for the logged-in user.</p>
        ) : (
          <ul>
            {requests.map((request) => (
              <li key={request._id}>
           
                <p>Student ID: {request.registerNumber}</p>
                <p>Reason: {request.reason}</p>
                <p>HoD Status: {request.HoDstatus}</p>
                <p>Officer Status: {request.status}</p>
                <p>Selected Documents: {request.selectedDocuments.join(', ')}</p>
                {request.HoDstatus === 'Declined' && <p>HoD Decline Reason: {request.hodDeclineReason}</p>}
                {request.status === 'Approved' && (
                  <button onClick={() => handleDownload(request.fileUrl)}>Download</button>
                )}
                {request.status === 'Declined' && <p>Decline Reason: {request.declineReason}</p>}
              </li>
            ))}
          </ul>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
};

export default CertificateRequestsPage;