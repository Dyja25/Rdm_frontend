import React, { Component } from "react";
import { Divider, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
// import { elipsize } from "../../../../Helpers/Function/Functions";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../../Components/Utils";
class EmployeeStatusView extends Component {
  render() {
    const {
      singleEmployee: {
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
        tradeCurrency,
        designation,
        department,
        userType,
        level,
        departmentDetails,
        // mataData: { firstName, lastName, email },
      },

      toggleViewType,
    } = this.props;
    const mobile = `${countryDialCode1 || ""} ${mobileNo || ""}`;
    const phone = `${countryDialCode || ""} ${phoneNo || ""}`;
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
        {/* <ProfileItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ProfileItemRow //label="Emp Id" 
          label={<FormattedMessage
            id="app.employeeId"
            defaultMessage="Emp Id"
          />}
          value={employeeId} /> */}
        <ProfileItemRow //label="Phone #" 
          label={<FormattedMessage
            id="app.phone"
            defaultMessage="Phone #"
          />}
          value={phone} />
        {/* <ProfileItemRow
          //label="Date of Joining"
          label={<FormattedMessage
            id="app.dateOfJoining"
            defaultMessage="Date of Joining"
          />}
          value={dayjs(dateOfJoining).format("YYYY-MM-DD")}
        /> */}
        <ProfileItemRow label="Mobile #" value={mobile} />
        <ProfileItemRow label="Linkedin" value={linkedinPublicUrl || ""} />
        <ProfileItemRow label="Twitter" value={twitter || ""} />
        <ProfileItemRow label="Date of Joining" value={dayjs(dateOfJoining).format("YYYY-MM-DD")} />
        <ProfileItemRow label="Currency" value={tradeCurrency} />
        {/* <ProfileItemRow label="Designation" value={designation} />
        <ProfileItemRow label="Department" value={department} />
        <ProfileItemRow label="Level" value={level || ""} /> */}
        {/* <ProfileItemRow label="Details" value={departmentDetails} /> */}
        <ProfileItemRow label="Reporting Manager"  />
        <ProfileItemRow label="Time Zone" value={timeZone} />
        {/* <ProfileItemRow label="Level" value={level || ""} /> */}
        {/* <ProfileItemRow label="TimeZone" value={timeZone} /> */}
        {/* <ProfileItemRow label="Reporting Manager" value={mataData.firstName} /> */}
      </>
    );
  }
}

export default EmployeeStatusView;

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
      // style={{ marginLeft: "-4rem" }}
      >
        <Tooltip title={value} placement="topLeft">
          {/* {elipsize(value, 27)} */}
          {value}
        </Tooltip>
      </SubTitle>
    </FlexContainer>
  );
};
