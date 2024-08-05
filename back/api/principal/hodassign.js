const express = require('express');
const router = express.Router();
const Teacher = require('../../models/hod/TeachersDetailSchema');
const HodDetails = require('../../models/Principal/HODDetail'); // Assuming HodDetails schema exists

// Route to fetch teachers who are not yet assigned as HODs
router.get('/hod/teachers', async (req, res) => {
  try {
    // Find all teachers who are not HODs
    const teachersNotHODs = await Teacher.find({ isHOD: false });
    res.status(200).json(teachersNotHODs);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all HODs (including details from HodDetails)
router.get('/hod/hods', async (req, res) => {
  try {
    const hods = await HodDetails.find({ isHOD: true });
    // Include details from HodDetails for enriched data
    const hodsWithDetails = await Promise.all(
      hods.map(async (hod) => {
        const hodDetails = await HodDetails.findOne({ teacherId: hod._id });
        return { ...hod.toObject(), ...hodDetails };
      })
    );
    res.status(200).json(hodsWithDetails);
  } catch (error) {
    console.error('Error fetching HODs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to assign a teacher as HOD and handle the HOD turn for a specific department
router.post('/hod/assign', async (req, res) => {
  try {
    const { teacherId, department } = req.body;

    // Find the teacher to be assigned as HOD
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    if (teacher.isHOD) {
      return res.status(400).json({ error: 'Teacher is already assigned as HOD' });
    }

    // Assign the teacher as HOD
    teacher.isHOD = true;
    await teacher.save();

    // Find and update the existing HOD for the specified department
    const existingHOD = await HodDetails.findOne({ department: department, isHOD: true });
    if (existingHOD) {
      // If an existing HOD is found for the specified department, make them no longer an HOD
      existingHOD.isHOD = false;
      await existingHOD.save();

      // Update the old HOD's isHOD flag in the TeachersDetailSchema as well
      const oldHOD = await Teacher.findById(existingHOD.teacherId);
      if (oldHOD) {
        oldHOD.isHOD = false;
        await oldHOD.save();
      }
    }

    // Create new entry in HodDetails for the newly assigned HOD
    const newHodDetails = new HodDetails({
      teacherId: teacher._id,
      teachername: teacher.teachername,
      email: teacher.email,
      subjects: teacher.subjects,
      subjectCode: teacher.subjectCode,
      branches: teacher.branches,
      semesters: teacher.semesters,
      department: department,
      isHOD: true,
    });
    await newHodDetails.save();

    res.status(200).json({
      message: 'Teacher assigned as HOD successfully',
      teachername: teacher.teachername,
    });
  } catch (error) {
    console.error('Error assigning HOD:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to de-assign an HOD
// Route to de-assign an HOD
router.post('/hod/deassign', async (req, res) => {
  try {
    const { hodId } = req.body;

    // Find the HOD to be de-assigned
    const hod = await HodDetails.findById(hodId);
    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    // Mark the HOD as no longer an HOD
    hod.isHOD = false;
    await hod.save();

    // Update the teacher's isHOD flag in the TeachersDetailSchema
    const teacher = await Teacher.findById(hod.teacherId);
    if (teacher) {
      teacher.isHOD = false;
      await teacher.save();
    }

    // Delete the HOD details from HodDetails schema
    await HodDetails.findByIdAndDelete(hodId);

    res.status(200).json({
      message: 'HOD de-assigned and details removed successfully',
    });
  } catch (error) {
    console.error('Error de-assigning HOD:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
