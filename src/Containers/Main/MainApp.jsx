import { lazy, Suspense, useEffect, useRef, useState, } from "react";
import { Routes, Link, Route, } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { login_url, base_url } from "../../Config/Auth";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Layout, message } from "antd";
import { setLanguage } from "../../Language/LanguageAction";
import {
  ApplicationWrapper,
  LayoutWrapper,
  NavbarWrapper,
  FlexContainer,
} from "../../Components/UI/Layout";

import {getOpportunityRecord} from "../Opportunity/OpportunityAction";
import { getPresentNotifications } from "../Notification/NotificationAction";
import { Select } from "antd";
import { BundleLoader } from "../../Components/Placeholder";
import { MultiAvatar } from "../../Components/UI/Elements";
import Dashboard from "../Dashboard/Dashboard.jsx";
import { ThemeProvider } from "styled-components";
import {getRequirementRecord} from "../Requirement/RequirementAction";
import NavMenu from "../Main/NavMenu.jsx";
import Call from "../Call/Call";
import Holiday from "../Holiday/Holiday";
import Reports from "../Reports/Reports";
import Partner from "../Partner/Partner";
import ProfileDropdown from "./ProfileDropdown.jsx";
import StartStop from "../Main/Start&Stop/StartStop.jsx"
import NotificationPopover from "../Notification/NotificationPopover.jsx"
import { updateUserById } from "../Auth/AuthAction";
import Category from "../Settings/Category/Category.jsx";
import Recruitment from "../Settings/Recruitement/Recruitment.jsx";
import CategoryTab from "../Settings/Category/CategoryTab.jsx";
import Rules  from  "../Rules/Rules.jsx"
import Template  from "../Template/Template.jsx"
import Library  from "../Settings/Library/Library.jsx"
import SettingsDropdown from "../Settings/SettingsDropdown.jsx"
import CustomerDetail from "../Customer/Child/CustomerDetail/CustomerDetail.jsx";
import EmployeeDetails from "../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeDetails.jsx";
const Settings = lazy(() => import("../Settings/Settings.jsx"));
const Customer = lazy(() => import("../Customer/Customer.jsx"));
const Publish = lazy(() => import("../Publish/Publish.jsx"));
const Opportunity = lazy(() => import("../Opportunity/Opportunity.jsx"));
const Profile = lazy(() => import("../Profile/Profile.jsx"));
const Permissions = lazy(() => import("../Permissions/Permissions.jsx"));
const Organization = lazy(() => import("../Organization/Organization.jsx"));

const Planner = lazy(() => import("../Planner/Planner.jsx"));

const Mileage = lazy(() => import("../Mileage/Mileage.jsx"));
const Expense = lazy(() => import("../Expense/Expense.jsx"));
const Employees = lazy(() => import("../Employees/Employees.jsx"));
const Task = lazy(() => import("../Task/Task.jsx"));
const Event = lazy(() => import("../Event/Event.jsx"));
const Leave = lazy(() => import("../Leave/Leave.jsx"));
const ChangePassword = lazy(() => import("../Auth/ChangePassword.jsx"));
const Contact = lazy(() => import("../Contact/Contact.jsx"));
const Candidate = lazy(() => import("../Candidate/Candidate.jsx"));
const Requirement = lazy(() => import("../Requirement/Requirement.jsx"));
const Demand = lazy(() => import("../Demand/Demand.jsx"));
const ContactDetail = lazy(() =>
  import("../Contact/Child/ContactDetail/ContactDetail.jsx")
);

const CandidateDetails = lazy(() =>
  import("../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetails.jsx")
);

const OpportunityDetail = lazy(() =>
  import("../Opportunity/Child/OpportunityDetail/OpportunityDetail.jsx")
);
const PartnerDetail = lazy(() =>
  import("../Partner/child/PartnerDetail/PartnerDetail.jsx")
)



const { Option } = Select;

const { Header, Sider, Content, Footer } = Layout;

