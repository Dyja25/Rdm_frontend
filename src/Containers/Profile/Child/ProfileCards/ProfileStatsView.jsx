import React, { Component } from "react";
import { Divider, Tooltip } from "antd";
import { elipsize } from "../../../../Helpers/Function/Functions";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
class ProfileStatsView extends Component {
  render() {
    const {
      user: {
        emailId,
        employeeId,
        phoneNo,
        mobileNo,
        linkedinPublicUrl,
        twitter,
        dateOfJoining,
        countryDialCode,
        countryDialCode1,
        timeZone,
      },
      toggleViewType,
    } = this.props;
    const mobile = `${countryDialCode1 || ""} ${mobileNo || ""}`;
    const phon = `${countryDialCode || ""} ${phoneNo || ""}`;
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
        <ProfileItemRow label="Email" value={emailId} />
        <ProfileItemRow label="Emp Id" value={employeeId} />
        <ProfileItemRow
          label="Joining Date"
          value={
            dateOfJoining ? dayjs(dateOfJoining).format("YYYY-MM-DD") : ""
          }
        />
        <ProfileItemRow label="Phone #" value={phon} />
        {/* <ProfileItemRow label="Phone No" value={phoneNo} /> */}
        {/* <ProfileItemRow label="Mobile No" value={mobileNo} /> */}
        <ProfileItemRow label="Mobile #" value={mobile} />
        <ProfileItemRow label="Linkedin" value={linkedinPublicUrl || ""} />
        <ProfileItemRow label="Twitter" value={twitter || ""} />
        {/* <ProfileItemRow label="Level" value={level || ""} /> */}
        <ProfileItemRow label="Time Zone" value={timeZone} />
      </>
    );
  }
}

export default ProfileStatsView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
      width="2.5em"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "-4rem" }}
      >
        <Tooltip title={value} placement="topLeft">
          {/* {elipsize(value, 27)} */}
          {value}
        </Tooltip>
      </SubTitle>
    </FlexContainer>
  );
};
