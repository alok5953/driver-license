import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import * as routes from "./RoutesContants";
import { PrivateRoute } from "../Routes/PrivateRoute";
import { useSelector } from "react-redux";
import { UserRoute } from "../Routes/UserRoute";
import { UserPrivateRoute } from './UserPrivateRoute';
import validator from 'validator'

// import { StudentProfile } from "../Screens/User/StudentProfile/StudentProfile";
const LoginComponent = React.lazy(() => import('../Screens/Admin/Login/Login'));
const RegisterUserComponent = React.lazy(() => import('../Screens/User/RegisterUser/RegisterUser'));
const SignInComponent = React.lazy(() => import('../Screens/User/SignIn/SignIn'));
const HomeComponent = React.lazy(() => import('../Screens/Admin/Home/Home'));
const SettingComponent = React.lazy(() => import('../Screens/Admin/Setting/Setting'));
const AddonsComponent = React.lazy(() => import('../Screens/Admin/AddOns/AddOns'));
const AdminProfileComponent  = React.lazy(() => import('../Screens/Admin/AdminProfile/AdminProfile'));
const AppSettingComponent =  React.lazy(() => import('../Screens/Admin/AppSetting/AppSetting'));
const ChangePasswordComponent  = React.lazy(() => import('../Screens/Admin/ChangePassword/ChangePassword'));
const CouponComponent = React.lazy(() => import('../Screens/Admin/Coupon/Coupon'));
const CourseModuleComponent =  React.lazy(() => import('../Screens/Admin/Courses/CourseModule'));
const CourseCreationComponent = React.lazy(() => import('../Screens/Admin/Courses/CourseCreation'));
const CourseListComponent = React.lazy(() => import('../Screens/Admin/Courses/CourseList'));
const CourseAccordionComponent = React.lazy(() => import('../Screens/Admin/Courses/CourseAccordion'));
const EditCourseAccordionComponent = React.lazy(() => import('../Screens/Admin/Courses/EditCourseAccordion'));
const PreviewCourseComponent =  React.lazy(() => import('../Screens/Admin/Courses/PreviewCourse'));
const PreviewQuizComponent =  React.lazy(() => import('../Screens/Admin/Courses/PreviewQuiz'));
const PreviewSecurityComponent = React.lazy(() => import('../Screens/Admin/Courses/PreviewSecurity'));
const PreviewTypingDnaComponent = React.lazy(() => import('../Screens/Admin/Courses/PreviewTypingDna'));
const H5PInteractiveComponent = React.lazy(() => import('../Screens/Admin/H5PInteractive/H5PInteractive'));
const SecurityComponent =  React.lazy(() => import('../Screens/Admin/Security/Security'));
const QuizListComponent = React.lazy(() => import('../Screens/Admin/Quiz/QuizList'));
const QuizCreationComponent =  React.lazy(() => import('../Screens/Admin/Quiz/QuizCreation'));
const UserListComponent = React.lazy(() => import('../Screens/Admin/UserList/UserList'));
const QuizAddComponent = React.lazy(() => import('../Screens/Admin/Quiz/AddQuiz'));
const PaymentComponent = React.lazy(() => import('../Screens/Admin/Payment/Payment'));
const ProfileComponent = React.lazy(() => import('../Screens/User/Profile/Profile'));
const TypingDnaComponent =  React.lazy(() => import('../Screens/User/TypingDna/TypingDna'));
const CourseDashboardComponent =  React.lazy(() => import('../Screens/User/CourseDashboard/CourseDashboard'));
const TypingDnaAuthenticUserCheckComponent = React.lazy(() => import('../Screens/User/TypingDna/TypingDnaAuthenticUserCheck'));

