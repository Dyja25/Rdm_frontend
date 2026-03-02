import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { JumpStartBox } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { CurrencySymbol } from "../../../../../Components/Common";
// import { getLevels } from "../../../Settings/SettingsAction";

class EmployeeJumpStartForAdmin extends Component {
  // componentDidMount() {
  //   this.props.getLevels();
  // }
  render() {
    // const { user, levels } = this.props;
    // const {
    //   organization: { subscriptionType },
    // } = user.metaData;
    // console.log(user);
    // console.log()
    // const data =
    //   subscriptionType === "FREE"
    //     ? "100MB"
    //     : subscriptionType === "STARTER"
    //     ? "1GB"
    //     : subscriptionType === "PROFESSIONAL"
    //     ? "3GB"
    //     : "10GB";
    // console.log(data);
    return (
      <FlexContainer flexDirection="column" style={{ width: "100%" }}>
        <FlexContainer style={{ width: "100%" }}>
          <JumpStartBox
            //title="Created on"
            title={<FormattedMessage
              id="app.createdon"
              defaultMessage="Created on"
            />}
            noProgress
            stringValue
            // value={dayjs(user.creationDate).format("DD/MM/YYYY")}
            bgColor="#005075"
          />
          <CurrencySymbol />

          <JumpStartBox
            noProgress
            stringValue
            // handleEdit={this.props.handleEdit}
            //title="Level"
            title={<FormattedMessage
              id="app.level"
              defaultMessage="Level"
            />}
            // value={user.level}
            // levels={levels}
            // handleUpdate={this.props.handleUpdate}
            // userId={user.userId}
            // taskInd={user.taskInd}
            // isLevelTextInputOpen={this.props.isLevelTextInputOpen}
            // handleLevelNotEdit={this.props.handleLevelNotEdit}
            // edit
            bgColor="#0093d7"
          />
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ contact, account, settings }) => ({
  // levels: settings.levels,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    // getLevels 
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeJumpStartForAdmin);
