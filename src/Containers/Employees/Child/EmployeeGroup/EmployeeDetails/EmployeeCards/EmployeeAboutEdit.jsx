import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateEmployeeById } from "../../../../EmployeeAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Spacer } from "../../../../../../Components/UI/Elements";
import EditableInput from "../../../../../../Components/Forms/Edit/EditableInput";
// import EditSearchSelect from "../../../../Components/Forms/Edit/EditSearchSelect";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import EditableSelect from "../../../../../../Components/Forms/Edit/EditableSelect";
import { getAllUsersByOrganizationId } from "../../../../../Call/CallAction";
import { callReducer } from "../../../../../Call/CallReducer";
class EmployeeAboutEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  componentDidMount() {
    this.props.getAllUsersByOrganizationId();
  }
  handleUpdate = () => {
    this.props.updateEmployeeById(
      {
        ...this.state.fields,
        employeeId: this.props.singleEmployee.employeeId,
      },
      this.props.singleEmployee.employeeId,
      this.props.toggleViewType
    );
  };
  handleChange = (name, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  render() {
    const {
      singleEmployee: {
        designation,
        department,
        departmentDetails,
        firstName,
        userType,
        level,
        reportingManager,

        employee,
        email,
      },
      allUsersListByOrganizationId,
      toggleViewType,
      updatingEmployeeById,
    } = this.props;

    const ReportingData = allUsersListByOrganizationId
      .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
      .filter((a) => a.emailValidationInd)
      .map((item, i) => ({
        value: item.userId,
        label: `${item.firstName || ""} ${item.middleName ||
          ""} ${item.lastName || ""} ${item.emailId || ""}`,
      }));

    console.log(ReportingData);
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <div style={{ width: "100%" }}></div>
          <Spacer style={{ margin: "0.1875em" }} />

          <div style={{ width: "100%" }}>
            <EditableSelect
              defaultValue={designation}
              handleChange={this.handleChange}
              name={"designation"}
              label={
                <FormattedMessage
                  id="app.designation"
                  defaultMessage="Designation"
                />
              }
              placeholder={"Designation"}
              options={[
                "Board",
                "CXO",
                "Director",
                "Unit Head",
                "Mid Level",
                "Junior",
              ]}
              value={this.state.fields.designation}
              style={{ width: "100%" }}
            />
          </div>
          <Spacer style={{ margin: "0.125em" }} />

          <FlexContainer
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            {/* {userType === "ADMIN" && ( */}
            <div style={{ width: "40%" }}>
              <EditableSelect
                defaultValue={department}
                handleChange={this.handleChange}
                name={"department"}
                label={
                  <FormattedMessage
                    id="app.department"
                    defaultMessage="Department"
                  />
                }
                disabled
                placeholder={"Department"}
                style={{ width: "100%" }}
                options={[
                  "Business",
                  "Operations",
                  "IT",
                  "Recruitment",
                  "HR",
                  "Sales",
                  "Marketing",
                  "Procurement",
                  "Legal",
                  "Facilities",
                  "Alliance",
                ]}
                value={this.state.fields.department}
              />
            </div>
            {/* )} */}
            <div style={{ width: "58%" }}>
              <EditableInput
                defaultValue={departmentDetails}
                handleChange={this.handleChange}
                name={"departmentDetails"}
                label={
                  <FormattedMessage
                    id="app.departmentDetails"
                    defaultMessage="Department Details"
                  />
                }
                placeholder={"Department Details"}
                value={this.state.fields.departmentDetails}
                width="100%"
              />
            </div>
          </FlexContainer>
          <div style={{ width: "58%" }}>
            {/* <EditableSelect
              defaultValue={ReportingData || undefined}
              handleChange={this.handleChange}
              name={"reportingManager"}
              placeholder={"Reports to"}
              options={ReportingData || []}
              value={this.state.fields.reportingManager}
              style={{ width: "100%" }}
            /> */}
            <EditableSelect
              defaultValue={`${firstName} `}
              handleChange={this.handleChange}
              name={"reportingManager"}
              label={
                <FormattedMessage
                  id="app.reportingmanager"
                  defaultMessage="Reporting Manager"
                />
              }
              placeholder={"Reports to"}
              options={Array.isArray(ReportingData) ? ReportingData : []}
              value={this.state.fields.reportingManager}
              style={{ width: "100%" }}
            />
          </div>

          <Spacer style={{ margin: "0.125em" }} />
          {userType === "ADMIN" && (
            <div style={{ width: "100%" }}>
              <EditableSelect
                defaultValue={level}
                handleChange={this.handleChange}
                name={"level"}
                label={
                  <FormattedMessage id="app.level" defaultMessage="Level" />
                }
                disabled
                placeholder={"Level"}
                options={[
                  "L1",
                  "L2",
                  "L3",
                  "L4",
                  "L5",
                  "L6",
                  "L7",
                  "L8",
                  "L9",
                  "L10",
                  "L11",
                  "L12",
                  "L13",
                  "L14",
                ]}
                value={this.state.fields.level}
                style={{ width: "100%" }}
              />
            </div>
          )}
        </FlexContainer>
        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updatingEmployeeById}
            onClick={this.handleUpdate}
          >
            <FormattedMessage id="app.save" defaultMessage="Save" />
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
          </Button>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({ employee, call }) => ({
  updatingEmployeeById: employee.updatingEmployeeById,
  updatingEmployeeByIdError: employee.updatingEmployeeByIdError,
  allUsersListByOrganizationId: call.allUsersListByOrganizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateEmployeeById,
      getAllUsersByOrganizationId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAboutEdit);
