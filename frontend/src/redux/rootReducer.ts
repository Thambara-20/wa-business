import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import templateReducer from "./template/slice";

const rootReducer = combineReducers({
  user: userReducer,
  template: templateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
