const express = require("express");
const registerRouter = express.Router();


const {registerStudentForCourse, removeStudentFromCourse} = require("../controllers/register.controller.js");

registerRouter.post('/:studentId/register/:courseTitle', registerStudentForCourse);
registerRouter.delete('/:studentId/register/:courseTitle', removeStudentFromCourse)

module.exports = registerRouter;