import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./PreviewTypingDna.css";
import swal from 'sweetalert';
import { courseModuleDetailAction, getCourseModuleByIdAction, getQuotesAction, quizDetailIdAction, securityDetailAction, typingDnaAutoAction } from "../../../Redux/Actions";
let tt = new window.TypingDNA();
tt.addTarget('inputtextbox');
let visualizer = new window.TypingVisualizer();
// var count = 0;

const PreviewTypingDna = () => {
  visualizer.addTarget(['inputtextbox']);
  document.getElementById('inputtextbox')
  const dispatch = useDispatch();
  let history = useHistory();
  let params = useParams();
  const course_module_list = useSelector(state=>{ return state.courseModuleReducer.courseModuleList?.data})
  const course_module_id = useSelector(state => {return state.courseModuleReducer.courseModuleContentId.data.id});

  const [current_module_index, set_current_module_index] = useState('');
  const [last_module_check, set_last_module_check] = useState(false);
  const [questionGroup, setQuestionGroup] = useState([]);
  const [sequence_number, set_sequence_number] = useState('');
  const [module_name, set_module_name] = useState('');
  const [quote, setQuotes] = useState("");

  const [description, set_description] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {

    if (course_module_id)  {
      getModuleDetail(course_module_id)
      check_last_module()
      get_module_data(course_module_id, course_module_list)
    }
  }, [course_module_id]);


  const getModuleDetail = async (id)=>{
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


  const get_module_data = (id, list)=> {
    let index = list.findIndex(obj=> obj.id == id) 
    if (index > -1) {
      const {sequence_number, name} = list[index]
     
      set_sequence_number(sequence_number);
      set_module_name(name)
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

  const handleChange = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async e => {
    try {
 
    }
    catch (err) {
      console.log('*****err', err.response)
      if (err.response.data.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  };
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
    <div>
      <div className=" welcomeScreen tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 coursesection courseAccordion previewquiz">
      <h1>Typing DNA</h1>
      <h3>
          <span>{sequence_number? (sequence_number.toString().length > 2 ? sequence_number: '0'+sequence_number.toString() ) : ''}</span>
          <span className="title"> {module_name? module_name: 'Module Name'}</span>
        </h3>
        <div className="sectionBorder"></div>
        <Container fluid className="pt-3 pb-3">
          <Row>
            <Col xl={10} lg={10} md={11} sm={12} xs={12}>
              <Card className="pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5 card_box_type">
                <Card.Body className="p-0">
                  {/* <Card.Title className="text-center mb-0">
                    Welcome Back!
                  </Card.Title> */}
                  <Row>
                    <Col xl={11} lg={11} md={12} sm={12}>
                      <Card.Text className="text-left mt-0 typingPara">
                        Please type the text below (typos allowed), in order to
                        Sign In.
                      </Card.Text>

                      <Card.Text className="text-left mt-3 typingPara1">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                      </Card.Text>

                      <Row>
                    <Col xl={9} lg={9} md={9} sm={12}>
                      <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Type the above text here</Form.Label>
                            <Form.Control as="textarea" required id="inputtextbox" onCut={handleChange}
                              onCopy={handleChange} disabled={true}
                              onPaste={handleChange} value={description} onChange={(e) => set_description(e.target.value)} rows={3} col={4} />
                          </Form.Group>
                        </Form.Row>

                        <Button
                          variant="primary"
                          className="w-100 btnSign mt-4"
                          type="submit"
                          disabled={true}
                        >
                          Submit
                        </Button>
                      </Form>
                      </Col>
                  </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
        </Container>
      </div>
    </div>
  );
};

export default PreviewTypingDna;