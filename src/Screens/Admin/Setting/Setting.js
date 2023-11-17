import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Setting.css";
import { UserCreate } from "./UserCreate";
import { RoleAndPermission } from "./RoleAndPermission";
import  {ROLE_PERMISSION,USER_ADD_ADMIN_PERMISSION,FULL,READ,EDIT} from '../../../Utils/PermissionConstant'

 const Setting = () => {
  const [addonsShow, setAddOnsShow] = useState(false);

  const handleAddOnsClose = () => setAddOnsShow(false);
  const handleAddOnsShow = () => setAddOnsShow(true);
  const [adminUserPermission, setadminUserPermission] = useState('');
  const [rolePermission, setRolePermission] = useState('');
  // check permission or not
  const loginState = useSelector(state => state.authReducer?.loginData);
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      if (loginState?.data?.data?.user?.role?.policies.length) {
          let list = loginState?.data?.data?.user?.role?.policies
          list.map((val,i)=>{
            if(ROLE_PERMISSION===val.name && val.scope!="none"){
              setRolePermission(val.scope)
            }
            if(USER_ADD_ADMIN_PERMISSION===val.name && val.scope!="none"){
              setadminUserPermission(val.scope)
            }
          })
      }
    } 
  }, [loginState]);
  // refresh tokenresult
  const refreshTokenResult = useSelector(state => 
    state.authReducer.loginData
  ); 
  useEffect(() => {
   
    if (refreshTokenResult?.data?.data?.access_token) {
      if (refreshTokenResult?.data?.data?.user?.role?.policies.length) {
        let list = loginState?.data?.data?.user?.role?.policies
        list.map((val,i)=>{
          if(ROLE_PERMISSION===val.name && val.scope!="none"){
            setRolePermission(val.scope)
          } 
          if(USER_ADD_ADMIN_PERMISSION===val.name && val.scope!="none"){
            setadminUserPermission(val.scope)
          } 
        })
      }
    } 
  }, [refreshTokenResult]);
  return (
    <> 
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Tabs  
          defaultactivekfey="profile"
          transition={false}
          id="uncontrolled-tab-example"
        > 
         { adminUserPermission ?
          <Tab  eventKey="User and Permision" title="User and Permission">
            <UserCreate/> 
          </Tab>
          :''}

          { rolePermission ?
          <Tab  eventKey="Roles and Permission" title="Roles and Permission">
            <RoleAndPermission /> 
          </Tab> 
          :'' }
        </Tabs>
       
      </div>
    </>
  );
};

export default Setting;