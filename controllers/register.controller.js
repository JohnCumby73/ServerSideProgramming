const Student = require ("../models/student.model.js");
const Course = require ("../models/course.model.js");

const registerStudentForCourse = async (req, res) => {
    try{
        const studentId = req.params.studentId; // Get studentID from URL parameter
        const courseTitle = req.params.courseTitle; // Get courseID from URL parameter

        console.log(studentId);
        console.log(courseTitle);
        const student = await Student.findOne({schoolId: studentId});
        const course = await Course.findOne({courseTitle: courseTitle});

        if (!student) {
            return res.status(404).json({message: "Student not found" });
        }

        if (!course) {
            return res.status(404).json({message: "Course not found" });
        }

        // Add the course's _id to the student

        if (!student.listOfRegisteredCourses.includes(course._id)) {
            student.listOfRegisteredCourses.push(course._id); // Push the object id, not course title
            await student.save();
        } else {
            return res.status(400).json({message: "Student is already registered!"});
        }
        
        // Add the student's _id to the course's listOfRegisteredStudents

        if (!course.listOfRegisteredStudents.includes(student._id)) {
            course.listOfRegisteredStudents.push(student._id); // Push the object id, not the studentID.
            await course.save();
            res.status(200).json(course, student);
        } else {
            return res.status(400).json({message: "Student is already registered!"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const removeStudentFromCourse = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const courseTitle = req.params.courseTitle;

        const student = await Student.findOne({schoolId: studentId});
        const course = await Course.findOne({courseTitle: courseTitle});

        if (!student) {
            return res.status(404).json({message: "Student not found"});
        }
        if (!course) {
            return res.status(404).json({message: "Course not found" });
        }

        // Remove course from student
        if (!student.listOfRegisteredCourses.includes(course._id)) {
            return res.status(400).json({message: "Student is not registered for this course"});
        } else {
            console.log(student.listOfRegisteredCourses);
            console.log(course._id);
            student.listOfRegisteredCourses = student.listOfRegisteredCourses.filter(
                courseId => !courseId.equals(course._id)
            );
            console.log(student.listOfRegisteredCourses);
            await student.save();
        }

        // Remove student from course
        if (!course.listOfRegisteredStudents.includes(student._id)) {
            return res.status(400).json({message: "Student is not registered for this course"});
        } else {
            course.listOfRegisteredStudents = course.listOfRegisteredStudents.filter(
                studentId => !studentId.equals(student._id)
            );
            await course.save();
        }
        res.status(200).json(student);
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

module.exports = {
    registerStudentForCourse,
    removeStudentFromCourse
}