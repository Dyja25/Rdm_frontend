import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip} from "antd";

// import { YoutubeOutlined, FileExcelOutlined } from '';
import { FlexContainer } from "../../../Components/UI/Layout";

import { StyledSelect } from "../../../Components/UI/Antd";

import { FileExcelOutlined } from "@ant-design/icons";
const ContactSharePartnerForm = lazy(()=>import("./ContactSharePartnerForm.jsx"));
const ContactShareCustomerForm = lazy(()=>import("./ContactShareCustomerForm.jsx"));
// import { getUsers } from "../../Team/TeamAction";

const Option = StyledSelect.Option;

const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];
class ContactActionRight extends React.Component {
  // componentDidMount() {
  //   this.props.getUsers();
  // }
  render() {
    const {
      userId,
      users,
      user,
      role,
      subscriptionType,
      contactFilterText,
      handleContactModal,
      setContactFilterText,
      setContactFilterUser,
    } = this.props;
    return (
      <FlexContainer alignItems="center">
        
        {this.props.viewType === "table"&&user.employee_type !=="external" ? (
          
          <ContactSharePartnerForm />
        
        ) : null}
       
        {this.props.viewType === "dashboard"&&user.employee_type !=="external" ? (
          <ContactShareCustomerForm />
        ) : null}
        &nbsp; &nbsp;
        {/* <Button
          type="primary"
          default
          href={`${base_url}/excel/export/user/contact/${userId}`}
        >
          Export
        </Button> */}
       { role == "ADMIN" && (
        <Tooltip placement="left" title="XL">
        <a
        href={`${base_url}/excel/export/user/contact/${userId}`}>
            {/* <FontAwesomeIcon icon={solid('file-excel')} style={{fontSize: "x-large"}}/> */}
            <FileExcelOutlined/>
         </a>
         </Tooltip>
       )}
        &nbsp;
        {this.props.viewType === "dashboard" ? (
        <Tooltip placement="left" title="Create">
          <Button 
           type="primary"
           ghost onClick={() => handleContactModal(true)}>
            Add
          </Button>
        </Tooltip>
        ): null}
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, team, contact }) => ({
  // subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  // contactFilterText: contact.contactFilterText,
  // users: team.users,
  // user: auth.userDetails,
  // filterByUserOption: team.filterByUserOption,
  role: auth.userDetails.role,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // setContactFilterText,
      // getUsers,
      // setContactFilterUser
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(ContactActionRight)
);
