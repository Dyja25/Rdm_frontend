import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import ButtonGroup from "antd/lib/button/button-group";
import Upload from "../../../Components/Forms/Formik/Upload";
import { Radio } from "antd";
import { addEmployee, setClearbitData } from "../EmployeeAction";
import Clearbit from "../../../Components/Forms/Autocomplete/Clearbit";
import ProgessiveImage from "../../../Components/Utils/ProgressiveImage";
import { base_url } from "../../../Config/Auth";
import * as Yup from "yup";
import { FlexContainer } from "../../../Components/UI/Layout";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import {getDesignations} from "../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const documentSchema = Yup.object().shape({});

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      workType: "employee",
    };
  }
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };
  radioClick = (c) => {
    this.setState({ workType: c });
  };
  render() {
    const { addEmployee, addingEmployee } = this.props;
    const { clearbit } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            salutation: "",
            firstName: "",
            lastName: "",
            emailId: "",
            countryDialCode: "",
            countryDialCode1: "",
            phoneNo: "",
            dateOfJoining: "",
            mobileNo: "",
            country: "",
            // currencyName: "",
            //designation: "",
            //department: "",
            designationTypeId:"",
            departmentId:"",
            level: "",
            workplace: "",
            employee_type: this.state.workType,
            job_type: this.state.active,
            reportingManager: this.props.userDetails.userId
              ? this.props.userDetails.userId
              : "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: "",
                latitude: "",
                longitude: "",
              },
            ],
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log({ ...values, job_type: this.state.active });
            this.props.addEmployee({
              ...values,
              job_type: this.state.active,
              employee_type: this.state.workType,
            });

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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    }}
                >
                  <FastField name="imageId" component={Upload} />

                  <FlexContainer>
                    <div style={{ width: "25%" }}>
                      <Field
                        name="salutation"
                        placeholder="Select"
                        component={SelectComponent}
                        options={["Mr", "Mrs", "Miss"]}
                        // label="Salutation"
                        label={<FormattedMessage
                          id="app.salutation"
                          defaultMessage="Salutation"
                        />}
                        isColumn
                        />
                    </div>
                    &nbsp;&nbsp;
                    <div style={{ width: "72%" }}>
                      <Field
                        isRequired
                        name="firstName"
                        type="text"
                        isColumn
                        width={"100%"}
                        // label="First Name"
                        label={<FormattedMessage
                          id="app.firstName"
                          defaultMessage="First Name"
                        />}
                        component={InputComponent}
                        inlineLabel
                       />                   
                       </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer>
                    <div style={{ width: "62%" }}>
                      {" "}
                      <Field
                        name="lastName"
                        type="text"
                        isColumn
                        width={"100%"}
                        //label="Last Name"
                        label={<FormattedMessage
                          id="app.lastName"
                          defaultMessage="Last Name"
                        />}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ width: "35%" }}>
                      {" "}
                      <Field
                        name="middleName"
                        type="text"
                        isColumn
                        width={"100%"}
                        //label="Middle Name"
                        label={<FormattedMessage
                          id="app.middleName"
                          defaultMessage="Middle Name"
                        />}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <div>
                    <Field
                      isRequired
                      name="emailId"
                      type="text"
                      isColumn
                      width={"100%"}
                      // label="Email"
                      label={<FormattedMessage
                        id="app.emailId"
                        defaultMessage="Email"
                      />}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "58%" }}>
                      <Field
                        isRequired
                        name="country"
                        isColumnWithoutNoCreate
                        //label="Country"
                        label={<FormattedMessage
                          id="app.country"
                          defaultMessage="Country"
                        />}
                        isColumn
                        // defaultValue={{
                        //   value: this.props.user.currency,
                        // }}
                        selectType="country"
                        placeholder="Country"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "37%" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                       
                        label={<FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />}
                  
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                        // options={Array.isArray(currency) ? currency : []}
                      
                      />
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <Field
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={<FormattedMessage
                          id="app.countryDialCode"
                          defaultMessage="Mobile #"
                        />}
                        isColumn
                       
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "70%" }}>
                      <Field
                        type="text"
                        name="mobileNo"
                        // label={<FormattedMessage
                        //   id="app.mobileNo"
                        //   defaultMessage="Mobile #"
                        // />}
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                         />
                    </div>
                  </FlexContainer>
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <Field
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        //label="Work #"
                        label={<FormattedMessage
                          id="app.countryDialCode1"
                          defaultMessage="Work #"
                        />}
                        isColumn
                      
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "70%" }}>
                      <Field
                        type="text"
                        name="phoneNo"
                        placeholder="Mobile #"
                        // label={<FormattedMessage
                        //   id="app.phoneNo"
                        //   defaultMessage="Phone No"
                        // />}
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        />
                    </div>
                  </FlexContainer>
                  <Spacer />

                  <div style={{ width: "100%" }}>
                    <StyledLabel><FormattedMessage
                      id="app.dateofjoining"
                      defaultMessage=" Date Of Joining"
                    />
                      {/* Date Of Joining */}
                    </StyledLabel>
                    <Field
                      isRequired
                      name="dateOfJoining"
                      label={<FormattedMessage
                        id="app.dateOfJoining"
                        defaultMessage="Date of Joining"
                      />}
                      isColumn
                      component={DatePicker}
                      defaultValue={dayjs("2020-01-01")}
                       style={{                
                        width: "100%",
                       }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    width: "45%",
                     }}
                >
                  <Field
                    name="reportingManager"
                    isColumnWithoutNoCreate
                    selectType="user"
                    //label="Reporting Manager"
                    label={<FormattedMessage
                      id="app.reportingManager"
                      defaultMessage="Reporting Manager"
                    />}
                    component={SearchSelect}
                   
                    isColumn
                   // value={values.reportingManager}
                    // defaultValue={{
                    //   label: `${this.props.userDetails.fullName || ""} `,
                    //   value: this.props.userDetails.userId,
                    // }}
                    inlineLabel
                   />
                   <Spacer style={{ marginTop: "1.5625em" }} />
                  <Field
                    name="designationTypeId"
                    //label="Designation"
                    label={<FormattedMessage
                      id="app.designation"
                      defaultMessage="Designation"
                    />}
                    isColumnWithoutNoCreate
                    component={SearchSelect}
                    value={values.designationTypeId}
                    width={"100%"}
                    isColumn
                    selectType="designationType"
                     />
                  <Spacer />

                  {/* <FastField
                      name="department"
                      type="text"
                      label="Function"
                      options={["Hr"]}
                      component={SelectComponent}
                      inlineLabel
                      className="field"
                      isColumn
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
 
                      }}
                    /> */}

                  <Field
                    name="departmentId"
                    // label="Function"
                    label={<FormattedMessage
                      id="app.department"
                      defaultMessage="Department"
                    />}
                    // placeholder="Select"
                    // optionLabel="departmentName"
                    // optionValue="departmentName"
                    // url={`${base_url}/department`}
                    // component={LazySelect}
                    isColumnWithoutNoCreate
                    component={SearchSelect}
                    value={values.departmentId}
                    selectType="departmentName"
                    isColumn
                    inlineLabel
                    />
                  <Spacer />

                  <FastField
                    name="level"
                    type="level"
                    // label="Level"
                    label={<FormattedMessage
                      id="app.level"
                      defaultMessage="Level"
                    />}
                    options={["L1", "L2", "L3"]}
                    component={SelectComponent}
                    inlineLabel
                    className="field w-[80px]"
                    isColumn
                    />
                <Spacer style={{ marginTop: "1.5625em" }} />
                  <Field
                    name="workplace"
                    // label="Work place"
                    label={<FormattedMessage
                      id="app.workplace"
                      defaultMessage="Work place"
                    />}
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                     />
                   <Spacer style={{ marginTop: "1.5625em" }} />
                  <div>
                    <StyledLabel>
                      <FormattedMessage
                        id="app.jobtype"
                        defaultMessage="Job Type"
                      />
                      {/* Job Type */}

                    </StyledLabel>
                    <ButtonGroup name="job_type">
                      <StatusIcon
                        color="blue"
                        type="Full Time"
                        iconType="fa-hourglass-start"
                        tooltip="Full Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Full Time")}
                      />

                      <StatusIcon
                        type="Part Time"
                        name="icon1"
                        iconType="fa-hourglass-half"
                        tooltip="Part Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Part Time")}
                      />
                    </ButtonGroup>
                  </div>
                  <Spacer />
                  <div>
                    <StyledLabel><FormattedMessage
                      id="app.employeetype"
                      defaultMessage="Employee Type"
                    />
                      {/* Employee Type */}
                    </StyledLabel>
                    <Spacer />
                    <Radio.Group
                      name="radiogroup"
                      defaultValue={this.state.workType}
                    >
                      <Radio
                        value={"Employee"}
                        onChange={() => this.radioClick("employee")}
                      >
                        Employee
                      </Radio>
                      &nbsp;&nbsp;
                      <Radio
                        value={"contractor"}
                        onChange={() => this.radioClick("contractor")}
                      >
                        Contractor
                      </Radio>
                      &nbsp;&nbsp;
                      <Radio
                        value={"intern"}
                        onChange={() => this.radioClick("intern")}
                      >
                        Intern
                      </Radio>
                      &nbsp;&nbsp;
                      {/* <Radio
                        value={"staff"}
                        onChange={() => this.radioClick("staff")}
                      >
                        Staff
                      </Radio>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Radio
                        value={"executive"}
                        onChange={() => this.radioClick("executive")}
                      >
                        Executives
                      </Radio>
                      &nbsp;&nbsp;
                      <Radio
                        value={"intern"}
                        onChange={() => this.radioClick("intern")}
                      >
                        Intern
                      </Radio>&nbsp;&nbsp; */}
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <Spacer style={{marginTop:"1.25em"}}/>
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEmployee}
                >
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

const mapStateToProps = ({ auth, employee,designations,departments }) => ({
  userDetails: auth.userDetails,
  addingEmployee: employee.addingEmployee,
  departmentId:departments.departmentId,
  designationTypeId:designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     addEmployee,
     getDesignations,
      getDepartments,
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
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
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
