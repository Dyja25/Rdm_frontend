import React, { Component, useMemo ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button,Select } from "antd";
import { TimePicker } from "../../../../Components/Forms/Formik/TimePicker";
// import { StyledLabel } from "../../../Components/UI/Elements";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
//import { base_url } from "../../../../../../Config/Auth";
import { Spacer ,StyledLabel} from "../../../../Components/UI/Elements";

import {
    addDonotcall
}
  from "../../CandidateAction";
import { FlexContainer } from "../../../../Components/UI/Layout";

import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

const { Option } = Select;

/**
 * yup validation scheme for creating a opportunity
 */


function DonotCallForm (props){
  const [selectType, setSelectType] = useState("");
  function handleFilterBy(value) {
    setSelectType(value);
  }

//   componentDidMount() {
//     this.props.getRecruiterName();
//     this.props.getAllSalesList();
//   }


 



    // const {
    //   user: { userId },
    //   candidateDate
     
    // } = this.props;
    // console.log("profile",this.props.profileId);
    return (
      <>
        <Formik
          initialValues={{
            callType:"",
           // startDate:selectType === "call in 1 week"?props.startDate||dayjs().add(1,'w'):props.startDate||dayjs().add(7,'w'),
               startDate:"",
              // startDate:selectType === "call in 1 week"?dayjs().add(1,'w'):selectType === "call in 4 week"?dayjs().add(4,'w'):null,
              //startDate:dayjs().add(4,'w'),
            startTime:  null,
                // endDate: endDate || null,
                endTime:  null,
            // onboardDate: "",
            // onboardInd:true,
            // profileId:this.props.profileId,

           
           


          }}
          
          onSubmit={(values, { resetForm }) => {
           

         props.addDonotcall(
               {
                 ...values,
                 startDate:selectType==="call in 1 week"?dayjs().add(1,'w'):selectType==="call in 4 week"?dayjs().add(4,'w'):"",
                callType:selectType ==="donotcall"?"donotcall":null
               },
               props.candidateId,
            //   // this.props.customerId,
          
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
                   <StyledLabel>Parameter</StyledLabel> 
                   <Select
  
   style={{ width: '100%' }}
   placeholder="Select"
  //  defaultValue={partners}
  onChange={handleFilterBy}
 >

   
<Option value="donotcall">Do Not Call</Option>
    <Option value="call in 1 week">Call in 1 week</Option>
    <Option value="call in 4 week">Call in 4 weeks</Option>
    
    
 </Select> 
 {/* <FlexContainer justifyContent="space-between">
  <div style={{ width: "47%",flexBasis:"44%"}}>
  {selectType==="donotcall" &&(  
  <Field
                          name="callType"
                          //label="Billing"


                          width={"100%"}
                          isColumn
                          component={SelectComponent}  
                          options={[ "donotcall"]}                        
                        />
                         )} 
  </div>
 </FlexContainer> */}
 <FlexContainer justifyContent="space-between">
                     
                     <div style={{ width: "47%",flexBasis:"44%" }}>
                     {selectType==="call in 1 week" &&( 
                     <Field
                    name="startDate"
                    label="Date"
                   
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={dayjs().add(1,'w')}
                    inlineLabel
                    style={{
                       flexBasis: "80%",
                      width: "100%",
                    }}
                  />
                     )}
                     </div>
                     
                   
                   
                         </FlexContainer>
                         {selectType==="call in 1 week" &&( 
                <FlexContainer justifyContent="space-between">
                  
                <div style={{ width: "47%" }}>
                      <Field
                        name="startTime"
                        // label="Start Time"
                        label={
                          <FormattedMessage
                            id="app.starttime"
                            defaultMessage="Start Time"
                          />
                        }
                        component={TimePicker}
                        isRequired
                        isColumn
                        use12Hours
                        value={dayjs().add(1,'w','t')}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                      </div>
                  
                  <div style={{ width: "47%" }}>
                      <Field
                        name="endTime"
                        // label="End Time"
                        label={
                          <FormattedMessage
                            id="app.endtime"
                            defaultMessage="End Time"
                          />
                        }
                        component={TimePicker}
                        use12Hours
                        isRequired
                        isColumn
                        value={values.endTime}
                        // inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                     
                     
                </FlexContainer>
                         )}

           
                    
                     
                   
                   
                         <FlexContainer justifyContent="space-between">
                     
                     <div style={{ width: "47%",flexBasis:"44%" }}>
                     {selectType==="call in 4 week" &&( 
                     <Field
                    name="startDate"
                    label="Date"
                   
                    component={DatePicker}
                    
                    isColumn
                    width={"100%"}
                    value={dayjs().add(4,'w')}
                    inlineLabel
                    style={{
                       flexBasis: "80%",
                      width: "100%",
                    }}
                  />
                     )}
                     </div>
                     
                   
                   
                         </FlexContainer>
                         {selectType==="call in 4 week" &&( 
                <FlexContainer justifyContent="space-between">
                  
                <div style={{ width: "47%" }}>
                      <Field
                        name="startTime"
                        // label="Start Time"
                        label={
                          <FormattedMessage
                            id="app.starttime"
                            defaultMessage="Start Time"
                          />
                        }
                        component={TimePicker}
                        isRequired
                        isColumn
                        use12Hours
                        value={dayjs().add(4,'w','t')}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                      </div>
                  
                  <div style={{ width: "47%" }}>
                      <Field
                        name="endTime"
                        // label="End Time"
                        label={
                          <FormattedMessage
                            id="app.endtime"
                            defaultMessage="End Time"
                          />
                        }
                        component={TimePicker}
                        use12Hours
                        isRequired
                        isColumn
                       // value={values.endTime}
                        // inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                     
                     
                </FlexContainer>
                         )}
                
                 
                 
                  
                
                </div>
               
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                 Loading={props.donotCall}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
               
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ auth, candidate, contact, customer }) => ({
    // user: auth.userDetails,
    donotCall:candidate.donotCall
    // userId: auth.userDetails.userId,
    // candidateDate:opportunity.candidateDate,
    // candidateRequirement:opportunity.candidateRequirement,
    // profileId:opportunity.candidateRequirement.profileId
    
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addDonotcall
        // addCandidateDate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DonotCallForm);
