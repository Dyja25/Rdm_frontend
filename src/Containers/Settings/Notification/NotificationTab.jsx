import React, { Component } from 'react'
import { Tabs } from 'antd';
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from '../../../Components/UI/Layout';
import InAppNotificationSetting from "./Child/InAppNotificationSetting";
import PushNotificationSetting from "./Child/PushNotificationSetting";
const TabPane = Tabs.TabPane;

class NotificationTab extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'In-app', content: <InAppNotificationSetting />, key: '1' },
            { title: 'Push', content: <PushNotificationSetting />, key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    render() {
        return (
            <TabsWrapper>
                <StyledTabs
                    size={'small'}
                    animated={true}
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                >
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
                </StyledTabs>
            </TabsWrapper>
        );
    }
}

export default NotificationTab;