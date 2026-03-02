import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../../../../Config/Auth";
import { Spacer } from "../../../../../../Components/UI/Elements";
import Clearbit from "../../../../../../Components/Forms/Autocomplete/Clearbit";
import LazySelect from "../../../../../../Components/Forms/Formik/LazySelect";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";

import ProgessiveImage from "../../../../../../Components/Utils/ProgressiveImage";
import { updateCustomerOpportunity } from "../../../../CustomerAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  currency: Yup.string().required("Currency needed!"),
});
class UpdateCustomerOpportunityForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };

  render() {
    const {
      updatingCustomerOpportunity,
      contactId,
      customerId,
      opportunityId,
      startDate,
      endDate,
      defaultCustomers,
      defaultContacts,
      name,
    } = this.props;
    console.log(opportunityId);
    return (
      <>
        <Formik
          initialValues={{
            opportunityName: this.props.setEditingCustomerOpportunity.opportunityName || "",
            // startDate: "",
            // endDate: "",
            startDate:dayjs(this.props.setEditingCustomerOpportunity.startDate) || "",
            endDate:this.props.setEditingCustomerOpportunity.endDate || null,
            endDate:dayjs(this.props.setEditingCustomerOpportunity.endDate) || "",
            proposalAmount: this.props.setEditingCustomerOpportunity.proposalAmount || "",
            currency:this.props.setEditingCustomerOpportunity.currency || "",
            orgId: this.props.organizationId,
            customerId: customerId ? customerId.value : "",
            contact: customerId ? customerId.value : "",
          }}
          validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);

            let timeZoneFirst = "GMT+05:30";

            let mytimeZone = timeZoneFirst.substring(4, 10);
            console.log(mytimeZone);

            var a = mytimeZone.split(":");
            console.log(a);
            var timeZoneminutes = +a[0] * 60 + +a[1];
            console.log(timeZoneminutes);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
            console.log(firstStartTime);

            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
            console.log(firstStartHours);

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
            console.log(timeEndPart);

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
            console.log(firstStartTimeSplit);

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
            console.log(minutes);

            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            console.log(finalStartTime);

            let newStartTime = `${finalStartTime}${timeEndPart}`;
            console.log(newStartTime);

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            console.log(hr);
            let mi = firstEndTimeminutes % 60;
            console.log(hr);
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
            console.log(finalEndTime);
            console.log(timeEndPart);
            console.log(`${finalEndTime}${timeEndPart}`);

            let newEndTime = `${finalEndTime}${timeEndPart}`;
            
            this.props.updateCustomerOpportunity(
              {
                ...values,
                // startDate: dayjs(values.startDate).toISOString(),
                // startDate: dayjs(),
                // endDate: dayjs(values.endDate).toISOString(),
                // endDate: dayjs(),
                // startDate: "",
                // endDate: "",
                // startDate: dayjs(values.startDate).toISOString(),
                // endDate: dayjs(values.endDate).toISOString(),
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                customerId: this.props.customerId,
                // orgId: this.props.organizationId,
                // userId: this.props.userId,
              },
              // this.props.userId,
               this.props.setEditingCustomerOpportunity.opportunityId,
             
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
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    //label="Name"

                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    isColumn
                   
                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        //label="Start "
                        label={
                          <FormattedMessage
                            id="app.startdate"
                            defaultMessage="Start Date"
                          />
                        }
                        component={DatePicker}
                        value={values.startDate}
                        isColumn
                        inlineLabel                       
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End Date"
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="End Date"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        // value={values.endDate}
                        value={values.endDate || values.startDate}
                        inlineLabel                       
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="proposalAmount"
                        //label="Proposal Amount"

                        label={
                          <FormattedMessage
                            id="app.proposalAmount"
                            defaultMessage="Proposal Amount"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}                       
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        // label="Currency"
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currency"
                        isRequired
                        component={SearchSelect}
                        flag={values.currency}
                        // options={Array.isArray(currency) ? currency : []}
                      />
                    </div>
                  </FlexContainer>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    selectType="customerList"
                    // label="Customer"

                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    // margintop={"4px"}
                    value={values.customerId}
                    isDisabled={defaultCustomers}
                    defaultValue={defaultCustomers ? defaultCustomers : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    selectType="contactOpportunityList"
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    // margintop={"4px"}
                    value={values.contactId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    // isDisabled={defaultContacts}
                    // defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updatingCustomerOpportunity}
                >
                  <FormattedMessage id="app.update" defaultMessage="Upsate" />
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
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  opportunityId:opportunity.opportunityId,
  updatingCustomerOpportunity: customer.updatingCustomerOpportunity,
  updatingCustomerOpportunityError: customer.updatingCustomerOpportunity,
  setEditingCustomerOpportunity:customer.setEditingCustomerOpportunity,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomerOpportunity,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCustomerOpportunityForm);