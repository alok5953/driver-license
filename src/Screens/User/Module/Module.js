import React, { useCallback, useEffect, useState } from "react";
import { Link,useHistory, useLocation, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import audio_play from "../../../Images/auto_play.svg";
import time_clock from "../../../Images/time_clock.svg";
import downloadblue from "../../../Images/downloadblue.svg";
import file from "../../../Images/file.svg";
import download_icon from "../../../Images/download_icon.svg";
import audioplay1 from "../../../Images/audioplay1.svg";
import swal from "sweetalert";
import { saveAs } from "file-saver";
import "./Module.css";
import { H5PEditorUI, H5PPlayerUI } from '@lumieducation/h5p-react';
import {ContentService} from './services/ContentService';
import { useDispatch, useSelector } from "react-redux";
import { getH5PAction, getModuleByIdAction, logoutUserAction, markCourseModuleCompleteAction, socketConnectAction,socketDisconnectAction, socketEmitResetAllAction, socketEmitStartModuleAction, socketEmitStopModuleAction, socketMarkModuleComplete, tableofContentDetailAction, tableofContentQuizDetailAction, tableofContentSecurityDetailAction } from "../../../Redux/Actions";
import {html, css} from './ModuleConstant';
import ReactHtmlParser from 'react-html-parser';
import { Modal } from "react-bootstrap";

import { secondToMinuteOrHourConvert } from "../../../Utils/Util";

const Module = () => {
  window.document.onkeydown = function(event){
    if (event.keyCode == 116){ 
      event.preventDefault();
    }
    if (event.metaKey && event.keyCode == 82 ){ 
      event.preventDefault();
    }
    if (event.metaKey && event.keyCode == 87){
      event.preventDefault();
    }
  }
  
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const params = useParams();
  // window.history.pushState(null, null, window.location.href);
  // window.onpopstate = function (e) { window.history.pushState('/user/tableofcontent')}

  const [loading, setLoading] = useState(true);
  const socket = useSelector(state=>{return state.userSocketioReducer?.socketConnectSuccess?.socketInstance})
  const module_time_obj = useSelector(state=>{return state.userSocketioReducer?.socketTimerSuccessResponse})
  const [timerCompleted, setTimerCompleted] = useState(false);
  // const module_id = useSelector(state=>{ return state.tableofContentReducer?.tableofContentDetailId?.data?.id});
  const start_module = useSelector(state=>{ return state.userSocketioReducer?.socketTimerSuccessResponse});
  
  const module_id = params?.module_id;
  const course_id = params?.course_id;
  const module_list = useSelector(state=>{ return state.tableofContentReducer?.tableofContentDetailList?.data});

  const [last_module_check, set_last_module_check] = useState(false);
  const [current_module_index, set_current_module_index] = useState('');
 

  const [content_id, set_content_id] = useState('');
  const [grapesjsData, setGrapesjsData] = useState([]);
  const [module_name, set_module_name] = useState('');
  const [audio_path, set_audio_path] = useState('');
  const [audio_player, set_audio_player] = useState('');
  const [complete_only_once, set_complete_only_once] = useState(0);
  const [audio_paused, set_audio_paused] = useState(false);
  const [completion_time,set_completion_time] = useState('');
  const [gethtml, setGetHtml] = useState(html);
  const [getcss, setGetCss] = useState(css);
  const [customModalShow, setcustomModalShow] = useState(false);
  const handlecustomModalClose = () => setcustomModalShow(false);
  const handlecustomModalShow = () => setcustomModalShow(true);
  const [documentList, setDocumentList] = useState([])
  const [module_status, set_module_status] = useState('');
  const [timer_started, set_timer_started] = useState(false)

  const contentService  = new ContentService('/h5p');
  const h5pPlayer = React.useRef(H5PPlayerUI)
  const  onPlayerInitialized = () => {setLoading(false)};
  const [showH5P, setShowH5P] = useState(false);
  const handleClose = () => setShowH5P(false);
  const handleShow  = () => setShowH5P(true);
  const [interval, set_interval] = useState(1000);
  const [h5p_present, set_h5p_present] = useState(false)
  const [context_h5p, set_context_h5p] = useState('');


  useEffect(()=>{
    if(sessionStorage.getItem('userAccessToken')){
        if (module_id ){
          let id = module_id
          getCourseModule(id)
        }
        return () => {
          set_content_id('')
        }
      }
  },[params,socket ])

  useEffect(()=>{
    if (timer_started){
      if(module_time_obj.module_id == module_id && module_time_obj.time <= 0) {
        if (complete_only_once == 0){
          
          dispatch(socketMarkModuleComplete(socket, module_id))
          setTimerCompleted(true)
          set_complete_only_once(1)
        }
      }
    }
  },[module_time_obj])

  useEffect(()=>{
    getH5PId()
  },[gethtml]) 

  useEffect(()=>{
    if (audio_path) {
      let audio = new Audio(audio_path)
      set_audio_player(audio)
    }
  }, [audio_path])

  const handleAudio = ()=>{
    if (audio_player){
      if (audio_player.paused){
        audio_player.play()
        set_audio_paused(false)
      } else {
        audio_player.pause()
        set_audio_paused(true)
      }
    }
  }

  const getH5PId = () => {
   const h5pElement = document?.querySelector('.h5p');
   if (h5pElement) {
    const id = h5pElement?.getAttribute('h5pid');
    if (id) {
      set_h5p_present(true)
      return id
    }
   } else {
    set_h5p_present(false)
     return null
   }
  }

  // get module by id
  const getCourseModule = async (id) => {
    try{
      const response = await dispatch(getModuleByIdAction(id));
      const courseModuleResponse = response?.payload;
      if (courseModuleResponse) {
        if (courseModuleResponse.data) {
          if (courseModuleResponse.data.code == 200) {   
            const data = courseModuleResponse.data
            const {name, completion_time, sequence_number, audio_description_file_path, course_module_documents, users, course_id} = data.data;
           
            if (users[0]?.user_course_module?.status){
              let status = users[0]?.user_course_module?.status
              set_module_status(status)
              if (status == 'IN_PROGRESS'){
                dispatch(socketEmitStartModuleAction( socket, id))
                set_timer_started(true)
              }
            } else {
              dispatch(socketEmitStartModuleAction( socket, id))
              set_timer_started(true)
            }
            setDocumentList(course_module_documents)
            setGrapesjsData(data)
            set_module_name(name)
            set_audio_path(audio_description_file_path)
            const html_data= data?.data['gjs-html']
            const css_data = data?.data['gjs-css']
            setGetHtml(html_data)
            setGetCss(css_data)
            const h5pid = await getH5PId()
            if (h5pid) {
              set_content_id(h5pid)
            }
          } else {
            swal({
              title: "Error!",
              text: courseModuleResponse.data.message,
              icon: "error",
              timer: 6000
            });
            }
          }
        }
    } catch(err){
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params?.course_id}`)
      }
    }
  }

  const handleGrapesjs =  () => {
    var html = <>
              <div className="grapesjsContent">
                <style>
                  {getcss? getcss : ''}
                </style>
                <div onCopy={handleChange} onCut={handleChange} onPaste={handleChange} onContextMenu={handleChange} onSelect={handleChange} >
                {gethtml? ReactHtmlParser(gethtml): <></>}
                {content_id ? handleh5p() : ''}                
                </div>
              </div>
              </>;
    return html;
  }

  const handleh5p = () => {
    if (content_id) {
      try {
        return  (<H5PPlayerUI
          ref={h5pPlayer}
          contentId={content_id}
          loadContentCallback={
              contentService.getPlay
          }
          onInitialized={onPlayerInitialized}
          onxAPIStatement={(
              statement,
              context,
              event
          ) =>{
            set_context_h5p(context)
          }}
          />)
        } catch (e) {
          swal({
            title: "Error!",
            text: e?.message,
            icon: "error",
            timer: 6000
          });
      }
    }

  }

  const handleDownload = async (doc) =>{
  var url = doc.url;
  var name = doc.name;
    if (url) {
      saveAs(url, name)
    }
  }

  const handleDownloadAll = async () =>{
    var count = 0;
    let urls = [...documentList]
    
    urls.forEach((e, i)=>{ 
        var nameString = e.url;
        var nameArray = nameString.split('/');
        var name = nameArray[nameArray.length - 1];
        count++;
      
         saveAs(nameString, name)
    });
  }


// +================================================
// +++++++++++++++++ Navigation ++++++++++++++++++++
// +================================================

  const handleBackButton = ()=>{
    if (timer_started){
      dispatch(socketEmitStopModuleAction(socket, module_id))
    }
    history.push(`/user/tableofcontent/${course_id}`)
  }

  const handleNextButton = () => {
   
    if (timerCompleted || module_status == 'COMPLETED'){
      if (timer_started) {
        dispatch(socketEmitStopModuleAction(socket, module_id))
        dispatch(socketMarkModuleComplete(socket, module_id))
      }
      handleModuleNavigation('next')
    } else {
      swal({
        title: "Attention!",
        text: "Please wait till the timer reaches 00:00:00",
        icon: "error",
        timer: 6000
      });
    }
  }
 
  const handleModuleNavigation = (e)=> {
    if (module_list) {
      var list = [...module_list];
      // find index of module
      var index = list.findIndex(obj=> {if (obj.id == module_id) {return obj} })
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

          if (e?.target?.name) {
            const name = e.target.name
            if (name == 'next') {
              var newIndex = index+1 ;
            }
            if (name == 'back') {
              var newIndex = index-1 ;
            }
          } else if (e) {
            const name = e;
            if (name == 'next') {
              var newIndex = index+1 ;
            }
            if (name == 'back') {
              var newIndex = index-1 ;
            }
          }
          
          const getNewDetail =(list,newIndex) =>{
            var new_module_id = list[newIndex]?.id;
            var module_type = list[newIndex]?.module_type; 
            var sub_module_id = list[newIndex]?.sub_module_id;
            var iscomplete = list[newIndex]?.users[0]?.user_course_module?.status;
            // return new_module_id, module_type, sub_module_id, iscomplete
            if(new_module_id ) {
                if (module_type == 'quiz' || module_type == 'security_questions' || module_type == 'typing_dna'){
                  if (iscomplete == 'COMPLETED'){
                    getNewDetail(list,newIndex+1 )
                  } else {
                    set_content_id('')
                    dispatch(tableofContentDetailAction(new_module_id))
                    handleNavigation(sub_module_id, module_type, new_module_id)
                  }
              } else {
                set_content_id('')
                dispatch(tableofContentDetailAction(new_module_id))
                handleNavigation(sub_module_id, module_type, new_module_id)
              }
            } else {
              history.push(`/user/CourseComplete/${course_id}`)
              //history.push('/user/tableofcontent')
            }
          }
          getNewDetail(list,newIndex)
          
        }
    }
  }

  const handleNavigation =(sub_id, module_type, new_module_id)=> {
    dispatch(tableofContentQuizDetailAction(sub_id))
    dispatch(tableofContentSecurityDetailAction(sub_id))

    if (module_type=='quiz') {
      history.push(`/user/userquiz/${course_id}/${new_module_id}/${sub_id}`)    
    }
    else if (module_type == 'grapejs') {
      history.push(`/user/module/${course_id}/${new_module_id}`)
    }
    else if (module_type == 'security_questions') {
      history.push(`/user/usersecurityquestion/${course_id}/${new_module_id}`)
    }
    else if (module_type == 'typing_dna') {
      history.push(`/user/typingDnaAuthenticUserCheck/${course_id}/${new_module_id}`)
    }  
  }

  const handleChange = (e) => {
    e.preventDefault()
    
  }

  return ( 
    <div>
     

      <div className="mainSection coursemodule_main mt-3 pb-4">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3"  >
        <Row className="justify-content-md-center d-row-flex">
            <Col xl={11} lg={12} md={12} sm={12} xs={12} className="">
              <div className="courseDescription mt-3">
               

                <div className="courseHeadPara mt-3">
                  
                  <Row className="d-row-flex mb-3">
                    <Col
                      xl={5} lg={5} md={5} sm={12} xs={12}
                      className="md-left text-center"
                    >
                    <h5 className="mb-md-3 mb-4 mt-lg-3">{module_name? module_name : 'Module Name'}</h5>
                      
                    </Col>
                    <Col
                      xl={3} lg={3} md={2} sm={3} xs={3}
                      className="md-right time"
                    >    
                    {documentList.length >0 ? <>
                       <div className="timeDiv text-center pl-lg-2 d-lg-block d-none">
                          <Button className="pl-lg-0" onClick={handlecustomModalShow}>
                             <img src={downloadblue} className="pr-1"/>  Learning Materials
                          </Button>
                        </div>
                        <div className="timeDiv text-center d-lg-none d-block">
                        <Button className="" onClick={handlecustomModalShow}>
                          <img src={downloadblue} className=""/> 
                        </Button>
                        </div>
                      </>
                      :null}              
                    </Col>
                    <Col
                      xl={3} lg={3} md={4} sm={7} xs={7}
                      className="md-right time mt-md-0 pl-0 pr-0"
                    >   
                    <>               
                       <div className="timeDiv d-md-block d-none">
                          <span> Time Remaining </span>
                          <p>
                            <img src={time_clock} className="pr-2"/>
                            {module_time_obj.module_id == module_id ? secondToMinuteOrHourConvert(module_time_obj.time) : `0 hr 0 min 0 sec `}
                          </p>
                        </div>

                        <div className="timeDiv d-md-none d-block">
                          <span> Time Remaining </span>
                          <p>
                            <img src={time_clock} className="pr-2"/>
                            {module_time_obj.module_id == module_id ? secondToMinuteOrHourConvert(module_time_obj.time) : `0 hr 0 min 0 sec `}
                          </p>
                        </div>
                        </>
                    </Col>
                    {audio_player? 
                    <Col
                      xl={1} lg={1} md={1} sm={2} xs={2}
                      className="text-md-right text-center mt-2 "
                    >
                      <>
                        <img className="audio_button d-lg-block d-none" src={audio_play} onClick={()=>{handleAudio()}} />

                        <img className="audio_button d-lg-none d-block" src={audioplay1} onClick={()=>{handleAudio()}} />
                        </>
                    </Col>
                      :null}
                  </Row>
                </div>
              </div>
           
              <div className="courseDescription mt-3" onSelect={handleChange} onCopy={handleChange} >
                {handleGrapesjs()}
              </div>
            </Col>
          </Row>

          <Row className="justify-content-md-center d-row-flex">
            <Col xl={12} lg={12} md={11} sm={12} xs={12} className="">
              <Row className="justify-content-md-center d-row-flex">
                <Col
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="text-right"
                >              
                  <Button
                    name="back"
                    variant="primary"
                    className="btnSign mt-4 mb-3 pl-5 pr-5 pt-1 pb-1"
                    onClick={e=>handleBackButton(e)}
                  >
                    Back
                  </Button>              
                </Col>
                <Col
                 xl={6}
                 lg={6}
                 md={6}
                 sm={6}
                  xs={6}
                  className="text-left"
                > 
                  <Button
                    variant="primary"
                    className="btnSign mt-4 mb-3 pl-5 pr-5 pt-1 pb-1"
                    type="submit"
                    name="next"
                    onClick={e=>handleNextButton()}   
                  >
                    Next
                  </Button>
                </Col>
              </Row>
              
            </Col>
          </Row>
        </Container>


    {/* modal */}
      <Modal
        className="add_usermodal modal_download"
        show={customModalShow}
        onHide={handlecustomModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>

          Download Learning Materials
   
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="table-responsive">
          <table className="table table-borderless user_table w-100">
            <tbody>
              {documentList? documentList.map((doc, i)=> {

                return(
                  <>
                    <tr key={`module-${i}`} >
                      <td>
                        <img src={file} className="mr-3"/> 
                         {doc.name? doc.name : i }
                      </td>
                      <td>
                        <a onClick={e=>handleDownload(doc)}>
                        <img src={download_icon} className=""/> 
                        </a>
                      </td>
                    </tr>
                  </>
                )
              }) : <> </>}

            </tbody>
          </table>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btnSame mt-4 add_user"
            type="submit"
            onClick={handleDownloadAll}
          >
           Download All
                </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default Module;