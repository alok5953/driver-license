import { combineReducers } from 'redux';

import { loadingReducer } from './../LoadingReducer'
import { authReducer } from './../AuthReducer';
import {settingReducer} from './../SettingReducer';
import {securityQuestionReducer} from  './../SecurityQuestionReducer';
import {quizeReducer} from './../QuizeReducer/QuizeReducer';
import {courseModuleReducer} from './../CourseModuleReducer/CourseModuleReducer'
import {courseReducer} from './../CourseReducer/CourseReducer'
import  {addOnsReducer} from './../AddOnsReducer'
import {userAuthReducer} from './../UserAuthReducer';
import {userSettingRecucer} from './../UserSettingRecucer';
import { userModuleReducer } from '../UserModuleReducer';
import {grapesjsReducer} from '../GrapesjsReducer';
import {userCourseReducer} from '../UserCourseReducer';
import {tableofContentReducer} from '../UserTableofContentReducer';
import {userQuizQuestionRecucer } from '../UserQuizQuestionReducer';
import {userSecurityQuestionReducer} from '../UserSecurityQuestionReducer';
import {userSocketioReducer} from '../UserSocketioReducer';
import {commonReducer} from '../CommonReducer';
/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  authReducer,
  loadingReducer,
  settingReducer,
  securityQuestionReducer,
  quizeReducer,
  courseModuleReducer,
  courseReducer,
  addOnsReducer,
  userAuthReducer,
  userCourseReducer,
  userSettingRecucer,
  userModuleReducer,
  userQuizQuestionRecucer,
  userSecurityQuestionReducer,
  grapesjsReducer,
  tableofContentReducer,
  userSocketioReducer,
  commonReducer,
});
export default rootReducer;
