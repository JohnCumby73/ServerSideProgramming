const express = require("express");
const studentRouter = express.Router();

const {getStudents, createStudent, updateStudentBySchoolId, deleteStudentBySchoolId } = require("../controllers/student.controller.js");

studentRouter.get('/', getStudents);
studentRouter.post('/', createStudent);
studentRouter.put('/:schoolId', updateStudentBySchoolId);
studentRouter.delete('/:schoolId', deleteStudentBySchoolId);

module.exports = studentRouter;