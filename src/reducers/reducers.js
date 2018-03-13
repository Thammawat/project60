import {combineReducers} from 'redux';

import RoadData from './roadData/roadDataReducer.js';
import UserData from './userData/userDataReducer.js';

export default combineReducers({
  RoadData,
  UserData
});
