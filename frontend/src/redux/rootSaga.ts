import { all, fork } from "redux-saga/effects";
import { userSaga } from "./user/saga";
import { templateSaga } from "./template/saga";

export default function* rootSaga() {
  try {
    yield all([fork(userSaga)]);
    yield all([fork(templateSaga)]);
  } catch (error: any) {
    throw new Error("Error in rootSaga");
  }
}
