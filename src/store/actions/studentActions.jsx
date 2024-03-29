import { returnErrors } from "./errorActions";
import axios from "axios";
import {
  CLEAR_ERRORS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  STUDENT_CREATED,
  GET_ERRORS,
} from "./types";

//create students
// export const createStudent =
//   ({ name, age, courses, className }) =>
//   async (dispatch) => {
//     // Headers
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     // Request body
//     const body = JSON.stringify({ name, age, courses, className });

//     await axios
//       .post("http://localhost:500/api/student/create", body, config)
//       .then((res) => {
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: ADD_STUDENT, payload: [data] });
//         dispatch({ type: STUDENT_CREATED });
//       })
//       .catch((err) => {
//         dispatch(returnErrors(err, "STUDENT__ERROR"));
//       });
//   };

//create students
// export const createStudent =
//   ({ studentName, studentAge, studentCourse, studentClass }) =>
//   async (dispatch) => {
//     // Headers
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     // Request body
//     const body = JSON.stringify({
//       studentName,
//       studentAge,
//       studentCourse,
//       studentClass,
//     });

//     await axios
//       .post("http://localhost:5000/api/student/create", body, config) // Fix the URL here
//       .then((res) => {
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: ADD_STUDENT, payload: [data] });
//         dispatch({ type: STUDENT_CREATED });
//       })
//       .catch((err) => {
//         dispatch(returnErrors(err, "STUDENT__ERROR"));
//       });
//   };

// export const createStudent =
//   ({ studentName, studentAge, studentCourse, studentClass }) =>
//   async (dispatch) => {
//     // Headers;
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // Request body
//     const body = JSON.stringify({
//       studentName,
//       studentAge,
//       studentCourse,
//       studentClass,
//     });

//     await axios
//       .post("http://localhost:5000/api/student/create", body, config)
//       .then((res) => {
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: ADD_STUDENT, payload: [data] });
//         dispatch({ type: STUDENT_CREATED });
//       })
//       .catch((err) => {
//         dispatch(
//           returnErrors(
//             err.response.data.msg,
//             err.response.status,
//             "STUDENT__ERROR"
//           )
//         );
//       });
//   };

export const createStudent =
  ({ studentName, studentAge, studentCourse, studentClass }) =>
  async (dispatch) => {
    // Headers;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
      studentName,
      studentAge,
      studentCourse,
      studentClass,
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/create",
        body,
        config
      );
      const { data } = res.data;

      // If the request is successful, clear any previous errors
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_STUDENT, payload: [data] });
      dispatch({ type: STUDENT_CREATED });
    } catch (err) {
      // If an error occurs, dispatch GET_ERRORS to set error information
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response?.data.error || err.message, // Use the error message from the API response, or the default error message
          status: err.response?.status,
          id: "STUDENT__ERROR",
        },
      });
    }
  };

//get students
// export const getStudents = () => (dispatch) => {
//   axios
//     .get("http://localhost:5000/api/student")
//     .then((res) => {
//       dispatch({ type: CLEAR_ERRORS });
//       dispatch({ type: ADD_STUDENT, payload: res.data });
//     })
//     .catch((err) =>
//       // dispatch(returnErrors(err.response.data.msg, err.response.status))
//       dispatch(returnErrors(err))
//     );
// };
export const getStudents = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/student")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_STUDENT, payload: res.data });
    })

    .catch((err) => {
      if (err.response) {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "COURSE__ERROR"
          )
        );
      } else {
        // Handle the case where err.response is undefined
        console.log("An error occurred:", err);
      }
    });
};

// //update a student
// export const updateStudent =
//   ({ name, age, className, courses, slug, uid }) =>
//   async (dispatch) => {
//     // Request body
//     const body = JSON.stringify({ name, age, courses, className, slug, uid });

//     // Headers
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     await axios
//       .put("http://localhost:5000/api/student", body, config)
//       .then(() => dispatch({ type: UPDATE_STUDENT }))
//       .catch((err) => {
//         dispatch(
//           returnErrors(
//             err.response.data.msg,
//             err.response.status,
//             "UPDATE_STUDENT_ERROR"
//           )
//         );
//       });
//   };

// export const updateStudent =
//   ({
//     studentName,
//     studentAge,
//     studentCourse,
//     studentClass,
//     slug,
//     uid,
//     customId,
//   }) =>
//   async (dispatch) => {
//     // Request body
//     const body = JSON.stringify({
//       studentName,
//       studentAge,
//       studentCourse,
//       studentClass,
//       slug,
//       uid,
//       customId,
//     });

//     // Headers
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/student/${customId}`,
//         body,
//         config
//       );

//       // Check if the update was successful and dispatch the action
//       if (response.status === 200) {
//         dispatch({ type: UPDATE_STUDENT });
//       } else {
//         dispatch(
//           returnErrors("Update failed", response.status, "UPDATE_STUDENT_ERROR")
//         );
//       }
//     } catch (err) {
//       // If an error occurs, dispatch GET_ERRORS to set error information
//       const errorMessage =
//         err.response?.data.message || "An error occurred. Please try again.";
//       dispatch({
//         type: GET_ERRORS,
//         payload: {
//           msg: errorMessage,
//           status: err.response?.status,
//           id: "STUDENT_ERROR",
//         },
//       });

//       // Handle any network or other errors
//       console.error(err);
//       dispatch(returnErrors("Update failed", 500, "UPDATE_CLASS_ERROR"));
//     }
//   };
export const updateStudent =
  ({
    studentName,
    studentAge,
    studentCourse,
    studentClass,
    slug, // If needed for generating the customId on the client-side
    uid, // If needed for updating a specific student
    customId, // The custom identifier for updating a specific student
  }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({
      studentName,
      studentAge,
      studentCourse,
      studentClass,
      slug,
      uid,
      customId,
    });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/student/${customId}`, // Use the correct endpoint
        body,
        config
      );

      // Check if the update was successful and dispatch the action
      if (response.status === 200) {
        dispatch({ type: UPDATE_STUDENT });
      } else {
        dispatch(
          returnErrors("Update failed", response.status, "UPDATE_STUDENT_ERROR")
        );
      }
    } catch (err) {
      // If an error occurs, dispatch GET_ERRORS to set error information
      const errorMessage =
        err.response?.data.message || "An error occurred. Please try again.";
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: errorMessage,
          status: err.response?.status,
          id: "STUDENT__ERROR",
        },
      });
    }
  };

// //delete student
// export const deleteStudent = (uid) => async (dispatch) => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   await axios
//     .delete(`http://localhost:5000/api/student/${uid}`, config)
//     .then(() => {
//       dispatch({
//         type: DELETE_STUDENT,
//         payload: uid,
//       });
//     })
//     .catch((err) =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
// /* delete  a class */
export const deleteStudent = (customId) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`http://localhost:5000/api/student/${customId}`, config)
    .then(() => {
      dispatch({
        type: DELETE_STUDENT,
        payload: customId,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
