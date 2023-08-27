const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const credentialSchema = new mongoose.Schema({
  type: {},
  rollNumber: {
    type: String,
    required: [true, "Roll number is required"],
  },
  class: {
    type: String,
    required: [true, "Class is required"],
  },
  section: {
    type: String,
    required: [true, "Section is mandatory"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

const studentSchema = new mongoose.Schema({
  personalAndAddressInfomation: {
    personalInformation: {
      type: {},
      name: {
        type: String,
        required: [true, "Student name is mandatory"],
      },
      dob: {
        type: String,
        required: [true, "Date of birth is mandatory"],
      },
      bloodGroup: {
        type: String,
        required: [true, "Blood group is mandatory"],
      },
    },
    addressInformation: {
      type: {},
      houseNumber: {
        type: String,
        required: [true, "House number is mandatory"],
      },
      locality: {
        type: String,
        required: [true, "Locality is mandatory"],
      },
      country: {
        type: String,
        required: [true, "Country is mandatory"],
      },
      state: {
        type: String,
        required: [true, "State is mandatory"],
      },
      city: {
        type: String,
        required: [true, "City is mandatory"],
      },
    },
  },
  credentials: { type: credentialSchema },
  parentsAndGuardiansInformation: {
    type: {},
    required: true,
    fatherInformation: {
      name: {
        type: String,
        required: [true, "Father's name is required"],
      },
      dob: {
        type: String,
        required: [true, "Father's date of birth is required"],
      },
      occupation: {
        type: String,
        required: [true, "Father's occupation is required"],
      },
      aadhaarNumber: {
        type: String,
        required: [true, "Father's Aadhaar number is required"],
      },
    },
    motherInformation: {
      name: {
        type: String,
        required: [true, "Mother's name is required"],
      },
      dob: {
        type: String,
        required: [true, "Mother's date of birth is required"],
      },
      occupation: {
        type: String,
        required: [true, "Mother's occupation is required"],
      },
      aadhaarNumber: {
        type: String,
        required: [true, "Mother's Aadhaar number is required"],
      },
    },
    guardianInformation: {
      name: {
        type: String,
        required: [true, "Guardian's name is required"],
      },
      dob: {
        type: String,
        required: [true, "Guardian's date of birth is required"],
      },
      occupation: {
        type: String,
        required: [true, "Guardian's occupation is required"],
      },
      relation: {
        type: String,
        required: [true, "Guardian's occupation is required"],
      },
      aadhaarNumber: {
        type: String,
        required: [true, "Guardian's Aadhaar number is required"],
      },
    },
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("credentials.password")) return next();
  this.credentials.password = await bcrypt.hash(this.credentials.password, 12);
  this.credentials.passwordConfirm = undefined;
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
