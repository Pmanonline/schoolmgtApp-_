import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleWare = applyMiddleware(thunk); // Apply thunk middleware directly
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(middleWare) // Pass middleware directly without spread operator
);

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
// // import thunk from "redux-thunk";

// // const middleware = [...getDefaultMiddleware(), thunk];

// const store = configureStore({
//   reducer: rootReducer,
//   // middleware,
//   // devTools: process.env.NODE_ENV !== "production",
// });

// export default store;
