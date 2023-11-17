import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from 'antd';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import Edit from "../../../Images/edit.svg";
import "./CourseCreation.css";
import swal from "sweetalert";
import { addCourseAction, getAddOnsDetailAction, getCourseByIdAction, updateCourseAction, courseDetailAction,  saveCustomFieldAction, updateCustomFieldAction } from "../../../Redux/Actions";


const CourseCreation = (props) => {
  const { Option } = Select;
  const history = useHistory()
  const dispatch = useDispatch()
  const [validated, setCourseValidated] = useState(false);
  const [customValidate, setCustomValidate] = useState(false);
  const [customFieldShow, setcustomFieldShow] = useState(false);
  let search = props.location.search;
  const handlecustomFieldClose = () => setcustomFieldShow(false);
  const handlecustomFieldShow = () => setcustomFieldShow(true);
  // variable declare
  const [course_title, set_course_title] = useState("");
  const [course_description, set_course_description] = useState("");
  const [course_visibility, set_course_visibility] = useState("paid");
  const [visible_on_website, set_visible_on_website] = useState(false);
  const [affiliated_pay_outs, set_affiliated_pay_outs] = useState(false);
  const [free_trial, set_free_trial] = useState(false);
  const [enrolement_fees, set_enrolement_fees] = useState(0);
  const [taxes, set_taxes] = useState(0);
  const [total_fees, set_total_fees] = useState(0);
  const [auto_generate_toc, set_auto_generate_toc] = useState(false);
  const [course_duration_in_minutes, set_course_duration_in_minutes] = useState('')
  const [maximum_completion_time, set_maximum_completion_time] = useState('');
  const [security_question, set_security_question] = useState(false)
  const [commenting, set_commenting] = useState(false)
  const [read_receipt, set_read_receipt] = useState(false)
  const [download_option, set_download_option] = useState(false);
  const [typing_dna, set_typing_dna] = useState(false);
  const [api_key, set_api_key] = useState('');
  const [api_user_name, set_api_user_name] = useState('');
  const [api_password, set_api_password] = useState('');
  const [add_ons_list, set_add_ons_list] = useState([]);
  const [checked_add_ons_list, set_checked_add_ons_list] = useState([]);
  const [customType, setCutomType] = useState('text_field');

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoName, setSelectedVideoName] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [selectedVideoModuleId, setSelectedVideoModuleId] = useState('')

  const [customFiledArray, setCustomFiledArray] = useState([])
  const [customFiledTitle, setCustomFiledTitle] = useState('');
  const [courseIndex, setCourseIndex] = useState('');
  const [customFieldId, setCustomFieldId] = useState('');
  const [course_mandatory_status, set_course_mandatory] = useState(false);

  const [optionList, setOptionList] = useState([{
    'name': "",
    "is_selected": false
  }, {
    'name': "",
    "is_selected": false
  }])
  // handle save button on Add Module 
  const handleSaveInputModule = async () => {

    const data = {
      "name": "Course",
      "content": "<p> hello demo </p>"
    }

    if (true) {
      const response = await dispatch(addCourseAction(data));
      const saveModuleDetailSuccess = response?.payload;

      if (saveModuleDetailSuccess) {
        if (saveModuleDetailSuccess.data) {
          if (saveModuleDetailSuccess.data.code == 200) {
            swal({
              title: "Success!",
              text: "Course Added",
              icon: "success",
              timer: 3000
            });
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

  }

  const handleFileSelect = async (e) => {
    var file = e.target.files[0];
    var name = e.target.files[0]?.name;
    var type = e.target.files[0]?.type;
    var size = e.target.files[0]?.size;
    if (size > 5000000) {
      swal({
        title: "Error!",
        text: 'Max file size allowed is 5Mb',
        icon: "error",
        timer: 6000
      });
      return false
    }
    setSelectedVideoName(name)
    setSelectedVideo(file)
   

  }


  const handleSubmit = async e => {
    try {
      const form = e.currentTarget;
      e.preventDefault();
     
        let arrayList = [];
        customFiledArray?.map((val, index) => {
          if (val.type == "text_field") {
            if (val.id) {
              arrayList.push({
                id: val.id,
                "type": val.type,
                "name": val.name,
                "custom_field_required": val.course_mandatory_status ? true : false
              })
            } else {
              arrayList.push({
                
                "type": val.type,
                "name": val.name,
                "custom_field_required": val.course_mandatory_status ? true : false
              })
            }
          } else {
            let option = []
            val?.options.map((opt, indx) => {
              option.push({
                "name": opt.name,
                "is_selected": false,
              })
            })
            if (val.id) {
              arrayList.push({
                id:val.id,
                "type": val.type,
                "name": val.name, "options": option,
                "custom_field_required": val.course_mandatory_status ? true : false
              })
            } else {
              arrayList.push({

                "type": val.type,
                "name": val.name, "options": option,
                "custom_field_required": val.course_mandatory_status ? true : false
              })
            }
          }
        })


        const formData = new FormData();
        // formData.append('module_id', selectedVideoModuleId)

        if (selectedVideo?.type == "video/mp4") {
          formData.append("file", selectedVideo, selectedVideoName)
        }
        formData.append("course_title", course_title)
        formData.append("course_description", course_description)
        formData.append("affiliated_pay_outs", affiliated_pay_outs)
        formData.append("enrolement_fees", enrolement_fees)
        formData.append("taxes", taxes)
        if (checked_add_ons_list.length > 0) {
          checked_add_ons_list.forEach((item) => {
            formData.append('add_ons', item)
          })
        }
        formData.append("maximum_completion_time", maximum_completion_time)
        formData.append("typing_dna", typing_dna)
        formData.append("security_question", security_question)
        formData.append("total_fees", total_fees)
        let count = 0;
        let custom_id_array = [];
        if (arrayList.length > 0) {
       
          let custom_arr = await Promise.all(arrayList?.map(async (res, ind) => {
            if(!res.id){
              let cusRes = await dispatch(saveCustomFieldAction(res));
              cusRes = cusRes?.payload;
              count = count + 1;
              if (cusRes?.data.code == 200) {
                return custom_id_array.push(cusRes?.data?.data?.id)
              }
            } else{
              count = count + 1;
            }
          }))
          if (custom_id_array.length > 0) {
            custom_id_array.forEach((item) => {
              formData.append('custom_fields', item)
            })
          }
        } else { count++; }
        //"course_visibility": course_visibility, "visible_on_website": visible_on_website,
        //"free_trial": free_trial, 

        //"auto_generate_toc": auto_generate_toc, "course_duration_in_minutes": course_duration_in_minutes, 
        // "api_key": api_key, "api_user_name": api_user_name, "api_password": api_password,  "commenting": commenting,
        //"download_option": download_option, "read_receipt": read_receipt,
       
        if (course_id) {
          if (count >= arrayList.length) {
            let response = await dispatch(updateCourseAction(course_id.id, formData));
            response = response?.payload;
            // value assign in varible
            if (response) {
              if (response.data) {
                if (response.data.code == 200) {
                  swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  dispatch(courseDetailAction(response.data.data.id));
                  history.push('/courses/coursemodule');
                  setCourseValidated(false);
                } else if (response.data.code == 401) {
                  swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  history.push('/');

                  setCourseValidated(false);
                } else {
                  swal({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                    timer: 3000
                  });
                  setCourseValidated(false);
                }
              }
            }
            setCourseValidated(false);
          }
        } else {
          if (count >= arrayList.length) {
            let response = await dispatch(addCourseAction(formData));
            response = response?.payload;
            // value assign in varible
            if (response) {
              if (response.data) {
                if (response.data.code == 200) {
                  swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  dispatch(courseDetailAction(response.data.data.id));

                  history.push('/courses/coursemodule');
                  setCourseValidated(false)
                } else if (response.data.code == 401) {
                  swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  history.push('/');
                  setCourseValidated(false);
                } else {
                  swal({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error",
                    timer: 3000
                  });
                  setCourseValidated(false);
                }
              }
            }
            setCourseValidated(false);
          }
        }
    }
    catch (err) {
      console.log('err', err)
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  };
 
  // get course id
  const course_id = useSelector(state => {
    return state.courseReducer.courseId.data;
  });

  useEffect(() => {
    if (course_id) {
      if (course_id.code == 200) {
        getCourseById(course_id.id)
      }
    } else {
      getCourseById()
      getAllDetails(1);
    }

  }, [course_id]);

  const getAllDetails = async () => {
    try {
      let array_list = [];
      const allAddOnsResponse = await dispatch(getAddOnsDetailAction());
      if (allAddOnsResponse?.payload?.data?.data?.rows) {
        set_add_ons_list(allAddOnsResponse?.payload?.data?.data?.rows)
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  }

  const setAddonsChecked = (val) => {
    set_checked_add_ons_list(val)
  }



  // get by id detail fetch value
  const getCourseById = async (id) => {
    if (id) {
      try {
        const allAddOnsResponse = await dispatch(getAddOnsDetailAction());
        if (allAddOnsResponse?.payload?.data?.data?.rows) {
          set_add_ons_list(allAddOnsResponse?.payload?.data?.data?.rows)
        
          let response = await dispatch(getCourseByIdAction(id));
          response = response?.payload?.data
        
          if (response.code == 200) {
            if (response.data) {
              set_course_title(response.data.course_title); set_course_description(response.data.course_description); set_course_visibility(response.data.course_visibility); set_visible_on_website(response.data.visible_on_website);
              set_affiliated_pay_outs(response.data.affiliated_pay_outs); set_free_trial(response.data.free_trial); set_enrolement_fees(response.data.enrolement_fees); set_auto_generate_toc(response.data.auto_generate_toc); set_course_duration_in_minutes(response.data.course_duration_in_minutes); set_maximum_completion_time(response.data.maximum_completion_time)
              set_api_key(response.data.api_key); set_api_user_name(response.data.api_user_name); set_api_password(response.data.api_password); set_security_question(response.data.security_question); set_commenting(response.data.commenting)
              set_download_option(response.data.download_option); set_read_receipt(response.data.read_receipt); set_typing_dna(response.data.typing_dna); set_taxes(response.data.taxes); set_total_fees(response.data.total_fees);
              let arrayList = []
              response.data.custom_fields?.map((val, index) => {
                let optionArray = [];
                if (val.type == "text_field") {
                  arrayList.push({ id: val.id, name: val.name, type: val.type, course_mandatory_status: val.custom_field_required })
                } else {
                  val?.option_field?.field_options?.map((opt, inx) => {
                    optionArray.push({ name: opt.name, })
                  })
                  arrayList.push({ id: val.id, name: val.name, type: val?.option_field?.type, options: optionArray, course_mandatory_status: val.custom_field_required })
                }

              })
              setCustomFiledArray(arrayList)
              setVideoURL(response.data?.video_file_path)
              setSelectedVideoName(response.data?.uploaded_file_name)

              if (response?.data?.add_ons.length > 0) {
                let id = response?.data?.add_ons.map((val, ind) => {
                  return val.id;
                })
                set_checked_add_ons_list(id)
              }
            }
          }

        }
      }
      catch (err) {

        if (err?.response?.data?.code === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.err,
            icon: "error",
            timer: 5000
          });
          history.push('/')
        }
      }
    } else {
      set_course_title(''); set_course_description(''); set_course_visibility('paid'); set_visible_on_website(false);
      set_affiliated_pay_outs(false); set_free_trial(false); set_enrolement_fees(0); set_auto_generate_toc(false); set_course_duration_in_minutes(''); set_maximum_completion_time('')
      set_api_key(''); set_api_user_name(''); set_api_password(''); set_security_question(false); set_commenting(false)
      set_download_option(false); set_read_receipt(false); set_typing_dna(false); set_taxes(0); set_total_fees(0);

      set_checked_add_ons_list([]); setCustomFiledArray([]); setSelectedVideo(null); setSelectedVideoName('')
    }
  }

  const viewCourseDetailPage = () => {
    if (search) {
      history.push('/courses/coursemodule?view')
    }
  }


  const saveCustomFiled = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCustomValidate(true);
    if (form.checkValidity()) {
      e.preventDefault();
      if (customFiledArray.length < 11) {

        if (courseIndex) {
          if (customType == 'text_field') {

            let newArray = [...customFiledArray];
            newArray[courseIndex - 1] = { ...newArray[courseIndex - 1], type: customType, name: customFiledTitle, course_mandatory_status: course_mandatory_status }
            setCustomFiledArray(newArray)
          } else {
            let newArray = [...customFiledArray];
            newArray[courseIndex - 1] = { ...newArray[courseIndex - 1], type: customType, name: customFiledTitle, options: optionList, course_mandatory_status: course_mandatory_status }
            setCustomFiledArray(newArray)
          }
        } else {
          if (customType === 'text_field') {

            setCustomFiledArray([...customFiledArray, { type: customType, name: customFiledTitle, course_mandatory_status: course_mandatory_status }])
          } else {
            setCustomFiledArray([...customFiledArray, { type: customType, name: customFiledTitle, options: optionList, course_mandatory_status: course_mandatory_status }])
          }
        }
        if (customFieldId) {
          updateCustomField()
        } else {
          setCustomValidate(false)
          handlecustomFieldClose()
          setCutomType('')
          set_course_mandatory(false)
          setOptionList([{
            'name': "",
            "is_selected": false
          }, {
            'name': "",
            "is_selected": false
          }])

          setCourseIndex('')
          setCustomFieldId('')
        }
      } else {
        swal({
          title: "Error!",
          text: 'You can not add more than 10 custom field.',
          icon: "error",
          timer: 5000
        });
        setCustomValidate(false)
      }
    }
  }

  const deleteCustomField = (i) => {
    const remove = customFiledArray.splice(i, 1);
    let list = customFiledArray
    if (customFiledArray.length == 0) {
      setCustomFiledArray([]);
    } else {
      setCustomFiledArray([...list]);
    }
  }

  const deleteOption = (i) => {
    const remove = optionList.splice(i, 1);
    let list = optionList
    if (optionList.length == 0) {
      setOptionList([]);
    } else {
      setOptionList([...list]);
    }
  }

  const addOption = () => {
    setOptionList([...optionList, { 'name': "", "is_selected": false }])
  }

  const setOptionTitle = (title, index) => {
    if (optionList[index]) {
      let newArray = [...optionList];
      newArray[index] = { ...newArray[index], name: title }
      setOptionList(newArray)
    }
  }

  const editCustomFiled = (customDetail, index) => {

    if (customDetail?.type != 'text_field') {
      setOptionList(customDetail?.options)
    }
    setCustomFiledTitle(customDetail?.name)
    setCutomType(customDetail?.type)
    setCustomFieldId(customDetail?.id)
    setCourseIndex(index + 1)
    set_course_mandatory(customDetail.course_mandatory_status)
    handlecustomFieldShow()
  }

  const openAddCustomPopup = () => {
    setCustomFiledTitle('')
    setCutomType('text_field')
    setCourseIndex('')
    setCustomFieldId('')
    setOptionList([{
      'name': "",
      "is_selected": false
    }, {
      'name': "",
      "is_selected": false
    }])
    setOptionTitle('')
    handlecustomFieldShow()
  }

  const updateCustomField = async () => {
    try {
      let obj;
      if(customType=="text_field"){
        obj ={ id: customFieldId,"name": customFiledTitle}
      } else{
        obj ={ id: customFieldId,"name": customFiledTitle}
      } 
      
      let result = await dispatch(updateCustomFieldAction(obj));
      result = result?.payload;

      // value assign in varible
      if (result) {
        if (result.data) {
          if (result.data.code == 200) {
            swal({
              title: "Success!",
              text: result.data.message,
              icon: "success",
              timer: 3000
            });
            getCourseById(course_id.id)
            setCustomValidate(false)
            handlecustomFieldClose()
            setCutomType('')
            set_course_mandatory(false)
            setOptionList([{
              'name': "",
              "is_selected": false
            }, {
              'name': "",
              "is_selected": false
            }])
            setCourseIndex('')
            setCustomFieldId('')
          } else {
            swal({
              title: "Error!",
              text: result.data.message,
              icon: "error",
              timer: 3000
            });

          }
        }
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  }

  return (

    <>
      <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 coursesection">
        <h1>Course creation</h1>
        <h3>
          <span> 01</span>
          <span className="title"> Course Title & Fees</span>
        </h3>

        <div className="sectionBorder"></div>

        <div className="formBody mt-4">
          <h5 className="mb-4 course_head">Course title & Description</h5>

          <form className="allsameInput"  onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} xl="5" lg="6" md="8">
                <Form.Label className="headall_text">Course title</Form.Label>
                <Form.Control type="text" placeholder=""  disabled={(search == "?view" ? true : false)} required value={course_title} onChange={e => set_course_title(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} xl="7" lg="9" md="11">
                <Form.Label className="headall_text">Course Description</Form.Label>
                <Form.Control as="textarea" rows={4} disabled={(search == "?view" ? true : false)} value={course_description} required onChange={e => set_course_description(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <h5 className="mb-4 mt-3 headall_text">Fees and Enrollments</h5>

            <Form.Row className="mb-3">
              <Form.Group as={Col} md="3" sm="6" xs="12" className="w-100 mr-md-5">
                <Form.Label>Enrolment Fees</Form.Label>
                <div className="inputdiv">
                  <Form.Control  type="number"  min="0"  max="99999" step="0.01"  placeholder="" disabled={(search == "?view" ? true : false)} pattern="[+-]?([0-9]*[.])?[0-9]+" required value={enrolement_fees} onChange={e => {
                    set_enrolement_fees(e.target.value);
                    let tax = taxes ? taxes : 0
                    let val = e.target.value ? e.target.value : 0
                    let res = ((parseFloat(val) * parseFloat(tax)) / 100) + parseFloat(val)
                    set_total_fees(res)
                  }} />
                  <span className="dollarinput">$</span>
                </div>
              </Form.Group>

              <Form.Group as={Col} md="3" sm="6" xs="12" className="w-100 mr-md-5">
                <Form.Label>Taxes(%)</Form.Label>
                <Form.Control type="number"  min="0"  max="99999" step="0.01" placeholder="" disabled={(search == "?view" ? true : false)} pattern="[+-]?([0-9]*[.])?[0-9]+" value={taxes} required onChange={e => {
                  set_taxes(e.target.value);
                  let val = e.target.value ? e.target.value : 0
                  let enrolement_fee = enrolement_fees ? enrolement_fees : 0
                  let res = ((parseFloat(val) * parseFloat(enrolement_fee)) / 100) + parseFloat(enrolement_fee)
                  set_total_fees(res)
                }} />
              </Form.Group>

              <Form.Group as={Col} md="3" sm="6" xs="12" className="w-100">
                <Form.Label>Total fees</Form.Label>
                <div className="inputdiv">
                  <Form.Control  type="number"  min="0"  max="99999" step="0.01" placeholder="" disabled={(search == "?view" ? true : false)} pattern="[+-]?([0-9]*[.])?[0-9]+" value={total_fees} required onChange={e => set_total_fees(e.target.value)} />
                  <span className="dollarinput">$</span>
                </div>
              </Form.Group>
            </Form.Row>

            <h5 className="mb-0 mt-3 headall_text">Add-ons</h5>


            <Form.Row className="mt-0 widthGroup">
              <Form.Group as={Col} xl="12" className="samecheckbox">
                <div className="custom-control custom-checkbox pl-0 mt-3">
                  <Select
                    mode="multiple" disabled={(search == "?view" ? true : false)}
                    style={{ width: '100%' }}
                    placeholder="Add-ons"
                    value={checked_add_ons_list}
                    onChange={e => setAddonsChecked(e)}
                    optionLabelProp="label"
                    className="form-control selectformControl"
                  >
                    {add_ons_list.map((e, inx) => <Option key={`option2-${inx}`} label={e.add_ons_title} value={e.id}>
                      <div className="demo-option-label-item">
                        {e.add_ons_title}
                      </div>
                    </Option>)}
                  </Select>
                </div>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col} md="5" sm="6" xs="12" className="w-100">
                <Form.Label className="headall_text">Maximum completion timing</Form.Label>
                <div className="inputdiv">
                  <Form.Control  type="number"  min="0"  max="999999" maxLength="5"   disabled={(search == "?view" ? true : false)} placeholder="" pattern="^[0-9]*$" value={maximum_completion_time} required onChange={e =>e.target.value.length<7?set_maximum_completion_time(e.target.value):''} />
                  <span className="timeinput">In days</span>
                </div>
              </Form.Group>
            </Form.Row>


            <div className="customCheckbox mt-2">
              <Row>
                <Col xl={12} lg={12} md={12} sm={12}>

                  {/* <Form.Row className="mt-3">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                          checked={visible_on_website} disabled={(search == "?view"? true: false)} onChange={e => set_visible_on_website(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Visible on Website
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row> */}

                  <Form.Row className="mt-3 mt-md-3">
                    <Form.Group
                      as={Col}
                      md="3" sm="6" xs="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox" disabled
                          className="custom-control-input" disabled={(search == "?view" ? true : false)}
                          id="customCheck2"
                          checked={affiliated_pay_outs} onChange={e => set_affiliated_pay_outs(e.target.checked)}
                        />
                        <label
                          className="custom-control-label headall_text"
                          htmlFor="customCheck2"
                        >
                          Affiliated Pay-outs
                        </label>
                      </div>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="3" sm="6" xs="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input headall_text"
                          id="customCheck9" disabled={(search == "?view" ? true : false)} checked={typing_dna} onChange={e => set_typing_dna(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck9"
                        >
                          Typing DNA
                        </label>
                      </div>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="3" sm="6" xs="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input headall_text"
                          id="customCheck6" disabled={(search == "?view" ? true : false)} checked={security_question} onChange={e => set_security_question(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck6"
                        >
                          Security Question
                        </label>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Form.Group
                      as={Col}
                      md="3" sm="6" xs="12"
                      className="w-100 samecheckbox"
                    >

                      <h5 className="mb-0 mt-3 headall_text">Upload Video</h5>

                      <Form.Label className="file-input__label" htmlFor="file-input"> Choose File...</Form.Label>

                      <div className="file-input">
                        <Form.Control type="file" disabled={(search == "?view" ? true : false)} accept=".mp4" onChange={handleFileSelect} name="file-input" id="file-input" className="file-input__input" />

                        {/* <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          className="file-input__input"
                        />
                        <label className="file-input__label" htmlFor="file-input">
                          <span>Upload file</span></label
                        > */}
                      </div>

                      {/* <Form.Control  type="file" disabled={(search == "?view"? true: false)}  accept=".wav, .mp4" onChange={handleFileSelect}/> */}
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="3" sm="6" xs="12"
                      className="w-100 samecheckbox">
                      <div className="file-input">
                        <h5 className="mb-0 mt-3 headall_text">{selectedVideoName ? selectedVideoName : null}</h5>
                      </div>
                    </Form.Group>
                  </Form.Row>

                  {/* <Form.Row className="mt-3 mt-md-3 mt-lg-5 pt-0 pt-md-0 pt-lg-3">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck3"
                          checked={free_trial} disabled={(search == "?view"? true: false)} onChange={e => set_free_trial(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck3"
                        >
                          Free Trial
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row> */}
                </Col>

                {/* <Col xl={4} lg={5} md={12} sm={12} className="pl-lg-5">
                  <Form.Row className="mt-3 mt-md-3 mt-lg-0">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck14"
                          checked={free_trial} disabled={(search == "?view"? true: false)} onChange={e => set_free_trial(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck14"
                        >
                          Fees and Enrollments
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row>

                </Col> */}
              </Row>

              {/* <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                  <h6 className="headsmall">Add on</h6>
                  
                  
                      <Form.Row className="mt-2 widthGroup"> <Form.Group as={Col} xl="12" className="samecheckbox">
                        <div className="custom-control custom-checkbox pl-0">
                         <Select
                                mode="multiple" disabled={(search == "?view"? true: false)}
                                style={{ width: '100%' }}
                                placeholder="select option"
                                value={checked_add_ons_list}
                                onChange={e => setAddonsChecked(e)}
                                optionLabelProp="label"
                                className="form-control selectformControl"
                              >
                                {add_ons_list.map((e, inx) => <Option  label={e.add_ons_title} value={e.id}>
                                  <div className="demo-option-label-item">
                                   {e.add_ons_title}
                                  </div>
                                </Option>)}
                              </Select>
                        </div>
                      </Form.Group>
                      </Form.Row>
                </Col>
              </Row> */}
            </div>

            {/* <div className="sectionBorder mt-3"></div> */}

            {/* <div className="customCheckbox">
              <Row className="mt-md-5 mt-0">
                <Col xl={4} lg={5} md={12} sm={12}>
                  <Form.Row className="mt-4 pt-3">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck5" disabled={(search == "?view"? true: false)} checked={auto_generate_toc} onChange={e => set_auto_generate_toc(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck5"
                        >
                          Auto-Generate Table of content
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mb-3 mt-4">
                    <Form.Group as={Col} xl="12" className="w-100">
                      <Form.Label>Course Duration</Form.Label>
                      <div className="inputdiv">
                        <Form.Control type="text" disabled={(search == "?view"? true: false)} placeholder="" pattern="^[0-9]*$" value={course_duration_in_minutes} required onChange={e => set_course_duration_in_minutes(e.target.value)} />
                        <span className="timeinput">In min</span>
                      </div>
                    </Form.Group>
                  </Form.Row>



                  <Form.Row className="mt-3 mt-md-3 mt-lg-3 pt-0 pt-md-0 pt-lg-0">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck8" disabled={(search == "?view"? true: false)} checked={download_option} onChange={e => set_download_option(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck8"
                        >
                          Download Option
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mt-3 mb-3 mb-md-0 mt-md-3 mt-lg-3 pt-0 pt-md-0 pt-lg-0">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck9" disabled={(search == "?view"? true: false)} checked={typing_dna} onChange={e => set_typing_dna(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck9"
                        >
                          Typing DNA
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </Col>

                <Col xl={4} lg={5} md={12} sm={12} className="pl-lg-5">
                  <Form.Row className="mb-3 mt-0">
                    <Form.Group as={Col} xl="12" className="w-100">
                      <Form.Label>API key</Form.Label>

                      <Form.Control type="text" disabled={(search == "?view"? true: false)} placeholder="" value={api_key} required onChange={e => set_api_key(e.target.value)} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mb-3">
                    <Form.Group as={Col} xl="12" className="w-100">
                      <Form.Label>API Username</Form.Label>

                      <Form.Control type="text" disabled={(search == "?view"? true: false)} placeholder="" value={api_user_name} required onChange={e => set_api_user_name(e.target.value)} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mb-3">
                    <Form.Group as={Col} xl="12" className="w-100 eyeinput eyeinput1">
                      <Form.Label>API Password</Form.Label>

                      <Form.Control type="password" disabled={(search == "?view"? true: false)} placeholder="" pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" value={api_password} required onChange={e => set_api_password(e.target.value)} />

                      <span className="eyeImage">
                        <img src={info} className="eyeIcon" alt="close_icon" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
                      </span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mt-3 mt-md-3 mt-lg-0">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck7" checked={commenting} disabled={(search == "?view"? true: false)} onChange={e => set_commenting(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck7"
                        >
                          Commenting
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck88" checked={read_receipt} disabled={(search == "?view"? true: false)} onChange={e => set_read_receipt(e.target.checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck88"
                        >
                          Read receipts
                              </label>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </Col>
              </Row>
            </div> */}

            <Row>
              <Col xl={12} lg={12} md={12} sm={12}>
                <Form.Row className="mt-3 mb-3 mb-md-0 mt-md-3 mt-lg-3 pt-0 pt-md-0 pt-lg-0">
                  {customFiledArray.map((val, i) => {

                    if (val.type === 'text_field') {
                      return (
                        <>
                          <div key={`option3-${i}`} className="pl-0 w-100">
                            <Form.Group as={Col} xl="4" className="w-100 pl-2">
                              <Form.Label className="customtextLabel">
                                {val.name}
                                <img src={Edit} disabled={(search == "?view" ? true : false)} onClick={() => editCustomFiled(val, i)} className="pl-2 pr-2" alt="Image" />
                                {/* <img src={Delete} disabled={(search == "?view" ? true : false)} onClick={() => deleteCustomField(i)} className="pl-2 pr-2" alt="Image" /> */}

                              </Form.Label>
                              <Form.Control type="text" disabled />
                            </Form.Group>
                          </div>
                        </>
                      )
                    }
                    if (val.type === 'dropdown') {
                      return (<>
                        <div className="pl-0 w-100">
                          <Form.Group as={Col} xl="4" className="w-100 pl-2">
                            <Form.Label className="customtextLabel">
                              {val.name}
                              <img src={Edit} disabled={(search == "?view" ? true : false)} onClick={() => editCustomFiled(val, i)} className="pl-2 pr-2" alt="Image" />
                              {/* <img src={Delete} disabled={(search == "?view" ? true : false)} onClick={() => deleteCustomField(i)} className="pl-2 pr-2" alt="Image" /> */}

                            </Form.Label>

                            <Form.Control as="select" type="select" disabled >
                              <option>Select Dropdown</option>

                              {val.options?.map((val,index) => <option key={`option4-${index}`} value={val.name}>{val.name}</option>)}
                            </Form.Control>

                          </Form.Group>
                        </div>
                      </>
                      )
                    }
                    if (val.type === 'radio') {
                      return (<>
                        <div className="pl-0 w-100">
                          <Form.Group as={Col} xl="9" className="w-100 pl-2">
                            <Form.Label className="customtextLabel">
                              {val.name}
                              <img src={Edit} disabled={(search == "?view" ? true : false)} onClick={() => editCustomFiled(val, i)} className="pl-2 pr-2" alt="Image" />
                              {/* <img src={Delete} disabled={(search == "?view" ? true : false)} onClick={() => deleteCustomField(i)} className="pl-2 pr-2" alt="Image" /> */}

                            </Form.Label>

                            {val.options?.map((opt, ii) =>
                              <>

                                <div key={`option11-${ii}`} className="form-group custom_tab_control custom-control pl-0">
                                  <input id={`${ii}`} type="radio" disabled name="custom-radio-btn-quiz" />
                                  <label className="custom-radio" htmlFor={`${ii}`} ></label>
                                  <span className="label-text">
                                    {opt.name}
                                  </span>
                                </div>

                                {/* <Form.Control
                                  type="radio"
                                  name={val.name}
                                  id={`${ii}`}
                                />{opt.name} */}

                              </>

                            )}

                          </Form.Group>
                        </div>
                      </>
                      )
                    }
                    if (val.type === 'checkbox') {
                      return (<>
                        <div className="pl-0 w-100">
                          <Form.Group as={Col} xl="9" className="w-100 pl-2">
                            <Form.Label className="customtextLabel">
                              {val.name}
                              <img src={Edit} disabled={(search == "?view" ? true : false)} onClick={() => editCustomFiled(val, i)} className="pl-2 pr-2" alt="Image" />
                              {/* <img src={Delete} disabled={(search == "?view" ? true : false)} onClick={() => deleteCustomField(i)} className="pl-2 pr-2" alt="Image" /> */}

                            </Form.Label>

                            {val.options?.map((opt, ii) =>
                              <>

                                <div key={`option111-${ii}`} className="custom-control custom-checkbox head_text_lab custom_tab_control">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input popup_input"
                                    name={val.name} disabled
                                    id={`${ii}`}
                                  />
                                  <label
                                    className="custom-control-label headall_text"
                                    htmlFor={`${ii}`}
                                  >
                                    {opt.name}
                                  </label>
                                </div>

                                {/* <Form.Control
                                  type="checkbox"
                                  
                                />{opt.name} */}

                              </>


                            )}


                          </Form.Group>
                        </div>
                      </>
                      )
                    }

                  })}
                  {/* // <span key={i} className="tags">{val.name}  {search ? "" : <span className="closeIcon" onClick={() => deleteCustomField(i)}>+</span>}</span>) */}
                </Form.Row>
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

                {search ? "" : <Button
                  variant="primary"
                  className="btnSame btnPadding btnBorder mt-4"
                  onClick={openAddCustomPopup}
                >
                  Add Custom Field
                </Button>}
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={12}
                className="text-md-right text-center"
              >  {
                  search ? <Button
                    variant="primary"
                    className="btnSame btnPadding mt-4"
                    onClick={viewCourseDetailPage}
                  >
                    Next
                  </Button> :
                    <Button
                      variant="primary"
                      className="btnSame btnPadding mt-4"
                      type="submit"
                    >
                      Save & Next
                    </Button>
                }
              </Col>
            </Row>
          </form>
        </div>
      </div>

      {/* modal */}
      <Modal
        className="add_usermodal"
        show={customFieldShow}
        onHide={handlecustomFieldClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Create custom Field
            <span className="customfieldSpan">{customFiledArray.length}/10</span>
          </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={customValidate} onSubmit={saveCustomFiled}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <div className="select_input">
                  <Form.Group>
                    <Form.Control as="select" disabled={customFieldId ? true : false} defaultValue={customType} onChange={(e) => { setCutomType(e.target.value); }}>
                      <option value="">Select option</option>
                      <option value="text_field">Text field</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio Buttons</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </Col>
              <Col md={12} className="p-0">
                {
                  customType === 'text_field' ?
                    <>
                      <Form.Group as as={Col} xl="8" lg="8" md="8" >
                        <Form.Control type="text"  value={customFiledTitle} required placeholder="Text field Name" onChange={(e) => setCustomFiledTitle(e.target.value)} />
                      </Form.Group>

                      <Form.Group className="mt-4 ml-3">
                        {/* <div className="custom-control custom-checkbox head_text_lab">
                          <input
                            type="checkbox"
                            className="custom-control-input popup_input"
                            id="customCheck99*"checked={course_mandatory_status}  placeholder="Text field Name" onChange={e => set_course_mandatory(e.target.checked)}
                          />
                          <label
                            className="custom-control-label headall_text"
                            htmlFor="customCheck99*"
                          >
                            Mandatory
                          </label>
                        </div> */}
                      </Form.Group>
                      {/* <Form.Group>
                        <Form.Label className="headall_text">Check box</Form.Label>
                        <Form.Control type="checkbox" checked={course_mandatory_status} placeholder="Text field Name" onChange={e => set_course_mandatory(e.target.checked)} />
                      </Form.Group> */}
                    </>
                    :
                    <> <Form.Group as={Col} xl="8" lg="8" md="8">
                      <Form.Control type="text" value={customFiledTitle} required placeholder="Text field Name" onChange={(e) => setCustomFiledTitle(e.target.value)} />

                    </Form.Group>
                      <Form.Group className="">
                        {optionList.map((val, i) => <> <div key={`option163-${i}`} className="form_group_input mb-3">  <Form.Control type="text" value={val.name}  disabled={customFieldId ? true : false} required placeholder={`Option ${i + 1}`} onChange={(e) => setOptionTitle(e.target.value, i)} />                        </div> </>)}
                        {/* <span className="closeIcon" onClick={() => deleteOption(i)}>
                                 delete option page
                        <img src={cross} />
                        </span>
 */}
                      </Form.Group>

                      <Form.Group className="mt-2 mb-4 ml-3">
                     {customFieldId ?'':   <a onClick={addOption} className="add_link" >Add option</a>}
                      </Form.Group>


                      <Form.Group className="ml-3">

                        {/* <div className="custom-control custom-checkbox head_text_lab">
                          <input
                            type="checkbox"
                            className="custom-control-input popup_input"
                            id="customCheck888" checked={course_mandatory_status}  placeholder="Text field Name" onChange={e => set_course_mandatory(e.target.checked)}
                          />
                          <label
                            className="custom-control-label headall_text"
                            htmlFor="customCheck888"
                          >
                            Mandatory
                          </label>
                        </div> */}
                        {/* <Form.Label className="headall_text">Check box</Form.Label>
                        <Form.Control type="checkbox" checked={course_mandatory_status} placeholder="Text field Name" onChange={e => set_course_mandatory(e.target.checked)} /> */}
                      </Form.Group>

                    </>

                }
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {customFieldId ? <Button
              variant="primary"
              className="btnSame mt-4 add_user"
              type="submit"
            >
              Update
            </Button> : <Button
              variant="primary"
              className="btnSame mt-4 add_user"
              type="submit"
            >
              Save
            </Button>}
            <Button
              className="cancel_btn"
              variant="secondary"
              onClick={handlecustomFieldClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CourseCreation;