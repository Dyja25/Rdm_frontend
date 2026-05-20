import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { base_url } from "../../../Config/Auth";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import CandidateClearbit from "../../../Components/Forms/Autocomplete/CandidateClearbit";
import { setClearbitCandidateData } from "../../Candidate/CandidateAction";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";

import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray.jsx";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  //   addEvent,
  //   deleteEvent,
  updateEvent,
  handleEventModal,
} from "../EventAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
// import { getEmployeelist } from "../../Employees/EmployeeAction";
import { getEvents } from "../../Settings/Event/EventAction";
/**
 * yup validation scheme for creating a opportunity
 */
const EventSchema = Yup.object().shape({
  eventTypeId: Yup.string().required("Select event type"),
 // eventSubject: Yup.string().required("This field is required !"),
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

  // remindTime: Yup.string()
  //   .nullable()
  //   .required("Input required !"),

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

class UpdateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: true,
    };
  }
  handleCallback = () => {
    const { handleChooserModal, handleEventModal, callback } = this.props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
  handleReminderChange = (checked) => {
    this.setState({
      reminder: checked,
    });
  };
  componentDidMount() {
    // this.props.getEmployeelist();
  }

  render() {
    // const employeesData = this.props.employees.map((item) => {
    //   return {
    //     label: `${item.salutation || ""} ${item.firstName ||
    //       ""} ${item.middleName || ""} ${item.lastName || ""}`,
    //     value: item.employeeId,
    //   };
    // });
    const {
      user: { userId, firstName, middleName, lastName, timeZone },
      isEditing,
      prefillEvent,
      addingEvent,
      addEvent,
      deletingEvent,
      deleteEvent,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      updateEvent,
      updateEventById,
      defaultOpportunities,
      creatorId,
      employeeId,
      eventTypeId,
    } = this.props;

    console.log(defaultAccounts);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            // isEditing  ? prefillEvent : 
            {
              eventType: this.props.setEditingEvents.eventType || "",
              eventTypeId: this.props.setEditingEvents.eventTypeId || "",
              eventSubject: this.props.setEditingEvents.eventSubject || "",
              eventVenue: this.props.setEditingEvents.eventVenue || "",
              remindAt: this.props.setEditingEvents.remindAt || "",
              notificationEmail: false,
              eventDescription: this.props.setEditingEvents.eventDescription || "",
              timeZone: timeZone,
              startDate: startDate || dayjs(),
              startTime: startDate || null,
              endDate: endDate || null,
              endTime: endDate || null,
              note: this.props.setEditingEvents.note || "",
              eventStatus: this.props.setEditingEvents.eventStatus || "",
              allDayInd: true,
              candidateId: this.props.setEditingEvents.candidateId || "",
              repeatStartDate: this.props.setEditingEvents.repeatStartDate || "",
              completionInd: "Incomplete",
              repeatEndDate: this.props.setEditingEvents.repeatEndDate || "",
              repeat_ind: false,
              address: [
                {
                  addressType: "",
                  address1: "",
                  address2: "",
                  town: "",
                  street: "",
                  city: "",
                  houseNo:"",
                  postalCode: "",
                  country: "",
                  latitude: "",
                  longitude: "",
                },
              ],
              employeesIds: [],
              ownerIds: [],
            }
          }
          validationSchema={EventSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            let timeZoneFirst = values.timeZone;
            console.log(timeZone);

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

            let newStartTime = `${finalStartTime}${timeEndPart}`;

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            let mi = firstEndTimeminutes % 60;
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;

            let newEndTime = `${finalEndTime}${timeEndPart}`;

            // isEditing ? 
            this.props.updateEvent(
              //   prefillEvent.eventId,
              this.props.setEditingEvents.eventId,
              {
                ...values,
                // association: {
                //   ...values.association,
                // contactIds:
                //   defaultContacts === values.association.contactIds
                //     ? null
                //     : [values.association.contactIds],
                // opportunityIds:
                //   defaultOpportunities === values.opportunityIds
                //     ? null
                //     : [values.opportunityIds],
                // accountIds:
                //   defaultContacts &&
                //   defaultContacts.length &&
                //   defaultContacts[0].value ===
                //     values.association.accountIds
                //     ? []
                //     : [values.association.accountIds],
                // ownerIds:
                //   userId === values.association.ownerIds
                //     ? []
                //     : [values.association.ownerIds],
                // },
                assignedTo: userId === userId ? userId : "",
                startDate: `${newStartDate}T${newStartTime}`,
                endDate: `${newEndDate}T${newEndTime}`,
                startTime: 0,
                endTime: 0,
                remindInd: this.state.reminder ? true : false,
              },
              this.props.eventId,
              () => this.handleReset(resetForm)
            );
            //   : addEvent(
            //       {
            //         ...values,
            //         ownerIds: userId === userId ? [userId] : [],
            //         startDate: `${newStartDate}T${newStartTime}`,
            //         endDate: `${newEndDate}T${newEndTime}`,
            //         startTime: 0,
            //         endTime: 0,
            //         remindInd: this.state.reminder ? true : false,
            //       },
            // );
            // resetForm();
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
                    name="eventTypeId"
                    //label="Type"
                    label={
                      <FormattedMessage
                        id="app.type"
                        defaultMessage="Type"
                      />
                    }
                    component={SearchSelect}
                    isColumnWithoutNoCreate
                    selectType="eventType"
                    isColumn
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      // marginTop: "0.25em" 
                    }}
                  // defaultValue='low'
                  />
                  <Spacer />
                  <Field
                    isRequired
                    name="eventSubject"
                    //label="Topic"
                    label={
                      <FormattedMessage
                        id="app.subject"
                        defaultMessage="Subject"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      // height: "2.0625em",
                      // marginTop: "0.25em",
                    }}
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
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
                        isColumn
                        component={DatePicker}
                        value={values.startDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          // height: "2.0625em",
                          // marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startTime"
                        // label="Start Time"
                        label={
                          <FormattedMessage
                            id="app.starttime"
                            defaultMessage="Start Time"
                          />
                        }
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          // marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="End Date"
                          />
                        }
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={dayjs("2015-01-01")}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          // height: "2.0625em",
                          // marginTop: "0.25em",
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
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endTime"
                        //label="End Time"
                        label={
                          <FormattedMessage
                            id="app.endtime"
                            defaultMessage="End Time"
                          />
                        }
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          // marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    isColumnWithoutNoCreate
                    name="timeZone"
                    //label="TimeZone "
                    label={
                      <FormattedMessage
                        id="app.timezone"
                        defaultMessage="Time Zone"
                      />
                    }
                    selectType="timeZone"
                    isColumn
                    // margintop={"0.25em"}
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                    style={{ flexBasis: "50%" }}
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="eventDescription"
                    //label="Notes"yy
                    label={
                      <FormattedMessage
                        id="app.notes"
                        defaultMessage="Notes"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginTop: "0.25em",
                    }}
                  />
                  <Spacer />
                  {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>
                            {/* This Event occurs in the past ! */}
                            <FormattedMessage
                        id="app.thiseventoccursinthepast!"
                        defaultMessage="This Event occurs in the past"
                      />
                          </b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                         <b>
                            {/* This Event occurs in the past ! */}
                            <FormattedMessage
                        id="app.thiseventoccursinthepast!"
                        defaultMessage="This Event occurs in the past"
                      />
                          </b>
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  {this.props.partnerLogin === "Yes" &&
                    this.props.department === "Partner" ? (
                    <Field
                      type="text"
                      name="assignedTo"
                      isColumnWithoutNoCreate
                      // label="Assigned to"

                      label={
                        <FormattedMessage
                          id="app.assignedto"
                          defaultMessage="Assigned to"
                        />
                      }
                      isColumn
                      width={"100%"}
                      disabled
                      value={this.props.creatorName}
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        // marginTop: "0.25em",
                      }}
                    />
                  ) : (
                    <Field
                      name="employeesId"
                      isColumnWithoutNoCreate

                      selectType="employee"
                      // label="Assigned to"
                      label={
                        <FormattedMessage
                          id="app.assignedto"
                          defaultMessage="Assigned to"
                        />
                      }
                      component={SearchSelect}
                      // margintop={"4px"}
                      isColumn
                      value={values.employeeId}
                      defaultValue={{
                        label: `${firstName || ""} ${middleName ||
                          ""} ${lastName || ""}`,
                        value: employeeId,
                      }}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    />
                  )}
                  <Spacer />

                  <Field
                    disabled="true"
                    isRequired
                    name="candidateId"
                   // type="text"
                    label="Talent"
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={this.props.setClearbitCandidateData}
                    component={CandidateClearbit}
                    inlineLabel
                  />
                  <Spacer style={{ marginBottom: "2.8125em" }} />
                  <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <StyledLabel style={{
                    fontWeight: "bold",
                    marginTop: "1%"
                  }}>
                    {/* Set Reminder */}
                    <FormattedMessage
                                            id="app.setReminder"
                                            defaultMessage="Set Reminder"
                                          />
                  </StyledLabel>
                  <FlexContainer justifyContent="space-between">

                    <Switch
                      style={{ width: "60px" }}
                      onChange={this.handleReminderChange}
                      checked={this.state.reminder}
                      checkedChildren={<FormattedMessage
                                                  id="app.yes"
                                                  defaultMessage="Yes"
                                                />}
                      unCheckedChildren={<FormattedMessage
                                                  id="app.no"
                                                  defaultMessage="No"
                                                />}
                    />
                    {this.state.reminder ? (
                      <div
                        style={{
                          width: "53%",
                          marginTop: "-18px",
                          fontWeight: "bold",
                        }}
                      >
                        <Field
                          isRequired
                          name="remindTime"
                          // label="Reminder"
                            label={<FormattedMessage
                                                  id="app.reminder"
                                                  defaultMessage="Reminder"
                                                />}
                          width={"100%"}
                          component={SelectComponent}
                          options={[
                            "15 min",
                            "30 min",
                            "45 min",
                            "1 hour",
                            "2 hour",
                          ]}
                          defaultValue='30 min'
                          isColumn
                          inlineLabel
                        // style={{ flexBasis: "60%", width: "100%" }}
                        />
                      </div>

                    ) : null}
                  </FlexContainer>
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateEventById}
                >

                  <FormattedMessage
                    id="app.update"
                    defaultMessage="Update"
                  />
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}


const mapStateToProps = ({ auth, event, employee, events }) => ({
  //   addingEvent: event.addingEvent,
  updateEventById: event.updateEventById,
  user: auth.userDetails,
  setEditingEvents: event.setEditingEvents,
  //   deletingEvent: event.deleteEvent,
  //   employees: employee.employees,
  events: events.events,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   addEvent,
      //   deleteEvent,
      updateEvent,
      handleChooserModal,
      handleEventModal,
      setClearbitCandidateData,
      //   getEmployeelist,
      getEvents,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventForm);
