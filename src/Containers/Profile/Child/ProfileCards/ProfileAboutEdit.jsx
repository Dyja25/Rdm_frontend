import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { updateUserById } from "../../../Auth/AuthAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Spacer } from "../../../../Components/UI/Elements";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
import EditSearchSelect from "../../../../Components/Forms/Edit/EditSearchSelect";
import EditableSelect from "../../../../Components/Forms/Edit/EditableSelect";
class ProfileAboutEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    const userId = this.props.user.userId;

    console.log(userId);
    this.props.updateUserById(
      { ...this.state.fields, employeeId: userId },
      this.props.user.userId,
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
      user: {
        currency,
        designation,
        department,
        userType,
        label,
        role,
        departmentDetails,
      },
      toggleViewType,
      updatingUserById,
    } = this.props;
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
            <div style={{ width: "100%" }}>
              <EditableSelect
                defaultValue={department}
                handleChange={this.handleChange}
                name={"department"}
                disabled
                placeholder={"Function"}
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
            {/* <div style={{ width: "58%" }}>
              <EditableInput
                defaultValue={departmentDetails}
                handleChange={this.handleChange}
                name={"departmentDetails"}
                placeholder={"Function Details"}
                value={this.state.fields.departmentDetails}
                width="100%"
              />
            </div> */}
          </FlexContainer>
          {/* <Spacer style={{ margin: "0.125em" }} /> */}
          {/* <EditableInput
            defaultValue={userType}
            handleChange={this.handleChange}
            name={"userType"}
            placeholder={"User type"}
            value={this.state.fields.userType}
            width="17.625em"
          /> */}
          <Spacer style={{ margin: "0.125em" }} />
          <div style={{ width: "100%" }}>
            <EditableSelect
              defaultValue={label}
              handleChange={this.handleChange}
              name={"label"}
              disabled
              placeholder={"Label"}
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
              value={this.state.fields.label}
              style={{ width: "100%" }}
            />
          </div>
        </FlexContainer>
        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updatingUserById}
            onClick={this.handleUpdate}
          >
            {/* Save */}
            <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            {/* Cancel */}
            <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
          </Button>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  updatingUserById: auth.updatingUserById,
  updatingUserByIdError: auth.updatingUserByIdError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAboutEdit);
