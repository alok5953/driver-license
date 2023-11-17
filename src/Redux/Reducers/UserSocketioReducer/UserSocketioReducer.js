import {
  SOCKET_EMIT_START_STOP_MODULE_SUCCESS, SOCKET_ERROR, SOCKET_TIMER_SUCCESS,
  SOCKET_OPEN_CLOSE_SUCCESS, SOCKET_CLOSE_RESPONSE_SUCCESS, 
  SOCKET_TIMER_UP, SOCKET_NON_INTERACTIVE_START, MARK_COURSE_MODULE_COMPLETE, SOCKET_CONNECT_SUCCESS
  } from '../../Actions/ActionTypes/UserSocketioServiceType'
  
  const iState = {
    socketConnectSuccess:{},
    socketOpenCloseResponse: {},
    socketCloseResponse: {},
    socketEmitStartModuleSuccessResponse: {},
    socketTimerSuccessResponse: {},
    socketTimerUpResponse: {},
    socketError: {},
    socketNonInteractiveStartSuccess: {},
  };
  
  export const userSocketioReducer = (state = iState, action) => {
    switch (action.type) {
      case SOCKET_OPEN_CLOSE_SUCCESS:
        return {
          ...state,
          socketOpenCloseResponse: action.payload
        }
      case SOCKET_CLOSE_RESPONSE_SUCCESS:
        return {
          ...state,
          socketCloseResponse: action.payload
        }
    case SOCKET_EMIT_START_STOP_MODULE_SUCCESS:
        return {
            ...state,
            socketEmitStartModuleSuccessResponse: action.payload
        }
    case SOCKET_TIMER_SUCCESS:
      return {
          ...state,
          socketTimerSuccessResponse: action.payload
      }
    case SOCKET_TIMER_UP:
      return {
          ...state,
          socketTimerUpResponse: action.payload
      }
    case SOCKET_ERROR:
      return {
          ...state,
          socketError: action.payload
      }
    case SOCKET_NON_INTERACTIVE_START:
      return {
          ...state,
          socketNonInteractiveStartSuccess: action.payload
      }
    case MARK_COURSE_MODULE_COMPLETE:
      return {
          ...state,
          markCourseModuleComlete: action.payload
      }
    case SOCKET_CONNECT_SUCCESS:
      return {
          ...state,
          socketConnectSuccess: action.payload
      }
      default:
        return state;
    }
  };
  
  