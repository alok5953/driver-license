import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { logoutUserAction, getUserDetailByTokenAction, socketConnectAction, socketDisconnectAction } from "../../../Redux/Actions";
import swal from "sweetalert";
import "./TopBar.css";

export const TopBar = (props) => {
  var refreshTokenResult;

  const dispatch = useDispatch();
  let params = useParams();
  const course_id = params?.course_id
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const userLoginState = useSelector(state => state.userAuthReducer?.userLoginData);
  const history = useHistory();
  const existingUserTokens = sessionStorage.getItem("userAccessToken");
  const existingDetailUserTokens = sessionStorage.getItem("accessToken");
  const [isUserAuthenticated, setUserAuthTokens] = useState(
    existingUserTokens ? true : false
  );
  useEffect(() => {
    if (userLoginState?.data?.data?.access_token) {
    } else if (existingUserTokens) {
      getuserDetailByEmail();
      setUserAuthTokens(true);
    }
    
  }, [userLoginState,existingUserTokens]);
  
  const [urlCourseId, setUrlCourseId] = useState(params?.course_id);
  


  const [firstLetter, setFirstLetter] = useState("");
  const [lastLetter, setLastLetter] = useState("");


  const handleOnClick = async () => {
    try {
      const logoutUserDetailSuccess = await dispatch(logoutUserAction({}));
      const response = logoutUserDetailSuccess?.payload?.data;
      dispatch(socketDisconnectAction(socket))
     
        history.push(`/user/signin/${urlCourseId}`)
      
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        history.push(`/user/signin/${urlCourseId}`)
        dispatch(logoutUserAction({}));
      }
    }
  };
  useEffect(() => {
    var ifConnected = window.navigator.onLine;
    if (!ifConnected)   {
      swal({
        title: "Error!",
        text: "You are offline.",
        icon: "error",
        timer: 5000
      });
      return false
    }
  }, []);
  // get first name
  var userData = useSelector(state => state.userAuthReducer.userPersonalData);
  useEffect(() => {
    if (userData) {
      userData = userData?.data?.data
      setFirstLetter(userData?.first_name ? userData?.first_name.charAt(0) : '')
      setLastLetter(userData?.last_name ? userData?.last_name.charAt(0) : '')
    }

  }, [userData]);

  
  const getuserDetailByEmail = async () => {
    try {
      let userDetailResponse = await dispatch(getUserDetailByTokenAction())
      userDetailResponse = userDetailResponse?.payload;
      userDetailResponse = userDetailResponse?.data?.data
      setFirstLetter(userDetailResponse.first_name ? userDetailResponse.first_name.charAt(0) : '')
      setLastLetter(userDetailResponse.last_name ? userDetailResponse.last_name.charAt(0) : '')
    } catch (err) {
      if (err.response.data.code === 401) {

        history.push(`/user/signin/${urlCourseId}`)
      }
    }
  }


  return (
    <div className="topBar">
      <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
        <Row className="d-row-flex topRow">
          <Col md={6} sm={4} xs={4}>
            <div className="Logo text-left">
              {/* <img src={Logo} alt="Image"/> */}
              <h1> LOGO</h1>
            </div>
          </Col>
          <Col md={6} sm={8} xs={8}>
            <div>
              <List className="text-right rightList p-0">
               

                <ListItem>
                  {isUserAuthenticated ? '' :
                   window.location.pathname ==  `/user/signin/${urlCourseId}` ? <Link to={`/user/signup/${urlCourseId}`}>
                   <Button variant="primary" className="btnSign">
                     Sign Up
                   </Button>
                 </Link>:
                    <Link to={`/user/signin/${urlCourseId}`}>
                      <Button variant="primary" className="btnSign">
                        Sign In
                      </Button>
                    </Link>
                  }
                </ListItem>

                {/* when user sign in this will come */}
                { isUserAuthenticated?  window.location.pathname == `/user/successfullpayment/${urlCourseId}` || window.location.pathname == `/user/PaymentFailed/${urlCourseId}` || window.location.pathname ==`/user/verify/${urlCourseId}` || `/${window.location.pathname?.split('/',3)[1]}/${window.location.pathname?.split('/',3)[2]}/` === '/user/usersecurityquestion/' || `/${window.location.pathname?.split('/',3)[1]}/${window.location.pathname?.split('/',3)[2]}/` === '/user/userquiz/' || `/${window.location.pathname?.split('/',3)[1]}/${window.location.pathname?.split('/',3)[2]}/` ==='/user/typingDnaAuthenticUserCheck/' ||`/${window.location.pathname?.split('/',3)[1]}/${window.location.pathname?.split('/',3)[2]}/` === '/user/typingdna/' || window.location.pathname ==`/user/cancelpayment/${urlCourseId}`? "":
                  <ListItem>
                    <span className="userName">{firstLetter}{lastLetter}</span>
 
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btnnone mr-md-3 mr-0"
                      >
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item >
                          <Link to={`/user/dashboard/${course_id}`}>
                            Course
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                          <Link to={`/user/profile/${params.course_id}`}>
                            Profile
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item >
                          <Link to={`/user/reference/${params.course_id}`}>
                            Reference
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleOnClick()}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListItem>
                  : ''}
              </List>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
