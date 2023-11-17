
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Accordion, Form, Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "./QuizCreation.css";
import swal from "sweetalert";
import {
  quizDetailAction
} from "../../../Redux/Actions";


const QuizCreation = (props) => {
  let search = props.location.search;

  const dispatch = useDispatch();
  let history = useHistory(); 

  const [key, setKey] = useState('0')
  const [validated, setRoleValidated] = useState(false);
  const [quiz_title, setQuizTitle] = useState("");
  const [quiz_description, setQuizDescription] = useState("");
  const [open_the_quiz_status, set_open_the_quize_status] = useState(false)
  const [open_the_quize_day, set_open_the_quize_day] = useState('')
  const [open_the_quize_month, set_open_the_quize_month] = useState('')
  const [open_the_quize_year, set_open_the_quize_year] = useState('')
  const [open_the_quize_time, set_open_the_quize_time] = useState('')
  const [close_the_quiz_status, set_close_the_quize_status] = useState(false)
  const [close_the_quize_day, set_close_the_quize_day] = useState('')
  const [close_the_quize_month, set_close_the_quize_month] = useState('')
  const [close_the_quize_year, set_close_the_quize_year] = useState('')
  const [close_the_quize_time, set_close_the_quize_time] = useState('');
  const [time_limit_status, set_time_limit_status] = useState(false)
  const [time_limit, set_time_limit] = useState('')
  const [activeId, setActiveId] = useState("");
  const [grade_category, set_grade_category] = useState('')
  const [attemp_allowed, set_attemp_allowed] = useState('')
  const [grade_to_pass, set_grade_to_pass] = useState('')
  const [grading_method, set_grading_method] = useState('');
  const [safe_exam_browser, set_safe_exam_browser] = useState(false);
  const [availablity, set_availablity] = useState("");
  const [id_number, set_id_number] = useState("");
  const [group_mode, set_group_mode] = useState('');
  const [grouping, set_grouping] = useState('');
  const [tags, set_tags] = useState([]);
  const [input_tags, set_input_tags] = useState('')
  const [attempts_and_re_attempts, set_attempts_and_re_attempts] = useState("3");
  const [after_completion_of_attempts, set_after_completion_of_attempts] = useState('restart_module_again');
  const [id, set_quize_id] = useState('');

  const toggleActive = id => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const handleSubmit = async e => {
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setRoleValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();
        let values = {

          "title": quiz_title, "description": quiz_description, "open_the_quiz_status": open_the_quiz_status,
          //"grade_category": grade_category, "attemp_allowed": attemp_allowed, "grade_to_pass": grade_to_pass, "grading_method": grading_method, 
          "time_limit_status": time_limit_status, "open_the_quiz_status": open_the_quiz_status, "close_the_quiz_status": close_the_quiz_status, "safe_exam_browser": safe_exam_browser,
          //"availablity": availablity, 
          "attempts_and_re_attempts": attempts_and_re_attempts ? attempts_and_re_attempts :3, "after_completion_of_attempts": after_completion_of_attempts ?after_completion_of_attempts : 'restart_module_agian',
          ///"id_number": id_number,
          //"group_mode": group_mode,
          // "grouping": grouping, 
          "tags": tags
        }
        if (quiz_detail.id) {
          set_quize_id(quiz_detail.id);
          values.id = quiz_detail.id
        }
        if (quiz_detail.quiz_type) {
          values.quiz_type = quiz_detail.quiz_type
        }
        if (open_the_quiz_status) {
          if (!open_the_quize_day || !open_the_quize_month || !open_the_quize_year || !open_the_quize_time) {
            swal('error', 'Please Open select Day, Month, Year and Time')
            return false
          } else {
            let day = open_the_quize_day.getDate()
            let month = open_the_quize_month.getMonth()
            let year = open_the_quize_year.getFullYear()
            let hours = open_the_quize_time.getHours();
            let minute = open_the_quize_time.getMinutes();
            let date = new Date(year, month, day, hours, minute, '00');
            values.open_the_quiz = date.getTime();
          }
        }
        if (close_the_quiz_status) {
          if (!close_the_quize_day || !close_the_quize_month || !close_the_quize_year || !close_the_quize_time) {
            swal('error', 'Please Close select Day, Month, Year and Time')
            return false
          } else {
            let day = close_the_quize_day.getDate()
            let month = close_the_quize_month.getMonth()
            let year = close_the_quize_year.getFullYear()
            let hours = close_the_quize_time.getHours();
            let minute = close_the_quize_time.getMinutes();
            let date = new Date(year, month, day, hours, minute, '00');
            values.close_the_quiz = date.getTime();
          }
        }
        if (time_limit_status) {
          if (!time_limit) {
            swal('error', 'Please select Time limit')

            return false
          } else {
            values.time_limit = time_limit;
          }
        }
        if (quiz_detail.questions) { // already save in 
          values.questions = quiz_detail.questions
          values.quize_type = quiz_detail.quize_type
        }
        const response = dispatch(quizDetailAction(values))
        if (search) {
          history.push('/quiz/addquiz?view')
        } else {

          history.push('/quiz/addquiz')
        }

      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
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

  const saveTags = () => {
    if (!input_tags) {
      swal('error', 'Please insert tag value')
      return false
    }
    set_tags([...tags, input_tags]);
    set_input_tags('')
  }

  const deleteTage = (i) => {
    const remove = tags.splice(i, 1);
    let list = tags
    if (list.length == 0) {
      set_tags([]);
    } else {
      set_tags([...list]);
    }
  }

  const quiz_detail = useSelector(state => {
    return state.quizeReducer.quizeContentDetail;
  });
  useEffect(() => {
    if (Object.keys(quiz_detail).length !== 0) {
      if (quiz_detail.id) {
        set_quize_id(quiz_detail.id)
      }
      setQuizTitle(quiz_detail.title); setQuizDescription(quiz_detail.description); set_open_the_quize_status(quiz_detail.open_the_quiz_status)
      if (quiz_detail.open_the_quiz) {
        set_open_the_quize_day(new Date(quiz_detail.open_the_quiz))
        set_open_the_quize_month(new Date(quiz_detail.open_the_quiz))
        set_open_the_quize_year(new Date(quiz_detail.open_the_quiz))
        set_open_the_quize_time(new Date(quiz_detail.open_the_quiz))
      }
      if (quiz_detail.close_the_quiz) {
        set_close_the_quize_day(new Date(quiz_detail.close_the_quiz)); set_close_the_quize_month(new Date(quiz_detail.close_the_quiz)); set_close_the_quize_year(new Date(quiz_detail.close_the_quiz));
        set_close_the_quize_time(new Date(quiz_detail.close_the_quiz));
        //
      }
      if(quiz_detail.time_limit){
        set_time_limit(new Date(quiz_detail.time_limit));
      }
      set_time_limit_status(quiz_detail.time_limit_status)
      set_close_the_quize_status(quiz_detail.close_the_quiz_status)
      set_grade_category(quiz_detail.grade_category); set_attemp_allowed(quiz_detail.attemp_allowed);
      set_grade_to_pass(quiz_detail.grade_to_pass); set_grading_method(quiz_detail.grading_method);
      set_safe_exam_browser(quiz_detail.safe_exam_browser); set_availablity(quiz_detail.availablity);
      set_id_number(quiz_detail.id_number); set_group_mode(quiz_detail.group_mode); set_grouping(quiz_detail.grouping);
      set_attempts_and_re_attempts(quiz_detail.attempts_and_re_attempts); set_after_completion_of_attempts(quiz_detail.after_completion_of_attempts)

      if (quiz_detail.tags) {
        set_tags([...quiz_detail.tags]);
      }
    } else {
     
      setQuizTitle(''); setQuizDescription(''); set_open_the_quize_status(false)
    if (!quiz_detail.open_the_quiz) {
        set_open_the_quize_day()
        set_open_the_quize_month()
        set_open_the_quize_year()
        set_open_the_quize_time()
     }
      set_close_the_quize_status(false)
      if (!quiz_detail.close_the_quiz) {
        set_close_the_quize_day(); set_close_the_quize_month(); set_close_the_quize_year();
        set_close_the_quize_time();
        set_time_limit();
      }
      set_time_limit_status(false)
      set_grade_category(); set_attemp_allowed();
      set_grade_to_pass(); set_grading_method();
      set_safe_exam_browser(false); set_availablity(); 
      set_id_number(); set_group_mode(); set_grouping();
      set_attempts_and_re_attempts("3"); set_after_completion_of_attempts('restart_module_again')

      set_quize_id('')
        set_tags([]);
    }
  }, [quiz_detail]);
  return (
    <>
      <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 containerHome coursesection">
        <h1>Quiz creation</h1>
        <h3>
          <span> 01</span>
          <span className="title"> Adding Quiz Detail</span>
        </h3>

        <div className="sectionBorder"></div>
        <div className="quizDetails mt-4 pl-2">
          <Form className="allsameInput" noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="quiztitleSection">
              <h6 className="mb-4">Quiz title & Description</h6>

              <Form.Row>
                <Form.Group as={Col} xl="3" lg="4" md="8">
                  <Form.Label>Quiz title</Form.Label>
                  <Form.Control type="text" disabled={(search == "?view" ? true : false)} placeholder="" value={quiz_title} onChange={e => setQuizTitle(e.target.value)} required />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xl="5" lg="7" md="10">
                  <Form.Label>Quiz Description</Form.Label>
                  <Form.Control as="textarea" rows={4} disabled={(search == "?view" ? true : false)} value={quiz_description} required onChange={e => setQuizDescription(e.target.value)} />
                </Form.Group>
              </Form.Row>
            </div>

            <div className="sectionBorder mt-2"></div>

            {/* Accordion */}
            <Accordion>

              {/* Timing */}
              <Card className="QuizCollapse">
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => toggleActive("0")} className="quizTabs">
                  <h3>
                    Timing
                                </h3>
                  <span className="accordionDownIcon"></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="timepara">
                    <p>Open the Quiz</p>
                    <Form.Row>
                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          selected={open_the_quize_day} disabled={(search == "?view" ? true : (open_the_quiz_status ? false : true))}
                          dateFormat="dd"   
                          className="form-control" required
                          onChange={e => set_open_the_quize_day(new Date(e))}

                        /> 
                      </Form.Group>

                      <Form.Group as={Col} md="2" className="w-100">

                        <DatePicker


                          dateFormat="MM"
                          dateFormat="MMMM" disabled={(search == "?view" ? true : (open_the_quiz_status ? false : true))}
                          showMonthYearPicker 
                          // disabled={(open_the_quiz_status ? false : true)}
                          showMonthYearPicker required
                          className="form-control"
                          selected={open_the_quize_month}
                          onChange={e => set_open_the_quize_month(new Date(e))}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          showYearPicker 
                          dateFormat="yyyy" disabled={(search == "?view" ? true : (open_the_quiz_status ? false : true))} 
                          className="form-control" required
                          selected={open_the_quize_year}
                          onChange={e => set_open_the_quize_year(new Date(e))}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          showTimeSelect 
                          showTimeSelectOnly
                          timeIntervals={15} disabled={(search == "?view" ? true : (open_the_quiz_status ? false : true))}
                          timeCaption="Time" 
                          dateFormat="h:mm aa" required
                          className="form-control  timeIcon"
                          selected={open_the_quize_time}
                          onChange={e => set_open_the_quize_time(e)}
                        />

                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="w-100 samecheckbox"
                      >
                        <div className="custom-control custom-checkbox pl-md-5 pt-md-2 text-left">
                          <input
                            type="checkbox" disabled={(search == "?view" ? true : false)}
                            className="custom-control-input"
                            id="customCheck1"
                            checked={open_the_quiz_status} onChange={e => set_open_the_quize_status(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Enable
                                            </label>
                        </div>
                      </Form.Group>
                    </Form.Row>

                    <p>Close the Quiz</p>
                    <Form.Row>
                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          disabled={(search == "?view" ? true : (close_the_quiz_status ? false : true))}
                          // disabled={(close_the_quiz_status ? false : true)}  
                          required
                          dateFormat="dd"
                          className="form-control"
                          selected={close_the_quize_day}
                          onChange={e => set_close_the_quize_day(new Date(e))}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker disabled={(search == "?view" ? true : (close_the_quiz_status ? false : true))}
                          dateFormat="MM" 
                          dateFormat="MMMM" required
                          showMonthYearPicker
                          className="form-control"
                          selected={close_the_quize_month}
                          onChange={e => set_close_the_quize_month(new Date(e))}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          showYearPicker 
                          dateFormat="yyyy" disabled={(search == "?view" ? true : (close_the_quiz_status ? false : true))}
                          className="form-control" 
                          selected={close_the_quize_year} required
                          onChange={e => set_close_the_quize_year(new Date(e))}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time" disabled={(search == "?view" ? true : (close_the_quiz_status ? false : true))}
                          dateFormat="h:mm aa"
                          className="form-control timeIcon" required
                          selected={close_the_quize_time}
                          onChange={e => set_close_the_quize_time(new Date(e))}
                        />

                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="w-100 samecheckbox"
                      >
                        <div className="custom-control custom-checkbox pl-md-5 pt-md-2 text-left">
                          <input
                            type="checkbox" disabled={(search == "?view" ? true : false)}
                            className="custom-control-input" 
                            id="customCheck2"
                            checked={close_the_quiz_status} onChange={e => set_close_the_quize_status(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck2"
                          >
                            Enable
                          </label>
                        </div>
                      </Form.Group>
                    </Form.Row>

                    <p>Time Limit</p>

                    <Form.Row>
                      <Form.Group as={Col} md="2" className="w-100">
                        <DatePicker
                          disabled={(search == "?view" ? true : (time_limit_status ? false : true))}
                          showTimeSelect
                          showTimeSelectOnly 
                          // disabled={(time_limit_status ? false : true)} 
                          timeIntervals={15} required
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control  timeIcon"
                          selected={time_limit} onChange={e => set_time_limit(e)}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="w-100 samecheckbox"
                      >
                        <div className="custom-control custom-checkbox pl-md-5 pt-md-2 text-left">
                          <input
                            type="checkbox" disabled={(search == "?view" ? true : false)}
                            className="custom-control-input"
                            id="customCheck3"
                            checked={time_limit_status} onChange={e => set_time_limit_status(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck3"
                          >
                            Enable
                                            </label>
                        </div>
                      </Form.Group>
                    </Form.Row>

                    <p>Time Limit</p>

                    <Form.Row>
                      <Form.Group as={Col} md="6" className="w-100">
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view" ? true : false)} id="inputState" disabled={(search == "?view" ? true : false)}>
                            <option>Open Attempts are summitted Automatically</option>
                            <option>Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>
                </Accordion.Collapse>
                <div
                  className={
                    activeId === "0" ? "button-up" : "button-down"
                  }
                ></div>
              </Card>

              <div className="sectionBorder"></div>

              {/* Grade  */}
              {/* <Card className="QuizCollapse">
                <Accordion.Toggle as={Card.Header} eventKey="1" className="quizTabs" onClick={() => toggleActive("1")}>
                  <h3>
                    Grade
                                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState" className="mr-0 mr-lg-5">
                        <Form.Label>Grade Category</Form.Label>
                        <div className="select_input">{grade_category}
                          <Form.Control as="select" disabled={(search == "?view"? true: false)} required value={grade_category} onChange={(e) => set_grade_category(e.target.value)} >
                            <option value="Uncategory">Uncategorised</option>
                            <option value="category_1">Category 1</option>
                            <option value="category_2">Category 2</option>
                            <option value=''>Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Grade to Pass</Form.Label>
                        <Form.Control type="text" disabled={(search == "?view"? true: false)} placeholder="" value={grade_to_pass} required onChange={e => set_grade_to_pass(e.target.value)} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState" className="mr-0 mr-lg-5">
                        <Form.Label>Attempts Allowed</Form.Label>
                        <div className="select_input"   >
                          <Form.Control as="select" disabled={(search == "?view"? true: false)} required value={attemp_allowed} onChange={(e) => set_attemp_allowed(e.target.value)}>
                            <option value="unlimited">Unlimited</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="">Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Grading Method</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select"  disabled={(search == "?view"? true: false)} required value={grading_method} onChange={(e) => set_grading_method(e.target.value)}>
                            <option value="average_grade">Average grade</option>
                            <option value="">Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>
                </Accordion.Collapse>
                <div
                  className={
                    activeId === "1" ? "button-up" : "button-down"
                  }
                ></div>
              </Card> */}

              <div className="sectionBorder"></div>

              {/*Safe Exam Browser   */}

              <Card className="QuizCollapse">
                <Accordion.Toggle as={Card.Header} disabled={(search == "?view" ? true : false)} eventKey="2" className="quizTabs" onClick={() => toggleActive("2")}>
                  <h3>
                    Safe Exam Browser
                                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>

                    <Form.Row as={Col} xl="4" lg="4" md="5" sm="12">
                      <Form.Group className="w-100">
                        <Form.Label>Require the use of Safe Exam Browser</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view" ? true : false)} required value={safe_exam_browser} onChange={(e) => set_safe_exam_browser(e.target.value)}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                            <option value="">Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>
                </Accordion.Collapse>
                <div
                  className={
                    activeId === "2" ? "button-up" : "button-down"
                  }
                ></div>
              </Card>

              <div className="sectionBorder"></div>

              {/* Common module settings */}
              {/* <Card className="QuizCollapse">
                <Accordion.Toggle as={Card.Header}  eventKey="3" className="quizTabs" onClick={() => toggleActive("3")} >
                  <h3>
                    Common module settings
                                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState" className="mr-0 mr-lg-5">
                        <Form.Label>Availability</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view"? true: false)} value={availablity} onChange={(e) => set_availablity(e.target.value)}>
                            <option value="Hide_from_student">Hide from student</option>
                            <option value="">Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>ID number</Form.Label>
                        <Form.Control type="text" disabled={(search == "?view"? true: false)} placeholder="" value={id_number} onChange={(e) => set_id_number(e.target.value)} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState" className="mr-0 mr-lg-5">
                        <Form.Label>Group Mode</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view"? true: false)} value={group_mode} onChange={(e) => set_group_mode(e.target.value)}>
                            <option value="unlimited">Unlimited</option>
                            <option value="">Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Grouping</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view"? true: false)} defaultValue={grouping} onChange={(e) => set_grouping(e.target.value)}>
                            <option value="unlimited">Unlimited</option>
                            <option value="">Choose...</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>
                </Accordion.Collapse>
                <div
                  className={
                    activeId === "3" ? "button-up" : "button-down"
                  }
                ></div>
              </Card> */}

              <div className="sectionBorder"></div>


              {/* Tags */}

              <Card className="QuizCollapse">
                <Accordion.Toggle as={Card.Header} eventKey="4" className="quizTabs" onClick={() => toggleActive("4")}>
                  <h3 className="d-inline-block mr-2">
                    Tags
                                  </h3>

                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    {tags.map((val, i) => {
                      return (
                        <span key={`tags-${i}`} className="tags">{val}  {search ? "" : <span className="closeIcon" onClick={() => deleteTage(i)}>+</span>}</span>)
                    })}
                    <Form.Row>
                      <Form.Group as={Col} lg="4" md="5" sm="12">
                        <Form.Label>Add Tags</Form.Label>
                        <Form.Control disabled={(search == "?view" ? true : false)} type="text" placeholder="" id="inputCity" value={input_tags} onChange={(e) => set_input_tags(e.target.value)} />
                      </Form.Group>
                      <Form.Group as={Col} lg="4" md="5" sm="12" className="text-left">
                        {search ? '' :
                          <Button
                            variant="primary"
                            className="btnSame add_user btnaddUser"
                            onClick={saveTags}
                          >
                            Add
                                  </Button>
                        }
                      </Form.Group>
                    </Form.Row>

                  </Card.Body>
                </Accordion.Collapse>
                <div
                  className={
                    activeId === "4" ? "button-up" : "button-down"
                  }
                ></div>
              </Card>

              <div className="sectionBorder"></div>

              {/* No of attempt available  */}
              <Card className="QuizCollapse">
                <Accordion.Toggle as={Card.Header} eventKey="5" className="quizTabs" onClick={() => toggleActive("5")}>
                  <h3>
                    No of attempt available
                                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState" className="mr-0 mr-lg-5">
                        <Form.Label>Attempts & Re-attempts</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view" ? true : false)} value={attempts_and_re_attempts} onChange={(e) => set_attempts_and_re_attempts(e.target.value)}>
                            <option value="">Please select option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>After Completion of Attempts</Form.Label>
                        <div className="select_input">
                          <Form.Control as="select" disabled={(search == "?view" ? true : false)} value={after_completion_of_attempts} onChange={(e) => set_after_completion_of_attempts(e.target.value)}>
                            <option value="restart_module_again">Restart Module again</option>
                            <option value="restart_quiz_again">Restart Quiz Again</option>
                            <option value="continue_to_next_module">Continue to Next Module</option>
                          </Form.Control>
                        </div>
                      </Form.Group>
                    </Form.Row>
                  </Card.Body>
                </Accordion.Collapse>
                <div
                  className={
                    activeId === "5" ? "button-up" : "button-down"
                  }
                ></div>
              </Card>
            </Accordion>

            <div className="quizSecBtn mt-5">
              <Button
                variant="primary"
                className="btnSame btnPadding mt-4"
                type="submit"
              >
                {search ? "" : 'Save &'} Next
                          </Button>

              
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default QuizCreation;
