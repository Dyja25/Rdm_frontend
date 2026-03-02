import React, { Component, lazy } from 'react';
import { Switch } from "antd";
import { SubTitle } from "../../../Components/UI/Elements";
import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
const NotificationTab = lazy(() => import('./NotificationTab'))

class NotificationSetting extends Component {
    render() {
        return (
            <>
                <NotificationTab />
            </>
        );
    }
}

export default NotificationSetting;