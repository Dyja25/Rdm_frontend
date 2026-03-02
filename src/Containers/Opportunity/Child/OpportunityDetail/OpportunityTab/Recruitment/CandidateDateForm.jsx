import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../../../../Config/Auth";
import { Spacer } from "../../../../../../Components/UI/Elements";
;
import {
    addCandidateDate
}
  from "../../../../OpportunityAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";

import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";


/**
 * yup validation scheme for creating a opportunity
 */


class CandidateDateForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

//   componentDidMount() {
//     this.props.getRecruiterName();
//     this.props.getAllSalesList();
//   }

  render() {

 



    const {
      user: { userId },
      candidateDate,
      onboardDate
     
    } = this.props;
    console.log("profile",this.props.profileId);
    return (
      <>
        <Formik
          initialValues={{
         onboardDate: onboardDate || dayjs(),
            onboardInd:true,
            profileId:this.props.profileId,

           
           


          }}
          
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);
            

           

            //let newStartDate = dayjs(values.date).format("YYYY-MM-DD");

            this.props.addCandidateDate(
              {
                ...values,
     onboardDate: dayjs(values.onboardDate).toISOString(),

                 
                
                // profileId:this.props.profileId,
                // onboardInd:true
                // startDate: dayjs(values.startDate).toISOString(),
                // endDate: dayjs(values.endDate).toISOString(),
                // startDate: `${newStartDate}T00:00:00Z`,
                // endDate: `${newEndDate}T00:00:00Z`,

                // orgId: this.props.organizationId,
                // userId: this.props.userId,
              },
            //   this.props.userId,
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
                    width: "45%",
                  }}
                >
  <Field
                    isRequired
                    name="onboardDate"
                    label="Start Date"
                    component={DatePicker}
                    value={values.onboardDate}
                    inlineLabel
                    isColumn
                    style={{
                      width: "100%",
                    }}
                  />

                
                 
                 
                  
                
                </div>
               
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={candidateDate}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, contact, customer }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    candidateDate:opportunity.candidateDate,
    // candidateRequirement:opportunity.candidateRequirement,
    // profileId:opportunity.candidateRequirement.profileId
    
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
        addCandidateDate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDateForm);
