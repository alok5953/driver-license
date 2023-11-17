import React, { Fragment, useEffect, useState } from "react";


import { Link, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-webpage-edited/dist/grapesjs-preset-webpage.min.css'
import 'grapesjs/dist/grapes.min.js'
import 'grapesjs-preset-webpage-edited/dist/grapesjs-preset-webpage.min.js'
import './grapesjs-plugins/h5p-select-block';
import { courseDetailAction, courseModuleDetailAction, getGrapesjsAssetsAction, getGrapesjsByIdAction, getH5PContentAction, quizDetailIdAction, securityDetailAction} from "../../../Redux/Actions";

import "./CourseAccordion.css";
import { updateCourseModuleAction } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { setItemLocalStorage } from "../../../Utils/Util";
import swal from "sweetalert";
import {fetchH5PContent} from './grapesjs-plugins/h5p-select-block'

const EditCourseAccordion = () => {

  const course_module_id = useSelector(state => {return state.courseModuleReducer.courseModuleContentId?.data.id});
  const course_module_list = useSelector(state=>{ return state.courseModuleReducer.courseModuleList?.data})
  const dispatch = useDispatch();
  const history = useHistory();
  const [current_module_index, set_current_module_index] = useState('');
  const [last_module_check, set_last_module_check] = useState(false);
  const [editorInstance, setEditorInstance] = useState();
  const [plugins, setPlugins] = useState(['gjs-preset-webpage','h5p-select-block' ]);
  const [moduleId, setModuleId] = useState({})
  const [module_name, set_module_name] = useState('');
  const [sequence_number, set_sequence_number] = useState('');
  const [module_type, set_module_type] = useState('');

  // initiating GrapesJs editor 
  useEffect(() => {
   
    if (course_module_id) {
      fetchGrapejsData();
      check_last_module()
    }
  }, [course_module_id]);

  useEffect( ()=>{
     fetchH5PContent()
  },[])

  // fetch grapesjs data 
  const fetchGrapejsData = async () => {
    const response = await dispatch(getGrapesjsByIdAction(course_module_id))
    const grapesjsSuccess  = response?.payload;

    if (grapesjsSuccess) {
      if(grapesjsSuccess.status == 200) {
        try {
          const { data } =  grapesjsSuccess.data;

          set_module_name(data.name)
          set_sequence_number(data.sequence_number)
          set_module_type(data.module_type)
          const respAsset = await getGrapesjsAssets();
          initEditor(data, respAsset)
        } catch (error) {
          console.log(error.message)
          initEditor()
        }
      } 
    }
  }

//  get Grapesjs assets
    const getGrapesjsAssets = async()=> {
      const response = await dispatch(getGrapesjsAssetsAction())
      const assetSuccess = response?.payload;
  
      if(assetSuccess) {
        if( assetSuccess.data) {
          return assetSuccess.data.data
        }
      }

    }


  // init GrapesJs Editor
  const initEditor = (data, respAsset) => {
    const accessToken = localStorage.getItem('accessToken')

    const editor = grapesjs.init({
      container: '#gjs',
      height: '600px',
      width: '100%', 
      fromElement: false,    
      plugins: plugins,
      components: data ? JSON.parse(data['gjs-components']) : '',
      style: data ? JSON.parse(data['gjs-styles']) : '',
      storageManager: {
        type: 'remote',
        stepsBeforeSave: 1,
        urlStore: '/api/course/module/grapejs',
        urlLoad: '/api/course/module/grapejs',
        params: { module_id: course_module_id },
        headers: { module_id: course_module_id, authorization: `Bearer ${accessToken}`, Accept: 'application/json'  },
        autoload: false,
      },
      assetManager: {
        params: { module_id: course_module_id },
        headers: { module_id: course_module_id, authorization: `Bearer ${accessToken}`, Accept: 'application/json'  },
        upload: '/api/course/module/grapejs/upload',
        assets: respAsset? respAsset: [],

      }
    })
          // The upload is started
      editor.on('asset:upload:start', () => {
       
      });

      // The upload is ended (completed or not)
      editor.on('asset:upload:end',async () => {
        const getGrapesjsAssets = async()=> {
          const response = await dispatch(getGrapesjsAssetsAction())
          const assetSuccess = response?.payload;
      
          if(assetSuccess) {
            if( assetSuccess.data) {
              const assetManager = editor.AssetManager;
              
              assetManager.add(response?.payload?.data?.data)
              assetManager.render()
            }
          }

        }
        getGrapesjsAssets()
      });

      editor.on('asset:upload:response', (res)=> {

      })

      editor.on('change')

    setEditorInstance(editor);
    // Event Listeners 
  };





  // Saving GrapesJs component to Db
  const  updateEditorComponentToDb  = async () => {
    // const moduleId = module_Id.data.id;

  
    // get the html, css, js of the editor 
    const component = {
      name: 'gjs-name'
    }

    const componenthtml = {
      html: editorInstance.getHtml(),
    }

    const data = {
      component: component,
      componenthtml: componenthtml
    }

    const response  = await dispatch(updateCourseModuleAction( data))
    const addCourseModuleSuccessData  = response?.payload;

    if(addCourseModuleSuccessData) {
      if(addCourseModuleSuccessData.data) {
        if(addCourseModuleSuccessData.data.code == 200) {
          swal({
            title: "Success!",
            text: addCourseModuleSuccessData.data.message,
            icon: "success",
            timer: 3000
          });
          history.push('/courses/coursemodule')
        } else {
          // error message
          swal({
            title: "Error!",
            text: addCourseModuleSuccessData.data.message,
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
    dispatch(securityDetailAction(sub_id))
    dispatch(quizDetailIdAction(sub_id))

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
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 coursesection courseAccordion">
        <h1>Course Creation</h1>
        <h3>
          <span >{sequence_number? (sequence_number.toString().length > 2 ? sequence_number: '0'+sequence_number.toString() ) : '1'}</span>
          <span className="title"> {module_name? module_name : ''}</span>
        </h3>
        <div className="sectionBorder"></div>
        <Row>

          {/* Grapesjs Editor */}

          {/* Change this style to bootstrap-required  */}
          <div className="courseCard" style={{border:"2px solid #dcdde6", width : '100%'}}> 
            <Fragment>
                  <div id='gjs'>

                  </div>
              </Fragment>  
          </div>
 
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
              name="back"
              variant="primary"
              className="btnSame btnPadding btnBorder mt-4"
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
              name='next'
              variant="primary"
              className="btnSame btnPadding mt-4"
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

export  default EditCourseAccordion;