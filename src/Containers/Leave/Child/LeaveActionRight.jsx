import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {  Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleLeavesModal } from "../LeavesAction";
import AddLeavesModal from "./Tab/AddLeavesModal";
import { LeavesReducer } from "../LeavesReducer";
// import { setAccountFilterText, setAccountFilterUser } from "../AccountAction";
// import { getUsers } from "../../Team/TeamAction";

const Option = StyledSelect.Option;

class LeaveActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleLeavesModal } = this.props;
    return (
      <FlexContainer alignItems="center">
        <Tooltip placement="right" title="Apply">
          <Button type="primary"
           ghost onClick={() => handleLeavesModal(true)}>
            Add
          </Button>
        </Tooltip>
        <AddLeavesModal
          handleLeavesModal={handleLeavesModal}
          addLeaveModal={this.props.addLeaveModal}
        />
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ leave }) => ({
  addLeaveModal: leave.addLeaveModal,
  //   userId: auth.userDetails.userId,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  //   accountFilterText: account.accountFilterText,
  //   users: team.users,
  //   filterByUserOption: team.filterByUserOption,
  //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeavesModal,
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(LeaveActionRight)
);
