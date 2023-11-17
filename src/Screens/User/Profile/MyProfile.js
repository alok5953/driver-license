import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { countryList } from '../../../Utils/CountryList';
import Autocomplete from "react-google-autocomplete";
import DatePicker from 'react-date-picker';
import User from '../../../Images/image1.png';
import doc_img from '../../../Images/doc1.jpg';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {
    checkUserSecurityQuestionDoneOrNotAction, updateUserProfileAction, getUserDetailByTokenAction, getUserCourseByIdAction, socketDisconnectAction, logoutUserAction, userPaymentStatusCheckAction
} from "../../../Redux/Actions";
import swal from "sweetalert";

import "./Profile.css";


export const MyProfile = () => {
    let params = useParams();
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();
    const [country, setCountry] = useState('');
    const [shippingState, setShippingState] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date_of_birth, setDOB] = useState(new Date());
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [class_of_permit, set_class_of_permit_driving_card] = useState("");
    const [permit_expiration_date, set_permit_expiration_date] = useState(new Date());
    const [disableDate, setDisbleDate] = useState("")
    const [stateList, setStateList] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [permitFirstName, setPermitFirstName] = useState('');
    const [permitMiddleName, setPermitMiddleName] = useState('');
    const [permitLastName, setPermitLastName] = useState('');
    const [permitSuffix, setPermitSuffix] = useState('');
    const [dmvIdNumber, setDmvIdNumber] = useState('');
    const [confirmDmvIdNumber, setConfirmDmvIdNumber] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [city, setCity] = useState('');
    const [customFiledArray, setCustomFiledArray] = useState([])
    var [customFiledAnwser, setCustomFiledAnwser] = useState([])
    var courseIdData = useSelector(state => state.courseReducer.courseIdMultipleUse);
    const [urlCourseId, setSrlCourseId] = useState('');
    const [addressKey, SetAddresskey] = useState(false);
    useEffect(() => {
        getStateFromCountryArray("United States");
        getuserDetailByEmail();
        getdate()
        getUserCourseDetailById(params.course_id)

    }, []);
    const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
    const getdate = () => {
        let d = new Date();
        let pastYear = d.setFullYear(d.getFullYear() - 18);
        pastYear = new Date(pastYear).toISOString()
        setDisbleDate(pastYear)
    }

    const getStateFromCountryArray = (couname) => {

        if (countryList) {
            countryList.map((val, indx) => {
                if (val.name == couname) {
                    setStateList(val.states);
                }
            })
        }
    }

    // get user detail

    const getuserDetailByEmail = async () => {
        try {
            let userDetailResponse = await dispatch(getUserDetailByTokenAction())
            userDetailResponse = userDetailResponse?.payload;
            userDetailResponse = userDetailResponse?.data?.data
            if (userDetailResponse.is_active) {
                setCountry(userDetailResponse.country); setFirstName(userDetailResponse.first_name); setMiddleName(userDetailResponse?.middle_name ? userDetailResponse?.middle_name : "")
                setLastName(userDetailResponse.last_name); setEmail(userDetailResponse.email); setMobileNumber(userDetailResponse.mobile_number ? userDetailResponse.mobile_number : '');
                setDOB(new Date(userDetailResponse.date_of_birth));
                setAddress1(userDetailResponse.address_line_1);
                setAddress2(userDetailResponse.address_line_2);
                setZipCode(userDetailResponse.zipcode);
                setShippingState(userDetailResponse.state);
                setCity(userDetailResponse?.city)
                setPermitFirstName(userDetailResponse.permit_first_name);
                setPermitMiddleName(userDetailResponse.permit_middle_name ? userDetailResponse.permit_middle_name : "");
                setPermitLastName(userDetailResponse.permit_last_name); setPermitSuffix(userDetailResponse.permit_suffix)
                set_class_of_permit_driving_card(userDetailResponse.class_of_permit);
                set_permit_expiration_date(userDetailResponse.permit_expiration_date ? new Date(userDetailResponse.permit_expiration_date) : '');
                setDmvIdNumber(userDetailResponse.dmv_id); setDocumentNumber(userDetailResponse.document_no)
                getStateFromCountryArray(userDetailResponse.country)
                setConfirmDmvIdNumber(userDetailResponse.dmv_id)
                let arryOptionList = []
                userDetailResponse?.custom_fields?.map((val, index) => {
                    if (val?.option_field?.option_field_type == 'checkbox') {
                        var temp = new Array();
                        // This will return an array with strings "1", "2", etc.
                        temp = val?.custom_field_answers?.answer.split(",")

                        arryOptionList.push({ id: val.id, answer: temp });
                    } else {
                        arryOptionList.push({ id: val.id, answer: val?.custom_field_answers?.answer });
                    }
                })

                setCustomFiledAnwser(arryOptionList)
                var paymentResponse = await dispatch(userPaymentStatusCheckAction(params?.course_id))
                paymentResponse = paymentResponse?.payload;
                if (paymentResponse?.data?.data?.is_paid) {
                } else {
                    swal({
                        title: "Error!",
                        text: 'Your payment is due.',
                        icon: "error",
                        timer: 5000
                    });
                    dispatch(logoutUserAction())
                    history.push(`/user/signin/${params.course_id}`)
                }
            } else {
                swal({
                    title: "Error!",
                    text: 'Please verify your account',
                    icon: "error",
                    timer: 5000
                });

                dispatch(logoutUserAction())
                history.push(`/user/signin/${params.course_id}`)
            }
        } catch (err) {
            if (err?.response?.data?.code === 401) {
                swal({
                    title: "Error!",
                    text: err.response.data.err,
                    icon: "error",
                    timer: 5000
                });
                dispatch(socketDisconnectAction(socket))
                dispatch(logoutUserAction())
                history.push(`/user/signin/${params.course_id}`)
            }
        }
    }

    const getUserCourseDetailById = async (course_id) => {
        try {
            let response = await dispatch(getUserCourseByIdAction(course_id))
            response = response?.payload;
            response = response?.data?.data
            let arrayList = []
            response?.custom_fields?.map((val, index) => {
                let optionArray = [];
                if (val.type == "text_field") {
                    arrayList.push({ id: val.id, name: val.name, type: val.type })
                } else {

                    val?.option_field?.field_options?.map((opt, inx) => {
                        optionArray.push({ name: opt.name })
                    })
                    arrayList.push({ id: val.id, name: val.name, type: val?.option_field?.type, options: optionArray })
                }
            })

            setCustomFiledArray(arrayList)


        } catch (err) {
            if (err?.response?.data?.code === 401) {
                swal({
                    title: "Error!",
                    text: err.response.data.err,
                    icon: "error",
                    timer: 5000
                });
                dispatch(socketDisconnectAction(socket))
                dispatch(logoutUserAction())
                history.push(`/user/signin/${params.course_id}`)
            }
        }
    }

    const setStateFromCountry = (couname) => {
        setCountry(couname)
        if (countryList) {
            countryList.map((val, indx) => {
                if (val.name == couname) {
                    setStateList(val.states);
                }
            })
        }
    }

    // update profile detail
    const handleSubmit = async e => {
        try {
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                if (!first_name) { swal({ title: "Error!", text: 'Please insert first name.', icon: "error", timer: 5000 }); return false };
                // if(!middleName){ swal({ title: "Error!",text: 'Please insert middle name.', icon: "error", timer: 5000}); return false}
                if (!last_name) { swal({ title: "Error!", text: 'Please insert last name.', icon: "error", timer: 5000 }); return false }
                let regexmobile = /[0-9].{9,9}/
                if (!mobileNumber) {
                    swal({
                        title: "Error!",
                        text: 'Please enter mobile number',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }

                if (mobileNumber.length !== 11) {
                    swal({
                        title: "Error!",
                        text: 'Phone number must be 11 digit including code.',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }
                if (mobileNumber.charAt(0) != 1) {
                    swal({
                        title: "Error!",
                        text: 'USA code is 1, Please enter correct code.',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }

                if (!address1) { swal({ title: "Error!", text: 'Please insert address .', icon: "error", timer: 5000 }); return false }
                //if(!address2){ swal({ title: "Error!",text: 'Please insert address 2.', icon: "error", timer: 5000}); return false}
                if (!country) { swal({ title: "Error!", text: 'Please select country.', icon: "error", timer: 5000 }); return false }
                if (!shippingState) { swal({ title: "Error!", text: 'Please select state.', icon: "error", timer: 5000 }); return false }
                if (!zipCode) { swal({ title: "Error!", text: 'Please enter zip code.', icon: "error", timer: 5000 }); return false }
                if (!permitFirstName) { swal({ title: "Error!", text: 'Please enter permit first name.', icon: "error", timer: 5000 }); return false }
                if (!permitLastName) { swal({ title: "Error!", text: 'Please enter permit last name.', icon: "error", timer: 5000 }); return false }
                // if(!permitMiddleName){ swal({ title: "Error!",text: 'Please enter permit middle name.', icon: "error", timer: 5000}); return false}
                // if (!permitSuffix) { swal({ title: "Error!", text: 'Please enter permit suffix.', icon: "error", timer: 5000 }); return false }
                if (!date_of_birth) { swal({ title: "Error!", text: 'Please enter date of birth.', icon: "error", timer: 5000 }); return false }
                if (!class_of_permit) { swal({ title: "Error!", text: 'Please select class of permit.', icon: "error", timer: 5000 }); return false }
                if (!permit_expiration_date) { swal({ title: "Error!", text: 'Please enter permit expiration date.', icon: "error", timer: 5000 }); return false }

                let regex = /[0-9].{8,8}/
                if (!dmvIdNumber) {
                    swal({
                        title: "Error!",
                        text: 'Please enter DMV Id number',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }
                else {
                    if (regex.exec(dmvIdNumber) == null) {
                        swal({
                            title: "Error!",
                            text: 'DMV Id number pattern does not match.',
                            icon: "error",
                            timer: 3000
                        });
                        return false
                    }
                }
                if (dmvIdNumber.length > 9) {
                    swal({
                        title: "Error!",
                        text: ' DMV Id number must be 9 character.',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }
                if (!confirmDmvIdNumber) {
                    swal({
                        title: "Error!",
                        text: 'Please enter confirm DMV Id number',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }
                else {
                    if (regex.exec(confirmDmvIdNumber) == null) {
                        swal({
                            title: "Error!",
                            text: ' Confirm DMV Id number pattern does not match.',
                            icon: "error",
                            timer: 3000
                        });
                        return false
                    }
                }
                if (confirmDmvIdNumber.length > 9) {
                    swal({
                        title: "Error!",
                        text: 'Confirm DMV Id number must be 9 character.',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }
                if (dmvIdNumber !== confirmDmvIdNumber) {
                    swal({
                        title: "Error!",
                        text: 'DMV Id number and Confirm DMV Id number does not match.',
                        icon: "error",
                        timer: 5000
                    });
                    return false;
                }

                if (!documentNumber) {
                    swal({
                        title: "Error!",
                        text: 'Please enter document number ',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }
                else {
                    let rezxg = /[a-z0-9].{9,9}/
                    if (rezxg.exec(documentNumber) == null) {
                        swal({
                            title: "Error!",
                            text: ' Document number pattern does not match and length must be 10 character.',
                            icon: "error",
                            timer: 3000
                        });
                        return false
                    }
                }
                if (documentNumber.length > 10) {
                    swal({
                        title: "Error!",
                        text: ' Document number must be 10 character.',
                        icon: "error",
                        timer: 3000
                    });
                    return false
                }

            }
            setValidated(true);
            if (form.checkValidity()) {
                e.preventDefault();
                let custoAnsList = [];
                customFiledAnwser?.map((re, index) => {
                    if (Array.isArray(re.answer)) {

                        custoAnsList.push({ id: re.id, answer: re.answer.toString() })
                    } else {
                        custoAnsList.push({ id: re.id, answer: re.answer })
                    }

                })

                let values;
                values = {
                    'first_name': first_name, "middle_name": middleName, 'last_name': last_name, "mobile_number": mobileNumber,
                    'date_of_birth': date_of_birth, 'country': country,
                    'address_line_1': address1, 'address_line_2': address2,
                    "state": shippingState, "zipcode": zipCode,
                    "latitude": latitude ? latitude : 0, "permit_first_name": permitFirstName, "permit_middle_name": permitMiddleName, "permit_last_name": permitLastName,
                    "longitude": longitude ? longitude : 0, "permit_suffix": 'permitSuffix',
                    "dmv_id": dmvIdNumber, "permit_expiration_date": permit_expiration_date, "document_no": documentNumber,
                    "class_of_permit": class_of_permit,
                    "city": city,
                    "custom_field_answers": custoAnsList
                }
                let response = await dispatch(updateUserProfileAction(values))
                response = response?.payload;
                dispatch(getUserDetailByTokenAction())
                // value assign in varible
                if (response) {
                    if (response.data) {
                        if (response.data.code == 200) {
                            var securityQuestionResponse = await dispatch(checkUserSecurityQuestionDoneOrNotAction())
                            securityQuestionResponse = securityQuestionResponse?.payload;
                            if (securityQuestionResponse?.data?.data?.isDone) {
                                swal({
                                    title: "Success!",
                                    text: response.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                setValidated(false)

                            } else {
                                swal({
                                    title: "Success!",
                                    text: response.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                setValidated(false)
                                history.push(`/user/setupsecurityquestion/${params.course_id}`)
                            }
                        } else {
                            swal({
                                title: "Error!",
                                text: response.data.message,
                                icon: "error",
                                timer: 3000
                            });
                            setValidated(false);
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
                dispatch(socketDisconnectAction(socket))
                dispatch(logoutUserAction())
                history.push(`/user/signin/${params.course_id}`)
            }
        }
    };


    const addressSetup = (place) => {
        SetAddresskey(!addressKey)
        if (place?.place_id) {
            if (place?.address_components.length < 5) {
                swal({
                    title: "Error!",
                    text: 'Please fill up complete address',
                    icon: "error",
                    timer: 5000
                });
                return false;
            } else {
                setAddress1(place?.formatted_address)
                place?.address_components?.map((val, index) => {
                    if ('route' === val.types[0]) { }
                    if ('postal_code' === val.types[0]) { setZipCode(val.long_name) }
                    if ('country' === val.types[0]) { setStateFromCountry(val.long_name) }
                    if ('administrative_area_level_1' === val.types[0]) { setShippingState(val.long_name) }
                    if ('locality' === val.types[0]) { setCity(val.long_name) } else if ('sublocality' === val.types[1]) {
                        setCity(val.long_name)
                    }
                })
            }
            let reg = /^[0-9]*[.]?[0-9]*$/;
            setLatitude(place?.geometry?.location?.lat())
            setLongitude(place?.geometry?.location?.lng())
        }
    }

    const documentHelpAction = () => {
        window.open('https://dmv.ny.gov/id-card/sample-photo-documents', '_blank').focus();
    }

    const customAnswer = (customId, answer, type, checkboxValue) => {
        // console.log(customId, answer, type,customFiledAnwser.length)
        if (type === "text_field") {
            let val = customFiledAnwser.some(el => el.id === customId)
            if (!val) {
                setCustomFiledAnwser([...customFiledAnwser, { id: customId, answer: answer }]);
            } else {
                customFiledAnwser?.map((val, index) => {
                    if (customId === val.id) {
                        customFiledAnwser[index].answer = answer
                    }
                })
                setCustomFiledAnwser([...customFiledAnwser])
            }
        }
        if (type === "dropdown") {
            let val = customFiledAnwser.some(el => el.id === customId)
            if (!val) {
                setCustomFiledAnwser([...customFiledAnwser, { id: customId, answer: answer }]);
            } else {
                customFiledAnwser?.map((val, index) => {
                    if (customId === val.id) {
                        customFiledAnwser[index].answer = answer
                    }
                })
                setCustomFiledAnwser([...customFiledAnwser])
            }
        }
        if (type === "radio") {
            let val = customFiledAnwser.some(el => el.id === customId)

            if (!val) {
                setCustomFiledAnwser([...customFiledAnwser, { id: customId, answer: answer }]);
            } else {
                customFiledAnwser?.map((val, index) => {
                    if (customId === val.id) {
                        customFiledAnwser[index].answer = answer
                    }
                })
                setCustomFiledAnwser([...customFiledAnwser])
            }
        }
        if (type === "checkbox") {
            if (checkboxValue) {
                if (answer) {
                    let val = customFiledAnwser?.some(el => el.id === customId)

                    if (!val) {

                        setCustomFiledAnwser([...customFiledAnwser, { id: customId, answer: [checkboxValue] }]);
                    } else {
                        let arrylst = []
                        customFiledAnwser?.map((val, index) => {
                            if (customId === val.id) {
                                if (Array.isArray(customFiledAnwser[index].answer)) {
                                    arrylst = customFiledAnwser[index].answer
                                    const found = arrylst?.find(element => element == checkboxValue);
                                    if (!found) {
                                        arrylst.push(checkboxValue)
                                    }
                                    customFiledAnwser[index].answer = arrylst
                                }
                            }
                        })
                        setCustomFiledAnwser([...customFiledAnwser])
                    }
                } else {
                    customFiledAnwser?.map((val, indexx) => {
                        if (customId === val.id) {
                            let optionindex = val.answer.findIndex((element) => element == checkboxValue)

                            let arrylst = val.answer.splice(optionindex, 1);

                            customFiledAnwser[indexx].answer = val.answer
                        }
                    })
                    setCustomFiledAnwser([...customFiledAnwser])
                }
            }
        }
    }


    return (
        <>
            <div className="admin_user user_profile_text">
                <Form className="mt-5 pl-lg-4 pr-lg-4 profile-form" noValidate validated={validated} onSubmit={handleSubmit}>
                    <h5 className="mt-4 mb-4">Basic details</h5>
                    <Form.Row>
                        <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={first_name || ""} placeholder="" onChange={e => (setFirstName(e.target.value))}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                                type="text"  
                                value={middleName  || ""} placeholder="" onChange={e => (setMiddleName(e.target.value))}

                            />
                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={last_name  || ""} placeholder="" onChange={e => (setLastName(e.target.value))}
                                required
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row className="mt-3">
                        <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                            <Form.Label>Mobile Number</Form.Label>
                            {/* <Form.Control
                                type="text"
                                value={mobileNumber} pattern="[0-9].{9,9}"
                                required  title="Mobile number must be numeric format."
                                onChange={e => (setMobileNumber(e.target.value))}
                            /> */}
                            <PhoneInput
                                onlyCountries={['us']}
                                country={"us"}
                                onChange={value => setMobileNumber(value)}
                                name="phone"
                                value={mobileNumber}
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email} readOnly
                                required
                                onChange={e => (setEmail(e.target.value))}
                            />
                        </Form.Group>


                    </Form.Row>



                    <h4 className="mt-4 mb-4">Shipping Address</h4>

                    <Form.Row>
                        <Form.Group as={Col} xl="4" lg="4" md="4" sm="12">
                            <Form.Label>Address</Form.Label>

                            <Autocomplete name="address1" className="autocompleteInput" options={{
                                types: [],
                                componentRestrictions: { country: "us" },

                            }} defaultValue={address1} key={addressKey ? 1 : 0} onPlaceSelected={(place) => addressSetup(place)} />
                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="4" md="4" sm="12">
                            <Form.Label>Address Line 2</Form.Label>

                            <Form.Control type="text" placeholder="" value={address2  || ""} onChange={e => (setAddress2(e.target.value))} />
                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="" readOnly value={city  || ""} onChange={e => (setCity(e.target.value))} />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row className="mt-3">
                        <Form.Group as={Col} xl="4" lg="4" md="4" sm="12">
                            <Form.Label>State</Form.Label>
                            <div className="select_input">
                                <Form.Control as="select" disabled value={shippingState  || ""} onChange={e => (setShippingState(e.target.value))}>
                                    <option value="">Please select state</option>
                                    {stateList.map((val,i) => <option key={`statelist-${i}`} value={val.name}>{val.name}</option>)}
                                </Form.Control>
                            </div>
                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="4" md="4" sm="12">
                            <Form.Label>ZIP code</Form.Label>
                            <Form.Control
                                type="text" readOnly
                                required
                                pattern="^[0-9]*[.]?[0-9]*$"
                                value={zipCode  || ""} onChange={e => (setZipCode(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="4" md="4" sm="12">
                            <Form.Label>Country</Form.Label>
                            <div className="select_input">
                                <Form.Control as="select" disabled value={country  || "" }  required onChange={e => (setStateFromCountry(e.target.value))}>
                                    <option value="">Please select country</option>
                                    {countryList.map((val,ii) => <option key={`countrylist-${ii}`} value={val.name}>{val.name}</option>)}
                                </Form.Control>
                            </div>
                        </Form.Group>
                    </Form.Row>

                    <h4 className="mt-4 mb-4">
                        Driving Permit Information
                    </h4>

                    <div >
                        <Form.Row>
                            <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="" required value={permitFirstName  || ""} onChange={e => (setPermitFirstName(e.target.value))} />
                            </Form.Group>

                            <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={permitMiddleName  || ""} onChange={e => (setPermitMiddleName(e.target.value))} />
                            </Form.Group>

                            <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="" required value={permitLastName  || ""} onChange={e => (setPermitLastName(e.target.value))} />
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Row>
                            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                                <Form.Label className="labelFirst">
                                    Permit Suffix
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    required value={permitSuffix} onChange={e => (setPermitSuffix(e.target.value))}
                                />
                            </Form.Group>
                        </Form.Row> */}
                        <Form.Row>
                            <Form.Group as={Col} xl="12" lg="12" md="12" sm="12">
                                <Form.Label className="labelFirst">
                                    Image added Here
                                </Form.Label>
                                <div className="info-body mt-3 mb-3">
                                    <Row>
                                        <Col xl={4} lg={4} md={4} sm={12}>
                                            <button className="documentBtn" onClick={documentHelpAction}>
                                                Click here for DMV Photo Document <br /> Help
                                            </button>

                                            <div className="recent-info mt-3 mb-3">
                                                {/* <img alt="close_icon" src={deleteicon} className="close_icon" /> */}
                                                <p> Please enter your information as it appears on your <span>
                                                    most recently </span> issued NY DMV learner permit.</p>
                                            </div>

                                            <div className="recent-info mt-3 mb-3">
                                                {/* <img alt="close_icon" src={deleteicon} className="close_icon" /> */}
                                                <p className="text-center"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                                </p>
                                            </div>
                                        </Col>

                                        <Col xl={8} lg={8} md={8} sm={12}>
                                            <img alt="close_icon" src={doc_img} className="img_max" />
                                        </Col>
                                    </Row>
                                </div>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                                <Form.Label>Date of birth</Form.Label>
                                <DatePicker className="date_input_css" format="MM/dd/yyyy" maxDate={new Date(disableDate)}
                                    value={date_of_birth} onChange={date => setDOB(date)}
                                />

                            </Form.Group>

                            <Form.Group as={Col} xl="4" lg="4" md="4" sm="12">
                                <Form.Label>Class of Permit</Form.Label>
                                <div className="select_input">
                                    <Form.Control as="select" required value={class_of_permit  || ""} onChange={e => (set_class_of_permit_driving_card(e.target.value))}>
                                        <option value=''>Select class of permit </option>
                                        <option value='D'>D</option>
                                        {/* <option value='DJ'>DJ</option> */}
                                        <option value='M'>M</option>
                                        {/* <option value='MJ'>MJ</option>
                                        <option value='E'>E</option> */}
                                    </Form.Control>
                                </div>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12" >
                                <Form.Label>Permit Expiration Date</Form.Label>

                                <DatePicker className="date_input_css" minDate={new Date()} format="MM/dd/yyyy" value={permit_expiration_date} required onChange={date => set_permit_expiration_date(date)} />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row className="mt-3 document-row">


                            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                                <Form.Label>DMV Id Number(Nine-digit number on the front of your permit)</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="" pattern="[0-9].{8,8}"
                                    required value={dmvIdNumber  || ""} onChange={e => (setDmvIdNumber(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                                <Form.Label>Confirm DMV Id Number(Nine-digit number on the front of your permit)</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="" pattern="[0-9].{8,8}"
                                    required value={confirmDmvIdNumber  || ""} onChange={e => (setConfirmDmvIdNumber(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
                                <Form.Label>Document Number(ten digit number found on your photo permit. Temporary (paper)permit it numbers are not accepted.)</Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="" pattern="[A-Za-z0-9].{9,9}"
                                    required value={documentNumber  || ""} title="Length must 10 charactor" onChange={e => (setDocumentNumber(e.target.value))}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Row>
                            <Col xl={4} lg={5} md={12} sm={12}>
                                <Form.Row className="mt-3 mb-3 mb-md-0 mt-md-3 mt-lg-3 pt-0 pt-md-0 pt-lg-0 profile_label">
                                    {customFiledArray.map((val, i) => {
                                        //   answer map
                                        let custom_id = '', answer = '';
                                        customFiledAnwser?.map((ans, inx) => {
                                            if (val.id == ans.id) {
                                                custom_id = val.id;
                                                answer = ans.answer;
                                            }
                                        })

                                        if (val.type === 'text_field') {
                                            return (
                                                <>
                                                    <div key={`customans-${i}`} className="pl-0 w-100">
                                                        <Form.Group as={Col} xl="12" className="w-100 pl-2">
                                                            <Form.Label className="customtextLabel">
                                                                {val.name}

                                                            </Form.Label>
                                                            <Form.Control type="text" value={custom_id === val.id ? answer : ''} onChange={(e) => customAnswer(val.id, e.target.value, val.type, '')} />
                                                        </Form.Group>
                                                    </div>
                                                </>
                                            )
                                        }
                                        if (val.type === 'dropdown') {
                                            return (<>
                                                <div className="pl-0 w-100">
                                                    <Form.Group as={Col} xl="12" className="w-100 pl-2">
                                                        <Form.Label className="customtextLabel">
                                                            {val.name}

                                                        </Form.Label>

                                                        <div className="select_input">
                                                            <Form.Control as="select" type="select" value={custom_id === val.id ? answer : ''} onChange={(e) => customAnswer(val.id, e.target.value, val.type, '')}>
                                                                <option>Select Dropdown</option>

                                                                {val.options?.map((val,i) => <option  key={`customname-${i}`} value={val.name}>{val.name}</option>)}
                                                            </Form.Control>
                                                        </div>



                                                    </Form.Group>
                                                </div>
                                            </>
                                            )
                                        }
                                        if (val.type === 'radio') {
                                            return (<>
                                                <div className="pl-0 w-100">
                                                    <Form.Group as={Col} xl="12" className="w-100 pl-2">
                                                        <Form.Label className="customtextLabel w-100 d-block">
                                                            {val.name}

                                                        </Form.Label>

                                                        {val.options?.map((opt, ii) =>
                                                            <>
                                                                {/* <Form.Control
                                                                    type="radio" onChange={(e) =>  customAnswer(val.id,opt.name,val.type,'')}
                                                                    name={val.name}
                                                                    id={`${ii}`}
                                                                    checked={custom_id===val.id?opt.name===answer:''}
                                                                />{opt.name} */}

                                                                <div key={`iotion-${ii}`} className="form-group custom_tab_control custom-control pl-0">
                                                                    <input type="radio" name="custom-radio-btn-quiz" onChange={(e) => customAnswer(val.id, opt.name, val.type, '')}
                                                                        name={val.name}
                                                                        id={`${ii}`}
                                                                        checked={custom_id === val.id ? opt.name === answer : ''} />
                                                                    <label className="custom-radio" htmlFor={`${ii}`} ></label>
                                                                    <span className="label-text">
                                                                        {opt.name}
                                                                    </span>
                                                                </div>


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
                                                    <Form.Group as={Col} xl="12" className="w-100 pl-2">
                                                        <Form.Label className="customtextLabel w-100 d-block">
                                                            {val.name}

                                                        </Form.Label>

                                                        {val.options?.map((opt, ii) =>
                                                            <>
                                                                {/* <Form.Control
                                                                    type="checkbox"  checked={custom_id===val.id?opt.name==answer?true:false:false}  onChange={(e) =>  customAnswer(val.id,e.target.checked,val.type,opt.name)}
                                                                    name={val.name}
                                                                    id={`${ii}`}
                                                                />{opt.name} */}

                                                                <div  key={`customField-${ii}`} className="custom-control custom-checkbox head_text_lab custom_tab_control">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="custom-control-input popup_input"
                                                                        name={val.name} checked={custom_id === val.id ? answer?.find(element => element == opt.name) ? true : false : false} onChange={(e) => customAnswer(val.id, e.target.checked, val.type, opt.name)}
                                                                        id={`${ii}*`}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label headall_text"
                                                                        htmlFor={`${ii}*`}
                                                                    >
                                                                        {opt.name}
                                                                    </label>
                                                                </div>

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

                        <Button
                            variant="primary"
                            className="btnSign mt-4 mb-3 pl-5 pr-5 pt-1 pb-1"
                            type="submit"
                        >
                            Update
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};
