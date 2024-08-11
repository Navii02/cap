import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { baseurl } from '../../url';
import HodNavbar from './HodNavbar';
import styles from './AddSubjectForm.module.css';

const ShowAddedSubjects = ({ selectedSemester, selectedCourse }) => {
  const [addedSubjects, setAddedSubjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSubjects, setEditedSubjects] = useState([]);

  const fetchAddedSubjects = useCallback(async () => {
    try {
      const branch = localStorage.getItem('branch');
      if (selectedSemester && selectedSemester >= 1 && selectedCourse) {
        if (!branch) {
          console.error('Branch not found in localStorage.');
          return;
        }
        const response = await axios.get(`${baseurl}/api/hod/subjects`, {
          params: {
            semester: selectedSemester,
            course: selectedCourse,
            branch: branch,
          }
        });
        setAddedSubjects(response.data);
        setEditedSubjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching added subjects:', error);
    }
  }, [selectedSemester, selectedCourse]);

  useEffect(() => {
    fetchAddedSubjects();
  }, [fetchAddedSubjects, selectedSemester, selectedCourse]);

  const handleEditSubject = (index) => {
    setEditingIndex(index);
  };

  const handleSaveSubject = async (index) => {
    try {
      const subjectId = addedSubjects[index]._id;
      await axios.put(`${baseurl}/api/hod/subjects/${subjectId}`, editedSubjects[index]);
      alert('Subject details updated successfully!');
      setEditingIndex(null);
      fetchAddedSubjects(); // Refresh data after saving
    } catch (error) {
      console.error('Error updating subject details:', error);
    }
  };

  const handleInputChange = (event, field, index, subIndex) => {
    const updatedSubjects = [...editedSubjects];
    updatedSubjects[index].subjects[subIndex][field] = event.target.value;
    setEditedSubjects(updatedSubjects);
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addedSubjects.map((subject, index) => (
            <React.Fragment key={index}>
              {subject.subjects.map((sub, subIndex) => (
                <tr key={`${index}-${subIndex}`}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedSubjects[index].subjects[subIndex].subjectName}
                        onChange={(e) => handleInputChange(e, 'subjectName', index, subIndex)}
                      />
                    ) : (
                      sub.subjectName
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedSubjects[index].subjects[subIndex].subjectCode}
                        onChange={(e) => handleInputChange(e, 'subjectCode', index, subIndex)}
                      />
                    ) : (
                      sub.subjectCode
                    )}
                  </td>
                  <td>
                    {subIndex === 0 && (
                      <>
                        {editingIndex === index ? (
                          <button onClick={() => handleSaveSubject(index)}>Save</button>
                        ) : (
                          <button onClick={() => handleEditSubject(index)}>Edit</button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddSubjectForm = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([{ subjectName: '', subjectCode: '' }]);
  const [branch, setBranch] = useState('');
  const [courses, setCourses] = useState([]);

  const handleChangeSemester = (e) => {
    const value = e.target.value;
    setSelectedSemester(value);
    setSemester(value);
    setSubjects([{ subjectName: '', subjectCode: '' }]);
  };

  const handleChangeCourse = (e) => {
    setSelectedCourse(e.target.value);
  };

  useEffect(() => {
    const branchFromLocalStorage = localStorage.getItem('branch');
    setBranch(branchFromLocalStorage);
    // Update courses based on selected branch
    if (branchFromLocalStorage === 'CS') {
      setCourses(['B.Tech CSE', 'MCA', 'BBA', 'BCA']);
    } else if (branchFromLocalStorage === 'EC') {
      setCourses(['B.Tech ECE']);
    } else if (branchFromLocalStorage === 'EE') {
      setCourses(['B.Tech CSE', 'B.Tech ECE', 'MCA', 'BBA', 'BCA']);
    }
  }, []);

  const handleChange = (index, event) => {
    const values = [...subjects];
    if (event.target.name === 'subjectName') {
      values[index].subjectName = event.target.value;
    } else {
      values[index].subjectCode = event.target.value;
    }
    setSubjects(values);
  };

  const handleAddColumn = () => {
    if (semester < 3 && subjects.length < 8) {
      setSubjects([...subjects, { subjectName: '', subjectCode: '' }]);
    } else if (semester >= 3 && semester <= 6 && subjects.length < 9) {
      setSubjects([...subjects, { subjectName: '', subjectCode: '' }]);
    } else if ((semester === 7 || semester === 8) && subjects.length < 6) {
      setSubjects([...subjects, { subjectName: '', subjectCode: '' }]);
    } else {
      alert('You have reached the maximum number of subjects for this semester.');
    }
  };

  const handleRemoveColumn = (index) => {
    const values = [...subjects];
    values.splice(index, 1);
    setSubjects(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseurl}/api/hod/subjects`, { semester, subjects, branch, course: selectedCourse });
      alert('Subjects added successfully!');
      setSemester('');
      setSubjects([{ subjectName: '', subjectCode: '' }]);
      setShowAddForm(false); // Hide form after submission
    } catch (err) {
      console.error('Error adding subjects:', err);
      alert('Error adding subjects.');
    }
  };

  return (
    <div>
      <HodNavbar />
      <div className={styles.container}>
        {/* Content of the page */}
        {branch && (
          <>
            <label className={styles.label} htmlFor="courseFilter">Select Course:</label>
            <select className={styles.select} id="courseFilter" value={selectedCourse} onChange={handleChangeCourse}>
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </>
        )}

        <label className={styles.label} htmlFor="semesterFilter">Select Semester:</label>
        <select className={styles.select} id="semesterFilter" value={selectedSemester} onChange={handleChangeSemester}>
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>
      {showAddForm && selectedSemester && selectedCourse && (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              {subjects.map((subject, index) => (
                <div key={index} className={styles.subjectRow}>
                  <div>
                    <label className={styles.label} htmlFor={`subjectName${index}`}>Subject Name:</label>
                    <input
                      className={styles.inputText}
                      type="text"
                      id={`subjectName${index}`}
                      name="subjectName"
                      value={subject.subjectName}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div>
                    <label className={styles.label} htmlFor={`subjectCode${index}`}>Subject Code:</label>
                    <input
                      className={styles.inputText}
                      type="text"
                      id={`subjectCode${index}`}
                      name="subjectCode"
                      value={subject.subjectCode}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div>
                    <button type="button" className={styles.buttonRemove} onClick={() => handleRemoveColumn(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button type="button" className={styles.buttonAdd} onClick={handleAddColumn}>Add Subject</button>
            </div>
            <div>
              <button type="submit" className={styles.buttonSubmit}>Submit</button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.container}>
        <button className={styles.buttonAddSubject} onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Hide Add Form' : 'Show Add Form'}
        </button>
        {selectedSemester && selectedCourse && (
          <ShowAddedSubjects selectedSemester={selectedSemester} selectedCourse={selectedCourse} />
        )}
      </div>
    </div>
  );
};

export default AddSubjectForm;
