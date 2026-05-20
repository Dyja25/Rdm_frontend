import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
import { handleEducationModal } from "../../ProfileAction";
import { handleBankModal } from "../../ProfileAction";
import { handleTrainingModal } from "../../ProfileAction";
import { handleEmploymentModal } from "../../ProfileAction";
import { handlePersonalModal } from "../../ProfileAction";
import { handlePersonalDetailsModal } from "../../ProfileAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddEducationModal from "./ProfileBoost/Education/AddEducationModal";
import AddTrainingModal from "./ProfileBoost/Training/AddTrainingModal";
import AddEmploymentModal from "./ProfileBoost/Employment/AddEmploymentModal";
import AddPersonalModal from "./ProfileBoost/Personal/AddPersonalModal";
import AddBankModal from "./ProfileBoost/Bank/AddBankModal";
import AddPersonalDetailsModal from "./ProfileBoost/PersonalDetails/AddPersonalDetailsModal";
import Signature from "./ProfileBoost/Signature";
import AddIcon from '@mui/icons-material/Add';
import EmailTable from "./ProfileBoost/Email/EmailTable";
import AddEmailModal from "./AddEmailModal";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import{handleEmailProfileModal} from "../../ProfileAction";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
const BankTable = lazy(() => import("./ProfileBoost/Bank/BankTable"));
const EducationTable = lazy(() =>
  import("./ProfileBoost/Education/EducationTable")
);
const EmploymentTable = lazy(() =>
  import("./ProfileBoost/Employment/EmploymentTable")
);
const TrainingTable = lazy(() =>
  import("./ProfileBoost/Training/TrainingTable")
);

const PersonalTable2 = lazy(() =>
  import("./ProfileBoost/Personal/PersonalTable2")
);

const PersonalDetailsTable = lazy(() =>
  import("./ProfileBoost/PersonalDetails/PersonalDetailsTable")
);

const ProfileBoost = lazy(() => import("./ProfileBoost/ProfileBoost"));

const TabPane = StyledTabs.TabPane;

class ProfileDetailTab extends Component {
  state = {
    order: [],
  };

  moveTabNode = (dragKey, hoverKey) => {
    const newOrder = this.state.order.slice();
    const { children } = this.props;

    React.Children.forEach(children, (c) => {
      if (newOrder.indexOf(c.key) === -1) {
        newOrder.push(c.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);

    this.setState({
      order: newOrder,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    console.log(this.props.userDetails.employeeId)
    const { order } = this.state;
    const { children } = this.props;

    const { activeKey } = this.state;
    // const {
    //   userDetails: { firstName },
    // } = this.props;
    const {
      addEducationModal,
      handleEducationModal,
      addingEmail,
      addEmailProfileModal,
      handleEmailProfileModal,
      addTrainingModal,
      handleTrainingModal,
      addEmploymentModal,
      handleEmploymentModal,
      addPersonalModal,
      handlePersonalModal,
      addBankModal,
      handleBankModal,
      addPersonalDetailsModal,
      handlePersonalDetailsModal,
    } = this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-graduation-cap"></i>
                    &nbsp; 
                    {/* Education */}
                    <FormattedMessage
          id="app.education"
          defaultMessage="Education"
        />
                  </span>
                  {activeKey === "1" && (
                    <>
                      {addingEmail ? (
                        <></>
                      ) : (
                          <>
                            <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() => handleEducationModal(true)}
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                          </>
                        )}
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EducationTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                   <SupportAgentIcon className="mr-gap" />
                    {/* Training */}
                    <FormattedMessage
          id="app.training"
          defaultMessage="Training"
        />
                  </span>
                  {activeKey === "2" && (
                    <>
                      <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() => handleTrainingModal(true)}
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                      
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TrainingTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                  <AccountBalanceIcon className="mr-gap"/>
                    {/* Employment */}
                    <FormattedMessage
          id="app.employment"
          defaultMessage="Employment"
        />
                  </span>
                  {activeKey === "3" && (
                    <>
                    <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() => handleEmploymentModal(true)}
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                      
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmploymentTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                  <PhoneIcon  className="mr-gap"/>
                    {/* Emergency */}
                    <FormattedMessage
          id="app.emergency"
          defaultMessage="Emergency"
        />
                  </span>
                  {activeKey === "4" && (
                    <>
                      
                       <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() => handlePersonalModal(true)}
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <PersonalTable /> */}
                <PersonalTable2 employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-credit-card"></i>&nbsp; 
                    {/* Bank Details */}
                    <FormattedMessage
          id="app.bankDetails"
          defaultMessage="Bank Details"
        />
                  </span>
                  {activeKey === "5" && (
                    <>
                     
                      <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() => handleBankModal(true)}
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-id-card"></i>&nbsp;
                     {/* Personal Details */}
                      <FormattedMessage
          id="app.personaldetails"
          defaultMessage="Personal Details"
        />
                  </span>
                  {activeKey === "6" && (
                    <>
                      
                      <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() => handlePersonalDetailsModal(true)}
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PersonalDetailsTable employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i className="fas fa-file-signature"></i>
                    &nbsp;
                     {/* Signature */}
                      <FormattedMessage
          id="app.signature"
          defaultMessage="Signature"
        />
                  </span>
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Signature employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                   <EmailIcon />
                    {/* Email */}
                     <FormattedMessage
          id="app.email"
          defaultMessage="Email"
        />
                  </span>
                  {activeKey === "8" && (
                    <>
                      <>
                       
                         <Tooltip title="Add">
  <AddIcon
    fontSize="small"
    onClick={() =>  this.props.handleEmailProfileModal(true) }
    sx={{ ml: 1, cursor: "pointer", verticalAlign: "middle" }}
  />
</Tooltip>
                      </>
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmailTable 
                employeeId={this.props.userDetails.employeeId}/>
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
        
        <AddEmailModal
          addEmailProfileModal={addEmailProfileModal}
          handleEmailProfileModal={handleEmailProfileModal}
        />

        <AddPersonalModal
          addPersonalModal={addPersonalModal}
          handlePersonalModal={handlePersonalModal}
          employeeId={this.props.userDetails.employeeId}

        />
        <AddEducationModal
          addEducationModal={addEducationModal}
          handleEducationModal={handleEducationModal}
          employeeId={this.props.userDetails.employeeId}
        />

        <AddTrainingModal
          addTrainingModal={addTrainingModal}
          handleTrainingModal={handleTrainingModal}
          employeeId={this.props.userDetails.employeeId}
        />

        <AddEmploymentModal
          addEmploymentModal={addEmploymentModal}
          handleEmploymentModal={handleEmploymentModal}
          employeeId={this.props.userDetails.employeeId}
        />
        <AddBankModal
          addBankModal={addBankModal}
          handleBankModal={handleBankModal}
          employeeId={this.props.userDetails.employeeId}
        />
        <AddPersonalDetailsModal
          addPersonalDetailsModal={addPersonalDetailsModal}
          handlePersonalDetailsModal={handlePersonalDetailsModal}
          employeeId={this.props.userDetails.employeeId}
        />
      </>
    );
  }
}
const mapStateToProps = ({ profile }) => ({
  addEducationModal: profile.addEducationModal,
  addTrainingModal: profile.addTrainingModal,
  addEmploymentModal: profile.addEmploymentModal,
  addPersonalModal: profile.addPersonalModal,
  addBankModal: profile.addBankModal,
  addPersonalDetailsModal: profile.addPersonalDetailsModal,
  // addEmailModal: profile.addEmailModal,
  addEmailProfileModal:profile.addEmailProfileModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTrainingModal,
      handleEducationModal,
      handleEmploymentModal,
      handlePersonalModal,
      handleBankModal,
      handleEmailProfileModal,
      handlePersonalDetailsModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailTab);
