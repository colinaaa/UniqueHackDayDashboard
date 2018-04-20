import { take, fork, cancel } from 'redux-saga/effects';

import { SagaMiddleware } from 'redux-saga';
import { Store } from 'redux';
import { RootState } from '../reducers';

import requestsSaga from '../sagas/requests';
import entryFlow from '../sagas/entry-flow';
import applyFlow from '../sagas/apply-flow';
import messageLoop from '../sagas/msg-loop';
import errorTip from './error-tip';
import infoChange from './infoChange';
import abortConfirmation from './abortConfirmation';

// for scaleable
const sagas = [
  entryFlow,
  applyFlow,
  requestsSaga,
  messageLoop,
  errorTip,
  infoChange,
  abortConfirmation,
];

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: any) {
  if (process.env.NODE_ENV === 'development') {
    return function*() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  } else {
    return saga;
  }
}

const SagaManager = {
  startSagas(sagaMiddleware: SagaMiddleware<{}>) {
    sagas.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },
  cancelSagas(store: Store<RootState>) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR,
    });
  },
};

export default SagaManager;
