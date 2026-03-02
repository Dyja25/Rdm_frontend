import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  Radio } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Spacer } from "../../../../Components/UI/Elements";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
// import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
// import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
// import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
// import { TimePicker } from "../../../../Components/Forms/Formik/TimePicker";
// import {
//     addEvent,
//     deleteEvent,
//     updateEvent,
//     handleEventModal,
// } from "../../EventAction";
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { addLeaves } from "../../LeavesAction";
// import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
// import { StyledPopconfirm } from "../../../../Components/UI/Antd";
/**
 * yup validation scheme for creating a opportunity
 */
const EventSchema = Yup.object().shape({
  eventType: Yup.string().required("Select event type"),
  eventSubject: Yup.string().required("This field is required !"),
  timeZone: Yup.string().required("Input required !"),
  // endDate: Yup.string()
  //   .nullable()
  //   .required("Input required !"),
  startTime: Yup.string()
    .nullable()
    .required("Input required !"),
  endTime: Yup.string()
    .nullable()
    .required("Input required !"),
  startDate: Yup.string()
    .nullable()
    .required("Input required !"),
  // association: Yup.object()
  //   .shape(
  //     {
  //       contactIds: Yup.string().when("accountIds", {
  //         is: (accountIds) => !accountIds,
  //         then: Yup.string().required("Contact or Company required"),
  //       }),
  //       accountIds: Yup.string().when("contactIds", {
  //         is: (contactIds) => !contactIds,
  //         then: Yup.string().required("Company or Contact required"),
  //       }),
  //     },
  //     ["contactIds", "accountIds"]
  //   )
  // .required(""),
});

class LeaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Account: false,
      Holiday: false,
      Travel: false,
      Project: false,
    };
  }
  handleProject = (checked) => {
    this.setState({ Project: checked });
  };
  handleAccount = (checked) => {
    this.setState({ Account: checked });
  };
  handleHoliday = (checked) => {
    this.setState({ Holiday: checked });
  };
  handleTravel = (checked) => {
    this.setState({ Travel: checked });
  };
  handleCallback = () => {
    const { handleChooserModal, handleEventModal, callback } = this.props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
  render() {
    const { prefillLeave, startDate, endDate, isEditing, addingLeaves } = this.props;

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillLeave
              : {
                startDate: startDate || dayjs(),

                endDate: endDate || dayjs(),

                employeeId: this.props.userId,

                reason: "",
                coverDetails: "",
              }
          }
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addLeaves(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.userId,

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
                    width: "100%",
                  }}
                >
                  {/* <Radio.Group name="radiogroup">
                                            <Radio
                                                value={this.state.Project}
                                                checked={this.state.Project}
                                                onChange={this.handleProject}
                                            >
                                                Project
                        </Radio>
                                            <Radio
                                                value={this.state.Travel}
                                                checked={this.state.Travel}
                                                onChange={this.handleTravel}
                                            >
                                                Travel
                        </Radio>
                                            <Radio
                                                value={this.state.Holiday}
                                                checked={this.state.Holiday}
                                                onChange={this.handleHoliday}
                                            >
                                                Holiday
                        </Radio>
                                            <Radio
                                                value={this.state.Account}
                                                checked={this.state.Account}
                                                onChange={this.handleAccount}
                                            >
                                                Account
                        </Radio>
                                        </Radio.Group> */}

                  <Spacer />
                  <FlexContainer
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"

                        // label="Start Date"
                        label={<FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />}
                        component={DatePicker}
                        // width="100%"
                        value={values.startDate}
                        isColumn
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />

                      <Spacer />
                    </div>

                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End Date "

                        label={<FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />}
                        isColumn
                        component={DatePicker}
                        value={values.endDate || values.startDate}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
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

                  <Field
                    name="coverDetails"
                    //label="Cover"
                    label={<FormattedMessage
                      id="app.coverDetails"
                      defaultMessage="Cover"
                    />}
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  <Spacer />
                  <Field
                    isRequired
                    name="reason"
                    //  / label="Reason"
                    label={<FormattedMessage
                      id="app.reason"
                      defaultMessage="Reason"
                    />}
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  />

                  <Spacer />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                &nbsp;
                <Button htmlType="submit" type="primary"
                  Loading={addingLeaves}>
                  Submit
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, leave }) => ({
  addingLeaves: leave.addingLeaves,
  // updatingEvent: event.updatingEvent,
  userId: auth.userDetails.userId,
  // deletingEvent: event.deleteEvent,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLeaves,
      // deleteEvent,
      // updateEvent,
      handleChooserModal,
      // handleEventModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveForm);
