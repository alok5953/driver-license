import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import deleteIcon from "../../../Images/delete.svg";
import table_dot from "../../../Images/table_dot.svg";
import { minuteToHourConvert, minuteToSecondConvert, secondToMinuteOrHourConvert } from '../../../Utils/Util'
import play_icon from "../../../Images/play_icon 1.svg";
import edit from "../../../Images/edit.svg";
import file from "../../../Images/file.svg"; 
import closeblack from "../../../Images/close_black.svg";
import Modal from "react-bootstrap/Modal";
import { Link, useHistory } from "react-router-dom";
import "./CourseModule.css";
import { addCoureModuleAction, deleteCourseModuleAction, courseModuleReorderAction, updateCourseModuleAction, getCourseModuleByIdAction,  getCourseModuleListAllAction, getQuizQuestionListAction, getSecurityQuestionListAction, courseModuleDetailAction, addGrapesjsAction, courseModuleListAction,  saveCourseModuleTypingDnaAction, saveSecurityQuestionCourseModuleAction,  updateCourseModuleSecurityQuestionAction, quizDetailIdAction, securityDetailAction,  updateCourseModuleAudioAction, uploadCourseModuleDocsAction, deleteCourseModuleDocsAction } from "../../../Redux/Actions";

import 'antd/dist/antd.css'; 
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import ReactAudioPlayer from 'react-audio-player';

