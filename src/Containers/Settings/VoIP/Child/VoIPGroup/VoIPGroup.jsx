import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlexContainer } from "../../../../Components/UI/Layout";
import { GroupView } from '../../../../Components/Common';
import { NoData } from "../../../../Components/UI/Elements";
import SingleVoIP from '../VoIPList/SingleVoIP';
import { gettwilioCredential } from '../../VoIPAction';



class VoIPGroup extends Component {
    componentDidMount() {
        const { gettwilioCredential } = this.props;
        gettwilioCredential()
    }

    render() {
        const { handleVoIPModal, fetchingTwilioCredential, twilioCredential } = this.props;
        console.log(VoIP)
        if (!fetchingTwilioCredential && !twilioCredential.length) {
            return <NoData content='VoIP' onClick={handleVoIPModal} />
        }
        return (
            <> 
                <br />
                <GroupView
                    groupTitle={'VoIP'}
                    isFetching={fetchingTwilioCredential}
                    noData={!twilioCredential.length}
                    length={twilioCredential.length}
                >
                    {
                        (isViewAll, toggleViewAll) => (
                            !isViewAll
                                ? <FlexContainer>
                                    {twilioCredential && twilioCredential.slice(0, 5)
                                        .map((voip, i) => {
                                            return (
                                                <SingleVoIP
                                                    key={voip.voipId}
                                                    voip={voip}

                                                />)
                                        })}
                                </FlexContainer>
                                : <FlexContainer>
                                    {twilioCredential && twilioCredential.map((voip, i) => {
                                        return (
                                            <SingleVoIP
                                                key={voip.voipId}
                                                voip={voip}

                                            />)
                                    })}
                                </FlexContainer>
                        )
                    }
                </GroupView>
            </>
        );
    }
}

const mapStateToProps = ({ voip}) => ({
    fetchingTwilioCredential: voip.fetchingTwilioCredential,
    twilioCredential :  voip.twilioCredential 

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    gettwilioCredential,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VoIPGroup);