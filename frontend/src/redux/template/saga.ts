import { call, put, takeLatest } from "redux-saga/effects";
import { saveTemplate, getTemplateByUserId, setTemplate, getMobileNumbers, updateMobileNumbers } from "./slice";

import {
  getTemplateByUserIdAsync,
  savetemplateAsync,
  getUserMobileNumbersAsync,
} from "../../utilities/services";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export function* watchGetTemplateByUser(
  action: any
): Generator<any, void, any> {
  try {
    const response: any = yield call(getTemplateByUserIdAsync, action.payload);
    yield put(setTemplate(response));
  } catch (error: any) {
    return error;
  }
}

export function* watchSaveTemplate(action: any): Generator<any, void, any> {
  try {
    yield call(savetemplateAsync, action.payload);
  } catch (error: any) {
    return error;
  }
}
export function* watchGetUserMobiles(): Generator<any, void, any> {
  try {
    const data: any = yield call(getUserMobileNumbersAsync);
    console.log("data", data);
    yield put(updateMobileNumbers(data.allowedMobileNumbers));
  } catch (error: any) {
    return error;
  }
}

export function* templateSaga() {
  yield takeLatest(getTemplateByUserId, watchGetTemplateByUser);
  yield takeLatest(saveTemplate, watchSaveTemplate);
  yield takeLatest(getMobileNumbers, watchGetUserMobiles);

}
