import { Checkbox } from 'antd';
import React ,{useEffect,useState}from 'react';
import { Formik, Form, Field } from "formik";
import {  Switch, Button, Popconfirm } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import {StyledLabel,Spacer} from "../../../../../Components/UI/Elements";
import {addingPermissionAccess,getPermissionAccess} from "../../../SettingsAction";
function SearchForm(props) {
  useEffect(() => {
    props.getPermissionAccess(props.orgId);
   
  }, []);

  const { candidateIntenalVisibleInd } = props.permissionAccess;
  console.log(candidateIntenalVisibleInd);
  const [toggle, setToggle] = useState(candidateIntenalVisibleInd)
  
  function handleCandidateClick(checked) {
    console.log(candidateIntenalVisibleInd);
    if (candidateIntenalVisibleInd) {
      //disable url
      props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candidateIntenalVisibleInd:candidateIntenalVisibleInd? false : true,
              }, );
      setToggle(candidateIntenalVisibleInd ? false : true);
    } else {

      props.addingPermissionAccess({
         ...props.permissionAccess,
       orgId: props.orgId,
       candidateIntenalVisibleInd:candidateIntenalVisibleInd? false : true,
         }, props.orgId);
      setToggle(candidateIntenalVisibleInd ? false : true);
       }

  }
  function handleCancel() {
    if (candidateIntenalVisibleInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { adminCandidateShareInd } = props.permissionAccess;
  console.log(adminCandidateShareInd);
 const [shareInd, setShareInd] = useState(adminCandidateShareInd)
 
 function handleShareClick(checked) {
    console.log(adminCandidateShareInd);
   if (adminCandidateShareInd) {
     //disable url
     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       adminCandidateShareInd:adminCandidateShareInd? false : true,
      }, );
      setShareInd( adminCandidateShareInd ? false : true);
   } else {

     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       adminCandidateShareInd:adminCandidateShareInd? false : true,
     }, props.orgId);
     setShareInd(adminCandidateShareInd ? false : true);
   }

 }
 function handleCancel() {
   if (adminCandidateShareInd) {
    setShareInd(true);
   } else {
    setShareInd(false);
   }
 }

  const { candidateExternalVisibleInd } = props.permissionAccess;
  console.log(candidateExternalVisibleInd);
 const [externalInd, setExternalInd] = useState(candidateExternalVisibleInd)
 
 function handleExternalClick(checked) {
    console.log(candidateExternalVisibleInd);
   if (candidateExternalVisibleInd) {
     //disable url
     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candidateExternalVisibleInd:candidateExternalVisibleInd? false : true,
      }, );
      setExternalInd( candidateExternalVisibleInd ? false : true);
   } else {

     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candidateExternalVisibleInd:candidateExternalVisibleInd? false : true,
     }, props.orgId);
     setExternalInd(candidateExternalVisibleInd ? false : true);
   }

 }
 function handleCancel() {
   if (candidateExternalVisibleInd) {
    setExternalInd(true);
   } else {
    setExternalInd(false);
   }
 }

 
  const { adminCandidateSearchInd } = props.permissionAccess;
  console.log(adminCandidateSearchInd);
 const [searchInd, setSearchInd] = useState(adminCandidateSearchInd)
 
 function handleSearchClick(checked) {
    console.log(adminCandidateSearchInd);
   if (adminCandidateSearchInd) {
     //disable url
     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       adminCandidateSearchInd:adminCandidateSearchInd? false : true,
      }, );
      setSearchInd( adminCandidateSearchInd ? false : true);
   } else {

     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       adminCandidateSearchInd:adminCandidateSearchInd? false : true,
     }, props.orgId);
     setSearchInd(adminCandidateSearchInd ? false : true);
   }

 }
 function handleCancel() {
   if (adminCandidateSearchInd) {
    setSearchInd(true);
   } else {
    setSearchInd(false);
   }
 }


   return (
    <>
    <Formik
        initialValues={{
          type: undefined,
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => ( 
            <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "40%",
                }}
              >
                 <FlexContainer justifyContent="space-between">
              <div><StyledLabel>Talent visible to internal user</StyledLabel></div>
               
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
               checked={toggle||candidateIntenalVisibleInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                    </div>
                </FlexContainer>
                <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="space-between">
              <div><StyledLabel>Internal user can share talent</StyledLabel></div>
                
              <div>
              <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleShareClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={shareInd||adminCandidateShareInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                    </div>
                 </FlexContainer>
                 <Spacer style={{ marginTop: "1.25em" }} /> 
            <FlexContainer justifyContent="space-between">
            <div><StyledLabel>Talent visible to external user</StyledLabel></div>
                   <div>
                   <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleExternalClick}
             onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={externalInd||candidateExternalVisibleInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                    </div>
              </FlexContainer>
              <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="space-between">
              <div><StyledLabel>Talent visible to external user on search</StyledLabel></div>
                
              <div>

              <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleSearchClick}
             onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={searchInd||adminCandidateSearchInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                      {/* <Field
                        name="visibleExUserSearch"
                        component={SwitchComponent}
                       data={values.visibleExUserSearch}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}                       
                      /> */}
                    </div>
                </FlexContainer>              
                </div></div></Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  permissionAccess:settings.permissionAccess,
    orgId: auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
  fetchingPermissionAccess:settings.fetchingPermissionAccess,
  fetchingPermissionAccessError:settings.fetchingPermissionAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getPermissions,
      // addingPermissions
      // getThirdPartyMonetizeAccess,
      getPermissionAccess,
      addingPermissionAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
