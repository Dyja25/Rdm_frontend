import React, { Component,useMemo ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Select } from "antd";
import { StyledLabel } from "../../../Components/UI/Elements";
import { Button ,Switch} from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../Config/Auth";
import { Spacer } from "../../../Components/UI/Elements";

import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";

import {
  getCandidateFilter ,
   
} 
from "../CandidateAction";
import { FlexContainer } from "../../../Components/UI/Layout";

import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
const { Option } = Select;

/**
 * yup validation scheme for creating a opportunity
 */

// const OpportunitySchema = Yup.object().shape({
//   opportunityName: Yup.string().required("Please provide Opportunity name"),
//   currency: Yup.string().required("Currency needed!"),
//   // startDate:Yup.string().required("Input needed!"),
//   // endDate:Yup.string().required("Input needed!"),
// });
function CandidateFilterForm(props){
  const [selectType, setSelectType] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const [selectParameter, setSelectParameter] = useState(false);

  function handleFilterBy(value) {
    setSelectType(value);
  }
  function handleFilter(value) {
    setSelectFilter(value);
  }


  function handleChange(value) {
    setSelectParameter(value);
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // visible: false,
  //     // option: "Mobile",
  //     // option1: "Mobile",
  //     // option2: "Work",
  //     // currentOption: "",
  //     // candidate: false,
  //     // availability: true,
  //     // billing: false,
  //     // whiteblue: true,
  //     // checked: true,
  //     value:false,
  //   };
  

  // handleFilterBy = (value) => {
  //   this.setState({ value });
  // };
  
  // handleReset = (resetForm) => {
  //   resetForm();
  // };

//   componentDidMount() {
//      this.props.getRecruiterName();
//      this.props.getAllSalesList();
// }

  
    
//     const recruiterNameOption = this.props.recruiterName.map((item) => {
//       return {
//           label: `${item.fullName || ""}`,
//           value: item.employeeId,
//       };
//   });

//   const salesNameOption = this.props.sales.map((item) => {
//     return {
//         label: `${item.fullName || ""}`,
//         value: item.employeeId,
//     };
// });
 
 
  
    // const {
    //   user:{userId},
    //   addingOpportunity,
    //   fullName,
    //   employeeId,
    //   salesUserIds,
    //   firstName,
    //   middleName,
    //   lastName,
    //   contactId,
    //   customerId,
    //   startDate,
    //   endDate,
    //   defaultCustomers,
    //   defaultContacts,
    //   name,
    // } = this.props;
    // console.log(customerId);
    return (
      <>
        <Formik
          initialValues={{
            parameter: "",
            roleType:"",
            billing:"",
            // startDate: dayjs(),
            // endDate: "",
          
             
           
          }}
        //   validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
          

           

           

            
            
           
   
           props.getCandidateFilter(
              {
                ...values,
                // roleType:props.roleTypeId
                // startDate: dayjs(values.startDate).toISOString(),
                // endDate: dayjs(values.endDate).toISOString(),
               
               
                // orgId: this.props.organizationId,
                // userId: this.props.userId,
              },
              // this.props.userId,
              // this.props.customerId,
              resetForm()
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
                    width: "36%",
                  }}
                >
                     <StyledLabel>
                      {/* Parameter */}
                      <FormattedMessage
                                id="app.parameter"
                                defaultMessage="Parameter"
                              />
                      </StyledLabel> 
  
  <Select
  
   style={{ width: '100%' }}
   placeholder="Select"
  //  defaultValue={partners}
  onChange={handleFilterBy}
 >

   
<Option value="Role">
  {/* Role */}
  <FormattedMessage
     id="app.role"
      defaultMessage="Role"
    />
  </Option>
    <Option value="Cost">
      {/* Cost */}
       <FormattedMessage
     id="app.cost"
      defaultMessage="Cost"
    />
      </Option>
    
   
 </Select> 
                  
                   
                    
                    

                    <Spacer style={{marginTop:"1.25em"}}/>
                      <FlexContainer justifyContent="space-between">
                     
                      <div style={{ width: "47%",flexBasis:"44%" }}>
                      {selectType==="Role" ? ( 
                      <FastField
                        name="roleType"
                        selectType="roleType"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.role"
                            defaultMessage="Role"
                          />
                        }
                        isColumnWithoutNoCreate
                        isColumn

                        component={SearchSelect}
                        // value={values.designationTypeId}
                        inlineLabel
                      />
                        
                      ):selectType==="Cost" ? ( 
                        
                        <Field
                          name="billing"
                          label="Billing"


                          width={"100%"}
                          isColumn
                          component={InputComponent}                          
                        />
                        ) : null}
                      </div>
                      <div style={{ width: "53%", }}>
                      {selectType==="Cost"&&
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                        // defaultValue={{
                        //   value: this.props.user.currency,
                        // }}
                        label={<FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />}
                        style={{
                          width: "70%",
                         // marginTop: "0px",
                        }}

                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />
                        }
                      
                    </div>
                          </FlexContainer>
                    
                 
                 &nbsp;&nbsp;
                </div>
                
             
              
              <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                <Switch
                   style={{
                     //  width: "5em",
                      marginLeft:"-44px" ,
                    marginLeft:"118px" }}
                   checked={selectParameter}
                  onChange={handleChange}
                   // disabled={this.state.availability}
                   checkedChildren={<FormattedMessage
                          id="app.and"
                          defaultMessage="And"
                        />}
                   unCheckedChildren={<FormattedMessage
                          id="app.or"
                          defaultMessage="Or"
                        />}
                 />
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "24%",
                  }}
                >
                  
                     {/* <StyledLabel>Parameter</StyledLabel>  */}
                     {selectParameter && (
                         <StyledLabel>
                          {/* Parameter */}
                             <FormattedMessage
                                id="app.parameter"
                                defaultMessage="Parameter"
                              />
  <Select
  // label="Parameter"
  
   style={{ width: '100%' }}
   placeholder="Select"
  
   onChange={handleFilter}
 >

   
<Option value="Work Preference">
  {/* Work Preference */}
   <FormattedMessage
                                id="app.workPreference"
                                defaultMessage=" Work Preference"
                              />
</Option>
<Option value="Location">
  {/* Location */}
    <FormattedMessage
                                id="app.location"
                                defaultMessage="Location"
                              />
  </Option>
    
    
   
 </Select> 
 </StyledLabel>   
                     )}
                      <Spacer style={{marginTop:"1.25em"}}/>
                      <FlexContainer justifyContent="space-between">
                     
                      <div style={{ flexBasis:"68%" }}>
                      {selectFilter==="Work Preference"&&  ( 
                      <FastField
                        name="workPreference"
                        // selectType="roleType"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.workpreference"
                            defaultMessage="Work Preference"
                          />
                        }
                        // isColumnWithoutNoCreate
                        // selectType="designationType"
                        options={[
    {
      label: (
        <FormattedMessage
          id="app.remote"
          defaultMessage="Remote"
        />
      ),
      value: "Remote",
    },
    {
      label: (
        <FormattedMessage
          id="app.hybrid"
          defaultMessage="Hybrid"
        />
      ),
      value: "Hybrid",
    },
    {
      label: (
        <FormattedMessage
          id="app.office"
          defaultMessage="Office"
        />
      ),
      value: "Office",
    },
  ]}
                        isColumn

                        component={SelectComponent}
                        // value={values.designationTypeId}
                        inlineLabel
                      />
                      

                      )} 
                        {selectFilter==="Location"&&  ( 
                       <FastField
                        name="workLocation"
                        // selectType="roleType"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.location"
                            defaultMessage="Location"
                          />
                        }
                        
                        isColumn

                        component={InputComponent}
                        // value={values.designationTypeId}
                        inlineLabel
                      />
                        )}
                     
                        
                       
                    </div>
                      
                          </FlexContainer>
                  
                   
                    
                    

                    
                 
                
                 
                
                
                
                   
              
                 
                </div>
                </div>
              <Spacer />
    
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                //   Loading={addingOpportunity}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/* Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  
}

const mapStateToProps = ({ auth, opportunity, candidate, customer }) => ({
//   user: auth.userDetails,
fetchingCandidateFilter:candidate.fetchingCandidateFilter
//   userId: auth.userDetails.userId,
//   organizationId: auth.userDetails.organizationId,
//   contactId: contact.contactByUserId.contactId,
//   customerId: customer.customer.customerId,
//   addingOpportunity: opportunity.addingOpportunity,
//   addingOpportunityError: opportunity.addingOpportunityError,
//   recruiterName:opportunity.recruiterName,
//   // salesUserIds:auth.userDetails.userId,
//   sales:opportunity.sales,
//   currencies:auth.currencies
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateFilter
    //   addOpportunity,
    //    getRecruiterName,
    //    getAllSalesList,
       
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateFilterForm);
