const express = require("express");
const registerRouter = express.Router();


const {registerStudentForCourse} = require("../controllers/register.controller.js");

registerRouter.post('/:studentId/register/:courseTitle', registerStudentForCourse);

module.exports = registerRouter;