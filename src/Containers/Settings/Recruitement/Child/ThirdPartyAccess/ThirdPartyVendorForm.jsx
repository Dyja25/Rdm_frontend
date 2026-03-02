// 

import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Switch, Button, Popconfirm } from "antd";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
import { getThirdPartyAccess,addingThirdPartyAccess } from "../../../SettingsAction";

function ThirdPartyVendorForm(props) {
  useEffect(() => {
    props.getThirdPartyAccess(props.orgId);
  }, []);

   const { partnerContactInd } = props.thirdPartyAccess;
   console.log(partnerContactInd);
  const [toggle, setToggle] = useState(partnerContactInd)

  function handlePartnerContactClick(checked) {
     console.log(partnerContactInd);
    if (partnerContactInd) {
      //disable url
      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        partnerContactInd:partnerContactInd? false : true,
        }, );
       setToggle( partnerContactInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        partnerContactInd:partnerContactInd? false : true,
      }, props.orgId);
    setToggle(partnerContactInd ? false : true);
    }

  }
  function handleCancel() {
    if (partnerContactInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { partnerAiInd } = props.thirdPartyAccess;
  console.log(partnerAiInd);
 const [partnerInd, setPartnerInd] = useState(partnerAiInd)
 
 function handlePartnerAIClick(checked) {
    console.log(partnerAiInd);
   if (partnerAiInd) {
     //disable url
     props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
       orgId: props.orgId,
       partnerAiInd:partnerAiInd? false : true,
      }, );
     setPartnerInd( partnerAiInd ? false : true);
   } else {

     props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
       orgId: props.orgId,
       partnerAiInd:partnerAiInd? false : true,
     }, props.orgId);
     setPartnerInd(partnerAiInd ? false : true);
   }

 }
 function handleCancel() {
   if (partnerAiInd) {
    setPartnerInd(true);
   } else {
    setPartnerInd(false);
   }
 }
  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
          
      <Spacer />
       <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Allow Access to Vendor Portal</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handlePartnerContactClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||partnerContactInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer> 
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Enable AI Assist</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handlePartnerAIClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={partnerInd||partnerAiInd}
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
  thirdPartyAccess:settings.thirdPartyAccess,
   userId: auth.userDetails.userId,
  fetchingThirdPartyVendorAccess:settings.fetchingThirdPartyVendorAccess,
  fetchingThirdPartyVendorAccessError:settings.fetchingThirdPartyVendorAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getThirdPartyAccess,
      addingThirdPartyAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyVendorForm);