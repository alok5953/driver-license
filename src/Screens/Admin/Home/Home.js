import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCourseListAllAction, clearCourseReducerAction, getEnrolledCourcesAction, getCompletedCourcesAction, getRegisteredUserAction, getTotalCoursePaymentAction, getUsersWithNoPaymentsAction,getCoursePerformanceAction } from "../../../Redux/Actions";

import "./Home.css";

import Chart from "./Chart";
import PieChart from "./PieChart";

 const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [courseList, setCourseList] = useState([]);
    const [registeredUserCount, setRegisteredUserCount] = useState(0);
    const [completedCourseCount, setCompletedCourseCount] = useState(0);
    const [enrolledCourseCount, setEnrolledCourseCount] = useState(0)
    const [withoutPaymentUser,setWithoutPaymentUser] = useState(0);
    const [totalCoursePayment,setTotalCoursepayment] = useState('');
    const [coursePerformanceResult,setCoursePerformanceResult] = useState(0);
    useEffect(() => {
        getCourseList(1)
       
    }, [])

    const getCourseList = async () => {
        try {
            const response = await dispatch(getCourseListAllAction(1, 1000));
            const allCoursResponse = response?.payload;
           
            // Check this once component object saved in db is finalized 
            if (allCoursResponse) {
                if (allCoursResponse.data) {
                    if (allCoursResponse.data.code == 200) {
                        const arrange = allCoursResponse?.data?.data?.rows;
                       
                        var d = new Date();
                        getTotalCoursePayment(arrange[0].id,d.getFullYear())
                        setCourseList(arrange)
                        getRegisteredUser(arrange[0]?.id,d.getFullYear())
                    } else {
                        swal({
                            title: "Error!",
                            text: allCoursResponse.data.message,
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
    const clearCourseReducer = () => {
        const response = dispatch(clearCourseReducerAction());
        const success = response?.payload;
        if (success) {
            if (success.data) {
                if (success.data.code == 200) {
                    history.push('/courses/coursecreation')
                }
            }
        }
    }

    const getRegisteredUser = async (cid,year) => {
        try {
            const response = await dispatch(getRegisteredUserAction(cid,year));
            getCompletedCources(cid,year)
            let registerdUserResponse = response?.payload;
            if (registerdUserResponse) {
                if (registerdUserResponse.data) {
                    setRegisteredUserCount(registerdUserResponse?.data?.data)
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

    const getCompletedCources = async (cid,year) => {
        try {
            const response = await dispatch(getCompletedCourcesAction(cid,year));
            getEnrolledCources(cid,year)
            let completedCourcesResponse = response?.payload;
            if (completedCourcesResponse) {
                if (completedCourcesResponse.data) {
                    if (completedCourcesResponse.data.code == 200) {
                        setCompletedCourseCount(completedCourcesResponse?.data?.data?.count)
                    } else {
                        swal({
                            title: "Error!",
                            text: completedCourcesResponse.data.message,
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
    const getEnrolledCources = async (cid,year) => {
        try {
            const response = await dispatch(getEnrolledCourcesAction(cid,year));
            getUsersWithNoPayments(cid,year)
            getCoursePerformance(cid,year)
            let getEnrolledCourcesResponse = response?.payload;
            if (getEnrolledCourcesResponse) {
                if (getEnrolledCourcesResponse.data) {
                    if (getEnrolledCourcesResponse.data.code == 200) {
                        setEnrolledCourseCount(getEnrolledCourcesResponse?.data?.data?.count)
                    } else {
                        swal({
                            title: "Error!",
                            text: getEnrolledCourcesResponse.data.message,
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


    const getTotalCoursePayment = async (courseid,year) => {
        try {
            const response = await dispatch(getTotalCoursePaymentAction(courseid,year));
            let totalCoursePaymentResponse = response?.payload;
            if (totalCoursePaymentResponse) {
                if (totalCoursePaymentResponse.data) {
                    if(totalCoursePaymentResponse?.data?.data.length>0 ){
                        setTotalCoursepayment(totalCoursePaymentResponse?.data?.data)
                    }else{
                        setTotalCoursepayment([])
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

    const getUsersWithNoPayments = async (cid,year) => {
        try {
            const response = await dispatch(getUsersWithNoPaymentsAction(cid,year));
            let responseWithNoPayment = response?.payload;
            if (responseWithNoPayment) {
                if (responseWithNoPayment.data) {
                    setWithoutPaymentUser(responseWithNoPayment?.data?.data?.length)
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

    const getDetailByCourseId = (courseId,year) =>{
        getTotalCoursePayment(courseId,year)
        getRegisteredUser(courseId,year)
    }

    const getCoursePerformance = async (cid,year) => {
        try {
            const response = await dispatch(getCoursePerformanceAction(cid,year));
            let getCoursePerformanceResponse = response?.payload;
            setCoursePerformanceResult(getCoursePerformanceResponse?.data?.data?.count)
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

    const coursePageredirect = () =>{
        history.push("/courses/courselist")
    }

    return (
        <>
            <div className="pt-4 pl-lg-3 pr-lg-3 pl-0 pr-0 pb-4 mb-4 containerHome dashboardSec">
                <div className="row">
                    <div className="col-xl-8 col-lg-7 col-md-7 col-12">
                        <div className="card">
                     {courseList.length>0 &&  <Chart courseList={courseList} getDetailByCourseId = {getDetailByCourseId} totalCoursePayment = {totalCoursePayment}/>}
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-5 col-12">
                        <div className="card">
                            <PieChart coursePerformanceResult = {coursePerformanceResult}/>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-xl-8 col-lg-7 col-md-7 col-12">
                        <div className="card">
                            <div className="card-body pt-3 pb-4">
                                <div className="cousestitle">
                                    <h4 className="card-title courseTitle">Courses</h4>

                                    <a className="btn btnBlue" onClick={clearCourseReducer}>
                                        Create Course
                                    </a>

                                </div>
                                <div className="tableScroll">
                                    <table className="table">
                                        <thead>
                                            <tr className="tableHeading">
                                                <th scope="col">#</th>
                                                <th scope="col">Course Name</th>
                                                <th scope="col">Created by</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseList ?
                                                courseList.map((course, i) => {
                                                    let status = "";
                                                    if (course.is_active) {
                                                        status = "Active"
                                                    } else {
                                                        status = "Inactive"
                                                    }
                                                    return (
                                                        <tr key={`home-${i}`}>
                                                            <td>{i + 1}</td>
                                                            <td>{course.course_title || 'Introduction to the course'}</td>
                                                            <td>{course.createdBy?.first_name}&nbsp;{course.createdBy?.last_name}</td>
                                                            <td className="active">Active</td>

                                                        </tr>
                                                    )
                                                }) : null}
                                        </tbody>
                                    </table>
                                </div>
                               
                                    <a

                                        className="ViewAlltag text-center w-100 d-block" onClick={()=>coursePageredirect()}
                                    >
                                        View All
                                    </a>
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-5 col-md-5 col-12">
                        <div className="card">
                            <div className="chartHearder noFlex">
                                <div className="heading">
                                    <h3>Latest Info</h3>
                                </div>
                                <div className="borderBottom"></div>
                            </div>
                            <ul className="list-group list-group-flush latestInfoList p-0">
                                <li className="list-group-item latestInfo">
                                    <div className="iconData">
                                        <span className="infoIcon icon001"></span>
                                        {registeredUserCount}&nbsp; New Registration
                                    </div>
                                    <span className="infoStatus">Last 24 Hours</span>
                                </li>
                                <div className="borderListBottom"></div>
                                <li className="list-group-item latestInfo">
                                    <div className="iconData">
                                        <span className="infoIcon icon002"></span>
                                        {completedCourseCount}&nbsp; Completed Cources
                                    </div>
                                    <span className="infoStatus">Last 24 Hours</span>
                                </li>
                                <div className="borderListBottom"></div>
                                <li className="list-group-item latestInfo">
                                    <div className="iconData">
                                        <span className="infoIcon icon003"></span>
                                        {enrolledCourseCount} &nbsp; Enrolled Course
                                    </div>
                                    <span className="infoStatus">Last 24 Hours</span>
                                </li>
                                <div className="borderListBottom"></div>
                                <li className="list-group-item latestInfo">
                                    <div className="iconData">
                                        <span className="infoIcon icon003"></span>
                                        {withoutPaymentUser} &nbsp; User Without Payment Count
                                    </div>
                                    {/* <span className="infoStatus">Last 24 Hours</span> */}
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;