const ModuleComponent =  React.lazy(() => import('../Screens/User/Module/Module'));
const TableOfContentComponent =  React.lazy(() => import('../Screens/User/TableOfContent/TableOfContent'));
const UserSecurityQuestionComponent =  React.lazy(() => import('../Screens/User/UserSecurityQuestion/UserSecurityQuestion'));
const UserQuizComponent = React.lazy(() => import('../Screens/User/UserQuiz/UserQuiz'));
const SuccessfullPaymentComponent = React.lazy(() => import('../Screens/User/SuccessfullPayment/SuccessfullPayment'));
const CourseCompleteComponent = React.lazy(() => import('../Screens/User/CourseComplete/CourseComplete'));
const PaymentFailedComponent = React.lazy(() => import('../Screens/User/PaymentFailed/PaymentFailed'));
const ForgetPasswordComponent =  React.lazy(() => import('../Screens/Admin/ForgotPassword/ForgotPassword'));
const CreateNewPasswordComponent = React.lazy(() => import('../Screens/User/CreateNewPassword/CreateNewPassword'));
const SetupSecurityQuestionComponent =  React.lazy(() => import('../Screens/User/SetupSecurityQuestion/SetupSecurityQuestion'));

const ForgotPasswordComponent = React.lazy(() => import('../Screens/User/ForgetPassword/ForgetPassword'));
const OtpComponent = React.lazy(() => import('../Screens/User/Otp/Otp'));
const EnterOtpComponent = React.lazy(() => import('../Screens/Admin/EnterOtp/EnterOtp'));
const NewPasswordComponent = React.lazy(() => import('../Screens/Admin/NewPassword/NewPassword'));
const TypingDnaVerifyUserComponent = React.lazy(() => import('../Screens/User/TypingDna/TypingDnaVerifyUser'));
const PaymentCancelComponent = React.lazy(() => import('../Screens/User/PaymentCancel/PaymentCancel'));
const ReferenceComponent = React.lazy(() => import('../Screens/User/Reference/Reference'));
const WrongPageRedirectComponent = React.lazy(() => import('../Screens/User/WrongPageRedirect/WrongPageRedirect'));

