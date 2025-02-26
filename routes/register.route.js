const express = require("express");
const registerRouter = express.Router();


const {registerStudentForCourse, removeStudentFromCourse} = require("../controllers/register.controller.js");

registerRouter.post('/:schoolId/register/:courseName', registerStudentForCourse);
registerRouter.delete('/:schoolId/register/:courseName', removeStudentFromCourse)

module.exports = registerRouter;