import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSequenceModal } from "../../../../Settings/SettingsAction";
import { Icon, Switch, Button, Popconfirm } from "antd";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
import { addingCommunicationAccess,getCommunicationAccess } from "../../../../Settings/SettingsAction";
import AddSequenceModal from "./AddSequenceModal";
import SequenceTable from "./SequenceTable";


function JobPortalForm(props) {
    useEffect(() => {
        props.getCommunicationAccess(props.orgId);
      }, []);

      const { emailCustomerInd } = props.communicationAccess;
      console.log(emailCustomerInd);
      const [toggle, setToggle] = useState(emailCustomerInd)
 
  function handleEmailClick(checked) {
    console.log(emailCustomerInd);
    if (emailCustomerInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
         orgId: props.orgId,
         emailCustomerInd:emailCustomerInd? false : true,
        
      }, );
      setToggle( emailCustomerInd ? false : true);
    } else {

      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        emailCustomerInd:emailCustomerInd? false : true,
          }, props.orgId);
          setToggle(emailCustomerInd ? false : true);
      
    }

  }
  function handleCancel() {
    if (emailCustomerInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { emailJobDesInd } = props.communicationAccess;
  console.log(emailJobDesInd);
 const [jobDesInd, setemailJobDesInd] = useState(emailJobDesInd)

function handleEmailJobClick(checked) {
console.log(emailJobDesInd);
if (emailJobDesInd) {

  //disable url
  props.addingCommunicationAccess({
    ...props.communicationAccess,
     orgId: props.orgId,
     emailJobDesInd:emailJobDesInd? false : true,
    
  }, );
  setemailJobDesInd( emailJobDesInd ? false : true);
} else {

  props.addingCommunicationAccess({
    ...props.communicationAccess,
    orgId: props.orgId,
    emailJobDesInd:emailJobDesInd? false : true,
      }, props.orgId);
      setemailJobDesInd(emailJobDesInd ? false : true);
  
}

}
function handleCancel() {
if (emailJobDesInd) {
    setemailJobDesInd(true);
} else {
  setemailJobDesInd(false);
}
}

const { whatsappCustomerInd} = props.communicationAccess;
console.log(whatsappCustomerInd);
const [whatsappsCustomerInd, setwhatsappsCustomerInd] = useState(whatsappCustomerInd)

function handleWpClick(checked) {
console.log(whatsappCustomerInd);
if (whatsappCustomerInd) {
//disable url
props.addingCommunicationAccess({
  ...props.communicationAccess,
   orgId: props.orgId,
   whatsappCustomerInd:whatsappCustomerInd? false : true,
  
}, );
setwhatsappsCustomerInd( whatsappCustomerInd ? false : true);
} else {

props.addingCommunicationAccess({
  ...props.communicationAccess,
  orgId: props.orgId,
  whatsappCustomerInd:whatsappCustomerInd? false : true,
    }, props.orgId);
    setwhatsappsCustomerInd(whatsappCustomerInd ? false : true);

}

}
function handleCancel() {
if (whatsappCustomerInd) {
  setwhatsappsCustomerInd(true);
} else {
  setwhatsappsCustomerInd(false);
}
}


const { whatsappJobDesInd} = props.communicationAccess;
console.log(whatsappJobDesInd  );
const [jobInd, setwhatsappJobDesInd] = useState(emailJobDesInd)

function handleWpJobClick(checked) {
console.log(whatsappJobDesInd);
if (whatsappJobDesInd) {

//disable url
props.addingCommunicationAccess({
  ...props.communicationAccess,
   orgId: props.orgId,
   whatsappJobDesInd:whatsappJobDesInd? false : true,
  
}, );
setwhatsappJobDesInd( whatsappJobDesInd ? false : true);
} else {

props.addingCommunicationAccess({
  ...props.communicationAccess,
  orgId: props.orgId,
  whatsappJobDesInd:whatsappJobDesInd? false : true,
    }, props.orgId);
    setwhatsappJobDesInd(whatsappJobDesInd ? false : true);

}

}
function handleCancel() {
if (whatsappJobDesInd) {
  setwhatsappJobDesInd(true);
} else {
  setwhatsappJobDesInd(false);
}
}

const {
  addSequenceModal,
  handleSequenceModal, 
} = props;

 

  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>    
      <Spacer />
      <FlexContainer
                justifyContent="space-between"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    width: "44%",

                    marginTop: "0.625em",
                    marginLeft: "1em",
                  }}
                >
                  <div>
                    <StyledLabel
                      style={{
                        flexBasis: "13%",
                        marginTop: "0.625em",
                        fontSize: "1em",
                        fontStyle: "italic",
                      }}
                    >
                      Email
                    </StyledLabel>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                     <p>Share Talent data with Customer</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleEmailClick}
             onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||emailCustomerInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
          </div>

                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                     <p>Share Job Description to Talent</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleEmailJobClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={jobDesInd||emailJobDesInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <Button
                      // onClick={handleSequenceButtonClick}

                      onClick={() => handleSequenceModal(true)}
                    >
                      + Sequence
                    </Button>
                  </div>
                  <Spacer />
                 </div>
                

                <div
                  style={{
                    height: "100%",
                    width: "44%",
                    marginTop: "0.625em",
                    marginRight: "0.75em",
                  }}
                >
                  <div>
                    <StyledLabel
                      style={{
                        flexBasis: "13%",
                        marginTop: "0.625em",
                        fontSize: "1em",
                        fontStyle: "italic",
                      }}
                    >
                      Whatsapp
                    </StyledLabel>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <p>Share Talent data with Customer</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleWpClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
              checked={whatsappsCustomerInd || whatsappCustomerInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
                   
                  </div>
                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
          <p>Share Job Description with Talent</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleWpJobClick}
             onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={jobInd||whatsappJobDesInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
                  </div>
                 
                </div>
              </FlexContainer>
              <SequenceTable/>

              <AddSequenceModal
      addSequenceModal={addSequenceModal}
      handleSequenceModal={handleSequenceModal}
    />


    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    addSequenceModal:settings.addSequenceModal,
    communicationAccess:settings.communicationAccess,
    fetchingCommunicationAccess:settings.fetchingCommunicationAccess,
    fetchingCommunicationAccessError:settings.fetchingCommunicationAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
         getCommunicationAccess,
         addingCommunicationAccess,
         handleSequenceModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobPortalForm);