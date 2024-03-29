import { call, put, takeLatest } from "redux-saga/effects";
import {
  deleteButton,
  updateButton,
  updatetemplate,
  getTemplateByUserId,
} from "./slice";

import { getTemplateByUserIdAsync } from "../../utilities/services";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export function* watchGetTemplateByUser(
  action: any
): Generator<any, void, any> {
  try {
    const response: any = yield call(getTemplateByUserIdAsync, action.payload);
    console.log("response", response[0]);
    yield put(updatetemplate(response[0]));
  } catch (error: any) {
    return error;
  }
}

export function* templateSaga() {
  yield takeLatest(getTemplateByUserId, watchGetTemplateByUser);
}
