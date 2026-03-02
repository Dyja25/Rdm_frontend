
// import React, { useEffect,Component, useState, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Icon, Switch, Button, Popconfirm } from "antd";
// import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
// import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
// import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
// import { addingThirdPartyAccess,getThirdPartyAccess} from "../../../SettingsAction";
// import { Formik, Form, Field } from "formik";

// // function ThirdPartyForm(props) {
//   class ThirdPartyForm extends Component {
//     componentDidMount(){
//       this.props.getThirdPartyAccess()
//     }

//     render() {
//       return (
//         <>
//             <Formik
//                 enableReinitialize
//                 initialValues={{
//                     // inde2:props.thirdPartyAccess.inde2,
//                     // inde1:props.thirdPartyAccess.inde1,
//                     // inde3:props.thirdPartyAccess.inde3,
//                 }}


//                 onSubmit={(values) => {

//                     // this.props.addingThirdPartyAccess(
//                     //     {
//                     //         ...values,
//                     // inde2:props.thirdPartyAccess.inde2,
//                     // inde1:props.thirdPartyAccess.inde1,
//                     // inde3:props.thirdPartyAccess.inde3,

//                     //     },

//                     // );

//                 }}
//             >
//                 {({
//                     errors,
//                     touched,
//                     isSubmitting,
//                     setFieldValue,
//                     setFieldTouched,
//                     values,
//                     ...rest
//                 }) => (
//                     <Form >
//                             <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
//       <FlexContainer justifyContent="space-between">
//                   <StyledLabel>Allow Access to Customer Portal</StyledLabel> &nbsp;
//                   <Field
//                     // name="subscriptionInd"
//                     component={SwitchComponent}
//                     // data={values.subscriptionInd}
//                     checkedChildren={"Yes"}
//                     unCheckedChildren={"No"}
//                   />
//                   </FlexContainer>
//       <Spacer />
//       <FlexContainer justifyContent="space-between">
//                   <StyledLabel>Monetize</StyledLabel> &nbsp;
//                   <Field
//                     // name="subscriptionInd"
//                     component={SwitchComponent}
//                     // data={values.subscriptionInd}
//                     checkedChildren={"Yes"}
//                     unCheckedChildren={"No"}
//                   />
//                   </FlexContainer>
//       <Spacer />
//       <FlexContainer justifyContent="space-between">
//                   <StyledLabel>Enable AI Assist</StyledLabel> &nbsp;
//                   <Field
//                     // name="subscriptionInd"
//                     component={SwitchComponent}
//                     // data={values.subscriptionInd}
//                     checkedChildren={"Yes"}
//                     unCheckedChildren={"No"}
//                   />
//                   </FlexContainer>
//       <Spacer />
//       <Button
//       type="primary"
//       htmlType="submit"
//       >
//         Submit
//       </Button>
//     </MainWrapper>
//                     </Form>
//                 )}
//             </Formik>
//         </>
//     );

  
// }
//   }

// const mapStateToProps = ({ settings, auth }) => ({
//   thirdPartyAccess:settings.thirdPartyAccess,
//     orgId: auth.userDetails.organizationId,
//    userId: auth.userDetails.userId,
 
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getThirdPartyAccess,
//       addingThirdPartyAccess
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ThirdPartyForm)
// import React, { useEffect, useState,Component, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Icon, Switch, Button, Popconfirm } from "antd";
// import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
// import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
// import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
// import { addingThirdPartyAccess,getThirdPartyAccess} from "../../../SettingsAction";
// import { Formik, Form, Field } from "formik";

// // function ThirdPartyForm(props) {
//   class ThirdPartyForm extends Component {
//     componentDidMount(){
//       this.props.getThirdPartyAccess()
//     }

//     render() {
//       return (
//         <>
//             <Formik
//                 enableReinitialize
//                 initialValues={{
//                     // inde2:props.thirdPartyAccess.inde2,
//                     // inde1:props.thirdPartyAccess.inde1,
//                     // inde3:props.thirdPartyAccess.inde3,
//                 }}


//                 onSubmit={(values) => {

//                     // this.props.addingThirdPartyAccess(
//                     //     {
//                     //         ...values,
//                     // inde2:props.thirdPartyAccess.inde2,
//                     // inde1:props.thirdPartyAccess.inde1,
//                     // inde3:props.thirdPartyAccess.inde3,

//                     //     },

//                     // );

