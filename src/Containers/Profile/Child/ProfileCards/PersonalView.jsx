import React, { Component } from "react";
import { Divider, Tooltip } from "antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { StyledCollapse } from "../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
const Panel = StyledCollapse.Panel;
class PersonalView extends Component {
  render() {
    const {
      user: { bloodGroup, dob },
      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <FlexContainer justifyContent="flex-end">
             <Tooltip title="Edit">
            <BorderColorIcon
              fontSize="small"
              onClick={toggleViewType}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </FlexContainer>
        <StyledCollapse
  bordered={false}
  defaultActiveKey={["0"]}
  expandIcon={({ isActive }) => (
    <ArrowForwardIosIcon
      style={{
        transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
    />
  )}
>

          <Panel header={<FormattedMessage
          id="app.personal"
          defaultMessage="Personal"
        />} key="1" style={{}}>
            <ProfileItemRow //label="Blood Group" 
            label={<FormattedMessage
          id="app.bloodgroup"
          defaultMessage="Blood Group"
        />}
            value={bloodGroup} />
            <ProfileItemRow
              // label="Date Of Birth"
               label={<FormattedMessage
          id="app.dateofbirth"
          defaultMessage="Date Of Birth"
        />}
              value={dob ? dayjs(dob).format("YYYY-MM-DD") : ""}
            />
          </Panel>
        </StyledCollapse>

        {/* <ProfileItemRow label="Role" value={role} /> */}
      </>
    );
  }
}

export default PersonalView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.125em" }}>{value}</SubTitle>
    </FlexContainer>
  );
};
