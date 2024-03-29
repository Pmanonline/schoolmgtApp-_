import {
  CLASS_FAIL,
  CLEAR_ERRORS,
  // ADD_CLASS,
  ADD_COURSE,
  GET_CLASS,
  // CLASS_CREATED,
  COURSE_CREATED,
  CLASS_DELETED,
  UPDATE_CLASS,
  GET_ERRORS,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

// create a class
export const createClass =
  ({ className }) =>
  async (dispatch) => {
    // Headers;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ className });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/class/create",
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
      const errorMessage =
        err.response?.data.message || "An error occurred. Please try again.";
      dispatch({
        type: GET_ERRORS,
        payload: {
          // msg: err.message,
          msg: errorMessage,
          status: err.response?.status,
          id: "COURSE__ERROR",
        },
      });

      // You can also handle other actions or error-specific logic here
      dispatch({ type: CLASS_FAIL });
    }
  };

export const getClasses = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/class")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: GET_CLASS, payload: res.data });
    })

    .catch((err) => {
      if (err.response) {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "CLASS_ERROR"
          )
        );
      } else {
        // Handle the case where err.response is undefined
        console.log("An error occurred:", err);
      }
    });
};

// /* delete  a class */
export const deleteClass = (customId) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`http://localhost:5000/api/class/${customId}`, config)
    .then(() => {
      dispatch({
        type: CLASS_DELETED,
        payload: customId,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateAClass =
  ({ className, slug, uid, customId }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ className, uid, slug, customId });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/class/${customId}`,
        body,
        config
      );

      // Check if the update was successful and dispatch the action
      if (response.status === 200) {
        dispatch({ type: UPDATE_CLASS });
      } else {
        dispatch(
          returnErrors("Update failed", response.status, "UPDATE_CLASS_ERROR")
        );
      }
    } catch (err) {
      // Handle any network or other errors
      console.error(err);
      dispatch(returnErrors("Update failed", 500, "UPDATE_CLASS_ERROR"));
    }
  };
