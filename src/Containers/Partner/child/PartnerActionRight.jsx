import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";

import { Button, Tooltip} from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
const PartnerShareForm=lazy(()=>import("./PartnerShareForm.jsx"));

const Option = StyledSelect.Option;

class PartnerActionRight extends React.Component {
  render() {
    const { handlePartnerModal,userId,user,role } = this.props;
    return (
      <FlexContainer alignItems="center">
       {user.employee_type !=="external" && (
      <PartnerShareForm  
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      />
)}
      &nbsp; &nbsp;
      {user.userType !== "USER" && user.department !== "Recruiter" && role == "ADMIN" && ( 
        // <Button
        //   type="primary"
        //   default
        // href={`${base_url}/excel/export/user/partner/${userId}`}
        // >
        //   Export
        // </Button>
        <Tooltip placement="left" title="XL">
        <a
        href={`${base_url}/excel/export/user/partner/${userId}`}>
           <FileExcelOutlined/>
         </a>
         </Tooltip>
      )}
        &nbsp; &nbsp;
        <Tooltip placement="left" title="Create">
        {/* {user.userType !== "USER" && user.department !== "Recruiter" && ( 
           */}
            {this.props.user.vendorCreateInd ===true && (
          <Button type="primary"
           ghost 
          onClick={() => handlePartnerModal(true)}>
            {/* Add */}
            <FormattedMessage id="app.add" defaultMessage="Add" />
          </Button>
        )}
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth}) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default (
  connect(mapStateToProps, mapDispatchToProps)(PartnerActionRight)
);
