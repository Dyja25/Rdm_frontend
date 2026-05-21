import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Switch } from "antd";
import { base_url } from "../../../Config/Auth";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Spacer } from "../../../Components/UI/Elements";

import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";

import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  // addTask,
  updateTask,

  handleTaskModal,
  // deleteTask,
} from "../TaskAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { StyledLabel } from "../../../Components/UI/Elements";
// import { getOppoStages } from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
// import { getEmployeelist } from "../../Employees/EmployeeAction";

/**
 * yup validation scheme for creating a opportunity
 */
// const TaskSchema = Yup.object().shape({
//   priority: Yup.string().required("Select Priority"),
//   taskSubject: Yup.string().required("This field is required !"),
//   taskStatus: Yup.string().required("This field is required !"),

//   timeZone: Yup.string().required("Input required !"),
//   startDate: Yup.string()
//     .nullable()
//     .required("Input required !"),

// });

class UpdateTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.setEditingTask
        ? this.props.setEditingTask.status
        : "To Start",
      priority: this.props.setEditingTask
        ? this.props.setEditingTask.priority
        : "High",

      Type: this.props.setEditingTask
        ? this.props.setEditingTask.type
        : "Email",
      selectedType: this.props.setEditingTask
        ? this.props.setEditingTask.type
        : "Email",
      reminder: true,
    };
  }

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  handleReminderChange = (checked) => {
    this.setState({
      reminder: checked,
    });
  };

  handleCallback = () => {
    const { handleChooserModal, handleTaskModal, callback } = this.props;
    handleChooserModal(false);
    handleTaskModal(false);
    callback && callback();
  };
  // componentDidMount() {
  //   this.props.getOppoStages();
  // }

  handleButtonClick = (type) => {
    this.setState({ priority: type });
    // alert(this.state.priority)
  };
  componentDidMount() {
    // this.props.getEmployeelist();
  }
  render() {
    const today = dayjs();
    var todayDate = new Date();
    console.log(today);
    const {
      user: { userId, firstName, middleName, lastName, timeZone },
      addingTask,
      isEditing,
      prefillTask,
      addTask,
      startDate,
      endDate,
      deleteTask,
      deletingTask,
      defaultContacts,
      ownerId,
      defaultAccounts,

      updatingTask,

      startTime,
      endTime,
      defaultOpportunities,
      // oppoStages,
      employeeId,
      taskTypeId
    } = this.props;
    // console.log(isEditing);
    // console.log(prefillTask);
    // console.log(addTask);
    // console.log(defaultContacts);

    // console.log(oppoStages);

    // function getStagesOptions(filterOptionKey, filterOptionValue) {
    //   console.log(filterOptionKey, filterOptionValue);
    //   const stagesOptions =
    //     oppoStages.length &&
    //     oppoStages
    //       .filter((option) => {
    //         //////debugger
    //         // console.log(option);
    //         // console.log(option.processId);
    //         // console.log(filterOptionValue[0]);
    //         if (option.opportunityId === filterOptionValue[0]) {
    //           return option;
    //         }
    //       })
    //       .map((option) => ({
    //         label: option.stageName || "",
    //         value: option.stageId,
    //       }));
    //   //////debugger

    //   return stagesOptions;
    // }

    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            // isEditing ? prefillTask : 
            {
              taskType: this.props.setEditingTask.taskType || "",
              taskName: this.props.setEditingTask.taskName || "",
              // remindAt: "",
              // notificationEmail: false,
              taskDescription: this.props.setEditingTask.taskDescription || "",
              timeZone: timeZone,
              // taskClosureDate: "",
              startDate: dayjs(this.props.setEditingTask.startDate),
              endDate: dayjs(this.props.setEditingTask.endDate),
              taskStatus: this.state.active,
              // userId: this.props.userId,
              priority: this.state.priority,
              unit: this.props.setEditingTask.unit || "",
              unitValue: this.props.setEditingTask.unitValue || "",
              department: this.props.setEditingTask.department || "",
              remindInd: this.state.reminder ? true : false,
              remindTime: this.props.setEditingTask.remindTime || "",
              level: this.props.setEditingTask.level || "",
              repeatInd: false,
              repeatType: this.props.setEditingTask.repeatType || "",
              repeatStartDate: this.props.setEditingTask.repeatStartDate || "",
              repeatEndDate: this.props.setEditingTask.repeatEndDate || "",
              ownerIds: [],
              startTime: startDate || null,
              endTime: endDate || null,
              employeesId: [],
              candidateId: this.props.setEditingTask.candidateId || "",
              taskTypeId: this.props.setEditingTask.taskTypeId || "",
            }
          }
          // validationSchema={TaskSchema}
          onSubmit={(values, { resetForm }) => {
            ////debugger;
            console.log(values);
            console.log(values.startDate);
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

            // isEditing? 
            // updateTask
            this.props.updateTask
              (
                // prefillTask.taskId,
                this.props.setEditingTask.taskId,
                {
                  ...values,
                  taskType: this.state.Type,
                  taskStatus: this.state.active,
                  priority: this.state.priority,
                  taskStatus: this.state.active,
                  taskType: this.state.Type,
                  priority: this.state.priority,
                  ownerIds: userId === userId ? [userId] : [],
                  startDate: dayjs(values.startDate).toISOString(),
                  endDate: dayjs(values.endDate).toISOString(),
                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                },
                this.handleCallback

              );
            resetForm();
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "65%" }}>
                      <Field
                        isRequired
                        name="taskName"
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel
                        style={{
                          flexBasis: "60%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                        }}
                      />
                    </div>

                    <div style={{ width: "30%" }}>
                      <StyledLabel>
                        <FormattedMessage
                          id="app.status"
                          defaultMessage="Status"
                        />
                        {/* Status */}
                      </StyledLabel>

                      <div style={{ width: "100%" }}>
                        <ButtonGroup>
                          <StatusIcon
                            color="blue"
                            type="To Start"
                            iconType="fa-hourglass-start"
                            // tooltip="To Start"
                            tooltipTitle={
                              <FormattedMessage
                                id="app.tostart"
                                defaultMessage="To Start"
                              />
                            }
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("To Start")}
                          />

                          <StatusIcon
                            type="In Progress"
                            iconType="fa-hourglass-half"
                            // tooltip="In Progress"
                            tooltipTitle={
                              <FormattedMessage
                                id="app.inprogress"
                                defaultMessage="In Progress"
                              />
                            }
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("In Progress")}
                          />

                          <StatusIcon
                            type="Completed"
                            iconType="fa-hourglass"
                            // tooltip="Completed"
                            tooltipTitle={
                              <FormattedMessage
                                id="app.completed"
                                defaultMessage="Completed"
                              />
                            }
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("Completed")}
                          //  status={item.taskStatus}
                          //  onClick={() =>
                          //    patchTask(item.taskId, { ...item, taskStatus: "Completed" })
                          //  }
                          />
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                  <Spacer />
                  <FlexContainer
                    justifyContent="spcae-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "45%" }}>
                      <FlexContainer
                        justifyContent="spcae-between"
                        style={{ width: "100%" }}
                      >
                        <div style={{ width: "100%" }}>
                          <StyledLabel>
                            {/* Priority */}

                            <FormattedMessage
                              id="app.priority"
                              defaultMessage="Priority"
                            />

                          </StyledLabel>

                          <FlexContainer>
                            <Tooltip
                              //title="High"
                              title={
                                <FormattedMessage
                                  id="app.high"
                                  defaultMessage="High"
                                />
                              }
                            >
                              <Button
                               // type="primary"
                                shape="circle"
                                onClick={() => this.handleButtonClick("High")}
                                style={{
                                  borderRadius: "50%",
                                      height: "2.1875em",
                                      width: "2.1875em",
                                  backgroundColor:
                                    this.state.priority === "High"
                                      ? "red"
                                      : "white",
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip
                              //title="Medium"
                              title={
                                <FormattedMessage
                                  id="app.medium"
                                  defaultMessage="Medium"
                                />
                              }
                            >
                              <Button
                               // type="primary"
                                shape="circle"
                                onClick={() => this.handleButtonClick("Medium")}
                                style={{
                                  borderRadius: "50%",
                                      height: "2.1875em",
                                      width: "2.1875em",
                                  backgroundColor:
                                    this.state.priority === "Medium"
                                      ? "Orange"
                                      : "white",
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip //title="Low"
                              title={
                                <FormattedMessage
                                  id="app.low"
                                  defaultMessage="Low"
                                />
                              }
                            >
                              <Button
                               // type="primary"
                                shape="circle"
                                onClick={() => this.handleButtonClick("Low")}
                                style={{
                                  borderRadius: "50%",
                                      height: "2.1875em",
                                      width: "2.1875em",
                                  backgroundColor:
                                    this.state.priority === "Low"
                                      ? "teal"
                                      : "white",
                                }}
                              ></Button>
                            </Tooltip>
                          </FlexContainer>
                        </div>
                      </FlexContainer>
                    </div>

                    <div style={{ width: "55%" }}>
                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "100%" }}
                      >
                        <div style={{ width: "100%" }}>
                          {/* <StyledLabel> */}
                          {/* Type */}
                          {/* <FormattedMessage id="app.type" defaultMessage="Type" /> */}
                          {/* </StyledLabel> */}

                          <FlexContainer
                            justifyContent="space-between"
                            style={{ width: "100%" }}
                          >
                            {/* <Tooltip //title="Email"
                              title={
                                <FormattedMessage id="app.email" defaultMessage="Email" />
                              }
                            >
                              <div
                                onClick={() => this.handleTypeChange("Email")}
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Email"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="mail"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip //title="LinkedIn post"
                              title={
                                <FormattedMessage id="app." defaultMessage="" />
                              }
                            >
                              <div
                                onClick={() =>
                                  this.handleTypeChange("LinkedIn post")
                                }
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "LinkedIn post"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="linkedin"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip //title="Ticket"
                              title={
                                <FormattedMessage id="app." defaultMessage="" />
                              }
                            >
                              <div
                                onClick={() => this.handleTypeChange("Ticket")}
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Ticket"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="idcard"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip //title="Documentation"
                              title={
                                <FormattedMessage id="app." defaultMessage="" />
                              }
                            >
                              <div
                                onClick={() =>
                                  this.handleTypeChange("Documentation")
                                }
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Documentation"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="file"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip //title="Research"
                              title={
                                <FormattedMessage id="app." defaultMessage="" />
                              }
                            >
                              <div
                                onClick={() =>
                                  this.handleTypeChange("Research")
                                }
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Research"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="file-search"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip //title="Collaborate"
                              title={
                                <FormattedMessage id="app.collaborate" defaultMessage="Collaborate" />
                              }
                            >
                              <div
                                onClick={() =>
                                  this.handleTypeChange("Collaborate")
                                }
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Collaborate"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="wechat"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip //title="Other"
                              title={
                                <FormattedMessage id="app." defaultMessage="" />
                              }
                            >
                              <div
                                onClick={() => this.handleTypeChange("Other")}
                                style={{
                                  fontSize: "1.25em",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Other"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="more"></Icon>
                              </div>
                              </Tooltip> */}
                            <Field
                              isRequired
                              name="taskTypeId"
                              label="Type"
                              isColumnWithoutNoCreate
                              // placeholder="Search or Create"
                              // optionLabel="fullName"
                              // optionValue="fullName"
                              component={SearchSelect}
                              selectType="taskType"
                              isColumn
                              inlineLabel
                              style={{ flexBasis: "80%" }}
                            />
                          </FlexContainer>
                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>

                  {/* <div style={{ width: "50%" }}>
                      <Field
                        name="taskType"
                        label="Type"
                        isColumn
                        component={SelectComponent}
                        options={[
                          "Email",
                          "LinkedIn post",
                          "Documentation",
                          "Research",
                          "Collaborate",
                          "Others",
                        ]}
                        inlineLabel
                        style={{ flexBasis: "80%", marginTop: "0.25em" }}
                        // defaultValue='low'
                      />
                    </div>
                  </FlexContainer> */}

                  <Spacer />
                  <FlexContainer
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        // label="Start "
                        label={
                          <FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start"
                          />
                        }
                        component={DatePicker}
                        // width="100%"
                        value={values.startDate}
                        isColumn
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />

                      <Spacer />
                    </div>

                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        value={values.endDate || values.startDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
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
                    </div> */}
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
                          // isRequired
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
                    <Spacer style={{ marginBottom: "0.9375em" }} />
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
                          // isRequired
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
                  </FlexContainer>
                  <div>
                    <Spacer style={{ marginBottom: "1.125em" }} />
                    {/* <Field
                      isRequired
                      defaultValue={{ label: timeZone, value: userId }}
                      name="timeZone"
                      label="TimeZone "
                      isColumn
                      margintop={"0.25em"}
                      selectType="timeZone"
                      value={values.timeZone}
                      component={SearchSelect}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    /> */}

                    {values.startDate && (
                      <>
                        {dayjs(todayDate).isSameOrBefore(
                          dayjs(values.startDate)
                        ) ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <span style={{ marginLeft: 10 }}>
                              <b> <FormattedMessage
                              id="app.thistask"
                              defaultMessage="This Task occurs in the past !"
                            /></b>
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {/* <div>
                      <Spacer style={{ marginBottom: "2.8125em" }} />
                     
                    </div> */}
                </div>

                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="employeesId"
                    selectType="employee"
                    isColumnWithoutNoCreate
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
                  <Spacer />
                  <Field
                    isRequired
                    name="candidateId"
                    label="Talent"
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate                    
                    component={SearchSelect}
                    selectType="candidateList"
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <Field
                    name="taskDescription"
                    //label="Notes"
                    label={
                      <FormattedMessage
                        id="app.notes"
                        defaultMessage="Notes"
                      />
                    }
                    width={"21.875em"}
                    isColumn
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginTop: "0.25em",
                    }}
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
                      checkedChildren="Yes"
                      unCheckedChildren="No"
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
                          className="w-[120px]"
    // style={{ width: "100%" }}
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
                  Loading={updatingTask}
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

const mapStateToProps = ({ auth, task, employee }) => ({
  // addingTask: task.addingTask,
  user: auth.userDetails,
  updatingTask: task.updatingTask,

  // deletingTask: task.deleteTask,
  // oppoStages: settings.oppoStages,
  // employees: employee.employees,
  setEditingTask: task.setEditingTask,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addTask,
      handleChooserModal,
      updateTask,

      handleTaskModal,
      // deleteTask,
      // getEmployeelist,
      // getOppoStages,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "orange" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
