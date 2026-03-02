import React, { Component } from 'react'
import { ActionHeader } from '../../../../Components/Utils';
import VoIPActionLeft from "./VoIPActionLeft";
import VoIPActionRight from './VoIPActionRight';
class VoIPHeader extends Component {
    render() {
        const { handleIntegrationModal, viewType, setVoIPViewType } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={<VoIPActionLeft
                        viewType={viewType}
                        setVoIPViewType={setVoIPViewType}

                    />}
                    rightComponent={<VoIPActionRight
                        handleIntegrationModal={handleIntegrationModal}
                    />}
                />
            </div>
        )
    }
}

export default VoIPHeader;