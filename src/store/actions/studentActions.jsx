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
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://schoolmgtapp-api.onrender.com";

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
        `${backendURL}/api/student/create`,
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

export const getStudents = () => (dispatch) => {
  axios
    .get(`${backendURL}/api/student`)
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
        `${backendURL}/api/student/${customId}`, // Use the correct endpoint
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

export const deleteStudent = (customId) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`${backendURL}/api/student/${customId}`, config)
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
