import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSendVerificationCode = async () => {
    try {
      const res = await fetch('/api/sendverificationcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        setError(error.msg);
        return;
      }

      setEmailSent(true);
      setVerificationCodeSent(true);
      setSuccessMessage('Verification code sent successfully');
    } catch (error) {
      console.error('There was an error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleVerifyCodeAndChangePassword = async () => {
    try {
      const res = await fetch('/api/verifycodeandchangepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          verificationCode,
          newPassword,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        setError(error.msg);
        return;
      }

      setEmailSent(false);
      setVerificationCodeSent(false);
      setError(null);
      setSuccessMessage('Password changed successfully');

      // Redirect to the verification code entry page using navigate
      setTimeout(() => {
        navigate('/verification-code-entry');
      }, 1000); // Redirect after 1 second (adjust as needed)
    } catch (error) {
      console.error('There was an error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {!emailSent && (
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="button" onClick={handleSendVerificationCode}>
            Send Verification Code
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
      {emailSent && verificationCodeSent && !successMessage && (
        <div>
          <p>Verification code sent to your email. Please check your inbox.</p>
        </div>
      )}
      {emailSent && verificationCodeSent && (
        <form>
          <label>
            Verification Code:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button type="button" onClick={handleVerifyCodeAndChangePassword}>
            Verify Code and Change Password
          </button>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;