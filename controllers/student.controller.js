const Student = require ("../models/student.model.js");
const Course = require ("../models/course.model.js");

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
        const student = await Student.findOne({schoolId:req.params.schoolId});
        await removeStudentIdFromCoursesWhenStudentDeleted(student);
        await Student.findOneAndDelete({schoolId:req.params.schoolId});
        res.status(200).json({
            student: student,
            message: "Student Deleted Successfully!"
    });
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function removeStudentIdFromCoursesWhenStudentDeleted (student) {
    for (const courseId of student.listOfRegisteredCourses) {
        try {
            const course = await Course.findById(courseId);
            if (course) {
                course.listOfRegisteredStudents = course.listOfRegisteredStudents.filter(id => !id.equals(student._id));
                await course.save();
            } else {
                throw new Error(`Course with ID ${courseId} not found`);
            }
        } catch (error) {
            console.error("Error removing course from student:", error);
        }
    }
}

module.exports = {
    getStudents,
    createStudent,
    updateStudentBySchoolId,
    deleteStudentBySchoolId
}