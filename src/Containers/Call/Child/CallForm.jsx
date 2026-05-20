import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MicIcon from '@mui/icons-material/Mic';
import { getAllSalesList } from "../../Opportunity/OpportunityAction"
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip } from "antd";
import { Formik, Form, Field,FastField } from "formik";
import * as Yup from "yup";
import { handleCallNotesModal } from "../CallAction";
import dayjs from "dayjs";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";

import {
  addCall,
  updateCall,
  deleteCall,
  handleCallModal,
} from "../CallAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { getEmployeelist } from "../../Employees/EmployeeAction";
import { setClearbitCandidateData } from "../../Candidate/CandidateAction";

const ButtonGroup = Button.Group;

const green = "#39D1B4";
const yellow = "#FFD712";
/**
 *
 * yup validation scheme for creating a call
 */
const CallSchema = Yup.object().shape({
  callType: Yup.string().required("Select call type"),
  callCategory: Yup.string().required("Input required !"),

  startDate: Yup.string()
    .nullable()
    .required("Input required !"),

  startTime: Yup.string()
    .nullable()
    .required("Input required !"),
  endTime: Yup.string()
    .nullable()
    .required("Input required !"),

  // reminder:Yup.string()
  // .nullable()
  // .required("Input required !"),
});

class CallForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.selectedCall
        ? this.props.selectedCall.callCategory
        : "New",
      selected: this.props.selectedCall
        ? this.props.selectedCall.callCategory
        : "New",
      Type: this.props.selectedCall
        ? this.props.selectedCall.callType
        : "Inbound",
      selectedType: this.props.selectedCall
        ? this.props.selectedCall.callType
        : "Inbound",
      reminder: true,
    };
  }
  handleCategoryChange = (data) => {
    debugger;
    this.setState({ category: data });
    this.setState({ selected: data });
  };

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };

  handleReminderChange = (checked) => {
    this.setState({
      reminder: checked,
    });
  };

  handleCallback = (resetForm) => {
    const { handleChooserModal, handleCallModal, callback } = this.props;
    handleChooserModal(false);
    handleCallModal(false);
    callback && callback();
    // resetForm();
  };

  componentDidMount() {
    this.props.getEmployeelist();
    this.props.getAllSalesList();
  }
  // componentDidMount() {
  //   this.props.getEmployeelist();
  //   // props.getsharePartnerUsers();
  // }

  render() {
    // employeeOption.map(
    //   (employees) => {
    //     if (!this.props.employes) return [];
    //     return (
    //       this.props.employees.length &&
    //       this.props.employees.map((user) => {
    //         return {
    //           label: `${user.firstName} ${user.lastName} ` || "",
    //           value: user.userId || "",
    //         };
    //       })
    //     );
    //   },
    //   [this.props.employees]
    // );
    const{
      // addNotesSpeechModal,
      handleCallNotesModal

    } = this.props;
    const employeesData = this.props.employees.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    const salesNameOption = this.props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    console.log(this.state.category);
    const {
      user: { userId, firstName, middleName, fullName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingCall,
      deleteCall,
      deletingCall,
      addCall,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      employeeId,
      defaultAccounts,
      updateCall,
      updatingCall,
      defaultOpportunities,
    } = this.props;
    console.log(defaultAccounts);
    console.log(defaultContacts);
    if (this.props.selectedCall) {
      var data = this.props.selectedCall.callCategory === "New" ? false : true;
    }

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillCall
              : {
                callType: this.state.Type,
                callCategory: this.state.category,

                callPurpose: "",
                fullName: "",
                timeZone: timeZone,
                remindInd: this.state.reminder ? true : false,
                remindTime: "",
                candidate: "",
                completionInd: "Incomplete",
                startDate: startDate || dayjs(),
                startTime: startDate || null,
                endDate: endDate || null,
                endTime: endDate || null,

                callResult: "",
                callDescription: "",

                ownerIds: [],
                assignedTo: userId ? userId : "",
                contactId:
                  defaultContacts && defaultContacts.length
                    ? defaultContacts[0].value
                    : "",
            

              }
          }
          validationSchema={CallSchema}
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
            // let newEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]");

            let testVal = {
              ...values,
              callCategory: this.state.category,
              callType: this.state.Type,
              contactId:
                defaultContacts && defaultContacts.length
                  ? defaultContacts[0].value
                  : "",
            
              // assignedTo: "",

              // ownerIds: userId === userId ? [userId] : [],

              startDate: `${newStartDate}T${newStartTime}`,
              endDate: `${newEndDate}T${newEndTime}`,

              startTime: 0,
              endTime: 0,
            };
            isEditing
              ? updateCall(
                prefillCall.callId,
                {
                  ...values,
                  callCategory: this.state.category,
                  callType: this.state.Type,

                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                },
                () => this.handleCallback(resetForm)
              )
              : addCall(testVal, () => this.handleCallback(resetForm));
            // !isEditing && resetForm();
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
                  <FlexContainer
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >

                    <div style={{ width: "30%" }}>
                      <Spacer style={{ marginTop: "1.25em" }} />
                      <StyledLabel>
                        {/* Type */}
                        <FormattedMessage id="app.type" defaultMessage="Type" />
                      </StyledLabel>
                      {/* <Spacer /> */}
                      <FlexContainer
                        justifyContent="space-between"
                      >
                        {/* <Tooltip title="Inbound"> */}
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.inbound"
                              defaultMessage="Inbound"
                            />
                          }
                        >
                          <div
                            onClick={() => this.handleTypeChange("Inbound")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                        </Tooltip>

                        {/* <Tooltip title="Outbound"> */}
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.outbound"
                              defaultMessage="Outbound"
                            />
                          }
                        >
                          <div
                            onClick={() => this.handleTypeChange("Outbound")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </div>
                        </Tooltip>

                        {/* <Tooltip title="Conference"> */}
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.conference"
                              defaultMessage="Conference"
                            />
                          }
                        >
                          <div
                            onClick={() => this.handleTypeChange("Conference")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Conference"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-network-wired"></i>
                          </div>
                        </Tooltip>
                      </FlexContainer>
                    </div>

                    <div style={{ width: "55%" }}>
                      <Spacer style={{ marginTop: "1.25em" }} />
                      <StyledLabel>
                        {/* Category */}
                        <FormattedMessage
                          id="app.category"
                          defaultMessage="Category"
                        />
                      </StyledLabel>
                      <Spacer />
                      <ButtonGroup>
                        <Button
                          onClick={() => this.handleCategoryChange("New")}
                          style={{
                            backgroundColor:
                              this.state.selected === "New"
                                ? "orange"
                                : "white",
                            color:
                              this.state.selected === "New" ? "white" : "black",
                          }}
                        >
                         
                          {/* New */}
                          <FormattedMessage id="app.new" defaultMessage="New" />
                        </Button>
                        <Button
                          onClick={() => this.handleCategoryChange("Follow up")}
                          style={{
                            backgroundColor:
                              this.state.selected === "Follow up"
                                ? "orange"
                                : "white",
                            color:
                              this.state.selected === "Follow up"
                                ? "white"
                                : "black",
                          }}
                        >
                          {/* Follow up */}
                          <FormattedMessage
                            id="app.followup"
                            defaultMessage="Follow up"
                          />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </FlexContainer>

                  <Spacer style={{ marginTop: "1.25em" }} />
                 

              <FlexContainer justifyContent="space-between">
                    <div
                      style={{
                        width: "22%",
                        fontWeight: "bold",
                       // marginTop: "2px",
                      }}
                    >
                    {/* Mode */}
                    <FormattedMessage
                                        id="app.mode"
                                        defaultMessage="Mode"
                                      />
                      <Switch
                        style={{                      
                        marginLeft: "0.3125em"
                       }}
                       name="mode"
                        //  onChange={this.handleWhatsApp}
                        // checked={this.state.whatsapp}
                        checkedChildren="Audio"
                        unCheckedChildren="Video"
                      />
                    </div>
                  
                       <div style={{ width: "34%" }}>
                      <FastField
                        name="modeType"
                        label={<FormattedMessage
                                        id="app.channel"
                                        defaultMessage="Channel"
                                      />}
                        isColumn
                        // margintop={"0em"}
                        options={[
                             "Zoom Call",
                              "Whatsapp call",
                              "Google Meet",
                              "Others",
                        ]}
                        component={SelectComponent}
                        inlineLabel
                        className="w-full"
    style={{ width: "100%" }}
                      />
                    </div>
                      <div style={{ width: "40%", }}>
                      <FastField
                        type="text"
                        name="modeLink"
                        placeholder="Link"
                        // label={
                        //   <FormattedMessage
                        //     id="app.mobileNo"
                        //     defaultMessage="Mobile #"
                        //   />
                        // }
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        style={{ flexBasis: "30%" }}
                        isColumn
                      />
                    </div>
                        
                        
                   
                  
                  </FlexContainer>
                  <Spacer />
                
                  <Field
                    isRequired
                    name="callPurpose"
                    // label="Topic"
                    label={
                      <FormattedMessage
                        id="app.subject"
                        defaultMessage="Subject"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="startDate"
                    // label="Date"
                    label={
                      <FormattedMessage id="app.date" defaultMessage="Date" />
                    }
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={values.startDate}
                    inlineLabel
                    style={{
                      width: "100%",
                    }}
                  />
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="startTime"
                        // label="Start Time"
                        label={
                          <FormattedMessage
                            id="app.starttime"
                            defaultMessage="Start Time"
                          />
                        }
                        component={TimePicker}
                        isRequired
                        isColumn
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="endTime"
                        // label="End Time"
                        label={
                          <FormattedMessage
                            id="app.endtime"
                            defaultMessage="End Time"
                          />
                        }
                        component={TimePicker}
                        use12Hours
                        isRequired
                        isColumn
                        value={values.endTime}
                        // inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer style={{ marginTop: "1.25em" }} />

                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    name="timeZone"
                    isColumnWithoutNoCreate
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
                  {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span>
                          <b>
                            <FormattedMessage
                              id="app.thiscalloccursinthepast!"
                              defaultMessage="This Call occurs in the past !"
                            />
                          </b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span>
                          <b>
                            {" "}
                            <FormattedMessage
                              id="app.thiscalloccursinthepast!"
                              defaultMessage="This Call occurs in the past !"
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
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="assignedTo"
                    selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    // component={SearchSelect}
                    isColumn
                    // value={values.employeeId}
                    // defaultValue={{
                    //   label: `${firstName || ""} ${middleName ||
                    //     ""} ${lastName || ""}`,
                    //   value: employeeId,
                    // }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    inlineLabel
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    // name="employeeId"
                    name="ownerIds"
                    // label="Include"
                    label={
                      <FormattedMessage
                        id="app.include"
                        defaultMessage="Include"
                      />
                    }
                    mode
                    // isRequired
                    // width={"100%"}
                    placeholder="Select"
                     className="w-full"
    style={{ width: "100%" }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    value={values.ownerIds}
                    defaultValue={{
                      label: `${fullName || ""} `,
                      value: employeeId,
                    }}
                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="contactId"
                    selectType="contactList"
                    isColumnWithoutNoCreate
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    value={values.contactId}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel

                  />
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                  disabled={true}
                 
                    name="candidateId"
                        selectType="candidateList"
                   // type="text"
                    label="Talent"
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={this.props.setClearbitCandidateData}
                    component={SearchSelect}
                    inlineLabel
                   
                  />  
                  {/* <Field
                    name="employeeId"
                    selectType="employee"
                    label="Partner Contact"
                    component={SearchSelect}
                    margintop={"4px"}
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
                  <Spacer style={{ marginTop: "1.25em" }} /> */}
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <Field
                    name="callDescription"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                     
                    }
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  />
                        <Tooltip title="Voice to Text">
                      <span                       
                   onClick={()=>handleCallNotesModal(true)}>
                  {/* <FontAwesomeIcon
                   icon={solid("microphone")}/> */}
                   <MicIcon/>
                  
                  </span>
                  </Tooltip>
                      
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%", fontWeight: "bold" }}>
                      <FlexContainer justifyContent="space-between">
                        <div>
                          <StyledLabel>
                            {/* Set Reminder */}
                             <FormattedMessage id="app.setReminder" defaultMessage="Set Reminder" />
                            </StyledLabel>
                        </div>
                        <div>

                          <Switch
                            // style={{ width: "60px" }}
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
                              <FormattedMessage id="app.reminder" defaultMessage="Reminder" />
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
                            defaultValue="30 min"
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
                      // title="Do you want to delete?"
                      title={
                        <FormattedMessage
                          id="app.doyouwanttodelete?"
                          defaultMessage="Do you want to delete?"
                        />
                      }
                      onConfirm={() => deleteCall(prefillCall.callId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingCall}
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
                  Loading={isEditing ? updatingCall : addingCall}
                >
                  {isEditing ? (
                    "Update"
                  ) : (
                    // "Create"
                    <FormattedMessage id="app.create" defaultMessage="Create" />
                  )}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

{/* <CallNotesModal
candidate={this.props.candidate}
handleCallNotesModal={handleCallNotesModal}
addNotesSpeechModal={addNotesSpeechModal}
//addCandidateSpeechModal={addCandidateSpeechModal}
//addCandidateSpeechModal:candidate.addCandidateSpeechModal,
/> */}
const mapStateToProps = ({ auth, call, employee, opportunity, candidate }) => ({
  addingCall: call.addingCall,
  updatingCall: call.updatingCall,
  user: auth.userDetails,
  deletingCall: call.deleteCall,
  sales: opportunity.sales,
  employees: employee.employees,
  addNotesSpeechModal:call.addNotesSpeechModal,
  candidateId: candidate.clearbitCandidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCall,
      handleChooserModal,
      getAllSalesList,
      updateCall,
      handleCallModal,
      deleteCall,
      getEmployeelist,
      setClearbitCandidateData,
      handleCallNotesModal,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallForm);
