const Student = require ("../models/student.model.js");

const getStudents = async (req, res) => {
    try {
        const students = await Student.find ({});
        res.status(200).json(students);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateStudentBySchoolId = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate({schoolId:req.params.schoolId}, req.body, {new: true, runValidators: true});
        res.status(200).json(student);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteStudentBySchoolId = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({schoolId:req.params.schoolId})
        res.status(200).json({
            student: student,
            message: "Student Deleted Successfully!"
    });
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    getStudents,
    createStudent,
    updateStudentBySchoolId,
    deleteStudentBySchoolId
}