import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateEmployeeById } from "../../../../EmployeeAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Spacer } from "../../../../../../Components/UI/Elements";
import EditableInput from "../../../../../../Components/Forms/Edit/EditableInput";
import EditableDatePicker from "../../../../../../Components/Forms/Edit/EditableDatePicker";
import EditableSelect from "../../../../../../Components/Forms/Edit/EditableSelect";
class EmployeePersonalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
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
      singleEmployee: { bloodGroup, dob },
      toggleViewType,
      updatingEmployeeById,
    } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <div style={{ width: "100%" }}>
            <EditableSelect
              isRequired
              defaultValue={bloodGroup}
              handleChange={this.handleChange}
              name={"bloodGroup"}
              label={
                <FormattedMessage
                  id="app.bloodGroup"
                  defaultMessage="Blood Group"
                />
              }
              placeholder={"Blood Group"}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              value={this.state.fields.bloodGroup}
              style={{ width: "100%" }}
            />
          </div>
          <Spacer style={{ margin: "0.125em" }} />
          <div style={{ width: "100%" }}>
            <EditableDatePicker
              defaultValue={dob}
              handleChange={this.handleChange}
              name={"dob"}
              label={
                <FormattedMessage id="app.dob" defaultMessage="Date Of Birth" />
              }
              placeholder={"Date Of Birth"}
              value={this.state.fields.dob}
              style={{ width: "100%" }}
            />
          </div>
        </FlexContainer>

        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updatingEmployeeById}
            onClick={this.handleUpdate}
          >
            <FormattedMessage id="app.save" defaultMessage="Save" />,
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

const mapStateToProps = ({ employee }) => ({
  updatingEmployeeById: employee.updatingEmployeeById,
  updatingEmployeeByIdError: employee.updatingEmployeeByIdError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateEmployeeById,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeePersonalEdit);
