import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Courses from "../../../Images/sidebar/courses.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Hidden from "@material-ui/core/Hidden"; 
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Quizzes from "../../../Images/sidebar/quizzes.svg";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { sideBar } from './constant';
import Dashboard from "../../../Images/sidebar/dashboard.svg";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Setting from "../../../Images/sidebar/setting.svg";
import "./Sidebar.css";
import { clearCourseReducerAction, clearQuizReducerAction,quizDetailAction } from "../../../Redux/Actions";
import { QUIZE_PERMISSION, COURSE_PERMISSION,ROLE_PERMISSION,USER_ADD_ADMIN_PERMISSION,FULL, READ, EDIT, NONE } from '../../../Utils/PermissionConstant'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    } 
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

var count= 0;
export const Sidebar = props => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebarList, setSidebarList] = React.useState([]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const loginState = useSelector(state => state.authReducer?.loginData);
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      if (loginState?.data?.data?.user?.role?.policies.length) {
        setSidebarList(loginState?.data?.data?.user?.role?.policies);

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
        var count= 0;
        setSidebarList(refreshTokenResult?.data?.data?.user?.role?.policies);

      }
    }
  }, [refreshTokenResult]);
  const clearCourseReducer = () =>{
    const response = dispatch(clearCourseReducerAction());
    const success = response?.payload;
    if (success) {
      if(success.data) {
        if (success.data.code == 200) {
          history.push('/courses/coursecreation')
        }
      }
    }
  }
  const clearQuizeReducer = () =>{
    dispatch(quizDetailAction({}))
    const response = dispatch(clearQuizReducerAction());
    const success = response?.payload;
    if (success) {
      if(success.data) {
        if (success?.data?.code == 200) {
          history.push('/quizcreation')
        }
      }
    }
  }
  const drawer = (
    <div>
      <div className="logo p-4">
        <h1>LOGO</h1>
      </div>

      <div className="sidebBar">
        <List className="pt-md-5 pt-4 listmargin">
          {
            sideBar.map((val, i) => {
              return sidebarList.map((value) => {
                if (val.name == value.name && value.scope != NONE) {
                  if (val.name == QUIZE_PERMISSION) {
                    return val.label = <ListItem key={`QUIZE_PERMISSION-${i}`} className="listchild">
                      <Dropdown  className="courses_dropdown">
                        <Dropdown.Toggle className="pl-0">
                          <ListItem>
                            <ListItemText className="pl-4 listtitle">
                              {" "}
                              <img src={Quizzes} className="pr-3" alt="Image" /> Quizzes
                            </ListItemText>
                          </ListItem>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {value.scope === FULL ?
                            
                              <Dropdown.Item  onClick={clearQuizeReducer}>
                                Add New Quiz
                            </Dropdown.Item>
                             : ''}
                          <Link to={"/quizlist"}>
                            <Dropdown.Item href="javascript:;">Quiz list</Dropdown.Item>
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ListItem>
                  }

                  if (val.name == COURSE_PERMISSION) {
                    return val.label =<ListItem key={`COURSE_PERMISSION-${i}`} className="listchild">
                    <Dropdown className="courses_dropdown">
                        <Dropdown.Toggle className="pl-0">
                            <ListItem>
                                <ListItemText className="pl-4 listtitle">
                                    {" "}
                                    <img src={Courses} className="pr-3" alt="Image" /> Courses
                      </ListItemText>
                            </ListItem>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {value.scope === FULL ?
                                <Dropdown.Item onClick={clearCourseReducer}>
                                    Add New Course
                      </Dropdown.Item>
                           : ''}
                            <Link to={"/courses/courselist"}>
                                <Dropdown.Item href="javascript:;">Course list</Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListItem>
                  }
 
                  if(val.name ==USER_ADD_ADMIN_PERMISSION  ||val.name ==ROLE_PERMISSION  ){
                    count ++;
                    if(count==1){
                      return val.label = <ListItem key={`USER_ADD_ADMIN_PERMISSION-${i}`} className="listchild">
                      <Link to={"/setting"}>
                          <ListItemText className="pl-4 listtitle">
                              {" "}
                              <img src={Setting} className="pr-3" alt="Image" /> Settings
                          </ListItemText>
                      </Link>
                      </ListItem>
                    }
                  }
                  return (val.label)

                }
              })

            })
          }
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};
