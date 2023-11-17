import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Pagination } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'antd/dist/antd.css';
import Download from "../../../Images/download.svg";
import deleteIcon from "../../../Images/delete.svg";
import edit from "../../../Images/edit.svg";
import DatePicker from 'react-date-picker';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Coupon.css";
import Eye from "../../../Images/eye.svg";
import {
  saveCouponAction,
  getPromocodeDetailAction
} from "../../../Redux/Actions";

import swal from "sweetalert";
import { COUPON_PERMISSION, FULL, READ, EDIT } from '../../../Utils/PermissionConstant'

const Coupon = (props) => {
  let search = props.location.search;
  let history = useHistory();
  const dispatch = useDispatch();
  const [couponShow, setCouponShow] = useState(false);
  const handleCouponClose = () => setCouponShow(false);
  const handleCouponShow = () => setCouponShow(true);
  const [couponUpdateShow, setUpdateCouponShow] = useState(false);
  const handleUpdateCouponClose = () => setUpdateCouponShow(false);
  const handleUpdateCouponShow = () => setUpdateCouponShow(true);
  const [validated, setCouponValidated] = useState(false);
  const [prmocodeList, setPrmocodeList] = useState([]);
  const [couponType, setCouponType] = useState('percent_off');
  const [percent_off, set_percent_off] = useState('')
  const [max_redemptions, set_max_redemptions] = useState('');
  const [initialPromocodeId, setInitialPromocodeId] = useState('')
  const [coupon_count, set_coupon_count] = useState('')
  const [duration_in_months, set_duration_in_months] = useState('')
  const [minimum_amount, set_minimum_amount] = useState('')

  const [pageNo, setPageno] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(1);

  const [permission, setPermission] = useState('');
  useEffect(() => {
    getAllDetails(pageNo,initialPromocodeId);

  }, []);
  const getAllDetails = async (perPage,promocodeId) => {
    try {
      setPageno(pageNo);
      const allPromocodeResponse = await dispatch(getPromocodeDetailAction(perPage,promocodeId));
      if(promocodeId){
        if(prmocodeList.length == 0){
          allPromocodeResponse.payload.data?.data?.promotionCodes?.data?.length && setPrmocodeList(allPromocodeResponse.payload.data?.data?.promotionCodes?.data)
        } else{
          let count = 0;
          let arr =  allPromocodeResponse?.payload?.data?.data?.promotionCodes?.data?.map((val,index)=>{
            prmocodeList.push(val)
            count = count + 1;
          
            if(count>=allPromocodeResponse?.payload?.data?.data?.promotionCodes?.data?.length){
              return prmocodeList
            }
          })
          //setPrmocodeList(arr)
        }
        
      } else{
        allPromocodeResponse.payload.data?.data?.promotionCodes?.data?.length && setPrmocodeList(allPromocodeResponse.payload.data?.data?.promotionCodes?.data)
      } 
      setInitialPromocodeId(allPromocodeResponse.payload.data?.data?.promotionCodes?.data[allPromocodeResponse.payload.data?.data?.promotionCodes?.data.length-1]?.id)
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

  // save coupon
  const handleSubmit = async e => {
    try {
        e.preventDefault();
        let values = { coupon: {}, count: '' };

        if (couponType == 'percent_off') {
        
          if(percent_off > 99){
            swal({
              title: "Error!",
              text:  'Percent value must be less than 100 or greater than 0 .',
              icon: "error",
              timer: 3000
            });
            return false;
          } 
          values.coupon.percent_off = parseFloat(percent_off);
        } else {
          values.coupon.amount_off = parseFloat(percent_off);
          values.coupon.currency = "usd";
        }
        values.expires_at = Math.round(new Date(duration_in_months).getTime() / 1000);;
        if (minimum_amount) {
          values.restrictions = {
            "minimum_amount": parseInt(minimum_amount),
            "minimum_amount_currency": "usd"
          }
        }
        if (max_redemptions) {

          values.coupon.max_redemptions = max_redemptions ? max_redemptions : null;
        }
        values.count = parseInt(coupon_count)

        const response = await dispatch(saveCouponAction(values))
        const couponDetailList = response?.payload;
        // value assign in varible
        getAllDetails(perPage,  '');
        setPrmocodeList([])
        if (couponDetailList) {
          if (couponDetailList.data) {
            if (couponDetailList.data.code == 200) {
              swal({
                title: "Success!",
                text: couponDetailList.data.message,
                icon: "success",
                timer: 3000
              });
              handleCouponClose()
              
              setCouponValidated(false)
              set_duration_in_months('');
              set_percent_off('')
              setCouponType('percent_off');
              set_coupon_count('')
              set_minimum_amount('')
              set_max_redemptions('')

            } else {
              swal({
                title: "Error!",
                text: couponDetailList?.data?.message,
                icon: "error",
                timer: 3000
              });
              setCouponValidated(false);
            }
          }
        }
        setCouponShow(false);
      //}
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

  // check permission or not
  const loginState = useSelector(state => state.authReducer?.loginData);
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      if (loginState?.data?.data?.user?.role?.policies.length) {
        let list = loginState?.data?.data?.user?.role?.policies
        list.map((val, i) => {
          if (COUPON_PERMISSION == val.name && val.scope != "none") {
            setPermission(val.scope)
          }
        })
      }
    }
  }, [loginState]);
  // refresh tokenresult
  const refreshTokenResult = useSelector(state =>
    state.authReducer.loginData
  );
  useEffect(() => {

    if (refreshTokenResult?.data?.data?.access_token) {
      if (refreshTokenResult?.data?.data?.user?.role?.policies.length) {
        let list = loginState?.data?.data?.user?.role?.policies
        list.map((val, i) => {
          if (COUPON_PERMISSION == val.name && val.scope != "none") {
            setPermission(val.scope)
          }
        })
      }
    }
  }, [refreshTokenResult])

  const copyCodeToClipboard = (id) => {
    swal({
      title: "Success!",
      text: 'Copied',
      icon: "success",
      timer: 3000
    });
  }

  const OnscrollFunction = (e) =>{
    if ( (e.target.scrollTop > 0 ) && (Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight) ) {        
      getAllDetails(pageNo,initialPromocodeId);
    }
  }

  

  return (
    <>
      <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 courselistsection content" onScroll={OnscrollFunction}>
        <Row>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}>
            <h1 className="d-md-inline-block d-block mb-3">
              Coupon
            </h1>
          </Col>
          <Col
            xl={8}
            lg={8}
            md={8}
            sm={6}
            xs={6}
            className="text-right mb-3 mb-md-3"
          >
            <div>
              <Form>

                {permission == FULL ?
                  <Button
                    variant="primary"
                    className="btnSame btnPadding ml-3"
                    onClick={handleCouponShow}
                  >
                    Add Coupon
                  </Button>
                  : ''}
              </Form>
            </div>
          </Col>
        </Row>

        <div className="app-section">
          <div>
            <Table responsive className="table table-borderless user_table">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Coupon Type</th>
                  <th>Value</th>
                  <th>Valid Upto</th>
                  {/* <th>Times Reedeemed</th> */}
                  {/* <th>Created by</th> */}
                  <th>Created on</th>
                  <th className="pl-3 pr-5 pr-md-3 pl-md-4"></th>
                </tr>
              </thead>
              <tbody className="pt-4">

                {
                  prmocodeList.map((val, i) => {
                    let action_Edit = '', delete_html = '';
                    let date = new Date(val?.created * 1000)
                    date = date.toLocaleDateString('en-US');
                    let expire_date = new Date(val?.expires_at * 1000)
                    expire_date = expire_date.toLocaleDateString('en-US');
                    return (<tr key={`coupon-${i}`}>
                      <td>{i + 1 + ((pageNo - 1) * perPage)}</td>
                      <td>
                        {val.code}
                        &nbsp;
                        <CopyToClipboard text={val.code}
                        >
                          <button className="btn rem" onClick={() => copyCodeToClipboard(val.code)}><i className="fa fa-clone" aria-hidden="true"></i>
                          </button>
                        </CopyToClipboard>
                      </td>
                      <td>{val?.coupon?.amount_off ? 'Flat Discount ($)':'Percentage Discount (%)'}</td>
                      <td>{val?.coupon?.amount_off ? val?.coupon?.amount_off/100 : val?.coupon?.percent_off}</td>
                      <td>{expire_date}</td>
                    
                      <td>{date}</td>
                    </tr>)
                  })
                }


              </tbody>
            </Table>
          </div>
        </div>
        <div >
         
        </div>
      </div>

      {/* modal */}
      <Modal
        className="add_usermodal coupon_box"
        show={couponShow}
        onHide={handleCouponClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Generate Coupon Codes</Modal.Title>
        </Modal.Header>
        <form  onSubmit={handleSubmit}>
          <Modal.Body className="pt-4">
            <Form.Row className="mt-3">
              <Form.Group as={Col} xl="9" lg="9" md="10">
                <div className="checkBoxInput">
                  <h3>Select Coupon Type</h3>
                  <div className="form-check form-check-inline mt-0">
                    <input disabled={(search == "?view" ? true : false)}
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="percent_off"
                      onChange={(e) => setCouponType(e.target.value)}
                      checked={couponType === 'percent_off'}
                    />
                    <label className="form-check-label mr-5" htmlFor="exampleRadios1">
                      Percentage Discount
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input disabled={(search == "?view" ? true : false)}
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="amount_off"
                      checked={couponType === 'amount_off'}
                      onChange={(e) => setCouponType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                      Flat Discount
                    </label>
                  </div>
                </div>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-0">
              <Form.Group as={Col} xl="5" lg="5" md="5" xs="12">
                <Form.Label>Discount Value &nbsp;<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                  type="number"  min="1"  max="99999"
                  placeholder="Discount value"
                  required  step="0.01"
                  onChange={(e) => {
                      set_percent_off(e.target.value)}}/>
                {couponType == 'percent_off' ? <span className="eyeImage">
                  %
                </span> : <span className="eyeImage">
                  $
                </span>}
              </Form.Group>

              <Form.Group as={Col} xl="5" lg="5" md="5" xs="12" className="ml-md-4">
              <Form.Label>Coupon Codes Needed&nbsp;<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                   type="number"  min="1"  max="99999"
                  placeholder="Promocodes Needed"
                  required
                  onChange={(e) => set_coupon_count(e.target.value)}
                />

              </Form.Group>
            </Form.Row>
            <Form.Row className="mt-1">
              <Form.Group as={Col} xl="5" lg="5" md="5" xs="12">
                <Form.Label>Valid Upto &nbsp;<span style={{color:'red'}}>*</span></Form.Label>
                <div className="date_box1">
                <DatePicker format="MM/dd/yyyy"  
                  className="date_input_css"  required value={duration_in_months}  minDate={new Date()}
                  onChange={date => set_duration_in_months(date)}
                />
                 </div>

              </Form.Group>
            
              <Form.Group as={Col} xl="5" lg="5" md="5" xs="12" className="ml-md-4">
                <Form.Label>Maximum Redemption(Optional)</Form.Label>
                <Form.Control
                  type="number"  min="1"  max="99999" step="0.01"
                  placeholder="Maximum Redemption(Optional)"
                  onChange={(e) => set_max_redemptions(e.target.value)}
                />

              </Form.Group>
            </Form.Row>
            <Form.Row className="mt-1">
              <Form.Group as={Col} xl="5" lg="5" md="5" xs="12">
                <Form.Label>Applicable on Min. Amount(Optional)</Form.Label>
                <Form.Control
                   type="number"  min="1"  max="99999" step="0.01"
                  placeholder="Applicable on Minimum Amount(Optional)"
                  onChange={(e) => set_minimum_amount(e.target.value)}
                />

              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-1">
            <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox text-left">
                        <input 
                          type="checkbox"
                          name="checkbox"
                          className="custom-control-input"
                          id="customCheck14" />

                        <label
                          className="custom-control-label"
                          htmlFor="customCheck14"
                        >
                          Only for first time transaction
                        </label>
                      </div>
                    </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button variant="primary" className="btnSame add_user" type="submit">
            Generate
            </Button>
            <Button
              className="cancel_btn"
              variant="secondary"
              onClick={handleCouponClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* update model */}
      <Modal
        className="add_usermodal"
        show={couponUpdateShow}
        onHide={handleUpdateCouponClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>List of Promocodes</Modal.Title>
        </Modal.Header>
        <Form >
          <Modal.Body className="pt-4">
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Table responsive className="table table-borderless user_table">


            </Table>
            <Button
              className="cancel_btn"
              variant="secondary"
              onClick={handleUpdateCouponClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Coupon;
