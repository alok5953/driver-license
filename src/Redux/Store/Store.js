import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {parse, stringify} from 'flatted';
 //import browserHistory from 'history/createBrowserHistory';
import {persistStore, persistReducer,createTransform} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './../Reducers/RootReducer/RootReducer';
import { courseReducer } from '../Reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) =>parse(outboundState),
)
const persistConfig = {
  key: 'root',
  storage:storage,
  whitelist: ['courseReducer', 'courseModuleReducer','authReducer','quizeReducer','userAuthReducer',  'grapesjsReducer', 'tableofContentReducer', 'userCourseReducer','userModuleReducer', 'userSocketioReducer'], // which reducer want to store
  // blacklist: ['']  // which reducer do not want to store
  stateReconciler: autoMergeLevel2,
  transforms: [transformCircular]
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer (persistConfig, rootReducer);

const store = createStore (persistedReducer,applyMiddleware(thunk));
export const persistor = persistStore (store);
//export const history = browserHistory();
export default store;
 