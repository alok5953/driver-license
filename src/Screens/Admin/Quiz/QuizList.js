import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Delete from "../../../Images/delete.svg";
import Edit from "../../../Images/edit.svg";
import Eye from "../../../Images/eyeLight.svg"; 
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./QuizList.css";

import {
  getQuizDetailAction,deleteQuizeAction, getQuizByIdAction, quizDetailAction
} from "../../../Redux/Actions";
import swal from "sweetalert"; 
import  {QUIZE_PERMISSION,FULL,READ,EDIT} from '../../../Utils/PermissionConstant'

const QuizList = (props) => {
  const [permission, setPermission] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageNo,setPageno] =useState(1);
  const [perPage,setPerPage] =  useState(10);
  const [count,setCount] = useState(1);
  const [quizeList, setQuizeList] = useState([]);
  useEffect(() => {
    getAllDetails(pageNo,perPage,'');

  }, []);
   
  const getAllDetails = async (pageNo,perPage,quiz_name) => {
    try{
      setPageno(pageNo)
      const allQuizeResponse = await dispatch(getQuizDetailAction(pageNo,perPage,quiz_name));
      if(allQuizeResponse?.payload?.data?.data?.rows?.length) {
        setQuizeList(allQuizeResponse.payload.data.data?.rows)
      } else{
        setQuizeList([])
      }
      if(allQuizeResponse?.payload?.data?.data?.count){
        setCount( allQuizeResponse?.payload?.data?.data?.count)
      }
    }
    catch(err){
      if(err?.response?.data?.code===401){
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  } 
  // pagination
  const pageHandler =  (page_no,offset) => {
    setPageno({ page_no: page_no })
    setPerPage(offset)
    getAllDetails(page_no, offset,quiz_name);
  }
  
  // delete quize data
  const deleteQuizById = id => {
    
      swal({
        title: "Are you sure?",
        text: "You want to delete quiz!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            const deleteResponse = await dispatch(deleteQuizeAction(id));
            const deleteQuizResponse = deleteResponse.payload;
            if (deleteQuizResponse) {
              if (deleteQuizResponse.data) {
                if (deleteQuizResponse.data.code == 200) {
                  swal({
                    title: "Success!",
                    text: deleteQuizResponse.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  getAllDetails(1,perPage,quiz_name)
                } else {
                  swal({
                    title: "Error!",
                    text: deleteQuizResponse.data.message,
                    icon: "error",
                    timer: 3000
                  });
                }
              }
            }
          }
      }).catch (function(err) {
        if (err?.response?.data?.code === 401) {
            swal({
                title: "Error!",
                text: err.response.data.message,
                icon: "error",
                timer: 5000
            });
            history.push('/')
        }
    })
    
  };

  // get quiz detail by id
  const getQuizeDetailById = async id => {
    try{
      const getResponse = await dispatch(getQuizByIdAction(id));
      const quizResponse = getResponse?.payload?.data;
      if (quizResponse.code == 200) {
        if (quizResponse.data) {
          dispatch(quizDetailAction(quizResponse.data));
          history.push('/quizcreation')
        }
      }
    }
    catch(err){
      if(err?.response?.data?.code===401){
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  };
  // view data
  const getQuizeDetailByIdView = async id => {
    try{
      const getResponse = await dispatch(getQuizByIdAction(id));
      const quizResponse = getResponse?.payload?.data;
      if (quizResponse.code == 200) {
        if (quizResponse.data) {
          dispatch(quizDetailAction(quizResponse.data));
          history.push('/quizcreation?view')
        }
      }
    }
    catch(err){
      if(err?.response?.data?.code===401){
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  };

   // check permission or not
   const loginState = useSelector(state => state.authReducer?.loginData);
   useEffect(() => {
     if (loginState?.data?.data?.access_token) {
       if (loginState?.data?.data?.user?.role?.policies.length) {
         let list = loginState?.data?.data?.user?.role?.policies
         list.map((val, i) => {
           if (QUIZE_PERMISSION == val.name && val.scope != "none") {
             setPermission(val.scope)
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
         list.map((val, i) => {
           if (QUIZE_PERMISSION == val.name && val.scope != "none") {
             setPermission(val.scope)
           }
         })
       }
     }
   }, [refreshTokenResult])
   const [quiz_name, setSearch] = useState('')
   const quizFilter = (quiz_name) => {
    setSearch(quiz_name)
    getAllDetails(1,perPage,quiz_name);
  }

  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={6} lg={6} md={6} sm={12} xs={5}>
            <h1 className="d-md-inline-block d-block mb-3">All Quizzes</h1>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={7} className="text-right">
            <div>
              <Form>
                <Form.Group className="has-search has_mob_search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text" onChange={(e => quizFilter(e.target.value))}
                    className="form-control"
                    placeholder="Search Quizzes here"
                  />
                </Form.Group>

                
              </Form>
            </div>
          </Col>
        </Row>

        <div>
          <Table
            responsive
            className="table table-borderless user_table quizListPara"
          >
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Quiz name (Attached Course)</th>
                <th>Created On</th>
                <th>Created by</th>
                <th>Status</th>
                {  permission ==FULL || permission ==READ || permission ==EDIT?
                   <th className="pl-4">Action</th> :''
}
               
              </tr>
            </thead>
            <tbody>
            {
               quizeList.map((val, i) => {
                let  action_Edit = '', delete_html = '';

                  action_Edit = <img src={Edit} onClick={()=>getQuizeDetailById(val.id)}  className="table_icon" />
                  delete_html = <img src={Delete} onClick={()=>deleteQuizById(val.id)}  className="delete_icon" />
                  return (<tr key={`quzlist-${i}`}> 
      
                    <td >{i+1+((pageNo-1)*perPage)}</td>
            
                <td className="width_data">
                  <strong> {val.title}</strong>
                  <p> {val.description}. </p>
                </td>

                <td>01-04-2021</td>

                <td>{val.createdBy?.first_name}&nbsp;{val.createdBy?.last_name}</td>

                

                <td className="active">{val.status ? 'Active' :'Inactive'}</td>
                <td>
                 {permission ==READ? <img src={Eye} className="pr-2" onClick={()=>getQuizeDetailByIdView(val.id)} alt="Image" />:''}
                  {  permission ==FULL ?
                      <><img src={Eye} className="pr-2" onClick={()=>getQuizeDetailByIdView(val.id)} alt="Image" /> {action_Edit}
                      {delete_html}</>
                      :''
                    }
                   { permission ==EDIT ?
                     <>
                     <img src={Eye} className="pr-2" onClick={()=>getQuizeDetailByIdView(val.id)} alt="Image" />
                     {action_Edit}
                     </>

                      :''
                    }
                </td>
              </tr>)
              })
             }
            </tbody>
          </Table>
        </div>
        <div className="mt-3 text-right pageBottom">
          {
            count > pageNo ?

         (<Pagination  total={count} onChange={pageHandler} />)
          :(<></>)
          }
                       
        </div>
      </div>
    </>
  );
};

export default QuizList;
