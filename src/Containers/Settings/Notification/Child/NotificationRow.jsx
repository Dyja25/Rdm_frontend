import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Switch } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { SubTitle } from "../../../../Components/UI/Elements";

class NotificationRow extends Component {
    render() {
        const { label, enabled, onChange } = this.props;
        return (
            <FlexContainer flexWrap='nowrap' style={{ marginBottom: 10 }}>
                <SubTitle style={{ flexBasis: '30%' }}>{label || ''}</SubTitle>
                <Switch
                    checked={enabled || false}
                    onChange={onChange || null}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                />
            </FlexContainer>
        );
    }
}
NotificationRow.propTypes = {
    label: PropTypes.string,
    enabled: PropTypes.bool,
    onChange: PropTypes.func,
}
export default NotificationRow;