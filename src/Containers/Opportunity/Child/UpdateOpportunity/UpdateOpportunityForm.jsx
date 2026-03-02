import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { updateOpportunity,getAllSalesList } from "../../OpportunityAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */

const UpdateOpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  // startDate: Yup.date().required("Initiation date needed!"),
  // endDate: Yup.date().required("Closure date needed!"),
  // proposalAmount: Yup.number()
  //   .typeError("Value must be a number")
  //   .required("Value needed! "),
  currency: Yup.string().required("Currency needed!"),
  startDate: Yup.string().required("Input needed!"),
  endDate: Yup.string().required("Input needed!"),
  salesUserIds:Yup.string().required("Input needed!"),
});
class UpdateOpportunityForm extends Component {
  componentDidMount() {
   
    this.props.getAllSalesList();
  }
  render() {

    const salesNameOption = this.props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    const { updateOpportunityById, startDate, endDate } = this.props;

    return (
      <>
        <Formik
          initialValues={{
            opportunityName:
              this.props.setEditingOpportunity.opportunityName || "",
            startDate:
              dayjs(this.props.setEditingOpportunity.startDate) || dayjs(),
            endDate:
              dayjs(this.props.setEditingOpportunity.endDate) || dayjs(),
            // endDate: endDate || null,

            proposalAmount:
              this.props.setEditingOpportunity.proposalAmount || "",
            currency: this.props.setEditingOpportunity.currency || "",
            salesUserIds:this.props.setEditingOpportunity.salesUserIds || [],
            customerId: this.props.setEditingOpportunity.customerId || "",
            contactId: this.props.setEditingOpportunity.contactId || "",
          }}
          validationSchema={UpdateOpportunitySchema}
          onSubmit={(values, { resetForm }) => {
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

            this.props.updateOpportunity(
              {
                ...values,
                orgId: this.props.organizationId,
                // customerId: this.props.customerId,
                userId: this.props.userId,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
              },
              this.props.opportunityId
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
                    label={<FormattedMessage
                      id="app.opportunityName"
                      defaultMessage="Name"
                    />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        //label="Start Date"
                        label={<FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />}
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
                        label={<FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />}
                        isColumn
                        component={DatePicker}
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
                        // label="Proposal Amount"
                        label={<FormattedMessage
                          id="app.proposalAmount"
                          defaultMessage="Proposal Amount"
                        />}
                        isColumn
                        isRequired
                        width={"100%"}
                        component={InputComponent}
                      />
                    </div>
                    <div
                      style={{
                        height: "70%",
                        width: "50%",
                      }}
                    >
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        // label="currencyName"
                        label={<FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />}
                        width="100%"
                        isColumn
                        defaultValue={{
                          value: this.props.user.currency,
                        }}
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      // flag={values.currency}
                      // options={Array.isArray(currency) ? currency : []}
                      />
                      <Spacer />
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
                    isRequired
                    name="salesUserIds"
                    // selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    component={SelectComponent}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    // margintop={"0"}
                    isColumn
                    // value={values.employeeId}
                    // defaultValue={{
                    //   label: `${fullName}`,
                    //   value: item.employeeId,
                    // }}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer style={{ marginTop: "1.5625em" }} />
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    selectType="customerList"
                    //label="Customer"
                    label={<FormattedMessage
                      id="app.customer"
                      defaultMessage="Customer"
                    />}
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    value={values.customerId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                  />
                  <Spacer />
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    selectType="contactListFilter"
                    //label="Contact"
                    label={<FormattedMessage
                      id="app.contactId"
                      defaultMessage="Contact"
                    />}
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    value={values.contactId}
                    filterOption={{
                      filterType: "account",
                      filterValue: values.customerId
                    }}
                    inlineLabel
                  />
                  <Spacer />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateOpportunityById}
                >
                  <FormattedMessage
                    id="app.update"
                    defaultMessage="Update"
                  />
                  {/* Update */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  setEditingOpportunity: opportunity.setEditingOpportunity,
  updateOpportunityById: opportunity.updateOpportunityById,
  sales: opportunity.sales,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOpportunity,
      getAllSalesList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOpportunityForm);
