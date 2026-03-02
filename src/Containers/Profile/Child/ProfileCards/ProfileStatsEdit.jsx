import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { updateUserById } from "../../../Auth/AuthAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Spacer } from "../../../../Components/UI/Elements";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
import EditableSearcSelect from "../../../../Components/Forms/Edit/EditSearchSelect";
import EditableDatePicker from "../../../../Components/Forms/Edit/EditableDatePicker";
class ProfileStatsEdit extends Component {
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
        emailId,
        empId,
        phoneNo,
        mobileNo,
        countryDialCode1,
        countryDialCode,
        linkedinPublicUrl,
        twitter,
        dateOfJoining,
        timeZone,
        

      },
      toggleViewType,
      updatingUserById,
    } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em"}}
        >
           <Spacer style={{ margin: "0.125em" }} />
          <EditableInput
            defaultValue={emailId}
            disabled
            handleChange={this.handleChange}
            name={"emailId"}
            placeholder={"Email"}
            value={this.state.fields.emailId}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />

          <FlexContainer
            flexDirection="column"
            style={{ padding: "0.625em 1.25em 0.625em 1.25em",marginLeft:"-1.2em" }}
          >
            <EditableDatePicker
              defaultValue={dateOfJoining}
              handleChange={this.handleChange}
              name={"dateOfJoining"}
              placeholder={"Date of Joining"}
              value={this.state.fields.dateOfJoining}
              width="100%"
            />

            <Spacer style={{ margin: "0.125em" }} />
          </FlexContainer>

          <FlexContainer
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <div style={{ width: "37%" }}>
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode,
                  label: countryDialCode,
                  color: "#FF8B00",
                }}
                handleSelectChange={this.handleChange}
                name={"countryDialCode"}
                value={this.state.fields.countryDialCode}
                selectType="dialCode"
              />
            </div>

            <div style={{ width: "60%" }}>
              <EditableInput
                defaultValue={phoneNo}
                handleChange={this.handleChange}
                name={"phoneNo"}
                placeholder={"Phone #"}
                value={this.state.fields.phoneNo}
                width="100%"
              />
            </div>
          </FlexContainer>
          <Spacer style={{ margin: "0.125em" }} />
          <FlexContainer
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <div style={{ width: "37%" }}>
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode1,
                  label: countryDialCode1,
                  color: "#FF8B00",
                }}
                handleSelectChange={this.handleChange}
                name={"countryDialCode1"}
                // placeholder={"Country dial Code "}
                selectType="dialCode"
                value={this.state.fields.countryDialCode1}
              />
            </div>

            <div style={{ width: "60%" }}>
              <EditableInput
                defaultValue={mobileNo}
                handleChange={this.handleChange}
                name={"mobileNo"}
                placeholder={"Mobile #"}
                value={this.state.fields.mobileNo}
                width="100%"
              />
            </div>
          </FlexContainer>
          <Spacer style={{ margin: "0.125em" }} />
          <EditableInput
            defaultValue={linkedinPublicUrl}
            handleChange={this.handleChange}
            name={"linkedinPublicUrl"}
            placeholder={"Linkedin"}
            value={this.state.fields.linkedinPublicUrl}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />
          <EditableInput
            defaultValue={twitter}
            handleChange={this.handleChange}
            name={"twitter"}
            placeholder={"Twitter"}
            value={this.state.fields.twitter}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />
          {/* <EditableInput
            defaultValue={level}
            handleChange={this.handleChange}
            name={"level"}
            placeholder={"Level"}
            value={this.state.fields.level}
            width="17.625em"
          />
          <Spacer style={{ margin: "0.125em" }} /> */}
          <div style={{ width: "100%" }}>
            <EditableSearcSelect
              defaultValue={{
                value: timeZone,
                label: timeZone,
                color: "#FF8B00",
              }}
              handleSelectChange={this.handleChange}
              name={"timeZone"}
              // placeholder={"Country dial Code "}
              selectType="timeZone"
              value={this.state.fields.timeZone}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatsEdit);
