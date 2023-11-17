


import { loadingAction } from "./../LoadingAction";
import { SettingService } from '../../../Services/SettingService';
import { GET_ADMIN_DETAIL, UPDATE_ADMIN_DETAIL_SUCCESS, 
  ADD_ROLE_DETAIL_SUCCESS, GET_ROLE_DETAIL_SUCCESS,GET_POLICIES_DETAIL_SUCCESS,
  GET_ADMIN_LIST_DETAIL_SUCCESS,DELETE_ADMIN_SUCCESS,
  GET_ADMIN_DETAIL_SUCCESS, DELETE_ROLE_PERMISSION_SUCCESS,GET_ROLE_DETAIL_BYID_SUCCESS,
  UPDATE_ROLE_DETAIL_SUCCESS,GET_ROLE_LIST_FOR_ADMIN, RESET_ADMIN_USER_SUCCESS, RESET_ROLE_SUCCESS,RESEND_VERIFICATION_SUCCESS } from '../ActionTypes/SettingTypes'
 

export const getUserDetailAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true));
     return SettingService.getUserDetailByToken()
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: GET_ADMIN_DETAIL, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const updateAdminDetailAction = (adminId,userAdminDetail) => {
  return (dispatch) => {
    dispatch(loadingAction(true)); 
    return SettingService.updateAdminSection(adminId,userAdminDetail)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: UPDATE_ADMIN_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const addRoleDetailAction = (addRoleDetail) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return  SettingService.addRole(addRoleDetail)
      .then(response => {
        dispatch(loadingAction(false));
        
        dispatch({ type: ADD_ROLE_DETAIL_SUCCESS, payload: response });
        dispatch(getAllRoleAction())
       return dispatch({ type: ADD_ROLE_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

// get All role service
export const getAllRoleAction = () => {
  return (dispatch) => {

      dispatch(loadingAction(true));
     return SettingService.getAllRoleList()
      .then (response => {
        dispatch (loadingAction (false));
      return  dispatch ({type: GET_ROLE_DETAIL_SUCCESS, payload: response   });
        
      })
      .catch (err => {
        dispatch (loadingAction (false));
        
        throw err;
      });
  };
};

// get all policies
export const getAllPolicies = () => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.getAllPolicies()
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: GET_POLICIES_DETAIL_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};
// get all admin list
export const getAllAdminList = () => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.getAllAdminList()
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: GET_ADMIN_LIST_DETAIL_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

// delete admin by id
export const deleteAdminAction = (id) => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.deleteAdminById(id)
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: DELETE_ADMIN_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};


// delete role by id
export const deleteRolePermissionAction = (id) => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.deleteRolePermission(id)
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: DELETE_ROLE_PERMISSION_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

// get  role detail By id
export const getRoleDetailByIdAction = (id) => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.getRoleDetailById(id)
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: GET_ROLE_DETAIL_BYID_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

// update role action
export const updateRoleDetailAction = (roleId,updateRoleDetail) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return  SettingService.updateRole(roleId,updateRoleDetail)
      .then(response => {
        dispatch(loadingAction(false));
        dispatch(getAllRoleAction())
       return dispatch({ type: UPDATE_ROLE_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

  // get All role service
export const getAllRoleActionForAdmin = () => {
  return (dispatch) => {

      dispatch(loadingAction(true));
     return SettingService.getAllRoleListForAdminUserSection()
      .then (response => {
        dispatch (loadingAction (false));
      return  dispatch ({type: GET_ROLE_LIST_FOR_ADMIN, payload: response   });
        
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

// reset admin by id
export const resetAdminUserAction = (id) => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.resetAdminUserById(id)
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: RESET_ADMIN_USER_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

export const resetRoleAction = (id) => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.resetRolePermission(id)
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: RESET_ROLE_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

export const resendVerificationMailAdminUserByIdAction = (id) => {
  return (dispatch) => {
      dispatch(loadingAction(true));
      return SettingService.resendVerificationMailAdminUserById(id)
      .then (response => {
        dispatch (loadingAction (false));
        return dispatch ({type: RESEND_VERIFICATION_SUCCESS, payload: response   });
      })
      .catch (err => {
        dispatch (loadingAction (false));
        throw err;
      });
  };
};

