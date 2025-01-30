const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema ({
    schoolId: {
        type:String,
        required: [true, "Please enter the schoolId"]
    },
    
})