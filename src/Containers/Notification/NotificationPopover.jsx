import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Tooltip, Popover } from "antd";
// import { StyledPopover } from "../../Components/UI/Antd";
import NotificationTab from "./NotificationTab";
import NotificationsIcon from '@mui/icons-material/Notifications';


class NotificationPopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    return (
      <Tooltip title="Notifications">
        <Popover
          content={
            <div>
              <NotificationTab />
            </div>
          }
          trigger="click"
          placement="bottomRight"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Badge
            count={this.props.notificationCount}
            style={{ fontSize: 8, boxSizing: 8 }}
          >
         <NotificationsIcon/>
          </Badge>
        </Popover>
      </Tooltip>
    );
  }
}
const mapStateToProps = ({ notification }) => ({
  notificationCount:
    notification.presentNotifications &&
    notification.presentNotifications.length
});

export default connect(mapStateToProps)(NotificationPopover);
