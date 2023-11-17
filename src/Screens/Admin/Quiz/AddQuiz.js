import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Col } from "react-bootstrap";
import { Select } from 'antd';
import 'antd/dist/antd.css';
import swal from "sweetalert";
import "./AddQuiz.css";
import {
  addQuizAction, quizDetailAction, updateQuizAction
} from "../../../Redux/Actions";

const QuizAdd = (props) => { 
  let search = props.location.search;
  const dispatch = useDispatch();
  const { Option } = Select;
  let history = useHistory();
  const [quiz_type, set_quize_type] = useState('single_choice_question');

  const [addQuestion, setaddQuestion] = useState([{
    "question": "",
    "options": [
      {
        "id": "",
        "option": "",
        "is_answer": false
      },
      {
        "id": "",
        "option": "",
        "is_answer": false
      }
      
    ]
  }]);
  const [validated, setQuizeValidated] = useState(false);
  const addQuizQuestion = () => {

    setaddQuestion([...addQuestion, {
      "id": "",
      "question": "",
      "options": [
        {
          "id": "",
          "option": "",
          "is_answer": false
        },
        {
          "id": "",
          "option": "",
          "is_answer": false
        }
      ]
    }]);

  };

  const quiz_detail = useSelector(state => {
    return state.quizeReducer.quizeContentDetail;
  });

  // save 
  const handleSubmit = async e => {
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setQuizeValidated(true);
      let found = true;
      let ans_array = []
      if (!quiz_detail.id) {

        if (form.checkValidity()) {
          e.preventDefault();
          // delete id
          addQuestion.map((element, index) => {
            delete addQuestion[index].id;
            found = element?.options?.some(el => el.is_answer === true);
            if (!found) {
              ans_array.push(false)
            }
            element?.options?.map((ee, indx) => {
              delete addQuestion[index].options[indx].id
            })
          })
          // check in array

          if (ans_array.includes(false)) {
            swal({
              title: "Error!",
              text: "Please select answer",
              icon: "error",
              timer: 3000
            });
            return false
          }
          let data_list = { ...quiz_detail, questions: addQuestion, quiz_type: quiz_type }

          dispatch(quizDetailAction(data_list))
          let response = await dispatch(addQuizAction(data_list))
          response = response?.payload
          if (response) {
            if (response.data) {
              if (response.data.code == 200) {
                swal({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                  timer: 3000
                });
                setQuizeValidated(false);
                dispatch(quizDetailAction({}))
                history.push('/quizlist');
              } else if (response.data.code == 401) {
                swal({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                  timer: 3000
                });

                setQuizeValidated(false);
              } else {
                swal({
                  title: "Error!",
                  text: response.data.message,
                  icon: "error",
                  timer: 3000
                });
                setQuizeValidated(false);
              }
            }
          }

        }
      } else {

        if (form.checkValidity()) {
          e.preventDefault();
          addQuestion?.map((val, indx) => {
            found = val?.options?.some(el => el.is_answer === true);
            if (!found) {
              ans_array.push(false)
            }
            if (!val.id) {
              delete addQuestion[indx].id
              val?.options?.map((opt, optindx) => {
                if (!opt.id) {
                  delete addQuestion[indx].options[optindx].id
                }
              })
            }

          })
          // check in array

          if (ans_array.includes(false)) {
            swal({
              title: "Error!",
              text: "Please select answer",
              icon: "error",
              timer: 3000
            });
            return false
          }

          let data_list = { ...quiz_detail, questions: addQuestion, quiz_type: quiz_type }
          dispatch(quizDetailAction(data_list))
          let response = await dispatch(updateQuizAction(quiz_detail.id, data_list))
          response = response?.payload
          if (response) {
            if (response.data) {
              if (response.data.code == 200) {
                swal({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                  timer: 3000
                });
                setQuizeValidated(false);
                dispatch(quizDetailAction({}))
                history.push('/quizlist');
              } else if (response.data.code == 401) {
                swal({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                  timer: 3000
                });

                setQuizeValidated(false);
              } else {
                swal({
                  title: "Error!",
                  text: response.data.message,
                  icon: "error",
                  timer: 3000
                });
                setQuizeValidated(false);
              }
            }
          }
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
  }


  const HandleChange = (index, question_value) => {
    addQuestion.map((valu, i) => {
      if (i == index) {
        addQuestion[i].question = question_value
      }
    })
    setaddQuestion([...addQuestion]);

  };
  const optionHandleChange = (ques_index, opt_indx, op_value) => {

    addQuestion.map((valu, i) => {
      if (i == ques_index) {
        valu.options.map((val, op_inx) => {
          if (op_inx == opt_indx) {
            addQuestion[i].options[op_inx].option = op_value
          }
        })
      }
    })
    setaddQuestion([...addQuestion]);
  };
  // delete question 
  const deleteQuestion = (i) => {
    if (addQuestion.length > 1) {
      const remove = addQuestion.splice(i, 1);
      let list = addQuestion
      if (list.length == 0) {
        setaddQuestion([]);
      } else {

        setaddQuestion([...addQuestion]);
      }
    }
  }
  const goBackQuizCreation = () => {
    let data_list = { ...quiz_detail, questions: addQuestion, quiz_type: quiz_type }
    const response = dispatch(quizDetailAction(data_list))
    if (search) {
      history.push('/quizcreation?view')
    } else {
      history.push('/quizcreation')
    }
  }


  useEffect(() => {
    if (quiz_detail) {
      if (quiz_detail.questions) {
        setaddQuestion([...quiz_detail.questions])
        set_quize_type(quiz_detail.quiz_type)
      }
    }
  }, [quiz_detail]);

  const setQuizeType = (e) => {
    set_quize_type(e.target.value)
  }

  const sing_quiz_type_ans_set = (ques_indx, option_indx) => {
    if (quiz_type == "single_choice_question") {
      addQuestion.map((valu, i) => {
        if (i == ques_indx) {
          valu.options.map((val, op_inx) => {
            if (op_inx == option_indx) {
              addQuestion[i].options[option_indx].is_answer = true;
            } else {
              addQuestion[i].options[op_inx].is_answer = false;

            }
          })
        }
      })
    } else {
      addQuestion.map((valu, i) => {
        if (i == ques_indx) {
          valu.options.map((val, op_inx) => {
            addQuestion[i].options[op_inx].is_answer = false;
          })
          option_indx.forEach((e, idx) => {
            addQuestion[i].options[e].is_answer = true;
          })
        }
      })
    }
    setaddQuestion([...addQuestion]);
  }

  
  const addOption = (index) => {
    addQuestion[index]?.options?.push({
      "id": "",
      "option": "",
      "is_answer": false
    })
    setaddQuestion([...addQuestion]);
  }

  const removeOption  = (questionIndex,optionIndex) =>{
    if (addQuestion.length > 0) {
      const remove = addQuestion[questionIndex].options?.splice(optionIndex, 1);
      let list = addQuestion
      if (list.length == 0) {
        setaddQuestion([]);
      } else {
        setaddQuestion([...addQuestion]);
      }
      
    }
  }

  return (
    <>
      <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 containerHome coursesection">
        <h1>Quiz creation</h1>
        <h3>
          <span> 02</span>
          <span className="title"> Add Quiz Question</span>
        </h3>

        <div className="sectionBorder"></div>
        <Form className="allsameInput" noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="quizDetails">
            <div className="quizQuestion checkBoxInput">
              <h3>Select Quiz Type</h3>
              <div className="form-check form-check-inline mt-3">
                <input disabled={(search == "?view" ? true : false)}
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="single_choice_question"
                  checked={quiz_type === 'single_choice_question'}
                  onChange={setQuizeType}
                />
                <label className="form-check-label mr-5" htmlFor="exampleRadios1">
                  Single choice Question
                    </label>
              </div>

              <div className="form-check form-check-inline">
                <input disabled={(search == "?view" ? true : false)}
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="multiple_choice_question"
                  checked={quiz_type === 'multiple_choice_question'}
                  onChange={setQuizeType}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Multiple Choice Question
                    </label>
              </div>
            </div>
            <div className="sectionBorder"></div>
            <div className="quizQuestion">
              <h3>Add Question here</h3>
              {
                addQuestion.map((val, index) => {
                  let multiple_array_ans = [],is_status=false;
                  if (quiz_type != "single_choice_question") {
                    val?.options.map((e, i) => {
                      if (e.is_answer) {
                        multiple_array_ans.push(i)
                      }
                    }) 
                  } else{
                    val?.options.map((e, i) => {
                      if (e.is_answer) {
                        is_status = i
                      }
                    })
                  }
                  
                  return (
                    <>

                      <div key={`addquestion-${index}`} className="form-group col-md-8 mt-5 quizLable QuizLablePadding">
                        <label className="w-100" htmlFor="quizTitle">Q.{index + 1}. Question Name {index + 1 > 1 ? search ? '' : <span className="closeIcon" onClick={() => deleteQuestion(index)}>+</span> : ''}</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          disabled={(search == "?view" ? true : false)}
                          value={val.question} required
                          onChange={(e) => HandleChange(index, e.target.value)}
                        />
                      </div>

                      <Card key={`QuizCollapse-${index}`} className="QuizCollapse addQuestion">
                        <Form.Row>
                          {
                            val.options ?

                              val.options.map((opt, inx) => {
                                if (inx < 2) {
                                  return (<> <Form.Group key={`less_than_2-${inx}`}
                                    className="col-md-3 optionOne"
                                    as={Col}
                                    controlId="formGridZip"
                                  >
                                    <Form.Label>Option {inx + 1}</Form.Label>
                                    <Form.Control type="text" required value={opt.option} disabled={(search == "?view" ? true : false)}
                                      onChange={(e) => optionHandleChange(index, inx, e.target.value)} /> 
                                  </Form.Group></>)
                                }
                              })

                              : ''
                          }
                        </Form.Row>

                        <Form.Row>
                          {
                            val.options ?
                              val.options.map((opt, inx) => {
                                if (inx >= 2) {
                                  return (<> <Form.Group key={`greather_than_2-${inx}`}
                                    className="col-md-3 optionOne"
                                    as={Col}
                                    controlId="formGridZip"
                                  >
                                    <Form.Label>Option {inx + 1}</Form.Label>
                                    <Form.Control type="text" required value={opt.option} disabled={(search == "?view" ? true : false)}
                                      onChange={(e) => optionHandleChange(index, inx, e.target.value)} />  <span className="closeIcon removeoption remove_css_add" onClick={() => removeOption(index,inx)}>✕</span>
                                  </Form.Group></>)
                                }
                              }) 
                              : ''
                          }
                        </Form.Row>
                        <Form.Row>
                        <Form.Group
                          as={Col}
                          md="3"
                          className="pr-1 QuizLablePadding"
                        >
                          <Form.Label className="answerQuiz">Answer</Form.Label>
                          {quiz_type == "single_choice_question" ?
                            <div className="select_input" >
                              <Form.Control as="select" disabled={(search == "?view" ? true : false)} required value={is_status} onChange={(e) => sing_quiz_type_ans_set(index, e.target.value)} >
                                <option>Select Option</option>{val.options[0].is_answer}
                                {val.options.map((e, inx) => <option key={`ans-${inx}`} value={inx}>option {inx + 1}</option>)}
                              </Form.Control>
                            </div> : <div className="select_input">

                              <Select
                                mode="multiple" disabled={(search == "?view" ? true : false)}
                                style={{ width: '100%' }} required
                                placeholder="select option"
                                onChange={(e) => sing_quiz_type_ans_set(index, e)}
                                defaultValue={multiple_array_ans}
                                optionLabelProp="label"
                                className="form-control"
                              >
                                {val.options.map((e, inx) => <Option key={`sing_quiz-${inx}`} label={inx + 1} value={inx}>
                                  <div className="demo-option-label-item">
                                    option {inx + 1}
                                  </div>
                                </Option>)}
                              </Select>
                            </div>
                          }
                        </Form.Group>
                      {search =="?view" ? '': <Form.Group className="mt-2 mb-4 ml-3">
                      <a onClick={()=>addOption(index)} className="add_link">Add option</a>
                    </Form.Group>}
                      </Form.Row>
                      </Card>
                    </>

                  )
                })
              }

              {/*  */}

              <div className="addQuizbtn">
                {search ? <><div className="mr-9"></div></> :
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={addQuizQuestion}
                  >
                    + Add Question
                      </button>
                }
                <div>

                  <button
                    type="button"
                    className="btn btn-link backQuizQuestion  mr-3"
                    onClick={goBackQuizCreation}
                  >
                    Back
                        </button>
                  {search ? <></> :
                    quiz_detail.id ?
                      <button
                        type="button"
                        className="btn btn-primary ml-auto saveQuizQuestion"
                        type="submit"
                      >
                        Update
                        </button>
                      : <button
                        type="button"
                        className="btn btn-primary ml-auto saveQuizQuestion"
                        type="submit"
                      >
                        Save
                        </button>
                  }

                </div>
              </div>

            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default QuizAdd;