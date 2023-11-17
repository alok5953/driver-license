import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Dashboard from "../../../Images/sidebar/dashboard.svg";
import Courses from "../../../Images/sidebar/courses.svg";
import Quizzes from "../../../Images/sidebar/quizzes.svg";
import User from "../../../Images/sidebar/user.svg";
import Payment from "../../../Images/sidebar/payment.svg";
import Question from "../../../Images/sidebar/question.svg";

import Add from "../../../Images/sidebar/addons.svg";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
export const sideBar = [
  {
    name: 'dashboard',
    label: <ListItem key={`dashboard-`} className="listchild">
      <Link to={"/dashboard"}>
        <ListItemText className="pl-4 listtitle">
          <img src={Dashboard} className="pr-3" alt="Image" /> Dashboard
</ListItemText>
      </Link>
    </ListItem>
  },

  {
    name: 'course',
    label: ''
  },
  {
    name: 'h5p',
    label: <ListItem key={`h5p-`} className="listchild">
      <Dropdown className="courses_dropdown">
        <Dropdown.Toggle className="pl-0">
          <ListItem>
            <ListItemText className="pl-4 listtitle">
              {" "}
              <img src={Courses} className="pr-3" alt="Image" /> H5P Interactive
              </ListItemText>
          </ListItem>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link to={"/h5pinteractive"}>
            <Dropdown.Item href="javascript:;">
              Add H5P Content
              </Dropdown.Item>
          </Link>
          {/* <Link to={"/courses/courselist"}>
              <Dropdown.Item href="javascript:;">H5P list</Dropdown.Item>
            </Link> */}
        </Dropdown.Menu>
      </Dropdown>
    </ListItem>
  },
  {
    name: "addons",
    label: <ListItem  key={`addons-`} className="listchild">
      <Link to={"/addons"}>
        <ListItemText className="pl-4 listtitle">
          {" "}
          <img src={Add} className="pr-3" alt="Image" /> Add-ons
          </ListItemText>
      </Link>
    </ListItem>
  },
  {
    name: "quiz",
    label: ''
  },
  {
    name: 'users',
    label: <ListItem key={`users-`} className="listchild">
      <Link to={"/userlist"}>
        <ListItemText className="pl-4 listtitle">
          {" "}
          <img src={User} className="pr-3" alt="Image" /> User list
          </ListItemText>
      </Link>
    </ListItem>
  },
  {
    name: 'payments',
    label: <ListItem key={`payments-`} className="listchild">
      <Link to={"/payment"}>
        <ListItemText className="pl-4 listtitle">
          <img src={Payment} className="pr-3" alt="Image" /> Payments &
            Fees
          </ListItemText>
      </Link>
    </ListItem>
  },
  {
    name: 'security_questions',
    label: <ListItem  key={`security_questions-`} className="listchild">
      <Link to={"/security"}>
        <ListItemText className="pl-4 listtitle">
          <img src={Question} className="pr-3" alt="Image" /> Security
            Question
          </ListItemText>
      </Link>
    </ListItem>
  },

  {
    name: 'roles',
    label: ''
  },
  {
    name: 'admin_users',
    label: ''
  },
  {
    name: 'coupons',
    label: <ListItem key={`coupons-`} className="listchild">
      <Link to={"/coupon"}>
        <ListItemText className="pl-4 listtitle">
          {" "}
          <img src={User} className="pr-3" alt="Image" /> Coupons
    </ListItemText>
      </Link>
    </ListItem>
  }

]