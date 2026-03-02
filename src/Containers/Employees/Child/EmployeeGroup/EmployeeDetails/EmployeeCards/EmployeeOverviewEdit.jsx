import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { updateEmployeeById } from "../../../../EmployeeAction";
import { Button } from "antd";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextInput, Spacer } from "../../../../../../Components/UI/Elements";
import EditUpload from "../../../../../../Components/Forms/Edit/EditUpload";
class EmployeeOverviewEdit extends Component {
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
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  setImage = (imageId) => {
    this.setState({
      fields: {
        ...this.state.fields,
        imageId,
      },
    });
  };
  render() {
    const { singleEmployee, toggleViewType, updatingEmployeeById } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditUpload
            imageId={singleEmployee.imageId}
            imageURL={singleEmployee.imageURL}
            imgWidth={100}
            imgHeight={100}
            getImage={this.setImage}
          />
          &nbsp;&nbsp;
          <EditableInput
            defaultValue={singleEmployee.firstName}
            handleChange={this.handleChange}
            name={"firstName"}
            label={
              <FormattedMessage
                id="app.firstName"
                defaultMessage="First name"
              />
            }
            placeholder="First name"
            value={this.state.fields.firstName}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />
          {/* <EditableInput
                        defaultValue={user.middleName}
                        handleChange={this.handleChange}
                        name={'middleName'}
                        value={this.state.fields.middleName} /> */}
          <EditableInput
            defaultValue={singleEmployee.lastName}
            handleChange={this.handleChange}
            name={"lastName"}
            label={
              <FormattedMessage id="app.lastName" defaultMessage="Last name" />
            }
            placeholder="Last name"
            value={this.state.fields.lastName}
            width="100%"
          />
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
)(EmployeeOverviewEdit);

class EditableInput extends Component {
  render() {
    const { width, placeholder } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        placeholder={placeholder}
        width={width}
      />
    );
  }
}
