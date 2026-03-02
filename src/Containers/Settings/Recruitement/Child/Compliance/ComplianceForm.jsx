import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Switch, Button, Popconfirm } from "antd";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
import { addingComplianceGdpr,getComplianceGdpr } from "../../../SettingsAction";

function ComplianceForm(props) {
  useEffect(() => {
    props.getComplianceGdpr(props.orgId);
    }, []);
   const { gdprApplicableInd } = props.gdprCompliance;
   console.log(gdprApplicableInd);
  const [toggle, setToggle] = useState(gdprApplicableInd)
  function handleCandidateClick(checked) {
     console.log(gdprApplicableInd);
    if (gdprApplicableInd) {
      //disable url
       props.addingComplianceGdpr({
        orgId: props.orgId,
        gdprApplicableInd:gdprApplicableInd ? false : true,
    
    },);
    setToggle(gdprApplicableInd ? false : true);
   } else {

      props.addingComplianceGdpr({
        orgId: props.orgId,
        gdprApplicableInd:gdprApplicableInd? false : true,
       }, props.orgId);
      setToggle(gdprApplicableInd ? false : true);
     
    }

  }
  function handleCancel() {
    if (gdprApplicableInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
}

  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
       <div>
      {/* <StyledLabel> 
           Click To Share                   
      </StyledLabel> */}
      {/* <PermissionForm /> */}
      </div>
      
      <Spacer />
       <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>GDPR Applicable</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleCandidateClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||gdprApplicableInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  gdprCompliance:settings.gdprCompliance,
  fetchingComplianceGdpr:settings.fetchingComplianceGdpr,
  fetchingComplianceGdprError:settings.fetchingComplianceGdprError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     addingComplianceGdpr,
     getComplianceGdpr,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplianceForm);

