import { all, fork } from "redux-saga/effects";
import { userSaga } from "./user/saga";

export default function* rootSaga() {
  try {
    yield all([fork(userSaga)]);
    yield all([fork(userSaga)]);
  } catch (error: any) {
    throw new Error("Error in rootSaga");
  }
}