//                 }}
//             >
//                 {({
//                     errors,
//                     touched,
//                     isSubmitting,
//                     setFieldValue,
//                     setFieldTouched,
//                     values,
//                     ...rest
//                 }) => (
//                     <Form >
//                             <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
//       <FlexContainer justifyContent="space-between">
//                   <StyledLabel>Allow Access to Customer Portal</StyledLabel> &nbsp;
//                   <Field
//                     // name="subscriptionInd"
//                     component={SwitchComponent}
//                     // data={values.subscriptionInd}
//                     checkedChildren={"Yes"}
//                     unCheckedChildren={"No"}
//                   />
//                   </FlexContainer>
//       <Spacer />
//       <FlexContainer justifyContent="space-between">
//                   <StyledLabel>Monetize</StyledLabel> &nbsp;
//                   <Field
//                     // name="subscriptionInd"
//                     component={SwitchComponent}
//                     // data={values.subscriptionInd}
//                     checkedChildren={"Yes"}
//                     unCheckedChildren={"No"}
//                   />
//                   </FlexContainer>
//       <Spacer />
//       <FlexContainer justifyContent="space-between">
//                   <StyledLabel>Enable AI Assist</StyledLabel> &nbsp;
//                   <Field
//                     // name="subscriptionInd"
//                     component={SwitchComponent}
//                     // data={values.subscriptionInd}
//                     checkedChildren={"Yes"}
//                     unCheckedChildren={"No"}
//                   />
//                   </FlexContainer>
//       <Spacer />
//       <Button
//       type="primary"
//       htmlType="submit"
//       >
//         Submit
//       </Button>
//     </MainWrapper>
//                     </Form>
//                 )}
//             </Formik>
//         </>
//     );

  
// }
//   }

// const mapStateToProps = ({ settings, auth }) => ({
//   thirdPartyAccess:settings.thirdPartyAccess,
//     orgId: auth.userDetails.organizationId,
//    userId: auth.userDetails.userId,
 
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getThirdPartyAccess,
//       addingThirdPartyAccess
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ThirdPartyForm);

import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Switch, Button, Popconfirm } from "antd";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
import { addingThirdPartyAccess,getThirdPartyAccess, } from "../../../SettingsAction";

function ThirdPartyForm(props) {
    useEffect(() => {
    props.getThirdPartyAccess(props.orgId);
    //props.getThirdPartyMonetizeAccess(props.orgId)
  }, []);

   const { customerContactInd } = props.thirdPartyAccess;
  console.log(customerContactInd);
  const [toggle, setToggle] = useState(customerContactInd)
  
  function handleCandidateClick(checked) {
    console.log(customerContactInd);
    if (customerContactInd) {
      //disable url
      props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
       orgId: props.orgId,
        customerContactInd:customerContactInd? false : true,
              }, );
      setToggle(customerContactInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
       orgId: props.orgId,
        customerContactInd:customerContactInd? false : true,
         }, props.orgId);
      setToggle(customerContactInd ? false : true);
       }

  }
  function handleCancel() {
    if (customerContactInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { monitizeInd } = props.thirdPartyAccess;
  console.log(monitizeInd);
  const [monetizeInd, setMonitizeInd] = useState(monitizeInd);
  function handleMonetizeClick(checked) {
    console.log(monitizeInd);
    if (monitizeInd) {
      //disable url
      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        monitizeInd: monitizeInd ? false : true,
      }, props.userId);
      setMonitizeInd(monitizeInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
        orgId: props.orgId,
        monitizeInd: monitizeInd ? false : true,
      }, props.orgId);
      setMonitizeInd(monitizeInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleMonitizeCancel() {
    if (monitizeInd) {
      setMonitizeInd(true);
    } else {
      setMonitizeInd(false);
    }
  }

  const { customerAiInd } = props.thirdPartyAccess;
  console.log(customerAiInd);
  const [customersAiInd, setCustomersAiInd] = useState(monitizeInd);
  function handleCustomerAiClick(checked) {
    console.log(customerAiInd);
    if (customerAiInd) {
      //disable url
      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        customerAiInd: customerAiInd ? false : true,
      }, props.userId);
      setCustomersAiInd(customerAiInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
        orgId: props.orgId,
        customerAiInd: customerAiInd ? false : true,
      }, props.orgId);
      setCustomersAiInd(customerAiInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleCustomerCancel() {
    if (customerAiInd) {
      setCustomersAiInd(true);
    } else {
      setCustomersAiInd(false);
    }
  }

  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
      <Spacer />
       <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Allow Access to Customer Portal</p>
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
               checked={toggle||customerContactInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer>
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Monetize</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleMonetizeClick}
              onCancel={handleMonitizeCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
              checked={monetizeInd||monitizeInd}
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
             onConfirm={handleCustomerAiClick}
            onCancel={handleCustomerCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={customersAiInd||customerAiInd}
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
  thirdPartyAccess:settings.thirdPartyAccess,
  thirdPartyMonetize:settings.thirdPartyMonetize,
  // permissionsData: permissions.permissionsData,
    orgId: auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
  fetchingThirdPartyAccess:settings.fetchingThirdPartyAccess,
  fetchingThirdPartyAccessError:settings.fetchingThirdPartyAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getPermissions,
      // addingPermissions
      // getThirdPartyMonetizeAccess,
      getThirdPartyAccess,
      addingThirdPartyAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyForm);

