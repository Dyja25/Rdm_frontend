import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { updateOrganizationDetails } from "../../../Auth/AuthAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Spacer } from "../../../../Components/UI/Elements";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
import EditableSearcSelect from "../../../../Components/Forms/Edit/EditSearchSelect";

class OrganizationStatsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    this.props.updateOrganizationDetails(
      this.props.organisationFetching.organizationId,
      this.state.fields,
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
      organisationFetching: {
        organizationUrl,

        facebook,
        twitter,
        linkedinUrl,
      },
      toggleViewType,
      updatingOrganizationDetails,
    } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditableInput
            defaultValue={organizationUrl}
            handleChange={this.handleChange}
            name={"organizationUrl"}
            placeholder={"Website"}
            value={this.state.fields.organizationUrl}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />
          <FlexContainer
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            {/* <div style={{ width: "37%" }}>
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode,
                  label: countryDialCode,
                  color: "#FF8B00"
                }}
                handleSelectChange={this.handleChange}
                name={"countryDialCode"}
                //   placeholder={"Country dial Code "}
                value={this.state.fields.countryDialCode}
                selectType="dialCode"

              />  </div> */}
            {/* <div style={{ width: "60%" }}>
              <EditableInput
                defaultValue={mobileNo}
                handleChange={this.handleChange}
                name={"mobileNo"}
                width="100%"
                placeholder={"Mobile #"}
                value={this.state.fields.mobileNo}
              />
            </div> */}
          </FlexContainer>
          <Spacer style={{ margin: "0.125em" }} />
          {/* <FlexContainer justifyContent="space-between" style={{ width: "100%" }}>

            <div style={{ width: "37%" }}>
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode1,
                  label: countryDialCode1,
                  color: "#FF8B00"
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
                defaultValue={phoneNo}
                handleChange={this.handleChange}
                name={"phoneNo"}
                width="100%"
                placeholder={"Phone #"}
                value={this.state.fields.phoneNo}
              />
            </div>
          </FlexContainer> */}
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
          <EditableInput
            defaultValue={linkedinUrl}
            handleChange={this.handleChange}
            name={"linkedinUrl"}
            placeholder={"Linkedin"}
            value={this.state.fields.linkedinUrl}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />
          <EditableInput
            defaultValue={facebook}
            handleChange={this.handleChange}
            name={"facebook"}
            placeholder={"Facebook"}
            value={this.state.fields.facebook}
            width="100%"
          />
        </FlexContainer>

        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updatingOrganizationDetails}
            onClick={this.handleUpdate}
          >
            <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
            {/* Save */}
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
            {/* Cancel */}
          </Button>
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  updatingOrganizationDetails: auth.updatingOrganizationDetails,
  updatingOrganizationDetailsError: auth.updatingOrganizationDetailsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOrganizationDetails,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationStatsEdit);
