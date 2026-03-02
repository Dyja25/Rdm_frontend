import React, { Component } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import CallActionRight from './CallActionRight.jsx';
class CallHeader extends Component {
    render() {
        const { viewType, setCallViewType } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={null}
                    rightComponent={<CallActionRight
                    />}
                />
            </div>
        )
    }
}

export default CallHeader;