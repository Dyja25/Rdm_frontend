import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VoIPJumpStart from './VoIPJumpStart';
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { HeaderText } from "../../../../Components/UI/Elements";
import { handleVoIPDrawer } from "../../VoIPAction";

class VoIPDrawer extends Component {
    render() {
        const { } = this.props;
        return (
            <div>
                <StyledDrawer
                    title={<HeaderText fontSize={'1.375em'}>{`${firstName || ''} ${middleName || ''} ${lastName || ''} `}</HeaderText>}
                    destroyOnClose
                    placement="right"
                    closable
                    width={400}
                    onClose={() => handleVoIPDrawer(this.props.VoIPDrawerProps, false)}
                    visible={VoIPDrawerVisible}
                >
                    <VoIPJumpStart VoIP={this.props.VoIPDrawerProps} />
                </StyledDrawer>
            </div>
        )
    }
}

const mapStateToProps = ({ voip }) => ({
    VoIPDrawerVisible: voip.VoIPDrawerVisible,
    VoIPDrawerProps: voip.VoIPDrawerProps,
    fetchingVoIPListByUserId: voip.fetchingVoIPListByUserId,
    VoIPListByUserId: voip.VoIPListByUserId,
    fetchingVoIPListByUserIdError: voip.fetchingVoIPListByUserIdError,

})
const mapDispatchToProps = dispatch => bindActionCreators({ handleVoIPDrawer }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(VoIPDrawer);