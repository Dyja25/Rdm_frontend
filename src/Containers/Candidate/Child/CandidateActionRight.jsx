import React, {lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, Tooltip } from "antd";

import { FlexContainer } from "../../../Components/UI/Layout";

import { StyledSelect } from "../../../Components/UI/Antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const CandidateShareForm =lazy(()=>import("./CandidateShareForm.jsx"));
const Option = StyledSelect.Option;

const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];

class CandidateActionRight extends React.Component {
  
  render() {
    const {
      userId,
      users,
      viewType,
      user,
      subscriptionType,
      contactFilterText,
      handleCandidateModal,
      handleCandidateResumeModal,
      setContactFilterText,
      setContactFilterUser,
      role,
      handleCandidateFilterModal
    } = this.props;
    return (
      <FlexContainer alignItems="center">
        

        &nbsp; &nbsp; &nbsp;
        {user.userType !== "USER" && user.department !== "Partner" && user.employee_type !=="External" &&viewType === "table"&& ( 
      <CandidateShareForm 
      viewType={viewType}
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      fullName={this.props.fullName}
      />
        )}
{viewType==="list"&&(
<CandidateShareForm 
      viewType={viewType}
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      fullName={this.props.fullName}
      />
)}

{viewType==="dashboard"&&(
<CandidateShareForm 
      viewType={viewType}
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      fullName={this.props.fullName}
      />
)}
    

 
     &nbsp;  
      &nbsp;
      {user.userType !== "USER" && user.department !== "Partner" && role == "ADMIN" && ( 
        // <Button
        //   type="primary"
        //   default
        //   href={`${base_url}/excel/export/user/candidate/${userId}`}
        //   >
        //   Export
        //  </Button>
       
        <Tooltip placement="left" title="XL">
        <a href={`${base_url}/excel/export/user/candidate/${userId}`}>
        {/* <FontAwesomeIcon icon={solid('file-excel')} style={{fontSize: "x-large"}}/> */}
        <FileExcelOutlined/>
        </a> 
         </Tooltip>
      )}
        &nbsp;
        &nbsp;
        {user.userType !== "USER" && user.department !== "Partner" && ( 
        <Button
          type="primary"
          default
          onClick={() => this.props.history.push("/import/account")}
        >
          {/* Import */}
           <FormattedMessage
                           id="app.import"
                           defaultMessage="Import"
                         />
        </Button>
        )}
        &nbsp;
        {/* {user.userType !== "USER" && user.department !== "Partner" && (  */}
        {user.talentCreateInd ===true && (
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            // ghost
            onClick={() => handleCandidateResumeModal(true)}
          >
         {/* Add */}
          <FormattedMessage
                           id="app.add"
                           defaultMessage="Add"
                         />
          </Button>
        </Tooltip>
       )} 
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, team, contact }) => ({
 
  userId: auth.userDetails.userId,
 
  user: auth.userDetails,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(CandidateActionRight)
);
