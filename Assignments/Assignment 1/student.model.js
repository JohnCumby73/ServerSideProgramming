const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema ({
    schoolId: {
        type: String,
        required: [true, "Please enter the school id."]
    },
    firstName: {
        type: String,
        required: [true, "Please enter the first name."]
    },
    lastName: {
        type: String,
        required: [true, "Please enter the last name."]
    },
    dob: {
        type: String,
        required: [true, "Please enter the date [DD/MM/YYYY]"]
    },
    addressUnit: {
        type: String,
        required: [true, "Please enter the address unit."]
    },
    addressCity: {
        type: String,
        required: [true, "Please enter the address street."]
    },
    addressStateProv: {
        type: String,
        required: [true, "Please enter the State/Prov."]
    },
    addressCountry: {
        type: String,
        required: [true, "Please enter the address country."]
    },
    addressPostCode: {
        type: String,
        required: [true, "Please enter the address postal code."]
    },
    phone: {
        type: String,
        required: [true, "Please enter the phone [(XXX) XXX XXXX"]
    },
    email: {
        type: String,
        required: [true, "Please enter the email."]
    },
    emergContactName: {
        type: String,
        required: [true, "Please enter the emergency contact name."]
    },
    emergContactPhone: {
        type: String,
        required: [true, "Please enter the emergency contact phone."]
    },
    emergContactRel: {
        type: String,
        required: [true, "Please enter the emergency contact relationship."]
    },
    program: {
        type: String,
        required: [true, "Please enter the program."]
    }
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;