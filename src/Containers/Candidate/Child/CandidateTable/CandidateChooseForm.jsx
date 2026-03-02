
import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import { Spacer,StyledLabel } from "../../../../Components/UI/Elements";

import {
  chooseCandididate
}
  from "../../CandidateAction";
  import { Switch, Button, Popconfirm, Checkbox } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";


/**
 * yup validation scheme for creating a opportunity
 */

// const OpportunitySchema = Yup.object().shape({
//   opportunityName: Yup.string().required("Please provide Opportunity name"),
//   currency: Yup.string().required("Currency needed!"),
//   // startDate:Yup.string().required("Input needed!"),
//   // endDate:Yup.string().required("Input needed!"),
// });
class CandidateChooseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      name:false,
      email:false,
      mobile:false,
      role:false,
      skills:false,
      availability:false,
    };
  }
  


  handleName = (checked) => {
    this.setState({ name: checked });
  };
  
  handleEmail = (checked) => {
    this.setState({ email: checked });
  };
  
  handleMobile = (checked) => {
    this.setState({ mobile: checked });
  };
  handleRole = (checked) => {
    this.setState({ role: checked });
  };
  handleSkills = (checked) => {
    this.setState({ skills: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  

//   componentDidMount() {
//     this.props.getRecruiterName();
//     this.props.getAllSalesList();
//   }

  render() {

    // const recruiterNameOption = this.props.recruiterName.map((item) => {
    //   return {
    //     label: `${item.fullName || ""}`,
    //     value: item.employeeId,
    //   };
    // });

    // const salesNameOption = this.props.sales.map((item) => {
    //   return {
    //     label: `${item.fullName || ""}`,
    //     value: item.employeeId,
    //   };
    // });



    // const {
    //   user: { userId },
    //   addingOpportunity,
    //   employeeId,
    //   salesUserIds,
    //   fullName,
    //   contactId,
    //   customerId,
    //   startDate,
    //   endDate,
    //   defaultCustomers,
    //   defaultContacts,
    //   name,
    // } = this.props;
     console.log("select",this.props.selectedRowKeys);
    return (
      <>
        <Formik
          initialValues={{
            candidateIds:this.props.selectedRowKeys,
            nameInd: this.state.name ? "true" : "false",
            email: this.state.email ? "true" : "false",
            mobileNoInd: this.state.mobile ? "true" : "false",
            roleInd: this.state.role ? "true" : "false",
            skillInd: this.state.skills ? "true" : "false",
            availableDateInd: this.state.availability ? "true" : "false",
            


          }}
        //   validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values)

            this.props.chooseCandididate(
             
              {
                ...values,
                candidateIds:this.props.selectedRowKeys,
                 nameInd: this.state.name ? "true" : "false",
                emailInd: this.state.email ? "true" : "false",
                 mobileNoInd: this.state.mobile ? "true" : "false",
                 roleInd: this.state.role ? "true" : "false",
                 skillInd: this.state.skills ? "true" : "false",
                 availableDateInd: this.state.availability ? "true" : "false",
                // startDate: dayjs(values.startDate).toISOString(),
                // endDate: dayjs(values.endDate).toISOString(),
                // startDate: `${newStartDate}T00:00:00Z`,
                // endDate: `${newEndDate}T00:00:00Z`,

                // orgId: this.props.organizationId,
                // userId: this.props.userId,
              },
              // this.props.selectedValue,
              // this.props.userId,
              // this.props.customerId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                     {/* <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}> */}
      
      <div>
     <StyledLabel> 
          Which data you want to share?                  
     </StyledLabel>
     {/* <PermissionForm /> */}
     </div>
     
     <Spacer style={{ marginTop: "1.5625em" }} />
    

    
    
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
       <p>Name</p>
      
         <Switch
           style={{ width: "5em" }}
           onChange={this.handleName}
           checked={this.state.name}
           checkedChildren="Yes"
           unCheckedChildren="No"
         />
       
     </FlexContainer>
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
       <p>Email</p>
      
         <Switch
           style={{ width: "5em" }}
           onChange={this.handleEmail}
        checked={this.state.email}
           checkedChildren="Yes"
           unCheckedChildren="No"
         />
      
     </FlexContainer>
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>

       <p>Mobile</p>
      
         <Switch
           style={{ width: "5em" }}
           onChange={this.handleMobile}
        checked={this.state.mobile}
           checkedChildren="Yes"
           unCheckedChildren="No"
         />
     
     </FlexContainer>
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
       <p>Role</p>
     

         <Switch
           style={{ width: "5em" }}
           onChange={this.handleRole}
           checked={this.state.role}
        //    checked={opportunityInd || opportunityToggleInd}
           checkedChildren="Yes"
           unCheckedChildren="No"
         />
      
     </FlexContainer>
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
       <p>Skills</p>
     

         <Switch
           style={{ width: "5em" }}
           onChange={this.handleSkills}
           checked={this.state.skills}
        //    checked={opportunityInd || opportunityToggleInd}
           checkedChildren="Yes"
           unCheckedChildren="No"
         />
       
     </FlexContainer>
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
       <p>Availability</p>
     

         <Switch
           style={{ width: "5em" }}
           onChange={this.handleAvailability}
           checked={this.state.availability}
        //    checked={opportunityInd || opportunityToggleInd}
           checkedChildren="Yes"
           unCheckedChildren="No"
         />
     
     </FlexContainer>
     <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
     <Checkbox
  // checked={this.state.checked}
  // onChange={() => this.handleChange()}
  style={{ marginLeft: "auto" }}
>Attach Resume?
 </Checkbox>
  
       </FlexContainer>
    
    
    


   {/* </MainWrapper> */}
                  
                  
                 
                 
               
                </div>
               
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit" 
                  onClick={this.props.handleCandidateEmailModal}
      
                 Loading={this.props.chooseCandididate}
                >
                  
                  Generate Email
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, contact, candidate }) => ({
  chooseCandidate:candidate.chooseCandidate,
  chooseCandidateEmail:candidate.chooseCandidateEmail
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
      chooseCandididate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateChooseForm);


