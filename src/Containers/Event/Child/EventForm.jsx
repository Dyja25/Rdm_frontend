import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";

import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray.jsx";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  addEvent,
  deleteEvent,
  updateEvent,
  handleEventModal,
} from "../EventAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { getEmployeelist } from "../../Employees/EmployeeAction";
import { getEvents } from "../../Settings/Event/EventAction";
import CandidateClearbit from "../../../Components/Forms/Autocomplete/CandidateClearbit";
import { setClearbitCandidateData } from "../../Candidate/CandidateAction";

/**
 * yup validation scheme for creating a opportunity
 */
const EventSchema = Yup.object().shape({
  eventTypeId: Yup.string().required("Select event type"),
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

  // remindTime:Yup.string()
  // .nullable()
  // .required("Input required !"),

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

class EventForm extends Component {
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
    this.props.getEmployeelist();
    this.props.getEvents();
  }

  render() {
    const employeesData = this.props.employees.map((item) => {
      return {
        label: `${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""}`,
        value: item.employeeId,
      };
    });
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
      eventType,
      updateEvent,
      updatingEvent,
      defaultOpportunities,
      creatorId,
      employeeId,
    } = this.props;
    console.log(defaultAccounts);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            isEditing
              ? prefillEvent
              : {
                eventType: "",
                eventTypeId: "",
                eventSubject: "",
                eventVenue: "",
                remindAt: "",
                notificationEmail: false,
                eventDescription: "",
                timeZone: timeZone,
                startDate: startDate || dayjs(),
                startTime: startDate || null,
                endDate: endDate || null,
                endTime: endDate || null,
                note: "",
                eventStatus: "",
                allDayInd: true,
              
                repeatStartDate: "",
                completionInd: "Incomplete",
                repeatEndDate: "",
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
                assignedTo: "",
                ownerIds:[],
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

            isEditing
              ? updateEvent(
                prefillEvent.eventId,
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
                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                },
                this.handleCallback
              )
              : addEvent(
                {
                  ...values,
                  assignedTo: userId === userId ? userId : "",
                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                  remindInd: this.state.reminder ? true : false,
                },
                this.handleCallback
              );
            !isEditing && resetForm();
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
                  <Spacer style={{ marginTop: "1.25em" }} />
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
                    value={values.eventTypeId}
                    isColumn
                    // options={["Meeting", "Conference", "Webinar", "Workshop"]}
                    inlineLabel

                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
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
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <div>
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
                            width: "100%",
                          }}
                        />
                      </div>
                    </FlexContainer>
                  </div>
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
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>

                  {/* <Spacer style={{ marginBottom: "0.9375em" }} /> */}
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
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="eventDescription"
                    //label="Notes"
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
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span>
                          <b>
                            <FormattedMessage
                        id="app.thiseventoccursinthepast!"
                        defaultMessage="This Event occurs in the past"
                      /></b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span >
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
                  <Spacer />
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
                      isColumn
                      value={values.employeeId}
                      defaultValue={{
                        label: `${firstName || ""} ${middleName ||
                          ""} ${lastName || ""}`,
                        value: employeeId,
                      }}
                      inlineLabel

                    />
                  )}
                  <Spacer />
                  <Field
                    disabled={true}
                 
                    name="candidateId"
                        selectType="candidateList"
                   // type="text"
                    label="Talent"
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={this.props.setClearbitCandidateData}
                    component={CandidateClearbit}
                    inlineLabel
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
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
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%", fontWeight: "bold" }}>
                      <FlexContainer justifyContent="space-between">
                        <div>
                          <StyledLabel >
                            {/* Set Reminder */}
                            <FormattedMessage
                          id="app.setReminder"
                          defaultMessage="Set Reminder"
                        />
                             </StyledLabel>
                        </div>
                        <div>
                          {/* <FlexContainer justifyContent="space-between"> */}

                          <Switch
                            onChange={this.handleReminderChange}
                            checked={this.state.reminder}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                      </FlexContainer>
                    </div>
                    <div style={{ width: "30%", fontWeight: "bold" }}>
                      {this.state.reminder ? (
                        <div>
                          <Field
                            // isRequired
                            name="remindTime"
                            // label="Reminder"
                            label={
                              <FormattedMessage
                          id="app.reminder"
                          defaultMessage="Reminder"
                        />
                            }
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
                            className="w-full"
    style={{ width: "100%" }}
                          />
                        </div>

                      ) : null}
                    </div>
                  </FlexContainer>
                </div>
              </div>
              <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="flex-end">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteEvent(prefillEvent.eventId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingEvent}
                      >
                        {/* Delete */}

                        <FormattedMessage
                          id="app.delete"
                          defaultMessage="Delete"
                        />
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingEvent : addingEvent}
                >
                  {isEditing ? "Update" :
                    // "Create"
                    <FormattedMessage
                      id="app.create"
                      defaultMessage="Create"
                    />
                  }
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}


const mapStateToProps = ({ auth, event, employee, events, candidate }) => ({
  addingEvent: event.addingEvent,
  updatingEvent: event.updatingEvent,
  user: auth.userDetails,
  deletingEvent: event.deleteEvent,
  employees: employee.employees,
  events: events.events,
  candidateId: candidate.clearbitCandidate.candidateId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addEvent,
      deleteEvent,
      updateEvent,
      handleChooserModal,
      handleEventModal,
      getEmployeelist,
      getEvents,
      setClearbitCandidateData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
