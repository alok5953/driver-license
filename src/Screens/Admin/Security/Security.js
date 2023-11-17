import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import Download from "../../../Images/download.svg";
import deleteIcon from "../../../Images/delete.svg";
import edit from "../../../Images/edit.svg";
import Filter from "../../../Images/filter.svg";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Security.css";
import {
  getSecurityQuestionDetailAction, 
  addSecurityQuestionAction,
  getSecurityQuestionByIdAction, 
  deleteSecurityQuestionAction,
  updateSecurityQuestionAction,
  updateSecurityQuestionStatusAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import  {SECURITY_QUESTION_PERMISSION,FULL,READ,EDIT} from '../../../Utils/PermissionConstant'

const Security = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [securityShow, setSecurityShow] = useState(false);
  const handleSecurityClose = () => setSecurityShow(false);
  const handleSecurityShow = () => setSecurityShow(true);
  const [securityQuestionUpdateShow, setUpdateSecurityQuestionShow] = useState(false);
  const handleUpdateSecurityQuestionClose = () => setUpdateSecurityQuestionShow(false);
  const handleUpdateSecurityQuestionShow = () => setUpdateSecurityQuestionShow(true);
  const [validated, setSecurityQuestionValidated] = useState(false);
  const [validatedUpdate, setSecurityQuestionUpdateValidated] = useState(false);
  const [securityQuestionList, setSecurityQuestionList] = useState([]);
  const [securityQuestionId, setSecurityQuestionId] = useState('');
  const [securityQuestionType,setSecurityQuestionType] = useState('');
  const [multipleChouiseQuestion,setMultipleChouiseQuestion]  = useState('');
  const [option1,setOption1]  = useState('');
  const [option2,setOption2]  = useState('');
  const [option3,setOption3]  = useState('');
  const [option4,setOption4]  = useState('');
  const [trueOrFalseQuestion,setTrueOrFalseQuestion]  = useState('');
  const [customQuestion,setcustomQuestion]  = useState('');
  const [securityQuestionUpdateType,setSecurityQuestionUpdateType] = useState('');
  const [multipleChouiseQuestionUpdate,setMultipleChouiseQuestionUpdate]  = useState('');
  const [updateOption1,setUpdateOption1]  = useState('');
  const [updateOption2,setUpdateOption2]  = useState('');
  const [updateOption3,setUpdateOption3]  = useState('');
  const [updateOption4,setUpdateOption4]  = useState('');
  const [updateOption1Id,setUpdateOption1Id]  = useState('');
  const [updateOption2Id,setUpdateOption2Id]  = useState('');
  const [updateOption3Id,setUpdateOption3Id]  = useState('');
  const [updateOption4Id,setUpdateOption4Id]  = useState('');
  const [trueOrFalseQuestionUpdate,setTrueOrFalseQuestionUpdate]  = useState('');
  const [customQuestionUpdate,setcustomQuestionUpdate]  = useState('');
  const [rows,setRows] =useState('');
  const [pageNo,setPageno] =useState(1);
  const [perPage,setPerPage] =  useState(10);
  const [count,setCount] = useState(1);
  
  const [permission, setPermission] = useState('');
  useEffect(() => {
    getAllDetails(pageNo,perPage);

  }, []); 

  const getAllDetails = async (pageNo,perPage) => {
    try{
      setPageno(pageNo)
      const allSecurityQuestionResponse = await dispatch(getSecurityQuestionDetailAction(pageNo,perPage));
      allSecurityQuestionResponse?.payload?.data?.data?.rows?.length && setSecurityQuestionList(allSecurityQuestionResponse.payload.data.data.rows)
      if(allSecurityQuestionResponse?.payload?.data?.data?.count){
        setCount( allSecurityQuestionResponse?.payload?.data?.data?.count)
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

  // get security detail by id
  const getSecurityQuestionDetailById = async id => {
    try{
      const getResponse = await dispatch(getSecurityQuestionByIdAction(id));
      const securityQuestionResponse = getResponse?.payload?.data;
      setSecurityQuestionId(id);
      if (securityQuestionResponse.code == 200) {
        if (securityQuestionResponse.data) {
          
          setSecurityQuestionUpdateType(securityQuestionResponse.data.type)
          if(securityQuestionResponse.data.type=="multiple_choice"){
            setMultipleChouiseQuestionUpdate(securityQuestionResponse.data.question)
            if(securityQuestionResponse.data.options){
              setUpdateOption1(securityQuestionResponse.data.options[0].option)
              setUpdateOption1Id(securityQuestionResponse.data.options[0].id)
              setUpdateOption2(securityQuestionResponse.data.options[1].option)
              setUpdateOption2Id(securityQuestionResponse.data.options[1].id)
              setUpdateOption3(securityQuestionResponse.data.options[2].option)
              setUpdateOption3Id(securityQuestionResponse.data.options[2].id)
              setUpdateOption4(securityQuestionResponse.data.options[3].option)
              setUpdateOption4Id(securityQuestionResponse.data.options[3].id)
            }
          } 
          if(securityQuestionResponse.data.type=="truth_or_false"){
            setTrueOrFalseQuestionUpdate(securityQuestionResponse.data.question)
          }
          if(securityQuestionResponse.data.type=="custom_answer"){
            setcustomQuestionUpdate(securityQuestionResponse.data.question)
          }
          // setUpdateRoleShow(true)
          setUpdateSecurityQuestionShow(true)
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

  const deleteSecurityQuestionById = id => {
    
      swal({
        title: "Are you sure?",
        text: "You want to delete security question!",
        icon: "warning",
        buttons: true,
        dangerMode: true, 
      })
        .then(async (willDelete) => {
          if (willDelete) {

            const deleteResponse = await dispatch(deleteSecurityQuestionAction(id));
            const deleteSecurityQuestionResponse = deleteResponse.payload;
            if (deleteSecurityQuestionResponse) {
              if (deleteSecurityQuestionResponse.data) {
                if (deleteSecurityQuestionResponse.data.code == 200) {
                  swal({
                    title: "Success!",
                    text: deleteSecurityQuestionResponse.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  getAllDetails(1, perPage);
                } else {
                  swal({
                    title: "Error!",
                    text: deleteSecurityQuestionResponse.data.message,
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
                text: err.response.data.err,
                icon: "error",
                timer: 5000
            });
            history.push('/')
        }
    })
  };

  // save security question
  const handleSubmit = async e => {
    try{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setSecurityQuestionValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();
        let values;
        if(securityQuestionType=="multiple_choice"){
          values =  {
            "question":multipleChouiseQuestion,
            "type":securityQuestionType,
            "options":[option1,option2,option3,option4],
            
          }
        }
        if(securityQuestionType=="truth_or_false"){
          values =  {
            "question":trueOrFalseQuestion,
            "type":securityQuestionType
           
          }
        }
        if(securityQuestionType=="custom_answer"){
          values =  {
            "question":customQuestion,
            "type":securityQuestionType,
            
          }
        }
        const response = await dispatch(addSecurityQuestionAction(values))
        const addSecurityQuestionDetailList = response?.payload;
        // value assign in varible
        if (addSecurityQuestionDetailList) {
          if (addSecurityQuestionDetailList.data) {
            if (addSecurityQuestionDetailList.data.code == 200) {
              swal({
                title: "Success!",
                text: addSecurityQuestionDetailList.data.message,
                icon: "success",
                timer: 3000
              });
              getAllDetails(pageNo, perPage);
              setSecurityQuestionValidated(false)
              setSecurityQuestionType('')
            } else {
              swal({
                title: "Error!",
                text: addSecurityQuestionDetailList.data.message,
                icon: "error",
                timer: 3000
              });
              setSecurityQuestionValidated(false);
            }
          }
        }
        setSecurityShow(false);
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

  // update security question
  const updateSecurityQuestion = async e => {
    try{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setSecurityQuestionUpdateValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();
        let values;
        if(securityQuestionUpdateType=="multiple_choice"){
          values =  {
            "question":multipleChouiseQuestionUpdate,
            "type":securityQuestionUpdateType,
            "options":[{id:updateOption1Id,option:updateOption1},{id:updateOption2Id,option:updateOption2},{id:updateOption3Id,option:updateOption3},{id:updateOption4Id,option:updateOption4}]
          }
        }
        if(securityQuestionUpdateType=="truth_or_false"){
          values =  {
            "question":trueOrFalseQuestionUpdate,
            "type":securityQuestionUpdateType
          }
        }
        if(securityQuestionUpdateType=="custom_answer"){
          values =  {
            "question":customQuestionUpdate,
            "type":securityQuestionUpdateType
          }
        }
        const response = await dispatch(updateSecurityQuestionAction(securityQuestionId,values))
        const updateSecurityQuestionDetailList = response?.payload;
        // value assign in varible
        if (updateSecurityQuestionDetailList) {
          if (updateSecurityQuestionDetailList.data) {
            if (updateSecurityQuestionDetailList.data.code == 200) {
              swal({
                title: "Success!",
                text: updateSecurityQuestionDetailList.data.message,
                icon: "success",
                timer: 3000
              });
              getAllDetails(pageNo, perPage);
              setSecurityQuestionUpdateValidated(false)
              setSecurityQuestionUpdateType('')
            } else {
              swal({
                title: "Error!",
                text: updateSecurityQuestionDetailList.data.message,
                icon: "error",
                timer: 3000
              });
              setSecurityQuestionUpdateValidated(false);
            }
          }
        }
        setUpdateSecurityQuestionShow(false);
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

  // update security question status
  const changeStatus = async (id,value) => {
    try{
      var values;
      if(value){
        values = {"is_active":"true"}; 
      } else {
        values = {"is_active":"false"};
      } 
      const response = await dispatch(updateSecurityQuestionStatusAction(id,values));
      const updateSecurityQuestionStatusDetail = response?.payload;
      var securiQuestionString = '';
      if(updateSecurityQuestionStatusDetail?.data?.data?.length>0){
        for(let i=0;i<updateSecurityQuestionStatusDetail?.data?.data.length;i++){
          if(securiQuestionString == ""){
            securiQuestionString += '\n'+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +updateSecurityQuestionStatusDetail?.data?.data[i]
          } else{
            securiQuestionString += '\n'+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +updateSecurityQuestionStatusDetail?.data?.data[i]
          } 
        }
      }
      // value assign in varible
      if (updateSecurityQuestionStatusDetail) {
        if (updateSecurityQuestionStatusDetail.data) {
          if (updateSecurityQuestionStatusDetail.data.code == 200) {
            getAllDetails(pageNo, perPage);
          }  else{
            
            if(updateSecurityQuestionStatusDetail?.data?.data?.length==0){
              swal({
                title: "Error!",
                text: updateSecurityQuestionStatusDetail.data.message,
                icon: "error",
                timer: 3000
              });
            } else{
              let message = updateSecurityQuestionStatusDetail.data.message+'-'+ securiQuestionString;
              swal({
                title: "Error!",
                text: message,
                icon: "error",
                timer: 3000
              });
            }
          }
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

  // pagination
  const pageHandler =  (page_no,offset) => {
    setPageno({ page_no: page_no })
    setPerPage(offset)
    getAllDetails(page_no, offset);
  }
 
    // check permission or not
    const loginState = useSelector(state => state.authReducer?.loginData);
    useEffect(() => {
      if (loginState?.data?.data?.access_token) {
        if (loginState?.data?.data?.user?.role?.policies.length) {
            let list = loginState?.data?.data?.user?.role?.policies
            list.map((val,i)=>{
              if(SECURITY_QUESTION_PERMISSION==val.name && val.scope!="none"){
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
          list.map((val,i)=>{
            if(SECURITY_QUESTION_PERMISSION==val.name && val.scope!="none"){
                setPermission(val.scope)
            }
          })
        }
      } 
    }, [refreshTokenResult])
  
  return (
    <>
      <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={7} lg={7} md={7} sm={12} xs={6}>
            <h1 className="d-md-inline-block d-block mb-3">
              Security Question
            </h1>
          </Col>
          <Col
            xl={5}
            lg={5}
            md={5}
            sm={12}
            xs={6}
            className="text-right mb-3 mb-md-3"
          > 
            <div>
              <Form>
                {/* <img src={Filter} className="mr-3 ml-3" alt="Image" />
                <img src={Download} className="mr-4" alt="Image" />
                <Form.Group className="has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search courses here..."
                  />
                </Form.Group> */}
                { permission ==FULL ?
                <Button
                  variant="primary"
                  className="btnSame btnPadding ml-3"
                  onClick={handleSecurityShow}
                >
                  Add Question
                </Button>
                :''}
              </Form>
            </div>
          </Col>
        </Row>

        <div className="app-section">
          <div>
            <Table responsive className="table table-borderless user_table">
              
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Security Question</th>
                  <th>Created by</th>
                  <th>Created on</th>
                  {  permission ==FULL || permission ==READ || permission ==EDIT?
                  <th>Action</th> :''
}
                  <th className="pl-3 pr-5 pr-md-3 pl-md-4"></th>
                </tr>
              </thead>
              <tbody className="pt-4">
              
              {
                securityQuestionList.map((val, i) => {
                  let  action_Edit = '', delete_html = '';
                  let date = new Date(val.created_at)
                  date = date.toLocaleDateString('en-US');
                    action_Edit = <img src={edit} onClick={e => getSecurityQuestionDetailById(val.id)} className="table_icon" />
                    delete_html = <img src={deleteIcon} onClick={e => deleteSecurityQuestionById(val.id)} className="delete_icon" />
                  
                  return (<tr key={`secu-${i}`}>
                    <td>{i+1+((pageNo-1)*perPage)}</td>
                  <td>
                   {val.question}
                        </td>
                  <td>{val.createdBy?.first_name}&nbsp;{val.createdBy?.last_name}</td>
                  <td>{date}</td>
                  <td>{  permission ==FULL ?
                      <>{action_Edit}
                      {delete_html}</>
                      :''
                    }
                    { permission ==EDIT  || permission ==READ?
                     action_Edit
                      :''
                    }</td>
                  <td className="pl-4 pl-md-0 pt-2 pt-md-1">
                  {  permission ==FULL ?
                    <Form className="mb-0 mt-0">
                      <Form.Check checked={val.is_active} onChange={e => changeStatus(val.id,e.target.checked)} type="switch" id={`custom-switch${val.id}`} label="" />
                    </Form>
                    :''}
                  </td>
                </tr>)
                })
              }
              </tbody>
            </Table>
          </div>
        </div>
        <div className="mt-3 text-right pageBottom">
          {
            count > pageNo ?

         (<Pagination  total={count} onChange={pageHandler} />)
          :(<></>)
          }
                       
        </div>
      </div>

      {/* modal */}
      <Modal
        className="add_usermodal"
        show={securityShow}
        onHide={handleSecurityClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Security Question</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="pt-4">
         
          <Form.Group
                      as={Col}
                      md="6"
                      className="pr-1 QuizLablePadding mb-4"
                    >
                        <Form.Control as="select" required onChange={(e) => setSecurityQuestionType(e.target.value)}>
                          <option value="">Select Question Type</option>
                          <option value="multiple_choice">Mulitple choice Question</option>
                          <option value="truth_or_false"> True or False</option>
                          <option value="custom_answer">Input Answer Questions</option>
                        </Form.Control>
                     
          </Form.Group>
          { securityQuestionType =="multiple_choice" ?(<>
            <Form.Row>
              <Form.Group as={Col} xl="9" lg="9" md="10">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Question here..."
                  required
                  onChange={(e) => setMultipleChouiseQuestion(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 1" onChange={(e) => setOption1(e.target.value)} required />
              </Form.Group>

              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 2" onChange={(e) => setOption2(e.target.value)}  required/>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 3" onChange={(e) => setOption3(e.target.value)}  required/>
              </Form.Group> 

              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 4" onChange={(e) => setOption4(e.target.value)}  required/>
              </Form.Group>
            </Form.Row></>):""}
            { securityQuestionType =="truth_or_false" ?(<><Form.Row className="mt-3">
            <Form.Group as={Col} xl="9" lg="9" md="10">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Question here..."
                  required
                  onChange={(e) => setTrueOrFalseQuestion(e.target.value)} 
                />
            </Form.Group></Form.Row>
            </>):""}
             { securityQuestionType =="custom_answer" ?(<><Form.Row className="mt-3">
            <Form.Group as={Col} xl="9" lg="9" md="10">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Question here..."
                required
                onChange={(e) => setcustomQuestion(e.target.value)}
              />
            </Form.Group>
            </Form.Row>
          </>):""}
        </Modal.Body>
        <Modal.Footer className="mt-3">
          <Button variant="primary" className="btnSame add_user" type="submit">
            Add
          </Button>
          <Button
            className="cancel_btn"
            variant="secondary"
            onClick={handleSecurityClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
      
      {/* update model */}
      <Modal
        className="add_usermodal"
        show={securityQuestionUpdateShow}
        onHide={handleUpdateSecurityQuestionClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Security Question</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validatedUpdate} onSubmit={updateSecurityQuestion}>
        <Modal.Body className="pt-4">
          <Form.Group
                      as={Col}
                      md="6"
                      className="pr-1 QuizLablePadding mb-4"
                    >
                        <Form.Control as="select" disabled required defaultValue={securityQuestionUpdateType} onChange={(e) => setSecurityQuestionUpdateType(e.target.value)}>
                          <option value="">Select Question Type</option>
                          <option value="multiple_choice">Mulitple choice Question</option>
                          <option value="truth_or_false"> True or False</option>
                          <option value="custom_answer"> Input Answer Questions</option>
                        </Form.Control>
                     
          </Form.Group>
          { securityQuestionUpdateType =="multiple_choice" ?(<>
            <Form.Row>
              <Form.Group as={Col} xl="9" lg="9" md="10">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Question here..."
                  required
                  value={multipleChouiseQuestionUpdate}
                  onChange={(e) => setMultipleChouiseQuestionUpdate(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 1" value={updateOption1} onChange={(e) => setUpdateOption1(e.target.value)} required />
              </Form.Group>

              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 2" value={updateOption2} onChange={(e) => setUpdateOption2(e.target.value)}  required/>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 3" value={updateOption3} onChange={(e) => setUpdateOption3(e.target.value)}  required/>
              </Form.Group>

              <Form.Group as={Col} xl="5" lg="5" md="5">
                <Form.Control type="text" placeholder="Option 4" value={updateOption4} onChange={(e) => setUpdateOption4(e.target.value)}  required/>
              </Form.Group>
            </Form.Row></>):""}
            { securityQuestionUpdateType == "truth_or_false" ? (
            <>
            <Form.Group as={Col} xl="9" lg="9" md="10">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Question here..."
                  required
                  value={trueOrFalseQuestionUpdate}
                  onChange={(e) => setTrueOrFalseQuestionUpdate(e.target.value)} 
                />
            </Form.Group>
            </>):""}
             { securityQuestionUpdateType =="custom_answer" ?(<>
            <Form.Group as={Col} xl="9" lg="9" md="10">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Question here..."
                required
                value={customQuestionUpdate}
                onChange={(e) => setcustomQuestionUpdate(e.target.value)}
              />
            </Form.Group>
          </>):""}
        </Modal.Body>
        <Modal.Footer className="mt-3">
        { permission ==EDIT || permission ==FULL?
          <Button variant="primary" className="btnSame add_user" type="submit">
            Update
          </Button>:""
}
          <Button
            className="cancel_btn"
            variant="secondary"
            onClick={handleUpdateSecurityQuestionClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Security;
