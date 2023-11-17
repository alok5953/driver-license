import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'
import './grapesjs-plugins/grapesjs-preset-webpage.min.css'
import 'grapesjs/dist/grapes.min.js'
import 'grapesjs-preset-webpage-edited-v1/dist/grapesjs-preset-webpage.min.js'
import './grapesjs-plugins/h5p-select-block';


import "./CourseAccordion.css";
import { addCoureModuleAction } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const CourseAccordion = () => {
  const course_module_id = useSelector(state => {return state.courseReducer.courseModuleContentId})
  const dispatch = useDispatch()
  const history = useHistory()
  
  const [editorInstance, setEditorInstance] = useState();
  const [plugins, setPlugins] = useState(['gjs-preset-webpage','h5p-select-block' ]);
 
  const [moduleSlNo, setModuleSlNo] = useState(1)

  useEffect(() => {
   
    if (course_module_id) {
      const fetchGrapejsData = async () => {
        const response = await fetch(
          `/api/course/module/grapejs?${course_module_id}`
        )
        try {
          const { data } = await response.json();
          initEditor(data)
        } catch (error) {
          console.log(error.message)
          initEditor()
        }
      };
  
      fetchGrapejsData();
    }
  }, []);

  // init GrapesJs Editor
  const initEditor = (data) => {
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
        params: { module_id: '8442d260-f22e-4f49-85e5-3eb886815db' },
        headers: { module_id: '8442d260-f22e-4f49-85e5-3eb886815db' },
        autoload: false,
      },
    }) 
    setEditorInstance(editor);
    // Event Listeners 
  };


  const handleSaveAndNext = e => {
    let num = moduleSlNo
    num = ++num
    setModuleSlNo(num)
  };


  // Saving GrapesJs component to Db
  const  saveEditorComponentToDb  = async (e) => {
    handleSaveAndNext()
   
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

    const response  = await dispatch(addCoureModuleAction(data))
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
          handleSaveAndNext()
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

  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 coursesection courseAccordion">
        <h1>Course creation</h1>
        <h3>
          <span> 03</span>
          <span className="title"> Course Detail</span>
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
              variant="primary"
              className="btnSame btnPadding btnBorder mt-4"
              // onClick={handlecustomFieldShow}
            >
              Add Custom Field
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
              onClick={handleSaveAndNext}
            >
              {/* <Link to={"/courses/coursemodule"}>  */}
              Save & Next 
              {/* </Link> */}
            </Button>
          </Col>
        </Row>

      </div>

    </>
  );
};

export default CourseAccordion;
