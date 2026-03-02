import React, { Component } from "react";
import { Checkbox } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { Popconfirm, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateOrganizationDetails } from "../../../Auth/AuthAction";

function confirm(e) {
  console.log(e);
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

class OrganizationTermsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // checked: this.props.organization.fileShareInd
    };
  }
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
    console.log(this.state.checked);
  };
  handleUpdate = () => {
    this.props.updateOrganizationDetails(
      this.props.organization.organizationId,
      {
        // fileShareInd: this.state.checked
      }
    );
  };
  render() {
    const { organization } = this.props;
    // console.log(organization.fileShareInd);
    return (
      <>
        <MainWrapper>
          <Popconfirm
            title="Do you want to proceed?"
            okText="Yes"
            onCancel={() => this.handleChange()}
            onConfirm={() => this.handleUpdate()}
          >
            <Checkbox
              checked={this.state.checked}
              onChange={() => this.handleChange()}
            >

              Yes, you can share marketing info.
              
            </Checkbox>
          </Popconfirm>
        </MainWrapper>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  updatingOrganizationDetails: auth.updatingOrganizationDetails,
  updatingOrganizationDetailsError: auth.updatingOrganizationDetailsError
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateOrganizationDetails
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationTermsCard);
