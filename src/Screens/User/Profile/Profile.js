import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MyProfile } from './MyProfile';
import { AccountSetting } from './AccountSetting';
import {PaymentHistory} from './PaymentHistory'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// import Logo from "../../../Images/svg/logo.svg";

import "./Profile.css";

const Profile = () => {
  return ( 
    <div>
      <div className="breadcrumbBg">
        <h1 className="mb-0 mt-2">My Profile</h1>
      </div>

      <div className="mainSection marginmainTop mt-2 pb-4">
        <div className="allCourses profileSection">
          <Container>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12}>
                <Tabs
                  defaultactivekfey="profile"
                  transition={false}
                  id="uncontrolled-tab-example1"
                >
                  <Tab eventKey="My_Profile" title="My Profile">
                    <MyProfile />
                  </Tab>
 
                  <Tab eventKey="Account_Setting" title="Account Setting">
                    <AccountSetting />
                  </Tab>

                  <Tab eventKey="Payment_History" title="Payment Receipt">
                      <PaymentHistory/>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Profile;