function MainApp(props) {






  useEffect(()=>{
    props.getOpportunityRecord();
    props.getRequirementRecord();
  },[])



  useEffect(() => {
    if (Array.isArray(props.userBio) && props.userBio.length > 0) {
      const formattedSteps = props.userBio
        .filter((item) => item.value)
        .map((item) => ({
          type: formatType(item.type),
          value: item.value,
        }));
      setSteps(formattedSteps);
      setVisible1(true); // ✅ Drawer only shows when data is valid
    }
  }, [props.userBio]);

  const formatType = (str) => {
    if (!str) return "";
    if (str.toLowerCase() === "acess") return "Access"; // fix typo from backend
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };






  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");

  function toggle() {
    setCollapsed(!collapsed);
  }

  function toggleTheme(value) {
    setTheme(value ? "light" : "light");
  }
  function handleLanguageSelect(data) {
    props.updateUserById({
      preferedLanguage: data,
      employeeId: props.userId,
    });
    message.success(`Language sucessfully changed to ${data} `);
  }
  const background = theme === "light" ? "#fff" : null;
  const { organization, user, imageId, orgImageId, organizationName } = props;
  console.log("Done", imageId);
  console.log(orgImageId);
  console.log(user);

const organizationLogo = (
    <MultiAvatar 
    imageId={imageId}
    //marginLeft="30px" 
    // primaryTitle={organizationName} 
    />
  );




  return (

      <LayoutWrapper>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={"10vw"}
          style={{
            minHeight: "100vh",
            background: "black",
            overflow: "auto",
          }}
        >
            <div
            className="logo"
            style={{
              justifyContent: !collapsed ? "center" : "center",
              height: 50,
              marginLeft:"40px"
            }}
          >
            {collapsed && organizationLogo}
            {!collapsed && organizationLogo}
          </div>
          <NavMenu
            collapsed={collapsed}
            toggleCollapsed={toggle}
            toggleTheme={toggleTheme}
          />
        </Sider>
        <LayoutWrapper>
          <NavbarWrapper style={{ padding: 0, height: 50 }}>
            <Header>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                }}
              >
                &nbsp;&nbsp;
                <div style={{ marginLeft: "0.625em" }}>
                  <Select
                    value={props.preferedLanguage}
                    style={{ width: 120 }}
                    onChange={(value) => handleLanguageSelect(value)}
                  >
                    <Option value="English">English</Option>
                    <Option value="Dutch">Dutch</Option>
                  </Select>
                </div>
              </div>
              <StartStop />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  marginRight: 20,
                  height: 45,
                }}
              >
                <div
                  style={{
                    backgroundColor: "tomato",
                    color: "white",
                    border: "1px solid tomato",
                    borderRadius: "5px",
                    position: "relative",
                    height: "27px",
                    textAlign: "center",
                    lineHeight: "24px",
                    padding: "0px 10px",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                >
                  {props.department}
                </div>
                <div
                  style={{
                    backgroundColor: "tomato",
                    color: "white",
                    border: "1px solid tomato",
                    borderRadius: "5px",
                    position: "relative",
                    height: "27px",
                    textAlign: "center",
                    lineHeight: "24px",
                    padding: "0px 10px",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                >
                  {props.role}
                </div>
                
                  <SettingsDropdown />
       

                <a href="#" style={{ height: 45, marginRight: 20 }}>
                  <FlexContainer alignItems="center" style={{ height: "100%" }}>
                    <NotificationPopover />
                  </FlexContainer>
                </a>

                <ProfileDropdown />
              </div>
            </Header>
          </NavbarWrapper>
          <ApplicationWrapper>


                <Suspense maxDuration={6000} fallback={<BundleLoader />}>
                  <Routes>
                    <Route  path="planner" element={<Planner />} />
                    <Route  path="dashboard" element={<Dashboard />} />
                    
                    <Route  path="profile" element={<Profile />} />
                    <Route  path="permissions" element={<Permissions />} />
                    <Route  path="mileage" element={<Mileage />} />
                    <Route  path="expense" element={<Expense />} />
                    <Route  path="employees" element={<Employees />} />
                    <Route  path="holiday" element={<Holiday />} />
 <Route
                      exact
                      path="organization"
                      element={<Organization />}
                    />
                    <Route exact path="/leave" element={<Leave />} />
                    <Route exact path="/rules" element={<Rules />} />
                    <Route exact path="/template" element={<Template />} />
                    {/* <Route exact path="/documents" component={Documents} /> */}
                    <Route exact path="/category" element={<Category />} />
                    <Route exact path="/categoryTab" element={<CategoryTab />} />
                    {/* <Route exact path="/task" component={Task} /> */}
                    <Route exact path="/library" element={<Library />} />
                    <Route exact path="/planner" element={<Planner />} />
                    <Route exact path="/setting" element={<Settings />} />
                    <Route exact path="/reports" element={<Reports />} />
                    <Route exact path="/partner" element={<Partner />} />
                    <Route exact path="/call" element={<Call />} />
                    <Route exact path="/task" element={<Task />} />
                    <Route exact path="/event" element={<Event />} />
                    
                    <Route
                      exact
                      path="/change-password"
                      element={<ChangePassword />}
                    />

                     <Route
                      exact
                      path="/partner/:partnerId"
                      element={<PartnerDetail/>}
                    />

                    <Route exact path="/recruite" element={<Recruitment />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/customer" element={<Customer />} />
                    <Route exact path="/publish" element={<Publish />} />
                    <Route exact path="/opportunity" element={<Opportunity />} />
                    <Route exact path="/candidate" element={<Candidate />} />

                    <Route exact path="/opportunity" element={<Opportunity />} />
                     <Route
                      exact
                      path="/contact/:contactId"
                      element={<ContactDetail/>}
                    />
                      <Route
                      exact
                      path="/candidate/:candidateId"
                      element={<CandidateDetails/>}
                    />
                     <Route
                      exact
                      path="/customer/:customerId"
                      element={<CustomerDetail/>}
                    />
                    

                    <Route
                      exact
                      path="/opportunity/:opportunityId"
                      element={<OpportunityDetail/>}
                    />
                     <Route
                      exact
                      path="/employee/:employeeId"
                      element={<EmployeeDetails/>}
                    />
                    {/* <Route
                      exact
                      path="/opportunity/:opportunityId"
                      element={<OpportunityDetail />}
                    /> */}
                    {/* <Route
                      exact
                      path="/partner/:partnerId"
                      element={<PartnerDetail />}
                    /> */}
                    {/* <PotectedRoute exact path="/users" component={Users} /> */}
                    {/* <Route
                      exact
                      path="/import/account"
                      element={<AccountImport />}
                    /> */}
                    <Route exact path="/requirement" element={<Requirement />} />

                    <Route  path="demand" element={<Demand />} />

                 </Routes>
                </Suspense>

          </ApplicationWrapper>
        </LayoutWrapper>
      </LayoutWrapper>
    

  );
}


const mapStateToProps = ({
 auth, theme, language 
}) => ({
   language: language.language,
  user: auth.userDetails,
  userDetails: auth.userDetails,
  // employeeId: auth.userDetails.employeeId,
  userId:auth.userDetails.employeeId,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  department: auth.userDetails && auth.userDetails.department,
  role: auth.userDetails && auth.userDetails.role,
  // orgImageId:auth.userDetails.orgImageId,

  imageId:
    (auth.userDetails &&
      auth.userDetails.metaData &&
      auth.userDetails.metaData.orgImageId) ||
    "",
  organizationName:
    (auth.userDetails &&
      auth.userDetails.metaData &&
      auth.userDetails.metaData.organization &&
      auth.userDetails.metaData.organization.organizationName) ||
    "",

  preferedLanguage: auth.userDetails.preferedLanguage,
  organizationDetails: auth.organizationDetails
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getPresentNotifications,
      updateUserById,
      setLanguage,
      getOpportunityRecord,
      getRequirementRecord,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
