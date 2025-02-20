const Student = require ("../models/student.model.js");
const Course = require ("../models/course.model.js");

const registerStudentForCourse = async (req, res) => {
    try{
        const studentId = req.params.studentId; // Get studentID from URL parameter
        const courseTitle = req.params.courseTitle; // Get courseID from URL parameter

        var studentSuccessfullyAddedToCourse = false;
        var courseSuccessfullyAddedToStudent = false;

        var willConflictFlag = false;

        let student;
        let course;

        try {
            student = await Student.findOne({schoolId: studentId});  // Return the mongoose object
            course = await Course.findOne({courseTitle: courseTitle}); // Return the mongoose object 
        } catch (err) {
            res.status(500).json({message: err})
        }

        if (!student) {
            return res.status(404).json({message: "Student not found! Operation Failed." });
        }

        if (!course) {
            return res.status(404).json({message: "Course not found! Operation Failed." });
        }
        willConflictFlag = await willConflict(student, course)
        if (willConflictFlag) {
            
            return res.status(400).json({message: "Schedule conflict. Operation failed." });
        }

        // Add the course's _id to the student

        if (!student.listOfRegisteredCourses.includes(course._id)) {
            student.listOfRegisteredCourses.push(course._id); // Push the object id, not course title
            await student.save();
            courseSuccessfullyAddedToStudent = true;
        } else {
            return res.status(400).json({message: "Student is already registered! Operation Failed."});
        }
        
        // Add the student's _id to the course's listOfRegisteredStudents

        if (!course.listOfRegisteredStudents.includes(student._id)) {
            course.listOfRegisteredStudents.push(student._id); // Push the object id, not the studentID.
            await course.save();
            studentSuccessfullyAddedToCourse = true;
            if (studentSuccessfullyAddedToCourse && courseSuccessfullyAddedToStudent) {
                res.status(200).json({message: "Student successfully added to course!"});
            }
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

        let student;
        let course;

        try {
            student = await Student.findOne({schoolId: studentId});
            course = await Course.findOne({courseTitle: courseTitle});
        } catch (err) {
            res.status(500).json({message: err})
        }

        var studentSuccessfullyRemovedFromCourse = false;
        var courseSuccessfullyRemovedFromStudent = false;

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
            student.listOfRegisteredCourses = student.listOfRegisteredCourses.filter(
                courseId => !courseId.equals(course._id)
            );
            await student.save();
            courseSuccessfullyRemovedFromStudent = true;
        }

        // Remove student from course
        if (!course.listOfRegisteredStudents.includes(student._id)) {
            return res.status(400).json({message: "Student is not registered for this course"});
        } else {
            course.listOfRegisteredStudents = course.listOfRegisteredStudents.filter(
                studentId => !studentId.equals(student._id)
            );
            await course.save();
            studentSuccessfullyRemovedFromCourse = true;
            if (courseSuccessfullyRemovedFromStudent && studentSuccessfullyRemovedFromCourse) {
                res.status(200).json({message: "Student successfully removed from course!"});
            }
        }   
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

async function willConflict(student, wouldBeCourse, res) {
    // Outer loop for would-be course sessions
    for (const wouldBeSession of wouldBeCourse.sessions) {
        let wouldBeCourseStartTimeMinutesSinceMidnight = timeToMinutesFromMidnight(wouldBeSession.startTime);
        let wouldBeCourseEndTimeMinutesSinceMidnight = wouldBeCourseStartTimeMinutesSinceMidnight + wouldBeSession.duration;

        // Loop through the student's courses
        for (const courseId of student.listOfRegisteredCourses) {
            try {
                let currentCourse = await Course.findOne({ _id: courseId });

                // Inner loop for current course sessions
                for (const currentSession of currentCourse.sessions) {
                    let currentCourseStartTimeMinutesSinceMidnight = timeToMinutesFromMidnight(currentSession.startTime);
                    let currentCourseEndTimeMinutesSinceMidnight = currentCourseStartTimeMinutesSinceMidnight + currentSession.duration;
                    
                    // CONDITION ONE -- classes start at the same time -- FAIL
                    if (
                        wouldBeCourseStartTimeMinutesSinceMidnight == currentCourseStartTimeMinutesSinceMidnight
                    ) {
                        return true;
                    // CONDITION TWO -- would be class starts first, but runs into current class -- FAIL
                    } else if (
                        wouldBeCourseStartTimeMinutesSinceMidnight < currentCourseStartTimeMinutesSinceMidnight && wouldBeCourseEndTimeMinutesSinceMidnight > currentCourseStartTimeMinutesSinceMidnight
                    ) {
                        return true;
    
                    // CONDITION THREE -- current class starts first, but runs into start of would be class -- FAIL
                    } else if (
                        wouldBeCourseStartTimeMinutesSinceMidnight > currentCourseStartTimeMinutesSinceMidnight && wouldBeCourseStartTimeMinutesSinceMidnight < currentCourseEndTimeMinutesSinceMidnight
                    ) {
                        return true;
                    }
                }

            } catch (err) {
                console.error("Error fetching course:", err);
            }
        }
    }
    return false;
}

function timeToMinutesFromMidnight(time) {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    return hours * 60 + minutes;
}
module.exports = {
    registerStudentForCourse,
    removeStudentFromCourse
}