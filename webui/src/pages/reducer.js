import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import * as actionTypes from './actionTypes';
import schedulerReducer from './Scheduler/reducer';
import sequenceEditReducer from './SequenceEdit/reducer';
import sequenceListReducer from './SequenceList/reducer';
import stageEditReducer from './StageEdit/reducer';
import stageListReducer from './StageList/reducer';

const undoableFilter = action => action.undoable === true;

const sharedReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PAGE:
      const { pageTitle, pageClass } = action.payload;
      return { ...state, pageTitle, pageClass };

    default:
      return state;
  }
};

export default combineReducers({
  shared: sharedReducer,
  scheduler: schedulerReducer,
  sequenceList: sequenceListReducer,
  sequenceEdit: undoable(sequenceEditReducer, { filter: undoableFilter }),
  stageEdit: undoable(stageEditReducer, { filter: undoableFilter }),
  stageList: stageListReducer
});