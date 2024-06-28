// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./add.css";
// import toast from "react-hot-toast";

// const Add = () => {
//   const students = {
//     fname: "",
//     lname: "",
//     _id: "",
//     course: "",
//     fees: "",
//     courseStart: "",
//     courseEnd: "",
//   };

//   const [student, setStudent] = useState(students);
//   const [errors, setErrors] = useState({});
//   const [formErrorMessage, setFormErrorMessage] = useState("");

//   // const validateForm = () => {
//   //   let formIsValid = true;
//   //   const nameValidator = /^[a-zA-Z\s]*$/;
//   //   const idValidator = /^[a-zA-Z0-9]*$/;
//   //   const feesValidator = /^[0-9]*$/;

//   //   const newErrors = {};

//   //   if (!student.fname.trim()) {
//   //     formIsValid = false;
//   //     newErrors.fname = "First name is required";
//   //   } else if (!nameValidator.test(student.fname.trim())) {
//   //     formIsValid = false;
//   //     newErrors.fname = "First name can only contain letters and spaces";
//   //   }
//   //   if (!student.lname.trim()) {
//   //     formIsValid = false;
//   //     newErrors.lname = "Last name is required";
//   //   } else if (!nameValidator.test(student.lname.trim())) {
//   //     formIsValid = false;
//   //     newErrors.lname = "Last name can only contain letters and spaces";
//   //   }

//   //   if (!student.fees.trim()) {
//   //     formIsValid = false;
//   //     newErrors.fees = "Fees is required";
//   //   } else if (parseInt(student.fees) < 0) {
//   //     formIsValid = false;
//   //     newErrors.fees = "Fees cannot be negative";
//   //   } else if (!feesValidator.test(student.fees.trim())) {
//   //     formIsValid = false;
//   //     newErrors.fees = "Fees can only be numbers";
//   //   }
//   //   if (!student._id.trim()) {
//   //     formIsValid = false;
//   //     newErrors._id = "ID is required";
//   //   } else if (!idValidator.test(student._id.trim())) {
//   //     formIsValid = false;
//   //     newErrors._id = "ID can only contain letters and numbers";
//   //   }

//   //   if (!student.course) {
//   //     formIsValid = false;
//   //     newErrors.course = "Please select any course";
//   //   }
//   //   if (!student.courseStart) {
//   //     formIsValid = false;
//   //     newErrors.courseStart = "Select any date";
//   //   }
//   //   if (!student.courseEnd) {
//   //     formIsValid = false;
//   //     newErrors.courseEnd = "Select any date";
//   //   } else if (new Date(student.courseEnd) <= new Date(student.courseStart)) {
//   //     formIsValid = false;
//   //     newErrors.courseEnd = "Course end date must be after course start date";
//   //   }

//   //   setErrors(newErrors);
//   //   if (!formIsValid) {
//   //     setFormErrorMessage("All fields are required.");
//   //   } else {
//   //     setFormErrorMessage("");
//   //   }

//   //   return formIsValid;
//   // };
//   // Function to validate individual field
//   const validateField = (fieldName, value) => {
//     let formIsValid = true;
//     const newErrors = { ...errors };

//     const nameValidator = /^[a-zA-Z\s]*$/;
//     const feesValidator = /^[0-9]*$/;
//     const idValidator = /^[a-zA-Z0-9]*$/;

//     let errorMessage;

//     switch (fieldName) {
//       case "fname":
//       case "lname":
//         if (!value.trim()) {
//           errorMessage = `${
//             fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//           } is required`;
//         } else if (!nameValidator.test(value.trim())) {
//           errorMessage = `${
//             fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//           } can only contain letters and spaces`;
//         }
//         break;
//       case "fees":
//         if (!value.trim()) {
//           errorMessage = "Fees is required";
//         } else if (parseInt(value) < 0) {
//           errorMessage = "Fees cannot be negative";
//         } else if (!feesValidator.test(value.trim())) {
//           errorMessage = "Fees can only be numbers";
//         }
//         break;
//       case "_id":
//         if (!value.trim()) {
//           errorMessage = "ID is required";
//         } else if (!idValidator.test(value.trim())) {
//           errorMessage = "ID can only contain letters and numbers";
//         }
//         break;
//       case "course":
//         if (!value) {
//           errorMessage = "Please select any course";
//         }
//         break;
//       case "courseStart":
//         if (!value) {
//           errorMessage = "Select any date";
//         }
//         break;

