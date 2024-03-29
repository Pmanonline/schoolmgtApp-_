import {
  ADD_CLASS,
  UPDATE_CLASS,
  GET_CLASS,
  CLASS_DELETED,
  CLASS_FAIL,
  CLASS_CREATED,
} from "../actions/types";

const initialState = {
  loading: true,
  classes: [],
  deleted: false,
  updated: false,
  created: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_CLASS:
      return {
        ...state,
        classes: [...state.classes, ...payload],
      };
    case CLASS_CREATED:
      return {
        ...state,
        created: true,
      };

    case GET_CLASS:
      return {
        ...state,
        classes: [...state.classes, ...payload],
      };

    case CLASS_FAIL:
      return {
        ...state,
        created: false,
        error: true,
      };
    case UPDATE_CLASS:
      return {
        ...state,
        updated: true,
      };
    case CLASS_DELETED:
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};
