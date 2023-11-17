import {
  GET_ADMIN_DETAIL, UPDATE_ADMIN_DETAIL_SUCCESS,
  ADD_ROLE_DETAIL_SUCCESS, GET_ROLE_DETAIL_SUCCESS,GET_ROLE_LIST_FOR_ADMIN,
  GET_POLICIES_DETAIL_SUCCESS,GET_ADMIN_LIST_DETAIL_SUCCESS,DELETE_ADMIN_SUCCESS,
  GET_ADMIN_DETAIL_SUCCESS, DELETE_ROLE_PERMISSION_SUCCESS,GET_ROLE_DETAIL_BYID_SUCCESS,
  UPDATE_ROLE_DETAIL_SUCCESS, RESET_ROLE_SUCCESS
} from "../../Actions/ActionTypes/SettingTypes";

const iState = {
  userDetailList: {},
  updateAdminSuccessResult: {},
  addRoleSuccessResult: {},
  rolesDetailList: {},
  policiesDetailList:{},
  adminDetailList:{},adminDetailData:{},
  deleteAdminResult:{},
  deleteRolePermissionResult:{},
  updateRolePermissionResult:{},
  getRoleByIdSuccuessResult:{},
  getRoleListForAdmin:{}
};

export const settingReducer = (state = iState, action) => {
  
  switch (action.type) {
    case GET_ADMIN_DETAIL:
      return {
        ...state,
        userDetailList: action.payload
      }
    case UPDATE_ADMIN_DETAIL_SUCCESS:
      return {
        ...state,
        updateAdminSuccessResult: action.payload
      }
    case ADD_ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        addRoleSuccessResult: action.payload
      }
    case GET_ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        rolesDetailList: action.payload
      }
    case GET_POLICIES_DETAIL_SUCCESS:
      return {
        ...state,
        policiesDetailList: action.payload
      } 
    case GET_ADMIN_LIST_DETAIL_SUCCESS:
      return {
        ...state,
        adminDetailList: action.payload
      } 
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        deleteAdminResult: action.payload
      }  
    case GET_ADMIN_DETAIL_SUCCESS: 
      return {
        ...state,
        adminDetailData: action.payload
      } 
    case DELETE_ROLE_PERMISSION_SUCCESS: 
      return {
        ...state,
        deleteRolePermissionResult: action.payload
      }  
    case GET_ROLE_DETAIL_BYID_SUCCESS:
      return {
        ...state,
        getRoleByIdSuccuessResult: action.payload
      }
    case  UPDATE_ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        updateRolePermissionResult: action.payload
      }
    case GET_ROLE_LIST_FOR_ADMIN:
      return {
        ...state,
        getRoleListForAdmin: action.payload
      }
    case RESET_ROLE_SUCCESS:
      return {
        ...state,
        resetRoleSuccess: action.payload
      }
    default:
      return state;
  }
};