//       case "courseEnd":
//         if (!value) {
//           errorMessage = "Select any date";
//         } else if (new Date(value) <= new Date(student.courseStart)) {
//           errorMessage = "Course end date must be after course start date";
//         }
//         break;
//       default:
//         break;
//     }

//     if (errorMessage) {
//       formIsValid = false;
//       newErrors[fieldName] = errorMessage;
//     } else {
//       delete newErrors[fieldName];
//     }

//     setErrors(newErrors);
//     if (!formIsValid) {
//       setFormErrorMessage("All fields are required.");
//     } else {
//       setFormErrorMessage("");
//     }

//     return formIsValid;
//   };

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setStudent({ ...student, [name]: value });
//     // validateForm();
//     validateField(name, value);
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();

//     if (validateField()) {
//       try {
//         const response = await axios.post(
//           "http://localhost:8000/api/create",
//           student
//         );
//         if (response && response.data) {
//           toast.success(response.data.msg, { position: "top-right" });
//         } else {
//           toast.error("Error adding student. Please try again.", {
//             position: "top-right",
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         if (error.response && error.response.data.msg) {
//           toast.error(error.response.data.msg, { position: "top-center" });
//         } else {
//           toast.error("Please Enter Valid Entry", { position: "top-right" });
//         }
//       }
//     }
//   };

//   return (
//     <div className="addstudent">
//       <h3>Student Enrollment Form</h3>
//       {formErrorMessage && <div className="error">{formErrorMessage}</div>}

//       <form
//         className="addstudentForm"
//         id="add-student-form"
//         onSubmit={submitForm}
//       >
//         <div className="inputGroup">
//           <label htmlFor="fname">First name</label>
//           <input
//             type="text"
//             onChange={inputHandler}
//             id="fname"
//             name="fname"
//             autoComplete="off"
//             placeholder="First name"
//           />
//         </div>
//         {errors.fname && <div className="error">{errors.fname}</div>}

//         <div className="inputGroup">
//           <label htmlFor="lname">Last name</label>
//           <input
//             type="text"
//             onChange={inputHandler}
//             id="lname"
//             name="lname"
//             autoComplete="off"
//             placeholder="Last name"
//           />
//         </div>
//         {errors.lname && <div className="error">{errors.lname}</div>}

//         <div className="inputGroup">
//           <label htmlFor="course">course</label>
//           <input
//             type="text"
//             onChange={inputHandler}
//             id="course"
//             name="course"
//             autoComplete="off"
//             placeholder="Course"
//           />
//         </div>
//         {errors.course && <div className="error">{errors.course}</div>}

//         <div className="inputGroup">
//           <label htmlFor="_id">Student ID</label>
//           <input
//             type="_id"
//             onChange={inputHandler}
//             id="_id"
//             name="_id"
//             autoComplete="off"
//             placeholder="Student ID"
//           />
//         </div>
//         {errors._id && <div className="error">{errors._id}</div>}

//         <div className="inputGroup">
//           <label htmlFor="fees">Fees</label>
//           <input
//             type="fees"
//             onChange={inputHandler}
//             id="fees"
//             name="fees"
//             autoComplete="off"
//             placeholder="Fees"
//           />
//         </div>
//         {errors.fees && <div className="error">{errors.fees}</div>}

//         <div className="inputGroup">
//           <label htmlFor="courseStart">Course Start</label>
//           <input
//             type="date"
//             onChange={inputHandler}
//             id="courseStart"
//             name="courseStart"
//             autoComplete="off"
//             placeholder="courseStart"
//           />
//         </div>
//         {errors.courseStart && (
//           <div className="error">{errors.courseStart}</div>
//         )}

//         <div className="inputGroup">
//           <label htmlFor="courseEnd">Course End</label>
//           <input
//             type="date"
//             onChange={inputHandler}
//             id="courseEnd"
//             name="courseEnd"
//             autoComplete="off"
//             placeholder="courseEnd"
//           />
//         </div>
//         {errors.courseEnd && <div className="error">{errors.courseEnd}</div>}

//         <div className="inputGroup">
//           <button type="submit">ADD STUDENT</button>
//         </div>
//         <br />
//         <Link className="button" id="btn" to={"/add"}>
//           Student List
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Add;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./add.css";
import toast from "react-hot-toast";

const Add = () => {
  const [student, setStudent] = useState({
    fname: "",
    lname: "",
    _id: "",
    course: "",
    fees: "",
    courseStart: "",
    courseEnd: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    const nameValidator = /^[a-zA-Z\s]*$/;
    const feesValidator = /^[0-9]*$/;

    switch (fieldName) {
      //     const idValidator = /^[a-zA-Z0-9]*$/;

      case "fname":
      case "lname":
        if (!value.trim()) {
          errorMessage = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
        } else if (!nameValidator.test(value.trim())) {
          errorMessage = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } can only contain letters and spaces`;
        }
        break;
      case "fees":
        if (!value.trim()) {
          errorMessage = "Fees is required";
        } else if (parseInt(value) < 0) {
          errorMessage = "Fees cannot be negative";
        } else if (!feesValidator.test(value.trim())) {
          errorMessage = "Fees can only be numbers";
        }
        break;
      case "_id":
        if (!value.trim()) {
          errorMessage = "ID is required";
        }
        break;
      case "course":
        if (!value.trim()) {
          errorMessage = "Please select any course";
        } else if (!nameValidator.test(value.trim())) {
          errorMessage = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } can only contain letters and spaces`;
        }
        break;
      case "courseStart":
        if (!value) {
          errorMessage = "Course start date is required";
        }
        break;
      case "courseEnd":
        if (!value) {
          errorMessage = "Course end date is required";
        } else if (new Date(value) <= new Date(student.courseStart)) {
          errorMessage = "Course end date must be after course start date";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    for (const fieldName in student) {
      const errorMessage = validateField(fieldName, student[fieldName]);
      if (errorMessage) {
        formIsValid = false;
        newErrors[fieldName] = errorMessage;
      }
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/create",
          student
        );
        if (response && response.data) {
          toast.success(response.data.msg, { position: "top-right" });
          // window.location.reload(false);
        } else {
          toast.error("Error adding student. Please try again.", {
            position: "top-right",
          });
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data.msg) {
          toast.error(error.response.data.msg, { position: "top-center" });
        } else {
          toast.error("Please enter valid entry", { position: "top-right" });
        }
      }
    }
  };

  return (
    <div className="addstudent">
      <h3>Student Enrollment Form</h3>

      <form
        className="addstudentForm"
        id="add-student-form"
        onSubmit={submitForm}
      >
        <div className={`inputGroup ${errors.fname ? "error" : ""}`}>
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
          />
          {errors.fname && <div className="errorMessage">{errors.fname}</div>}
        </div>

        <div className={`inputGroup ${errors.lname ? "error" : ""}`}>
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
          />
          {errors.lname && <div className="errorMessage">{errors.lname}</div>}
        </div>

        <div className={`inputGroup ${errors.course ? "error" : ""}`}>
          <label htmlFor="course">Course</label>
          <input
            type="text"
            onChange={inputHandler}
            id="course"
            name="course"
            autoComplete="off"
            placeholder="Course"
          />
          {errors.course && <div className="errorMessage">{errors.course}</div>}
        </div>

        <div className={`inputGroup ${errors._id ? "error" : ""}`}>
          <label htmlFor="_id">Student ID</label>
          <input
            type="_id"
            onChange={inputHandler}
            id="_id"
            name="_id"
            autoComplete="off"
            placeholder="Student ID"
          />
          {errors._id && <div className="errorMessage">{errors._id}</div>}
        </div>

        <div className={`inputGroup ${errors.fees ? "error" : ""}`}>
          <label htmlFor="fees">Fees</label>
          <input
            type="fees"
            onChange={inputHandler}
            id="fees"
            name="fees"
            autoComplete="off"
            placeholder="Fees"
          />
          {errors.fees && <div className="errorMessage">{errors.fees}</div>}
        </div>

        <div className={`inputGroup ${errors.courseStart ? "error" : ""}`}>
          <label htmlFor="courseStart">Course Start</label>
          <input
            type="date"
            onChange={inputHandler}
            id="courseStart"
            name="courseStart"
            autoComplete="off"
            placeholder="courseStart"
          />
          {errors.courseStart && (
            <div className="errorMessage">{errors.courseStart}</div>
          )}
        </div>

        <div className={`inputGroup ${errors.courseEnd ? "error" : ""}`}>
          <label htmlFor="courseEnd">Course End</label>
          <input
            type="date"
            onChange={inputHandler}
            id="courseEnd"
            name="courseEnd"
            autoComplete="off"
            placeholder="courseEnd"
          />
          {errors.courseEnd && (
            <div className="errorMessage">{errors.courseEnd}</div>
          )}
        </div>

        <div className="inputGroup">
          <button type="submit">ADD STUDENT</button>
        </div>
        <br />
        <Link className="button" id="btn" to={"/add"}>
          Student List
        </Link>
      </form>
    </div>
  );
};

export default Add;
