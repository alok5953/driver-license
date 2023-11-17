import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./PreviewQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {  getCourseModuleByIdAction, quizDetailIdAction, securityDetailAction, courseModuleDetailAction, getModuleByIdAction } from "../../../Redux/Actions";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

const PreviewSecurity = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const security_id = useSelector(state=>{ return state.courseModuleReducer?.securityContentId?.data?.id});

  const course_module_list = useSelector(state=>{ return state.courseModuleReducer?.courseModuleList?.data})
  const course_module_id = useSelector(state => {return state.courseModuleReducer?.courseModuleContentId?.data?.id});
  const [current_module_index, set_current_module_index] = useState('');
  const [last_module_check, set_last_module_check] = useState(false);
  const [module_name, set_module_name] = useState('');
  const [questionGroup, setQuestionGroup] = useState([]);
  const [sequence_number, set_sequence_number] = useState('');

  useEffect(()=>{
   
    if (course_module_id)  {
      getSecurityDetail(course_module_id)
      check_last_module()
      get_module_data(course_module_id, course_module_list)
    }
  },[course_module_id])

    const getSecurityDetail = async (id)=>{
      const response = await dispatch(getCourseModuleByIdAction(id))
      const securityDetail = response?.payload;
      if (securityDetail) {
        if (securityDetail.data) {
          if (securityDetail.data.code == 200) {
           
              setQuestionGroup(securityDetail.data.data?.questions_group?.questions)
          } else {
            swal({
              title: "Error!",
              text: securityDetail.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    }

    const check_last_module =() =>{

      var list = [...course_module_list];
      var index = list.findIndex(obj=> {if (obj.id == course_module_id) {return obj} })
        set_current_module_index(index)
  
      var lastModule = course_module_list.length - index ;

      if (lastModule == 1 ) {
        set_last_module_check(true);
      } else {
        set_last_module_check(false)
      }
    }

    const get_module_data = (id, list)=> {
      let index = list.findIndex(obj=> obj.id == id) 
      if (index > -1) {
        const {sequence_number, name} = list[index]
       
        set_sequence_number(sequence_number);
        set_module_name(name)
      }
    }

    const handleModuleNavigation = (e)=> {
      if (course_module_list) {
        var list = [...course_module_list];
        // find index of module
        var index = list.findIndex(obj=> {if (obj.id == course_module_id) {return obj} })
          set_current_module_index(index)
        
          // check if last module in list 
          var lastModule = list.length - index ;
          if (lastModule == 1 ) {
            set_last_module_check(true);
          } else {
            set_last_module_check(false)
          }

          // if index is true 
          if (index > -1 ) {

            const name = e.target.name
            if (name == 'next') {
              var newIndex = index+1 ;
            }
            if (name == 'back') {
              var newIndex = index-1 ;
            }
            var new_module_id = list[newIndex]?.id;
            var module_type = list[newIndex]?.module_type;        
            var sub_module_id = list[newIndex]?.sub_module_id;

          if(new_module_id ) {

            dispatch(courseModuleDetailAction(new_module_id))
            handleNavigation(sub_module_id, module_type)
          } else {
            history.push('/courses/coursemodule')
          }
           
          }
      }
    }

    const handleNavigation =(sub_id, module_type)=> {
      dispatch(quizDetailIdAction(sub_id))
      dispatch(securityDetailAction(sub_id))

      if (module_type=='quiz') {
        history.push('/courses/previewquiz')    
      }
      else if (module_type == 'grapejs') {
        history.push('/courses/editcourseaccordion')
      }
      else if (module_type == 'security_questions') {
        history.push('/courses/previewsecurity')
      }
      else if (module_type == 'typing_dna') {
        history.push('/courses/previewtypingdna')
      }   
    }
  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 coursesection courseAccordion previewquiz quiz_preview_box">
      <h1>Security Questions</h1>
        <h3>
          <span>{sequence_number? (sequence_number.toString().length > 2 ? sequence_number: '0'+sequence_number.toString() ) : ''}</span>
          <span className="title"> {module_name? module_name: 'Module Name'}</span>
        </h3>
        <div className="sectionBorder"></div>

        {questionGroup ? questionGroup.map((que, i)=> {return(
          <>
            <Row key={`questiDetail-${i}`} className="page-item previewquiz ml-0 mr-2 mt-4">
                <div className="quiz-number"> Q.{i+1} </div>
                <Col className="w-75 quiz-question pl-0" xl={6} lg={6} md={6} sm={12} >
                <p className="quiz_text_head">
                  {que.question? que.question : "Question Number 1"}
                  </p>
                  </Col>
            </Row>
            <Row key={i+1} className="page-options mt-3 ml-0">
                { que.type == 'multiple_choice' ? que.options?.map((opt, i) => {return( 
                  <>                
                    <Col key={`multi-${i}`} className="quiz-option" xl={12} lg={12} md={12} sm={12}>
                    <div className="form-group-custom form-group">
                        <input id="second" disabled="true" type="radio" name="custom-radio-btn" />
                        <label className="custom-radio" htmlFor="second"></label>
                        <span className="label-text">
                          {opt.option? opt.option : 'Quiz 1 for Introduction to the Course.'}
                        </span>
                      </div>
                    </Col>
                  </>
                )})  
      
                : null}
                
                {que.type == 'custom_answer' ? 
              
                <Col className="quiz-option" xl={6} lg={6} md={6} sm={12}>
                  <Form className="mt-3">
                  <Form.Row>
                    <Form.Group as={Col}>
                      {/* <Form.Label>Type the above text here</Form.Label> */}
                      <Form.Control as="text" disabled={true} placeholder="your answer will be here" rows={3} col={4} />
                    </Form.Group>
                  </Form.Row>
                  </Form>
                </Col>:null }
                {que.type == 'truth_or_false' ? 
                <>
                <Col className="quiz-option" xl={6} lg={6} md={6} sm={12}>
                      <div className="form-group-custom form-group">
                        <input id="second" disabled="true" type="radio" name="custom-radio-btn" />
                        <label className="custom-radio" htmlFor="second"></label>
                        <span className="label-text">
                          { 'True'}
                        </span>
                      </div>
                </Col>
                <Col className="quiz-option" xl={6} lg={6} md={6} sm={12}>
                      <div className="form-group-custom form-group">
                        <input id="second" disabled="true" type="radio" name="custom-radio-btn" />
                        <label className="custom-radio" htmlFor="second"></label>
                        <span className="label-text">
                          { 'False'}
                        </span>
                      </div>
                </Col>
                </>
                :null}
             </Row>
          </>
        )}): null}

        <Row>
          <Col
            xl={6}
            lg={6}
            md={6}
            sm={12}
            className="text-md-left text-center"
          >
            <Button
              variant="primary"
              className="btnSame btnPadding btnBorder mt-4"
              name="back"
              onClick={e=>handleModuleNavigation(e)}
            >
              Back
            </Button>
          </Col>
          <Col
            xl={6}
            lg={6}
            md={6}
            sm={12}
            className="text-md-right text-center"
          >
            <Button
              variant="primary"
              className="btnSame btnPadding mt-4"
              name = "next"
              onClick={e=>handleModuleNavigation(e)}
            >
             {!last_module_check? ' Next ' : ' Save '}  
            </Button>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default PreviewSecurity;