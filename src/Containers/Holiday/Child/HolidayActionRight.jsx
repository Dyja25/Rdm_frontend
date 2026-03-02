import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {  Button, Tooltip } from "antd";
import AddIcon from '@mui/icons-material/Add';
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleHolidayModal } from "../HolidayAction"
// import AddLeavesModal from "./Tab/AddLeavesModal";
// import { LeavesReducer } from "../LeavesReducer";
// import { setAccountFilterText, setAccountFilterUser } from "../AccountAction";
// import { getUsers } from "../../Team/TeamAction";

const Option = StyledSelect.Option;

class HolidayActionRight extends React.Component {
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
        const { handleHolidayModal } = this.props
        return (
            <FlexContainer alignItems="center">
                <Button
                    type="primary"
                    onClick={() => handleHolidayModal(true)}

                >
                    <AddIcon type="plus" />
                </Button>
                {/* <AddLeavesModal handleLeavesModal={handleLeavesModal} addLeaveModal={this.props.addLeaveModal} /> */}
            </FlexContainer>
        );
    }
}

const mapStateToProps = ({ holiday }) => ({
    addHolidayModal: holiday.addHolidayModal,
    // addLeaveModal: leave.addLeaveModal
    //   userId: auth.userDetails.userId,
    //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
    //   accountFilterText: account.accountFilterText,
    //   users: team.users,
    //   filterByUserOption: team.filterByUserOption,
    //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleHolidayModal
}, dispatch);
export default (
    connect(mapStateToProps, mapDispatchToProps)(HolidayActionRight)
);
