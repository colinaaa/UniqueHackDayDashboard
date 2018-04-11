import { takeLatest, put, call, select } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import * as TYPE from '../actions';
import * as req from '../../lib/requests';

import { RootState } from '../reducers/index';

export default function*() {
  // load user infomation
  yield takeLatest(TYPE.LOAD_USER_INFO._, function*() {
    yield put({ type: TYPE.LOAD_USER_INFO.START });
    const [userInfo] = yield call(req.getUserInfo);
    if (userInfo) {
      yield put({ type: TYPE.LOAD_USER_INFO.OK, payload: userInfo });
      return;
    }
    yield put({ type: TYPE.LOAD_USER_INFO.FAIL });
  });

  // submit login form
  type LoginReturnType = [string, undefined] | [null, string];
  yield takeLatest(TYPE.LOGIN_FORM_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.LOGIN_FORM_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.loginForm);
    const [token, message]: LoginReturnType = yield call(
      req.login,
      data.username.value,
      data.password.value,
      action.payload, // antiRobotToken
    );
    if (token) {
      if (data.autoLogin.value) {
        localStorage.setItem('token', token);
      }
      yield put({ type: TYPE.LOGIN_FORM_SUBMIT.OK, payload: token });
      return;
    }
    yield put({ type: TYPE.LOGIN_FORM_SUBMIT.FAIL, payload: message });
  });

  // submit register form
  type RegReturnType = [string, undefined] | [null, string];
  yield takeLatest(TYPE.REGISTER_FORM_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.REGISTER_FORM_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.registerForm);
    const [token, message]: RegReturnType = yield call(
      req.register,
      data.username.value,
      data.password.value,
      data.phone.value,
      data.code.value,
      action.payload, // antiRobotToken
    );
    if (token) {
      yield put({ type: TYPE.REGISTER_FORM_SUBMIT.OK, payload: token });
      return;
    }
    yield put({ type: TYPE.REGISTER_FORM_SUBMIT.FAIL, payload: message });
  });

  yield takeLatest(TYPE.RESET_PWD_SEND_SMS_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.resetPwdForm);
    const [ok, message] = yield call(
      req.resetPwdSendSMS,
      data.phone.value,
      action.payload, // antiRobotToken
    );
    if (ok) {
      yield put({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.OK });
      return;
    }
    yield put({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.FAIL, payload: message });
  });

  yield takeLatest(TYPE.REGISITER_SEND_SMS_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.registerForm);
    const [ok, message] = yield call(
      req.registerSendSMS,
      data.phone.value,
      action.payload, // antiRobotToken
    );
    if (ok) {
      yield put({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.OK });
      return;
    }
    yield put({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.FAIL, payload: message });
  });

  yield takeLatest(TYPE.RESET_PWD_FORM_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.RESET_PWD_FORM_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.resetPwdForm);
    const [ok, message] = yield call(
      req.resetPwdRequest,
      data.phone.value,
      data.code.value,
      data.password.value,
      action.payload, // antiRobotToken
    );
    if (ok) {
      yield put({ type: TYPE.RESET_PWD_FORM_SUBMIT.OK });
      return;
    }
    yield put({ type: TYPE.RESET_PWD_FORM_SUBMIT.FAIL, payload: message });
  });

  yield takeLatest(TYPE.DETAIL_FORM_SUBMIT._, function*() {
    yield put({ type: TYPE.DETAIL_FORM_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.detailForm);
    const [ok, message] = yield call(req.submitDetail, data);
    if (ok) {
      yield put({ type: TYPE.DETAIL_FORM_SUBMIT.OK });
      return;
    }
    yield put({ type: TYPE.DETAIL_FORM_SUBMIT.FAIL, payload: message });
  });

  yield takeLatest(TYPE.JOIN_TEAM_FORM_SUBMIT._, function*() {
    yield put({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.START });
    const { data } = yield select((state: RootState) => state.teamForm);
    const [ok, message] = yield call(req.createTeam, data.teamName.value);
    if (ok) {
      yield put({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.OK });
      return;
    }
    yield put({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.FAIL, payload: message });
  });

  yield takeLatest(TYPE.NEW_TEAM_FORM_SUBMIT._, function*() {
    yield put({ type: TYPE.NEW_TEAM_FORM_SUBMIT.START });
    const [{ data }, username] = yield select((state: RootState) => [
      state.teamForm,
      state.user.username,
    ]);
    const [ok, message] = yield call(
      req.joinTeam,
      data.teamLeaderName.value,
      data.teamLeaderPhone.value,
      username,
    );
    if (ok) {
      yield put({ type: TYPE.NEW_TEAM_FORM_SUBMIT.OK });
      return;
    }
    yield put({ type: TYPE.NEW_TEAM_FORM_SUBMIT.FAIL, payload: message });
  });
}
