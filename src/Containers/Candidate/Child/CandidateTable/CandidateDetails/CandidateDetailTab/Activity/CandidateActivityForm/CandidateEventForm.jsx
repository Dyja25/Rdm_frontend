import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Spacer } from "../../../../../../../../Components/UI/Elements";
import { getEvents } from "../../../../../../../Settings/Event/EventAction";
import SearchSelect from "../../../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../../../Components/Forms/Formik/InputComponent";

import { DatePicker } from "../../../../../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../../../../../Components/Forms/Formik/TimePicker";
import {
  addCandidateEvent,
  // deleteEvent,
  // updateEvent,
  // handleEventModal,
  getActivityListByCandidateId
} from "../../../../../../CandidateAction";

import { FlexContainer } from "../../../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";


class CandidateEventForm extends Component {
  handleCallback = (resetForm) => {
    const { callback } = this.props;
    this.props.getActivityListByCandidateId(this.props.candidateId);
    callback && callback();
    resetForm();
  };

  render() {
    const {
      user: {
        userId,
        firstName,
        middleName,
        lastName,
        // timeZone
      },
      isEditing,
      prefillEvent,
      addingCandidateevent,
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
      updatingEvent,
      defaultOpportunities,
      creatorId,
      addCandidateEvent,
    } = this.props;

    console.log(defaultAccounts);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            // isEditing
            //   ? prefillEvent
            //   : {
            eventType: "",
            eventSubject: "",
            startDate: startDate || null,
            startTime: startDate || null,
            endDate: endDate || null,
            endTime: endDate || null,
            eventDescription: "",
            // location: "",
            eventCandidateId: this.props.candidateId,
            // userId: this.props.userId,
            ownerIds: [this.props.userId],
            candidateId: this.props.candidateId,
            eventTypeId: "",
            // address: [
            //   {
            //     addressType: "",
            //     address1: "",
            //     address2: "",
            //     town: "",
            //     street: "",
            //     city: "",
            //     pinCode: "",
            //     country: "",
            //     latitude: "",
            //     longitude: "",
            //   },
            // ],
          }}
          // validationSchema={EventSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            // let timeZoneFirst = values.timeZone;
            // console.log(timeZone);

            // let mytimeZone = timeZoneFirst.substring(4, 10);
            // console.log(mytimeZone);
            // var a = mytimeZone.split(":");
            // console.log(a);
            // var timeZoneminutes = +a[0] * 60 + +a[1];
            // console.log(timeZoneminutes);
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

            var firstStartTimeminutes = minutes;
            //  - timeZoneminutes; // start time + time zone
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
            var firstEndTimeminutes = Math.abs(endMinutes);
            // - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            let mi = firstEndTimeminutes % 60;
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;

            let newEndTime = `${finalEndTime}${timeEndPart}`;

            // isEditing
            //   ? updateEvent(
            //       prefillEvent.eventId,
            //       {
            //         ...values,
            //         association: {
            //           ...values.association,
            //         },
            //         // startDate: `${newStartDate}T${newStartTime}`,
            //         // endDate: `${newEndDate}T${newEndTime}`,
            //         startTime: 0,
            //         endTime: 0,
            //       },
            //       this.handleCallback
            //     )
            //   : addEvent(
            //       {
            //         ...values,
            //         association: {
            //           ...values.association,

            //           ownerIds: userId === userId ? [userId] : [],
            //         },
            //         // startDate: `${newStartDate}T${newStartTime}`,
            //         // endDate: `${newEndDate}T${newEndTime}`,
            //         startTime: 0,
            //         endTime: 0,
            //       },
            //       this.handleCallback
            //     );
            // !isEditing && resetForm();
            this.props.addCandidateEvent(
              {
                ...values,
                // ownerIds: userId === userId ? [userId] : [],
                startDate: `${newStartDate}T${newStartTime}`,
                endDate: `${newEndDate}T${newEndTime}`,

                startTime: 0,
                endTime: 0,
              },
              this.props.userId,
              this.props.candidateId,

              () => this.handleCallback(resetForm)
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
             <Form className="form-background p-2 w-[99%]">
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
                    label="Type"
                    component={SearchSelect}
                    selectType="eventType"
                    value={values.eventTypeId}
                    isColumnWithoutNoCreate
                    isColumn
                    // options={["Meeting", "Conference", "Webinar", "Workshop"]}
                    inlineLabel
                  // defaultValue='low'
                  />
                  <Spacer />
                  <Field
                    isRequired
                    name="eventSubject"
                    // label="Topic"
                    label={ <FormattedMessage id="app.topic" defaultMessage="Topic" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        // label="Start"
                        label={ <FormattedMessage id="app.start" defaultMessage="Start" />}
                        isColumn
                        component={DatePicker}
                        value={values.startDate}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startTime"
                        // label="Start Time"
                        label={ <FormattedMessage id="app.starttime" defaultMessage="Start Time" />}
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                        style={{ width: "100%" }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginBottom: "15px" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={ <FormattedMessage id="app.end" defaultMessage="End" />}
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={dayjs("2015-01-01")}
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
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endTime"
                        // label="End Time"
                        label={ <FormattedMessage id="app.endtime" defaultMessage="End Time" />}
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                        style={{ width: "100%" }}
                      />
                    </div>
                  </FlexContainer>

                  {/* <Spacer style={{ marginBottom: "15px" }} /> */}
                  {/* <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    name="timeZone"
                    label="TimeZone "
                    selectType="timeZone"
                    isColumn
                    margintop={"4px"}
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                    style={{ flexBasis: "50%" }}
                  /> */}
                  {/* <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  /> */}
                  <Spacer />
                  {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Event occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Event occurs in the past !</b>
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
                  {/* {this.props.partnerLogin === "Yes" &&
                  this.props.department === "Partner" ? (
                    <Field
                      type="text"
                      name="association.ownerIds"
                      label="Assigned to"
                      isColumn
                      width={"100%"}
                      disabled
                      value={this.props.creatorName}
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "29px",
                        marginTop: "0px",
                      }}
                    />
                  ) : (
                    <Field
                      name="association.ownerIds"
                      selectType="user"
                      label="Assigned to"
                      component={SearchSelect}
                      isColumn
                      margintop={"4px"}
                      value={values.association.ownerIds}
                      defaultValue={{
                        label: `${firstName || ""} ${middleName ||
                          ""} ${lastName || ""}`,
                        value: userId,
                      }}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    />
                  )} */}

                  {/* <Spacer style={{ marginBottom: "45px" }} /> */}
                  <Field
                    name="eventDescription"
                    // label="Description"
                    label={ <FormattedMessage id="app.description" defaultMessage="Description" />}
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  />
                  {/* <Spacer />
                  <Field
                    name="location"
                    label="Location"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  /> */}
                </div>
              </div>
              {/* <Spacer /> */}
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
                        loading={deletingEvent}
                      >
                        Delete
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                // loading={isEditing ? updatingEvent : addingCandidateevent}
                >
                  {/* Create */}
                   <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/* {isEditing ? "Update" : "Create"} */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, candidate, events }) => ({
  addingCandidateevent: candidate.addingCandidateevent,
  // updatingEvent: account.updatingEvent,
  user: auth.userDetails,
  // deletingEvent: account.deleteEvent,
  userId: auth.userDetails.userId,
  events: events.events,
  ownerIds: auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCandidateEvent,
      // deleteEvent,
      // updateEvent,
      //   handleChooserModal,
      // handleEventModal,
      getEvents,
      getActivityListByCandidateId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateEventForm);
