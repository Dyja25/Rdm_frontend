import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";

import { Button } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";

import EditableInput from "../../../../../Components/Forms/Edit/EditableInput";

import { updatePartnerBankDetails } from "../../../PartnerAction";

import { Spacer } from "../../../../../Components/UI/Elements";

class PartnerBankDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      // loading: false,
    };
  }
  handleUpdate = () => {
    this.props.updatePartnerBankDetails(
        this.state.fields,
        this.props.partner.partnerId,
        this.props.toggleViewType,
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
    console.log( this.props.partner.partnerId);
    const { partner, toggleViewType, updatePartnerBankDetailsById } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.62em 1.25em 0.62em 1.25em" }}
        >
          <Spacer style={{ margin: "2px" }} />

          <FlexContainer
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <div style={{ width: "48%", marginTop: "0.25em" }}>
              <EditableInput
                defaultValue={partner.businessRegistrationNumber}
                handleChange={this.handleChange}
                placeholder="Bussiness Reg No."
                name={"businessRegistrationNumber"}
                value={this.state.fields.businessRegistrationNumber}
                width="100%"
              />
            </div>
            <div style={{ width: "48%" }}>
            <EditableInput
                defaultValue={partner.taxRegistrationNumber}
                handleChange={this.handleChange}
                placeholder="Tax Reg No."
                name={"taxRegistrationNumber"}
                value={this.state.fields.taxRegistrationNumber}
                width="100%"
              />
            </div>

            <div style={{ width: "48%" }}>
            <EditableInput
                defaultValue={partner.bankName}
                handleChange={this.handleChange}
                placeholder="Bank"
                name={"bankName"}
                value={this.state.fields.bankName}
                width="100%"
              />
            </div>

            <div style={{ width: "48%" }}>
            <EditableInput
                defaultValue={partner.accountNumber}
                handleChange={this.handleChange}
                placeholder="Account No."
                name={"accountNumber"}
                value={this.state.fields.accountNumber}
                width="100%"
              />
            </div>
          </FlexContainer>
          <Spacer style={{ margin: "2px" }} />
        </FlexContainer>
        <Spacer style={{ margin: "2px" }} />
        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            loading={updatePartnerBankDetailsById}
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

const mapStateToProps = ({ partner }) => ({
  updatePartnerBankDetailsById: partner.updatePartnerBankDetailsById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      updatePartnerBankDetails
     }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerBankDetailsEdit);
