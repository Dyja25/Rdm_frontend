import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";

class VoIPJumpStart extends Component {
    componentDidMount() {
        
    }
    render() {
        const { } = this.props;


        return (
            <FlexContainer flexDirection='column' style={{ width: '100%' }}>
                <FlexContainer style={{ width: '100%' }}>
                    <JumpStartBox
                        noProgress
                        // isLoading={fetchingEventsListByVoIPId}
                        // value={eventsByVoIPId && eventsByVoIPId.Meeting && eventsByVoIPId.Meeting}
                        title='Accout SID'
                    // bgColor='#4288E0'
                    />
                    <JumpStartBox
                        // isLoading={fetchingCallsListByVoIPId}
                        // value={callsListByVoIPId && callsListByVoIPId.length}
                        noProgress
                        title='Auth Token'
                    // bgColor='#F3967E'
                    />
                </FlexContainer>
                <FlexContainer style={{ width: '100%' }}>
                    <JumpStartBox
                        noProgress
                        // isLoading={fetchingFunnelValueByVoIPId}
                        // value={actualFunnel && actualFunnel.toFixed(2)}
                        title='Twilio number'
                    // currencyType={currency}
                    // bgColor='#775FD1'
                    />
                    <JumpStartBox
                        noProgress
                        // stringValue
                        // isLoading={fetchingOpportunityListByVoIPId}
                        // value={`${Won && Won || 0 } / ${Lost && Lost || 0}`}
                        title='VoIP Provider'
                    // bgColor='#24B47E'
                    />
                </FlexContainer>
            </FlexContainer>
        )
    }
}
const mapStateToProps = ({ voip }) => ({


    fetchingCallsListByVoIPId: voip.fetchingCallsListByVoIPId,


})
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(VoIPJumpStart);