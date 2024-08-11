import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from '../../url';
import Navbar from "./TutorNavbar";
import "./tutorstudentlist.css";

const TutorUpdates = () => {
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [semester, setSemester] = useState("");
  const [registerNumberPrefix, setRegisterNumberPrefix] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    semester: "",
    academicYear: "",
    admissionNumber: "",
    dateOfBirth: "",
    address: "",
    email: "",
    mobileNo: "",
    collegemail: "",
    RegisterNo: "",
    lab: "",
    isMinor: true, // Add this line
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const tutorclass = localStorage.getItem("tutorclass");
    const academicYear = localStorage.getItem("academicYear");
    if (tutorclass && academicYear) {
      fetchStudents(tutorclass, academicYear);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchStudents = async (tutorclass, academicYear) => {
    try {
      const response = await axios.get(
        `${baseurl}/api/students/tutor/${tutorclass}/${academicYear}`
      );
      const sortedStudents = response.data.sort((a, b) =>
        a.RollNo.localeCompare(b.RollNo)
      );
      setStudents(sortedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      setErrorMessage("Error fetching students");
    }
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSemesterSubmit = async (e) => {
    e.preventDefault();
    if (!semester) {
      setErrorMessage("Please enter a semester to update");
      return;
    }

    const tutorclass = localStorage.getItem("tutorclass");
    const academicYear = localStorage.getItem("academicYear");

    try {
      await axios.put(
        `${baseurl}/api/students/semester/${tutorclass}/${academicYear}`,
        { semester }
      );
      fetchStudents(tutorclass, academicYear); // Refresh the list after updating
      setSemester(""); // Clear the semester field after successful update
      setSuccessMessage("All students' semesters updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      setErrorMessage("Error updating student");
    }
  };

  const handleRegisterNumberChange = (e) => {
    setRegisterNumberPrefix(e.target.value);
  };

  const handleRegisterNumberSubmit = async (e) => {
    e.preventDefault();
    if (!registerNumberPrefix) {
      setErrorMessage("Please enter a starting register number");
      return;
    }

    const tutorclass = localStorage.getItem("tutorclass");
    const academicYear = localStorage.getItem("academicYear");

    try {
      const updatedStudents = students.map((student, index) => {
        const registerNumber =
          registerNumberPrefix.slice(0, -3) +
          String(parseInt(registerNumberPrefix.slice(-3)) + index).padStart(
            3,
            "0"
          );
        return { ...student, RegisterNo: registerNumber };
      });

      await Promise.all(
        updatedStudents.map((student) =>
          axios.put(`${baseurl}/api/students/${student._id}`, student)
        )
      );

      fetchStudents(tutorclass, academicYear); // Refresh the list after updating
      setRegisterNumberPrefix(""); // Clear the register number prefix field after successful update
      setSuccessMessage("All students' register numbers updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      setErrorMessage("Error updating student");
    }
  };

  const handleAlphabeticalRollNumberAssignment = async () => {
    const tutorclass = localStorage.getItem("tutorclass");
    const academicYear = localStorage.getItem("academicYear");

    try {
      const rollNumberPrefix = "1"; // Set your register number prefix here
      await axios.put(
        `${baseurl}/api/students/roll-numbers/${encodeURIComponent(tutorclass)}/${academicYear}`,
        { rollNumberPrefix }
      );

      fetchStudents(tutorclass, academicYear); // Refresh the list after updating
      setSuccessMessage("Roll numbers assigned based on alphabetical order successfully!");
    } catch (error) {
      console.error("Error assigning roll numbers:", error);
      setErrorMessage("Error assigning roll numbers");
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student._id);
    setFormData({
      id: student._id,
      RollNo: student.RollNo,
      name: student.name,
      semester: student.semester,
      academicYear: student.academicYear,
      admissionNumber: student.admissionNumber,
      dateOfBirth: student.dateOfBirth
        ? new Date(student.dateOfBirth).toISOString().split("T")[0]
        : "",
      address: student.address,
      email: student.email,
      mobileNo: student.mobileNo,
      collegemail: student.collegemail,
      RegisterNo: student.RegisterNo,
      lab: student.lab,
      isMinor: student.isMinor, // Add this line
    });
  };

  const handleLabAssignment = async () => {
    const tutorclass = localStorage.getItem("tutorclass");
    const academicYear = localStorage.getItem("academicYear");

    try {
      await axios.put(
        `${baseurl}/api/students/lab-assignment/${encodeURIComponent(tutorclass)}/${encodeURIComponent(academicYear)}`
      );
      fetchStudents(tutorclass, academicYear); // Refresh the list after updating
      setSuccessMessage("Students' lab assignments updated successfully!");
    } catch (error) {
      console.error("Error updating lab assignments:", error);
      setErrorMessage("Error updating lab assignments");
    }
  };

  const handleEmailInitialization = async () => {
    const tutorclass = localStorage.getItem("tutorclass");
    const academicYear = localStorage.getItem("academicYear");

    try {
      const updatedStudents = students.map((student) => {
        const email = `${student.RegisterNo.toLowerCase()}@cep.ac.in`;
        return { ...student, collegemail: email };
      });

      await Promise.all(
        updatedStudents.map((student) =>
          axios.put(`${baseurl}/api/students/${student._id}`, student)
        )
      );

      fetchStudents(tutorclass, academicYear); // Refresh the list after updating
      setSuccessMessage("College emails initialized successfully!");
    } catch (error) {
      console.error("Error initializing college emails:", error);
      setErrorMessage("Error initializing college emails");
    }
  };

  const resetFormData = () => {
    setFormData({
      id: "",
      name: "",
      semester: "",
      academicYear: "",
      admissionNumber: "",
      dateOfBirth: "",
      address: "",
      email: "",
      mobileNo: "",
      collegemail: "",
      RegisterNo: "",
      lab: "",
      isMinor: false, // Add this line
    });
  };

  const handleCancel = () => {
    setSelectedStudent(null);
    resetFormData();
    setSuccessMessage("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { id, ...updateData } = formData;

    try {
      await axios.put(`${baseurl}/api/students/${id}`, updateData);
      setSuccessMessage("Student updated successfully!");
      fetchStudents(localStorage.getItem("tutorclass"), localStorage.getItem("academicYear")); // Refresh the list after updating
      setSelectedStudent(null);
      resetFormData();
    } catch (error) {
      console.error("Error updating student:", error);
      setErrorMessage("Error updating student");
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <h1>Students List</h1>
        <form onSubmit={handleSemesterSubmit}>
          <input
            type="text"
            value={semester}
            onChange={handleSemesterChange}
            placeholder="Enter semester"
          />
          <button type="submit">Update Semester</button>
        </form>
        <form onSubmit={handleRegisterNumberSubmit}>
          <input
            type="text"
            value={registerNumberPrefix}
            onChange={handleRegisterNumberChange}
            placeholder="Enter starting register number"
          />
          <button type="submit">Update Register Numbers</button>
        </form>
        <button onClick={handleAlphabeticalRollNumberAssignment}>
          Assign Roll Numbers Alphabetically
        </button>
        <button onClick={handleLabAssignment}>Assign Labs</button>
        <button onClick={handleEmailInitialization}>
          Initialize College Emails
        </button>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Semester</th>
              <th>Academic Year</th>
              <th>Admission Number</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>College Email</th>
              <th>Register No</th>
              <th>Lab</th>
              <th>Minor</th> {/* Add this line */}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.RollNo}</td>
                <td>{student.name}</td>
                <td>{student.semester}</td>
                <td>{student.academicYear}</td>
                <td>{student.admissionNumber}</td>
                <td>{student.dateOfBirth && formatDate(student.dateOfBirth)}</td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>{student.mobileNo}</td>
                <td>{student.collegemail}</td>
                <td>{student.RegisterNo}</td>
                <td>{student.lab}</td>
                <td>{student.isMinor ? "Yes" : "No"}</td> {/* Add this line */}
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedStudent && (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              placeholder="Semester"
            />
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              placeholder="Academic Year"
            />
            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleInputChange}
              placeholder="Admission Number"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Date of Birth"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="Mobile No"
            />
            <input
              type="email"
              name="collegemail"
              value={formData.collegemail}
              onChange={handleInputChange}
              placeholder="College Email"
            />
            <input
              type="text"
              name="RegisterNo"
              value={formData.RegisterNo}
              onChange={handleInputChange}
              placeholder="Register No"
            />
            <input
              type="text"
              name="lab"
              value={formData.lab}
              onChange={handleInputChange}
              placeholder="Lab"
            />
            <label>
              Minor:
              <input
                type="checkbox"
                name="isMinor"
                checked={formData.isMinor}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Update Student</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        )}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </>
  );
};

export default TutorUpdates;
