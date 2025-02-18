const Course = require ("../models/course.model.js");

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find ({});
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById (req.params.id);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getCourseByName = async (req, res) => {
    try {
        const course = await Course.findOne ({courseName:req.params.name});
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const insertCourse = async (req, res) => {
    try {
        const sched = await Course.create(req.body);
        res.status(200).json(sched);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate (req.params.id, req.body);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const updateCourseByName = async (req, res) => {
    try {
        console.log("Trying to find one")
        const course = await Course.findOneAndUpdate ({courseName:req.params.name}, req.body, {new: true});
        console.log(course)
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

const deleteCourseByName = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete ({courseName:req.params.name});
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteAllCourses = async (req, res) => {
    try {
        const result = await Course.deleteMany({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(({ message: err.message}))
    }
}
module.exports = {
    getCourses,
    getCourseById,
    getCourseByName,
    insertCourse,
    updateCourseById,
    updateCourseByName,
    deleteCourseById,
    deleteCourseByName,
    deleteAllCourses
}