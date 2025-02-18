const express = require("express");
const courseRouter = express.Router ();

const {getCourses, getCourseById, getCourseByName, insertCourse, updateCourseById, updateCourseByName, deleteCourseById, deleteCourseByName, deleteAllCourses} = require ("../../controllers/course.controller.js");

courseRouter.get ('/', getCourses);
courseRouter.get ('/id=:id', getCourseById);
courseRouter.get ('/name=:name', getCourseByName);
courseRouter.put('/', insertCourse);
courseRouter.put('/id=:id', updateCourseById);
courseRouter.put('/name=:name', updateCourseByName);
courseRouter.delete('/id=:id', deleteCourseById);
courseRouter.delete('/name=:name', deleteCourseByName);
courseRouter.delete('/', deleteAllCourses)

module.exports = courseRouter;