const CourseModule = (props) => {
  let search = props.location.search;
  const dispatch = useDispatch()
  const history = useHistory()
  const [security_question_time, set_security_question_time] = useState(45);
  const course_id = useSelector(state => { return state.courseReducer?.courseId?.data?.id })
  // const [course_id, set_course_id] = useState('02a05f7a-53eb-497a-9043-8d9fb4331493');
  const [moduleList, setModuleList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [securityQuestionList, setSecurityQuestionList] = useState([]);
  const onClick = () => setShowResults(!showResults);
  const [showAddModule, setShowAddModule] = useState(false);
  const [pageNo, setPageno] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [count, setCount] = useState(1);

  const handleAddModule = () => {
    let checkCount = 0;
    moduleList.map((value) => {
      if (value.id === "") {
        swal({
          title: "Error!",
          text: 'Please save previous value',
          icon: "error",
          timer: 6000
        });
        return false
      }
      checkCount++;
    })
    if (checkCount === moduleList.length) {

      setShowAddModule(!showAddModule); if (showAddModule == false) { setShowResults(false) }
    }
  };
  const [add_module_name, set_add_module_name] = useState('');
  const [completion_time, set_completion_time] = useState('');
  const [selectQuizList, setSelectQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAudio, setShowAudio] = useState(false);
  const handleAudioShow = (id, audio_url) => { setShowAudio(true); setSelectedAudioModuleId(id); setAudioURL(audio_url) };
  const handleAudioClose = () => setShowAudio(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedAudioName, setSelectedAudioName] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [selectedAudioModuleId, setSelectedAudioModuleId] = useState('')
 
  const [ShowDoc, setShowDoc] = useState(false);
  const handleDocUploadShow = (id, course_module_documents) => {setShowDoc(true); setSelectedDocModuleId(id); setDocList(course_module_documents);}
  const handleDocUploadClose = () => {setShowDoc(false); setSelectedDoc([]);setSelectedDocModuleId('');setDocList([]);setSelectedDocName('')}
  const [selectedDocName, setSelectedDocName] = useState('');
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [selectedDocView, setSelectedDocView] = useState([]);
  const [selectedDocModuleId, setSelectedDocModuleId] = useState('')
  const [docList, setDocList] = useState([]);

  const [selectSecurityList, setSelectSecurityList] = useState([]);
  const [selectedSecurity, setSelectedSecurity] = useState([]);
  const [showSecurity, setShowSecurity] = useState(false);
  const handleSecurityShow = () => setShowSecurity(true);
  const handleSecurityClose = () => setShowSecurity(false);
  const [courseModuleSecurityQuestionId, setCourseModuleSecurityQuestionId] = useState('');
  const [securityQuestionIndex, setSecurityQuestionIndex] = useState('');
  const [quizIndex, setQuizIndex] = useState('');
  const [courseModuleQuizId, setCourseModuleQuizId] = useState('');


  const [customCourseShow, setcustomCourseShow] = useState(false);
  const handlecustomCourseClose = () => setcustomCourseShow(false);
  const handlecustomCourseShow = () => setcustomCourseShow(true);

  useEffect(() => {
    if (course_id) {
      getAllCourseModuleList(course_id,pageNo,perPage)
    }
  }, [course_id])

    // pagination
    const pageHandler = (page_no,offset) => {
     
      setPageno({ page_no: page_no })
      setPerPage(offset)
      getAllCourseModuleList(course_id,pageNo,perPage)
    }
  // get module
  const getAllCourseModuleList = async (course_id,pageNo,size) => {
    try{
      setPageno(pageNo)
      const response = await dispatch(getCourseModuleListAllAction(course_id,pageNo,size));
      const allCourseModuleResponse = response?.payload;
      // Check this once component object saved in db is finalized 
      if (allCourseModuleResponse) {
        if (allCourseModuleResponse.data) {
          if (allCourseModuleResponse.data.code == 200) {
            const arrange = allCourseModuleResponse.data.data.rows.sort((a, b) => { return a.sequence_number - b.sequence_number })
            setModuleList(arrange)
            if (allCourseModuleResponse?.data?.data?.count) {
              setCount(allCourseModuleResponse?.data?.data?.count)
            } else{
              setCount([])
            }
            dispatch(courseModuleListAction(arrange))
           
          } else {
            swal({
              title: "Error!",
              text: allCourseModuleResponse.data.message,
              icon: "error",
              timer: 6000
            });
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

  

  // get Security Questions 
  const getSecurityQuestions = async (security_question_id) => {
    try{
      const response = await dispatch(getSecurityQuestionListAction())
      const securiteQuestionList = response?.payload;
      if (securiteQuestionList) {
        if (securiteQuestionList.data) {
          if (securiteQuestionList.data.code == 200) {
          
            // changing key name "question"  to "title"
            const data = changeKeyObjects(securiteQuestionList.data.data, 'security')
            setSelectSecurityList(data)


            if (security_question_id) {
              var result = await dispatch(getCourseModuleByIdAction(security_question_id))
              result = result?.payload;
              setCourseModuleSecurityQuestionId(security_question_id)
              if (result?.data?.code == 200) {
                let list = [];
                if (result?.data?.data?.questions_group?.questions.length > 0) {
                 
                  result?.data?.data?.questions_group?.questions.map((val, i) => {
                    list.push(val)
                  })
                }
                setSelectedSecurity([])
                setSelectedSecurity(list)
              }
              handleSecurityShow()
            } else {
              setSelectedSecurity([])
              handleSecurityShow()
            }
          } else {
            swal({
              title: "Error!",
              text: securiteQuestionList.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    } 
    catch(err){
      if(err.response.data.code===401){
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

  // get Quiz Questions 
  const getQuizQuestions = async (quiz_id) => {
    try{
      const response = await dispatch(getQuizQuestionListAction())
      const quizQuestionList = response?.payload;
      if (quizQuestionList) {
        if (quizQuestionList.data) {
          if (quizQuestionList.data.code == 200) {
            const data = changeKeyObjects(quizQuestionList.data.data, 'quiz')
            setSelectQuizList(data)

            if (quiz_id) {

              var result = await dispatch(getCourseModuleByIdAction(quiz_id))
              result = result?.payload;
              setCourseModuleQuizId(quiz_id)
              if (result?.data?.code == 200) {

                setSelectedQuiz([])
                setSelectedQuiz(result?.data?.data)
              }
              handleShow()
            } else {
              setCourseModuleQuizId('')
              setSelectedQuiz([])
              handleShow()
            }
          } else {
            swal({
              title: "Error!",
              text: quizQuestionList.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    }  catch (err) {
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


  // edit module : save compid 
  const editModule = async (id, type, index) => {
    if (moduleList.length > 0) {

      if (type == 'grapejs') {
        const response = dispatch(courseModuleDetailAction(id))
        if (response?.payload.data) {
          history.push('/courses/editcourseaccordion')
        }
      }
      if (type == "quiz") {
        let quiz_id = id
        getQuizQuestions(quiz_id)
        setQuizIndex(index)
      }
      if (type == "security_questions") {
        let security_question_id = id
        getSecurityQuestions(security_question_id)
        setSecurityQuestionIndex(index)
      }
      if (type == "typing_dna") {

      }
    }
  }

  // delete module
  const deleteModule = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete course module!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          const response = await dispatch(deleteCourseModuleAction(id));
          const deleteCourseModuleResponse = response?.payload;
          if (deleteCourseModuleResponse) {
            if (deleteCourseModuleResponse.data) {
              if (deleteCourseModuleResponse.data.code == 200) {
                swal({
                  title: "Success!",
                  text: deleteCourseModuleResponse.data.message,
                  icon: "success",
                  timer: 3000
                });

                getAllCourseModuleList(course_id,pageNo,perPage)
              } else {
                swal({
                  title: "Error!",
                  text: deleteCourseModuleResponse.data.message,
                  icon: "error",
                  timer: 3000
                });
              }
            }
          }
        }
      })
      .catch (function(err) {
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

  }


  // replace key of security questions and quiz to name 
  const changeKeyObjects = (arr, type) => {
    let newArray = [...arr];
    newArray.forEach((obj, index) => {
      obj = {
        ...newArray[index],
        name: newArray[index].question || newArray[index].title,
        module_type: type,
        course_id: course_id,
      }
      newArray[index] = obj
    })
    return newArray
  }

  const sequence_number_update = (obj) => {
    const length = moduleList.length
    let newObj = { ...obj };

    newObj = {
      ...obj,
      sequence_number: length + 1
    }
    return newObj
  }


  // handle save completion time for moduleList 
  const set_completion_time_modules = (e, index) => {
    const value = e.target.value;

      
      if(!e.target.value){
        swal({
          title: "Error!",
          text: 'Please set completion time ',
          icon: "error",
          timer: 6000
        });
        return false
      }
  
      if (moduleList[index]) {
        let newArray = [...moduleList];
        newArray[index] = { ...newArray[index], completion_time: value }
        setModuleList(newArray)
      }
    
  }

  // handle save button on Add Module 
  const handleSaveInputModule = async () => {
    try{
      if (!add_module_name) {
        swal({
          title: "Error!",
          text: 'Please set module name ',
          icon: "error",
          timer: 6000
        });
        return false
      }
      if (!completion_time) {
        swal({
          title: "Error!",
          text: 'Please set completion time ',
          icon: "error",
          timer: 6000
        });
        return false
      }
      if(parseInt(completion_time)>= parseInt(1) && parseInt(completion_time)<parseInt(9999)) {
      
        if (add_module_name && completion_time) {
          const sequence_number = moduleList.length++
          let times = await minuteToSecondConvert(completion_time)
      
          // let d = new Date();
          // times = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${times}`).toISOString()
        
          const data = {
            "name": add_module_name,
            "completion_time": times,
            "module_type": "grapejs",
            "course_id": course_id,
            "gjs-components": "[]",
            "gjs-styles": "[]"
          }

          const response = await dispatch(addGrapesjsAction(data));
          const saveModuleDetailSuccess = response?.payload;

          if (saveModuleDetailSuccess) {
            if (saveModuleDetailSuccess.data) {
              if (saveModuleDetailSuccess.data.code == 200) {
                set_add_module_name('');
                set_completion_time('')
                swal({
                  title: "Success!",
                  text: saveModuleDetailSuccess.data.message,
                  icon: "success",
                  timer: 3000
                });
                getAllCourseModuleList(course_id,pageNo,perPage)
                setShowAddModule(false)
                set_add_module_name('');
                //set_compltion_value('')
              } else {
                swal({
                  title: "Error!",
                  text: saveModuleDetailSuccess.data.message,
                  icon: "error",
                  timer: 6000
                });
              }
            }
          }
        }
      } else{
        swal({
          title: "Error!",
          text: 'Enter valid completion time',
          icon: "error",
          timer: 6000
        });
        return false
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

  // handle radio security and quiz
  const handleCheckBoxSelect = (e, index) => {
    const name = e.target.name;
    let secu_arr_list;
    if (name == 'custom-radio-btn-security') {
      if (e.target.checked) {
        let val = selectedSecurity.some(el => el.id === selectSecurityList[index].id)
        if (!val) {
          secu_arr_list = selectSecurityList[index]
          setSelectedSecurity([...selectedSecurity, secu_arr_list]);
        }
      } else {
        var index = selectedSecurity.findIndex(function (o) {
          return o.id === selectSecurityList[index].id;
        })
        if (index !== -1) selectedSecurity.splice(index, 1);
       
        setSelectedSecurity([...selectedSecurity]);
      }
    
    }
    if (name == 'custom-radio-btn-quiz') {
      var quizQuestion = selectQuizList[index]
      setSelectedQuiz(quizQuestion);
    }
  }
  
  // add security question to module list
  const handleAddSecurityQuestion =async () => {
    let checkCount = 0;
    if (showAddModule) {
      swal({
        title: "Error!",
        text: 'Please save previous value',
        icon: "error",
        timer: 6000
      });
      return false
    } else {
      moduleList.map((value) => {
        if (value.id === "" || showAddModule) {
          swal({
            title: "Error!",
            text: 'Please save previous value',
            icon: "error",
            timer: 6000
          });
          return false
        }
        checkCount++
      })
    }
    if (checkCount == moduleList.length) {
      if (selectedSecurity) {
        if (selectedSecurity.length==0) {
          swal({
            title: "Error!",
            text: "Please select at least one question",
            icon: "error",
            timer: 6000
          });
          return false;
        }
        let d = new Date();
        let times
        let second = security_question_time * selectedSecurity.length
        times = second;
        // let res = await secondToMinuteOrHourConvert(second)
        // times = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${res}`).toISOString()
     
        moduleList.push({
          'id': '', 'name': 'Security Question', 'module_type': 'security_questions',
          "sequence_number": '',
          "completion_time": times,
          'questions': selectedSecurity, "sub_module_id": ""
        })
        handleSecurityClose()
      }
    }

  }

  //add quiz question to module list 
  const handleAddQuizQuestion = () => {
    try{
      let checkCount = 0;
      if (showAddModule) {
        swal({
          title: "Error!",
          text: 'Please save previous value',
          icon: "error",
          timer: 6000
        });
        return false
      } else {
        moduleList.map((value) => {
          if (value.id === "" || showAddModule) {
            swal({
              title: "Error!",
              text: 'Please save previous value',
              icon: "error",
              timer: 6000
            });
            return false
          }
          checkCount++;
        })
      }
      if (checkCount == moduleList.length) {
        if (selectedQuiz) {
          moduleList.push({
            'id': '', 'quiz_id': selectedQuiz.id, 'name': selectedQuiz.title, "sub_module_id": '', 'module_type': selectedQuiz.module_type,
            "sequence_number": '',
            "completion_time": '',
            'questions': selectedQuiz.questions
          })
          handleClose()
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

  // add Security questions array to db
  const handleSaveQuizSecurityModule = async (index) => {
    var module_data_list;
    let seq_ques_id = [];
    if (!moduleList[index].id) {
 
      if (moduleList[index].module_type !== 'typing_dna' && moduleList[index].module_type !=="security_questions") {
        if (!moduleList[index].completion_time) {
          swal({
            title: "Error!",
            text: 'Please set completion time ',
            icon: "error",
            timer: 6000
          });
          return false
        }
        if(parseInt(moduleList[index].completion_time)>= parseInt(1) && parseInt(moduleList[index].completion_time)<parseInt(9999)) {}else{
          swal({
            title: "Error!",
            text: 'Enter valid completion time',
            icon: "error",
            timer: 6000
          });
          return false
        }
      }
      if (moduleList[index].module_type == 'security_questions') {
        moduleList[index].questions.map((val) => {
          seq_ques_id.push(val.id)
        })
 
        module_data_list = {
          "name": moduleList[index].name ? moduleList[index].name : add_module_name,
         
          "completion_time": moduleList[index].completion_time,
          "course_id": course_id,
          "security_questions": moduleList[index].quiz_id ? moduleList[index].quiz_id : seq_ques_id
        }
      } else if (moduleList[index].module_type == 'typing_dna') {
        module_data_list = {
          "name": moduleList[index].name ? moduleList[index].name : add_module_name,
         
          "course_id": course_id
        }
      } else {
        let times = await minuteToSecondConvert(moduleList[index].completion_time)
        // let d = new Date();
        // times = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${times}`).toISOString()
        module_data_list = {
          "name": moduleList[index].name ? moduleList[index].name : add_module_name,
          "completion_time": times,
          "module_type": moduleList[index].module_type,
          "course_id": course_id,
          "sub_module_id": moduleList[index].quiz_id ? moduleList[index].quiz_id : seq_ques_id
        }
      }
      let response;
      const data = sequence_number_update(selectedSecurity)
      if (moduleList[index].module_type == 'security_questions') {
        response = await dispatch(saveSecurityQuestionCourseModuleAction(module_data_list));
      } else if (moduleList[index].module_type == 'typing_dna') {
        response = await dispatch(saveCourseModuleTypingDnaAction(module_data_list));
      } else {
        response = await dispatch(addCoureModuleAction(module_data_list));
      }
      const saveSecuritySuccess = response?.payload;

      if (saveSecuritySuccess) {
        if (saveSecuritySuccess.data) {
          if (saveSecuritySuccess.data.code == 200) {
            handleSecurityClose()
            swal({
              title: "Success!",
              text: saveSecuritySuccess.data.message,
              icon: "success",
              timer: 3000
            });
            getAllCourseModuleList(course_id,pageNo,perPage)
          } else {
            swal({
              title: "Error!",
              text: saveSecuritySuccess.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    }
  }

  const handleCancelModule = (index) => {
    if (!moduleList[index].id) {
      moduleList.splice(index, 1);
    }
    setModuleList([...moduleList])
  }

  const handleCancelInputModule = () => {
    setShowAddModule(false)
  }


  const [showEditModule, setShowEditModule] = useState(false);
  const [showEditIndexModule, setShowEditIndexModule] = useState(false);
  const editSection = (index) => {
    setShowEditModule(true)
    setShowEditIndexModule(index)
  };

  // update module title in list
  const updateCourseTitle = (value, index) => {
    if (moduleList[index]) {
      let newArray = [...moduleList];
      newArray[index] = { ...newArray[index], name: value }
      setModuleList(newArray)
    }
  }
  // update module section
  const updateModulesection = async (index, id) => {
    try {
    
      if (!moduleList[index].completion_time) {
        swal({
          title: "Error!",
          text: "Please insert competion time",
          icon: "error",
          timer: 6000
        });
        return false;
      }
      if (!moduleList[index].name) {
        swal({
          title: "Error!",
          text: "Please insert title",
          icon: "error",
          timer: 6000
        });
        return false;
      }
      if(parseInt(moduleList[index].completion_time)>= parseInt(0) && parseInt(moduleList[index].completion_time)<parseInt(9999)) {}else{
        swal({
          title: "Error!",
          text: 'Enter valid completion time',
          icon: "error",
          timer: 6000
        });
        return false
      }
      setShowEditModule(false)
      let times;
      setShowEditIndexModule('')
      if (moduleList[index].module_type === "security_questions") {
        if (selectedSecurity.length==0) {
          swal({
            title: "Error!",
            text: "Please select at least one question",
            icon: "error",
            timer: 6000
          });
          return false;
        }
        let d = new Date();
       
        let second = security_question_time * selectedSecurity.length
        times = second;

     
        // times = new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${res}`).toISOString()
       
      
      } else {
        
        // let d = new Date();
        times = await minuteToSecondConvert(moduleList[index].completion_time)
       
      }
      let value = {
      
        "name": moduleList[index].name ? moduleList[index].name : add_module_name,
        "completion_time": times
      }
     
      const response = await dispatch(updateCourseModuleAction(id, value));
      const updateSecuritySuccess = response?.payload;
      if (updateSecuritySuccess) {
        if (updateSecuritySuccess.data) {
          if (updateSecuritySuccess.data.code == 200) {
            handleSecurityClose()
            swal({
              title: "Success!",
              text: updateSecuritySuccess.data.message,
              icon: "success",
              timer: 3000
            });
            getAllCourseModuleList(course_id,pageNo,perPage)
          } else {
            swal({
              title: "Error!",
              text: updateSecuritySuccess.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    }
    catch (err) {
      console.log(err)
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  }
  // update quiz question

  const updateQuizQuestion = async () => {
    try{
      let seq_ques_id = [];

      let value = {
        "name": selectedQuiz.name ? selectedQuiz.name : add_module_name,
        "completion_time": moduleList[quizIndex].completion_time,
        "sub_module_id": selectedQuiz.id ? selectedQuiz.id : seq_ques_id
      }

      const response = await dispatch(updateCourseModuleAction(courseModuleQuizId, value));
      const updateQuizSuccess = response?.payload;
      if (updateQuizSuccess) {
        if (updateQuizSuccess.data) {
          if (updateQuizSuccess.data.code == 200) {
            handleClose()
            swal({
              title: "Success!",
              text: updateQuizSuccess.data.message,
              icon: "success",
              timer: 3000
            });
            getAllCourseModuleList(course_id,pageNo,perPage)
          } else {
            getAllCourseModuleList(course_id,pageNo,perPage)
            swal({
              title: "Error!",
              text: updateQuizSuccess.data.message,
              icon: "error",
              timer: 6000
            });
          }
          setCourseModuleQuizId('')
          setSelectedQuiz([])
        }
      }
    }catch (err) {
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

  // update course module security question 
  const updateCourseModuleSecurityQuestion = async () => {
    try{
      let seq_qe_id = [];
      selectedSecurity.map((val) => {
        seq_qe_id.push(val.id)
      })
      let second = security_question_time * selectedSecurity.length
      let value = {
        "name": moduleList[securityQuestionIndex].name,
        "completion_time": second,
        "security_questions": seq_qe_id
      }
      const response = await dispatch(updateCourseModuleSecurityQuestionAction(courseModuleSecurityQuestionId, value));
      const updateSecuritySuccess = response?.payload;
      if (updateSecuritySuccess) {
        if (updateSecuritySuccess.data) {
          if (updateSecuritySuccess.data.code == 200) {
            handleSecurityClose()
            swal({
              title: "Success!",
              text: updateSecuritySuccess.data.message,
              icon: "success",
              timer: 3000
            });
            getAllCourseModuleList(course_id,pageNo,perPage)
            setCourseModuleSecurityQuestionId('')
            setSelectedSecurity([])
          } else {
            getAllCourseModuleList(course_id,pageNo,perPage)
            swal({
              title: "Error!",
              text: updateSecuritySuccess.data.message,
              icon: "error",
              timer: 6000
            });

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

  //  Save and Next
  const handleNext = () => {
    if (moduleList) {
        dispatch(courseModuleListAction(moduleList))
        dispatch(courseModuleDetailAction(moduleList[0]?.id))
        var type = moduleList[0]?.module_type
        dispatch(quizDetailIdAction(moduleList[0]?.sub_module_id))
        dispatch(securityDetailAction(moduleList[0]?.sub_module_id))
  
        if (type == 'quiz') {
          history.push('/courses/previewquiz')
        }
        if (type == 'grapejs') {
          history.push('/courses/editcourseaccordion')
        }
        if (type == 'security_questions') {
          history.push('/courses/previewsecurity')
        }
      
    }
  }
//  doc file handle 
  const handleDocFileSelect = (e) => {
    var file = e.target.files[0];
    var name = e.target.files[0]?.name;
    var type = e.target.files[0]?.type;
    var size = e.target.files[0]?.size;
    if (size > 1000000) {
      swal({
        title: "Error!",
        text: 'Max file size allowed is 1Mb',
        icon: "error",
        timer: 6000
      });
      return false
    }

    setSelectedDoc(file)
    setSelectedDocName(name)
    
  }

  //  uploaded file delete
  const handleFileDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the video ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          const response = await dispatch(deleteCourseModuleDocsAction(id));
          const deleteDocResponse = response?.payload;
          if (deleteDocResponse) {
            if (deleteDocResponse.data) {
              if (deleteDocResponse.data.code == 200) {
                handleDocUploadClose()
                swal({
                  title: "Success!",
                  text: deleteDocResponse.data.message,
                  icon: "success",
                  timer: 3000
                });
                getAllCourseModuleList(course_id,pageNo,perPage)
              } else {
                swal({
                  title: "Error!",
                  text: deleteDocResponse.data.message,
                  icon: "error",
                  timer: 3000
                });
              }
            }
          }
        }
      })
      .catch(function (err) {
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
  }

//  doc files upload 
  const handleDocFileUpload = async(e) =>{
    try{
   
      if (selectedDoc.length == 0){
        swal({
          title: "No file selected!",
          text: 'Please select a file to upload',
          icon: "error",
          timer: 3000
        });
        return false;
      }
      e.preventDefault();

      const formData = new FormData();
      formData.append(
        "file",
        selectedDoc,
        selectedDocName,
      )
   

      formData.append('module_id', selectedDocModuleId)

      const response = await dispatch(uploadCourseModuleDocsAction(formData));
      const docUpdateSuccess = response?.payload;
      if (docUpdateSuccess) {
        if (docUpdateSuccess.data) {
          if (docUpdateSuccess.data.code == 200) {
            
            handleDocUploadClose()
            swal({
              title: "Success!",
              text: docUpdateSuccess.data.message,
              icon: "success",
              timer: 3000
            });
            getAllCourseModuleList(course_id,pageNo,perPage)
          } else {
            swal({
              title: "Error!",
              text: docUpdateSuccess.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    }  catch (err) {
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

  //  select file 
  const handleFileSelect = (e) => {
    var file = e.target.files[0];
    var name = e.target.files[0]?.name;
    var type = e.target.files[0]?.type;
    var size = e.target.files[0]?.size;
    if (size > 5000000) {
      swal({
        title: "Error!",
        text: 'Max audio file size allowed is 5Mb',
        icon: "error",
        timer: 6000
      });
      return false
    }

    setSelectedAudio(file)
    setSelectedAudioName(name)

  }

  const handleFileUpload = async (e) => {
    try{
      e.preventDefault();

      const formData = new FormData();
      formData.append(
        "file",
        selectedAudio,
        selectedAudioName,
      )
 
      formData.append('module_id', selectedAudioModuleId)

      const response = await dispatch(updateCourseModuleAudioAction(formData));
      const audioUpdateSuccess = response?.payload;
      if (audioUpdateSuccess) {
        if (audioUpdateSuccess.data) {
          if (audioUpdateSuccess.data.code == 200) {
            handleAudioClose()
            swal({
              title: "Success!",
              text: audioUpdateSuccess.data.message,
              icon: "success",
              timer: 3000
            });
            getAllCourseModuleList(course_id,pageNo,perPage)
            setAudioURL('response')
          } else {
            swal({
              title: "Error!",
              text: audioUpdateSuccess.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    }  catch (err) {
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

  // add typing Dna
  const addTypingDna = () => {
    let checkCount = 0;
    if (showAddModule) {
      swal({
        title: "Error!",
        text: 'Please save previous value',
        icon: "error",
        timer: 6000
      });
      return false
    } else {

      moduleList.map((value) => {
        if (value.id === "") {
          swal({
            title: "Error!",
            text: 'Please save previous value',
            icon: "error",
            timer: 6000
          });
          return false
        }
        checkCount++
      })
    }
    const length = moduleList.length

    if (checkCount == moduleList.length) {
      setModuleList([...moduleList, {
        'id': '', 'name': 'Typing Dna', 'module_type': 'typing_dna',
        "sequence_number":"",
        "completion_time": 0,
        'questions': [], "sub_module_id": ""
      }])
    }
  }

  // reoder set
  const courseModuleReOrderSet = async (sourceId, destId) => {
    try {
      const response = await dispatch(courseModuleReorderAction(sourceId, destId));
      const deleteCourseModuleResponse = response?.payload;
      if (deleteCourseModuleResponse) {
        if (deleteCourseModuleResponse.data) {
          if (deleteCourseModuleResponse.data.code == 200) {
            swal({
              title: "Success!",
              text: deleteCourseModuleResponse.data.message,
              icon: "success",
              timer: 3000
            });

            getAllCourseModuleList(course_id,pageNo,perPage)
          } else {
            swal({
              title: "Error!",
              text: deleteCourseModuleResponse.data.message,
              icon: "error",
              timer: 3000
            });
          }
        }
      }

    }
    catch (err) {
      if (err.response.data.code === 401) {
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
  const handleUpdateModuleCancel = (index)=>{
 
    if(!moduleList[index].completion_time){
      swal({
        title: "Error!",
        text: 'Please set completion time ',
        icon: "error",
        timer: 6000
      });
      return false
    }
    setShowEditModule(false)
    setShowEditIndexModule('')
  }
  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 coursesection">
        {/* <h2 className="heading_text">Course creation</h2>
                    <h4 className="table_of_content">02<span>Table of content</span></h4> */}
        <h1>Course creation</h1>
        <h3>
          <span> 02</span>
          <span className="title"> Table of content</span>
        </h3>

        <div className="sectionBorder"></div>
        <div className="pre_licensing">
          <div className="add_quiz_btn">
            <div className="licensing_course">
              <p className="five_hours">5 hours Pre-licensing course</p>
              <div className="add_buttons ">
                {search ? "" : <>
                  <p className="security_tab" onClick={() => getSecurityQuestions('')} >+Add Security Question</p>
                  <p className="security_tab"  onClick={() => addTypingDna('')}  >+Add TypingDNA Test</p></>}
              </div>
            </div>
            <div className="add_buttons">
              {search ? "" : <><button onClick={e => getQuizQuestions()}>+ Add Quiz</button>
                <button onClick={handleAddModule}>+ Add Module</button></>}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-borderless courses_table course_module_table">
              <thead className="thead-light">
                <tr>
                  <th className="module_width"></th>
                  <th>Module Name</th>
                  <th>Completion Time</th>
                  {search ? "" : <> <th>Action</th></>}
                </tr>
              </thead>
              <tbody>
                {/* Module List  */}
                {moduleList ?
                  moduleList.map((mod, index) => {
                    let second = Number(mod.completion_time);
                    var h = Math.floor(second / 3600);
                    var m = Math.floor(second% 3600 / 60);
                    var s = Math.floor(second% 3600 % 60);
                    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "00";
                    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "00";
                    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "00";                    
                    if(mDisplay<10 && mDisplay>0){
                      mDisplay = '0'+mDisplay
                    }
                    if(hDisplay<10 && hDisplay>0){
                      hDisplay = '0'+hDisplay
                    }
                  
                    let  com_time = hDisplay +":"+ mDisplay +":" +sDisplay; 
                    var time_splice = com_time.split(':'); // split it at the colons
                    // minutes are worth 60 seconds. Hours are worth 60 minutes.
                    let seconds_vale = time_splice; 
                    let come_time = Math.floor(seconds_vale / 60);
                    return (
                      <tr key={index + 1}>
                        <td>
                          <img
                            src={table_dot}
                            className="table_dot_icon"
                            alt="Image"
                          />
                          {mod.sequence_number}
                        </td>
                        <td > {showEditModule && index == showEditIndexModule ?
                          <div className="form-group input_box_css">
                            <Form.Control
                              type="text"
                              placeholder="Enter module name ..."
                              name='add_module_name'
                              value={mod.name}
                              className="col-sm"
                              onChange={e => updateCourseTitle(e.target.value, index)}
                            />
                          </div> : <>{search ?<><div  className="width_data">{mod.name}</div></> :<a  onClick={(e) => { editModule(mod.id, mod.module_type, index) }} className="width_data">{mod.name}</a>}</>}</td>
                        <td>{

                          <div className="form-group table_input_drop_down" >

                            {mod.module_type === 'typing_dna' ? "" : showEditModule && index == showEditIndexModule || mod.sub_module_id == '' ? <>{mod.module_type === 'security_questions'?<div className="input_dropdown"><a >{com_time? com_time: 0}</a></div>:<div className="input_dropdown inputnewwidth">
                              <input type="number" className="font_size"   min="1"  max="9999" name={`${index}`} onChange={e =>
                               set_completion_time_modules(e, index) 
                              }  /> <p>(Minute)</p></div>}
                            </> :
                              <><div className="input_dropdown"><a >{com_time? com_time:0}</a></div></>}

                            {/* {mod.sub_module_id == '' ?<><div className="input_dropdown"><input type="number" min="1" name={`${index}`} value={mod.completion_time} onChange={e => set_completion_time_modules(e, index)} pattern='^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' /> </div></>: <></>} */}
                          </div>

                        }</td>
                        {search ? "" : <>
                          <td>
                            {showEditModule && index == showEditIndexModule ?<> <Button className="save_btn" variant="primary" className="btnSame save_button mr-2" onClick={() => updateModulesection(index, mod.id)}>Update</Button> <Button className="save_btn" variant="danger" className="btnSame save_button" onClick={() =>handleUpdateModuleCancel(index)}>Cancel</Button></> : <>
                              {mod.sub_module_id == '' ?
                                <> <Button className="save_btn save_btn_margin btnSame save_button" variant="primary" onClick={() => handleSaveQuizSecurityModule(index)}>Save</Button>
                                  <Button className="save_btn" variant="danger" className="btnSame save_button" onClick={() => handleCancelModule(index)}>Cancel</Button>
                                </> :
                                <> </>}
                              {mod.module_type === 'typing_dna' ? "" : mod.sub_module_id != '' ?
                                <><div className="tableediticon mr-2"><a onClick={() => editSection(index)}>
                                  <img src={edit} className="table_icon" alt="Image" />
                                </a></div>
                                  <div className="tabledeleteicon">
                                    <a className="tabledeleteicon" onClick={() => { deleteModule(mod.id) }}>
                                      <img src={deleteIcon} className="delete_icon" alt="Image" />
                                    </a>
                                  </div>
                                </> : <></>

                              }
                              {mod.sub_module_id != '' && mod.module_type == 'grapejs' ?
                                <a onClick={(e) => handleAudioShow(mod.id, mod.grapej.audio_description_file_path)} className="icon_position">
                                  <img src={play_icon} className="play_icon" alt="Image" />
                                  {mod?.grapej?.audio_description_file_path ? <span className="table_count_icon1">1</span>: <span className="table_count_icon1">0</span>}
                                </a> : <></>}
                              {/* {mod.sub_module_id != '' && mod.module_type == 'grapejs' ?
                              <a onClick={(e) => handleDocUploadShow(mod.id, mod.grapej.audio_description_file_path)}>
                                <img src={play_icon} className="play_icon" alt="Image" />
                              </a> : <></>}   */}
                            {mod.sub_module_id != '' && mod.module_type == 'grapejs' ?
                              <div className="tableediticon mr-2">
                                <a onClick={()=>handleDocUploadShow(mod.id, mod.course_module_documents)} className="icon_position file_icon">
                                  <img src={file} className="table_icon" alt="Image" />
                                  <span className="table_count_icon">{mod?.course_module_documents.length}</span>
                                </a>
                              </div>
: <></>}

                              {mod.module_type === 'typing_dna' ? mod.sub_module_id != '' ?
                                <>
                                  <div className="typingDnaclass"></div>
                                  <div className="typingDnaclass">
                                    <a onClick={() => { deleteModule(mod.id) }}>
                                      <img src={deleteIcon} style={{"margin-left": "42px"}} className="delete_icon" alt="Image" />
                                    </a></div></> : <></> : ''}
                            </>
                            }
                          </td>
                        </>}
                      </tr>
                    )
                  }) : ''
                }

                {/* Add Module  */}
                {
                  showAddModule ?
                    <tr>
                      <td>
                        <img
                          src={table_dot}
                          className="table_dot_icon"
                          alt="Image"
                        />
                        {moduleList.length + 1}
                      </td>
                      <td>
                        <div className="form-group input_box_css">
                          <Form.Control
                            type="text"
                            placeholder="Enter module name ..."
                            name='add_module_name'
                            value={add_module_name}
                            onChange={(e) => { set_add_module_name(e.target.value) }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-group table_input_drop_down" >
                          <div className="input_dropdown table_input_drop_down1111111 inputnewwidth">
                            <input type="number" min="1" value={completion_time} className="font_size" onChange={e => set_completion_time(e.target.value)} pattern='^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' /><p>(minute) </p>
                          </div><div className="select_input">
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* <button className="save_btn" onClick={handleSaveModule}>Save</button> */}
                        <Button className="btnSame save_button btn btn-primary mr-2" variant="primary" onClick={handleSaveInputModule}>Save</Button>
                        <Button className="save_btn" variant="danger" className="btnSame save_button" onClick={() => handleCancelInputModule(moduleList.length)}>Cancel</Button>
                      </td>
                    </tr> : null
                }
              </tbody>
            </table>
            <div className="mt-3 text-right pageBottom">
            
          </div>

          </div>

          <div className="back_and_save">
            <div className="peview_andpublish">
             
            </div>
            <div className="back_and_save_btn">
              {search ? <Link to={"/courses/coursecreation?view"}>
                <Button className="cancel_btn" variant="secondary">
                  Back
              </Button>
              </Link> : <Link to={"/courses/coursecreation"}>
                <Button className="cancel_btn" variant="secondary">
                  Back
              </Button>
              </Link>}
              
             { search ? '':<Button
                variant="primary" 
                className="btnSame mt-4 add_user save_button"
                onClick={handleNext}
              >Next
              </Button>}
            </div>
          </div>
        </div>

      </div>


      {/* Add Quiz Question model  */}
      <Modal
        className="add_usermodal add_quizmodal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add quiz to Module</Modal.Title>
        </Modal.Header>
        <Modal.Body className="available-items">
          <div className="custom-radio-wrap addnewquizmodal checkcontrol">
            <form>
              {selectQuizList ? selectQuizList.map((quiz, index) => {
                let is_checked = false;
                if (selectedQuiz?.name == quiz.title) {
                  is_checked = true
                }
                return (
                  <div  className="form-group" key={index}>
                    <input id={`id ${index}`} type="radio" name="custom-radio-btn-quiz" checked={is_checked} onChange={(e) => handleCheckBoxSelect(e, index)} />
                    <label className="custom-radio" htmlFor={`id ${index}`} ></label>
                    <span className="label-text">
                      {quiz.title}
                    </span>
                  </div>

                )
              }) : <></>
              }
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
       
          {courseModuleQuizId ?
            <Button
              variant="primary"
              onClick={e => updateQuizQuestion()}
              className="btnSame mt-4 add_user"
              type="submit"
            >
              Update
        </Button> : <Button
              variant="primary"
              onClick={handleAddQuizQuestion}
              className="btnSame mt-4 add_user"
              type="submit"
            >
              Add
          </Button>
          }
          <Button
            className="cancel_btn"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Security Question model  */}
      <Modal className="add_usermodal add_quizmodal"
        show={showSecurity}
        onHide={handleSecurityClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add security question to Module</Modal.Title>
        </Modal.Header>
        <Modal.Body className="available-items">
          <div className="allsameInput pt-3">
            <form>
              {selectSecurityList ? selectSecurityList.map((security, index) => {
                let is_checked = false;
                selectedSecurity.map((val, index) => {
                  if (val.id === security.id) {
                    is_checked = true;
                  }
                }) 
                if(security.is_active){
                  return (
                    <Form.Group
                      as={Col} key={`securityIndex-${index}`}
                      className="w-100"
                    >
                      <div className=" samecheckbox pl-md-3 pt-md-2 text-left">
                        <div className="custom-control custom-checkbox pl-0 text-left">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={`customCheck1${index}`}
                          name="custom-radio-btn-security"
                          checked={is_checked}
                          onChange={(e) => handleCheckBoxSelect(e, index)}
                        />
                        <label
                          className="pl-2 custom-control-label"
                          htmlFor={`customCheck1${index}`}
                        > {security?.question}
  
                        </label>
                        </div>
                      </div>
                    </Form.Group>
                  )
                 
                }
              }) : <></>
              }
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {courseModuleSecurityQuestionId ? <Button
            variant="primary"
            onClick={updateCourseModuleSecurityQuestion}
            className="btnSame mt-4 add_user"
            type="submit"
          >
            Update
          </Button> :
            <Button
              variant="primary"
              onClick={handleAddSecurityQuestion}
              className="btnSame mt-4 add_user"
              type="submit"
            >
              Add
          </Button>}
          <Button
            className="cancel_btn"
            variant="secondary"
            onClick={handleSecurityClose}
          >
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>

      {/* Add Audio for Grapesjs  */}
      <Modal className="add_usermodal add_quizmodal"
        show={showAudio}
        onHide={handleAudioClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Audio to Module</Modal.Title>
        </Modal.Header>
        <Modal.Body className="available-items">
          <div className="allsameInput pt-3">
            {audioURL ?
              <div className="audio_player " >
                <ReactAudioPlayer
                  className=""
                  src={audioURL}
                  autoPlay
                  controls
                />
              </div> : <></>}
            <Form.Group
              as={Col}
              className="w-100 mt-3"
            >
              <div className=" pl-md-1 pt-md-2 mt-4 text-left">
                <input
                  type="file"
                  className="form-control"
                  id={``}
                  name="custom-radio-btn-security"
                  accept=".mp3, .mp4"
                  onChange={(e) => handleFileSelect(e)}
                />
                {/* <label
                    className="pl-2"
                    htmlFor={``}
                  > 'Audio'

                  </label> */}
              </div>             
            </Form.Group>
          </div>

        </Modal.Body>
        <Modal.Footer>
        <Button
                variant="secondary"
                onClick={e => handleFileUpload(e)}
                className="btnSame mt-4 ml-4 add_user btn btn-primary"
                type="submit"
              >
                Upload
              </Button>
              <Button
                variant="secondary"
                onClick={handleAudioClose}
                className="cancel_btn mt-1"             
              >
                Cancel
              </Button>
        </Modal.Footer>

      </Modal>


{/* Handle multiple file upload */}
          {/* modal */}
          <Modal
        className="add_usermodal modal_download course_module"
        show={ShowDoc}
        onHide={handleDocUploadClose}
      >
        <Modal.Body className="p-0">
          <div className="upload_head">
            <input type="file" className="custom-file-input" onChange={(e) => handleDocFileSelect(e)} />
            <div>{selectedDocName?selectedDocName : null}</div>
          </div>
        <div className="table-responsive">
          <table className="table table-borderless user_table w-100">
            <tbody> 
              
              {docList? docList.map((doc, i)=>{
                
                return(
                <> 
                  <tr key={`doc-${i}`} >
                    <td>
                      <img src={file} className="mr-3"/> 
                        {doc.name}
                    </td>
                    <td>
                      <img src={closeblack} onClick={()=>handleFileDelete(doc?.id)} className=""/> 
                    </td>
                  </tr>
                </>
                )
              }) : null}

            </tbody>
          </table>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
                variant="secondary"
                className="btnSame mt-4 mr-4 add_user btn btn-primary"
                onClick={e=>handleDocFileUpload(e)}
              >
                Upload
              </Button>
              <Button
                variant="secondary"
                onClick={handleDocUploadClose}
                className="cancel_btn mt-1"             
              >
                Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseModule;



