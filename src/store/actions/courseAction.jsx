import {
  COURSE_FAIL,
  ADD_COURSE,
  CLEAR_ERRORS,
  UPDATE_COURSE,
  COURSE_CREATED,
  COURSE_DELETED,
  GET_ERRORS,
} from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import error actions
import { returnErrors } from "./errorActions";
import axios from "axios";

export const createCourse =
  ({ courseName }) =>
  async (dispatch) => {
    // Headers;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ courseName });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/course/create",
        body,
        config
      );
      const { data } = res.data;

      // If the request is successful, clear any previous errors
      dispatch({ type: CLEAR_ERRORS });

      // Dispatch ADD_COURSE and COURSE_CREATED actions as before
      dispatch({ type: ADD_COURSE, payload: [data] });
      dispatch({ type: COURSE_CREATED });
    } catch (err) {
      // If an error occurs, dispatch GET_ERRORS to set error information
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response?.data.error || err.message, // Use the error message from the API response, or the default error message
          status: err.response?.status,
          id: "COURSE__ERROR",
        },
      });

      // Dispatch COURSE_FAIL when an error occurs during course creation
      dispatch({ type: COURSE_FAIL });
    }
  };

// export const createCourse =
//   ({ courseName }) =>
//   async (dispatch) => {
//     // Headers;
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // Request body
//     const body = JSON.stringify({ courseName });

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/course/create",
//         body,
//         config
//       );
//       const { data } = res.data;

//       // If the request is successful, clear any previous errors
//       dispatch({ type: CLEAR_ERRORS });

//       // Dispatch ADD_COURSE and COURSE_CREATED actions as before
//       dispatch({ type: ADD_COURSE, payload: [data] });
//       dispatch({ type: COURSE_CREATED });
//     } catch (err) {
//       // If an error occurs, dispatch GET_ERRORS to set error information
//       const errorMessage =
//         err.response?.data.message || "An error occurred. Please try again.";
//       dispatch({
//         type: GET_ERRORS,
//         payload: {
//           // msg: err.message,
//           msg: errorMessage,
//           status: err.response?.status,
//           id: "COURSE__ERROR",
//         },
//       });

//       // You can also handle other actions or error-specific logic here
//       dispatch({ type: COURSE_FAIL });
//     }
//   };

// read courses
export const getCourses = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/course")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_COURSE, payload: res.data });
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

export const updateACourse =
  ({ courseName, slug, uid, customId }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ courseName, uid, slug, customId });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/course/${customId}`,
        body,
        config
      );

      // Check if the update was successful and dispatch the action
      if (response.status === 200) {
        dispatch({ type: UPDATE_COURSE });
      } else {
        dispatch(
          returnErrors("Update failed", response.status, "UPDATE_COURSE_ERROR")
        );
      }
    } catch (err) {
      // Handle any network or other errors
      console.error(err);
      dispatch(returnErrors("Update failed", 500, "UPDATE_COURSE_ERROR"));
    }
  };
//   delete a course
export const deleteCourse = (customId) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`http://localhost:5000/api/course/${customId}`, config)
    .then(() => {
      dispatch({
        type: COURSE_DELETED,
        payload: customId,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
