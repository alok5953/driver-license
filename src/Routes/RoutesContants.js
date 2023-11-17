// export const HOME = "/"
export const SIGN_IN = "/";
export const DASHBOARD = "/dashboard";
export const QUIZELIST = "/quizlist";
export const QUIZECREATION = "/quizcreation";
export const SETTING = "/setting";
export const COURSE_CREATION = "/courses/coursecreation";
export const COURSE_MODULE = "/courses/coursemodule";
export const COURSE_LIST = "/courses/courselist";
export const COURSE_ACCORDION = "/courses/courseaccordion";
export const EDIT_COURSE_ACCORDION = "/courses/editcourseaccordion";
export const H5PINTERACTIVE =   "/h5pinteractive";
export const PREVIEW_COURSE = "/courses/previewcourse";
export const PREVIEW_QUIZ   = "/courses/previewquiz";
export const PREVIEW_SECURITY   = "/courses/previewsecurity" 
export const PREVIEW_TYPING_DNA   = "/courses/previewtypingdna" 
export const SECURITY = "/security"; 
export const USERLIST = "/userlist";
export const PAYMENT = "/payment";
export const ADDQUIZ = "/quiz/addquiz";
export const ADDONS = "/addons";
export const ADMINPROFILE = "/profile";
export const CHANGEPASSWORD = "/password";
export const FORGOTPASSWORD = "/forgotpassword";
export const ENTEROTP = "/enterotp";
export const NEWPASSWORD = "/newpassword";
export const APPSETTING = "/appsetting";
export const COUPON = "/coupon"

//User 
//  :course_id   is course id 
//  :module_id 
//  :quiz_id
export const SignIn                         = "/user/signin/:course_id";
export const TYPINGDNAVERIFYUSER            = '/user/verify/:course_id'; 
export const COURSEDASHBOARD                = "/user/dashboard/:course_id";
export const TABLEOFCONTENT                 = "/user/tableofcontent/:course_id";
export const MODULE                         = "/user/module/:course_id/:module_id";
export const USERQUIZ                       = "/user/userQuiz/:course_id/:module_id/:quiz_id";
export const USERSECURITYQUESTION           = "/user/userSecurityQuestion/:course_id/:module_id";
export const TypingDnaAuthenticUserCheck    = "/user/typingDnaAuthenticUserCheck/:course_id/:module_id";

export const SignUp                         = "/user/signup/:course_id";
export const FORGETPASSWORD                 = "/user/forgotpassword/:course_id";
export const OTP                            = "/user/otp/:course_id";
export const CREATENEWPASSWORD              = "/user/newpassword/:course_id";
export const TYPINGDNA                      = "/user/typingdna/:course_id";
export const COURSES                        = "/user/courses";
export const PASSWORDRESET                  = "/user/passwordreset";
export const STUDENTPROFILE                 = "/user/studentprofile";
export const PROFILE                        = "/user/profile/:course_id";
export const BILLINGINFO                    = "/user/checkout/:course_id";
export const SUCCESSFULLPAYMENT             = "/user/successfullpayment/:course_id";
export const SETUPSEQURITYQUESTION          = "/user/setupsecurityquestion/:course_id"

export const COURSECOMPLETE                 = "/user/CourseComplete/:course_id";
export const PAYMENTFAILED                  = "/user/PaymentFailed/:course_id";
export const CANCELPAYMENT                  = '/user/cancelpayment/:course_id';
export const REFERENCE                      = '/user/reference/:course_id';
export const WRONGPAGEDIRCT                  ='/user/404'
