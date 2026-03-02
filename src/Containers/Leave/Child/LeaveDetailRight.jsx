import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
const DetailTab = lazy(() => import("./Tab/DetailTab"));
class LeaveDetailRight extends Component {
    render() {
        return (
            <FlexContainer flexDirection="column" style={{ display: "block" }}>
                <DetailTab userDetails={this.props.userDetails} />
            </FlexContainer>
        );
    }
}
const mapStateToProps = ({ auth }) => ({
    userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaveDetailRight);