export const Routes = () => {
  const loginState = useSelector(state => state.authReducer?.loginData);
  const userLoginState = useSelector(state => state.userAuthReducer?.userLoginData);
  const existingTokens = localStorage.getItem("accessToken");
  const [isAuthenticated, setAuthTokens] = useState(
    existingTokens ? true : false
  );
  const existingUserTokens = sessionStorage.getItem("userAccessToken");
  const [isUserAuthenticated, setUserAuthTokens] = useState(
    existingUserTokens ? true : false
  );
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      setAuthTokens(true);
    } else if (existingTokens) {
      setAuthTokens(true);
    }
    if (userLoginState?.data?.data?.access_token) {
      setUserAuthTokens(true);
    } else if (existingUserTokens) {
      setUserAuthTokens(true);
    }
  }, [loginState, userLoginState]);
  
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PrivateRoute
            exact
            path={routes.DASHBOARD}
            component={HomeComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.SETTING}
            component={SettingComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.ADDONS}
            component={AddonsComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.ADMINPROFILE}
            component={AdminProfileComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.CHANGEPASSWORD}
            component={ChangePasswordComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.COUPON}
            component={CouponComponent}
            authTokens={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={routes.APPSETTING}
            component={AppSettingComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.COURSE_MODULE}
            component={CourseModuleComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.COURSE_CREATION}
            component={CourseCreationComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.COURSE_LIST}
            component={CourseListComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.COURSE_ACCORDION}
            component={CourseAccordionComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.EDIT_COURSE_ACCORDION}
            component={EditCourseAccordionComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.PREVIEW_COURSE}
            component={PreviewCourseComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.PREVIEW_QUIZ}
            component={PreviewQuizComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.PREVIEW_SECURITY}
            component={PreviewSecurityComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.PREVIEW_TYPING_DNA}
            component={PreviewTypingDnaComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.H5PINTERACTIVE}
            component={H5PInteractiveComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.SECURITY}
            component={SecurityComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.USERLIST}
            component={UserListComponent}
            authTokens={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={routes.QUIZELIST}
            component={QuizListComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.QUIZECREATION}
            component={QuizCreationComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.ADDQUIZ}
            component={QuizAddComponent}
            authTokens={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={routes.PAYMENT}
            component={PaymentComponent}
            authTokens={isAuthenticated}
          />


          {/* user route */}
          <UserRoute exact path={routes.SignIn} component={SignInComponent} />
          <UserPrivateRoute exact path={routes.PROFILE} component={ProfileComponent} authUserTokens={isUserAuthenticated} />
          <UserPrivateRoute exact path={routes.TYPINGDNA} component={TypingDnaComponent} authUserTokens={isUserAuthenticated} />
          <UserPrivateRoute
            exact
            path={routes.COURSEDASHBOARD}
            component={CourseDashboardComponent}
            authUserTokens={isUserAuthenticated}
          />

          <UserPrivateRoute exact path={routes.TypingDnaAuthenticUserCheck} component={TypingDnaAuthenticUserCheckComponent} authUserTokens={isUserAuthenticated} />
          
          <UserPrivateRoute
            exact
            path={routes.MODULE}
            component={ModuleComponent}
            authUserTokens={isUserAuthenticated}
          />
          {/* <UserPrivateRoute
            exact
            path={routes.STUDENTPROFILE}
            component={StudentProfile}
            authUserTokens={isUserAuthenticated}
          /> */}
          <UserPrivateRoute
            exact
            path={routes.TABLEOFCONTENT}
            component={TableOfContentComponent}
            authUserTokens={isUserAuthenticated}
          />
          <UserPrivateRoute
            exact
            path={routes.USERSECURITYQUESTION}
            component={UserSecurityQuestionComponent}
            authUserTokens={isUserAuthenticated}
          />

          <UserPrivateRoute
            exact
            path={routes.USERQUIZ}
            component={UserQuizComponent}
            authUserTokens={isUserAuthenticated}
          />
          <UserPrivateRoute
            exact
            path={routes.SUCCESSFULLPAYMENT}
            component={SuccessfullPaymentComponent}
            authUserTokens={isUserAuthenticated}
          />

          <UserPrivateRoute
            exact
            path={routes.COURSECOMPLETE}
            component={CourseCompleteComponent}
            authUserTokens={isUserAuthenticated}
          />

          <UserPrivateRoute
            exact
            path={routes.PAYMENTFAILED}
            component={PaymentFailedComponent}
            authUserTokens={isUserAuthenticated}
          />

          <UserRoute
            exact
            path={routes.FORGETPASSWORD}
            component={ForgotPasswordComponent}
          />
          <UserRoute exact path={routes.OTP} component={OtpComponent} />
          <UserRoute
            exact
            path={routes.CREATENEWPASSWORD}
            component={CreateNewPasswordComponent}
          />
          {/* <UserRoute
            exact
            path={routes.PASSWORDRESET}
            component={PasswordResetComponent}
          /> */}
          <UserPrivateRoute
            exact
            path={routes.SETUPSEQURITYQUESTION}
            component={SetupSecurityQuestionComponent}
            authUserTokens={isUserAuthenticated}
          />
          <UserRoute exact path={routes.SignUp} component={RegisterUserComponent} />
          <Route exact path="/" component={LoginComponent} />
          <Route exact path={routes.FORGOTPASSWORD} component={ForgetPasswordComponent} />
          <Route exact path={routes.ENTEROTP} component={EnterOtpComponent} />
          <Route exact path={routes.NEWPASSWORD} component={NewPasswordComponent} />
          <UserPrivateRoute
            exact
            path={routes.TYPINGDNAVERIFYUSER}
            component={TypingDnaVerifyUserComponent}
            authUserTokens={isUserAuthenticated}
          />
          <UserPrivateRoute
            exact
            path={routes.CANCELPAYMENT}
            component={PaymentCancelComponent}
            authUserTokens={isUserAuthenticated}
          />
          <UserPrivateRoute exact path={routes.REFERENCE} authUserTokens={isUserAuthenticated} component={ReferenceComponent} />
          <Route exact path="/user/404" render={() => <WrongPageRedirectComponent/>}/>
          <Route path={"*"} >
            <Redirect to={'/user/404'} />
          </ Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
