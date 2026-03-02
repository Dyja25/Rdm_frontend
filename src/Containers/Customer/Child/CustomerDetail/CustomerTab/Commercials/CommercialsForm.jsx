import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch} from "antd";
import { MainWrapper } from "../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import {getCommercialsByCustomerId} from "../../../../CustomerAction";
import dayjs from "dayjs";

//import ExperienceTable from "./ExperienceTable";

function CommercialsForm(props) {
  useEffect(()=>{
    props.getCommercialsByCustomerId(props.organizationId);

  },[])
  return (
    <>
      <Formik
        initialValues={{
          deliveryDate: dayjs(),
          suppliesFullName: "",
          quantity: 0,
          requirementType:"",
          //currency: this.props.user.currency,
          paymentDate:"",
          commissionAmount:"",
          lastUpdatedOn:"",
          //currency: this.props.user.currency,
          userId: props.userId,
          suppliesId: props.suppliesId,
          // shiftId: props.shiftId,
        }}
        // validationSchema={FormSchema}
        // onSubmit={(values, { resetForm }) => {
        //   props.addCommercialsForm(
        //     {
        //       ...values,
              

        //       // startDate: `${newStartDate}T${newStartTime}`,
        //     },
        //     // props.locationDetailsId
        //     // props.shiftId,//from headerPart
        //   );
        // }}
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
            <MainWrapper>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "50%",
                }}
              >
                     
                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Permanent</StyledLabel>        
                 
                  {/* <Field
                    name="requirementType"
                    // label=""
                    type="number"
                    // isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  /> */}
                 </FlexContainer>
                </div>
                <Spacer/>

                <div style={{ width: "47%" }}>
                      <FlexContainer justifyContent="space-between">
                      <StyledLabel>Type</StyledLabel>
                      <Switch                                           
                        //checked={this.state.billing}
                        //onChange={this.handlebilling}
                        checkedChildren="Percentage"
                        unCheckedChildren="Amount"
                      />
                      </FlexContainer>
                      </div>
                      <Spacer/>
                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Currency</StyledLabel>   
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                        // defaultValue={{
                        //   value: this.props.user.currency,
                        // }}
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />
                      </FlexContainer>
                    </div>
                
                      <Spacer/>
                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Payment after (in days)</StyledLabel>
                  <Field
                    name="paymentDate"
                    //label=""
                    type="number"
                    // isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </FlexContainer>
                </div>
                <Spacer />
                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Last Updated On</StyledLabel>
                  
                  {/* <Field
                    name="lastUpdatedOn"
                    //label=""
                    type="number"
                    // isColumn
                    width={"100%"}
                    //component={InputComponent}
                    //inlineLabel
                  /> */}
                  </FlexContainer>
                </div>

                
                <Spacer style={{ marginTop: "1.25em" }} />
                <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="Update"
                  // icon={<PoweroffOutlined />}
                  //Loading={addingCandidate}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/*                     
                    Create */}
                </Button>
              </FlexContainer>
                
               
               
                {/* <div
                  style={{                   
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   loading={props.addingExperienceForm}
                  >Add
                </Button>*/}
                </div>
                
              </div>
            </MainWrapper>
          </Form>
        )}
      </Formik>
      {/* <CommercialsTable/> */}
    </>   
  );
}

const mapStateToProps = ({customer,auth}) => ({
  commercialsByCustomerId:customer.commercialsByCustomerId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCommercialsByCustomerId
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommercialsForm);