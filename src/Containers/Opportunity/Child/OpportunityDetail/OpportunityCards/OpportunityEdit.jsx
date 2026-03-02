import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
// import { updateOpportunity } from "../../../OpportunityAction";
import { Button } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import {
  Title,
  SubTitle,
  TextInput,
  Spacer
} from "../../../../../Components/UI/Elements";
class OpportunityOverviewEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }
  handleUpdate = () => {
    // this.props.updateOpportunity(
    //   this.props.opportunity.opportunityId,
    //   this.state.fields,
    //   this.callback
    // );
  };
  callback = () => {
    this.props.toggleViewType();
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };
  render() {
    const { opportunity, toggleViewType, updateOpportunityById } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditableInput
            defaultValue={opportunity.opportunityName}
            handleChange={this.handleChange}
            name={"opportunityName"}
            value={this.state.fields.opportunityName}
            width="100%"
          />
        </FlexContainer>
        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updateOpportunityById}
          // onClick={this.handleUpdate}
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

const mapStateToProps = ({ opportunity }) => ({
  // updateOpportunityById: opportunity.updateOpportunityById,
  // updateOpportunityByIdFailure: opportunity.updateOpportunityByIdFailure
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    // updateOpportunity 
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityOverviewEdit);

class EditableInput extends Component {
  render() {
    const { width } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        width={width}
      />
    );
  }
}
