import React from 'react';
import { Icon, Button } from 'antd';
import { FlexContainer } from '../../../../Components/UI/Layout';
import { StyledSelect } from "../../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class VoIPActionRight extends React.Component {

    render() {
        const { handleIntegrationModal } = this.props;
        return (
            <FlexContainer alignItems='center'>
                <Button type='primary' onClick={() => handleIntegrationModal(true)}><Icon type='plus' /></Button>
            </FlexContainer>
        )
    }
}


export default VoIPActionRight; 