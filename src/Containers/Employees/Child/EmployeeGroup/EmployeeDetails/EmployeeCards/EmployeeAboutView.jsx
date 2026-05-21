import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Divider } from "antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../../Components/Utils";
import dayjs from "dayjs";

class EmployeeAboutView extends Component {
  render() {
    const {
      singleEmployee: {
        emailId,
        employeeId,
        dateOfJoining,
        timeZone,
        tradeCurrency,
        designation,
        department,
        userType,
        level,
        departmentDetails,
        email,
        metaData,
      },

      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <FlexContainer justifyContent="flex-end">
          {/* <ActionIcon
            //tooltipTitle="Edit"
            tooltiptitle={<FormattedMessage
              id="app.edit"
              defaultMessage="Edit"
            />}
            iconType="edit"
            handleIconClick={toggleViewType}
            size="1em"
          /> */}
        </FlexContainer>
        <ProfileItemRow //label="Email" 
          label={<FormattedMessage
            id="app.email"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ProfileItemRow //label="Emp Id" 
          label={<FormattedMessage
            id="app.employeeId"
            defaultMessage="Emp Id"
          />}
          value={employeeId} />
        {/* <ProfileItemRow
          //label="Date of Joining"
          label={<FormattedMessage
            id="app.dateOfJoining"
            defaultMessage="Date of Joining"
          />}
          value={dayjs(dateOfJoining).format("YYYY-MM-DD")}
        /> */}
        {/* <ProfileItemRow //label="Currency" 
          label={<FormattedMessage
            id="app.tradeCurrency"
            defaultMessage="Currency"
          />}
          value={tradeCurrency}
        /> */}
        {/* <ProfileItemRow //label="Designation" 
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} /> */}
        {/* <ProfileItemRow //label="Function" 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Function"
          />}
          value={department} /> */}
        {/* <ProfileItemRow // label="Level"
          label={<FormattedMessage
            id="app.level"
            defaultMessage="Level"
          />}
          value={level || ""} /> */}
        {/* <ProfileItemRow //label="Details" 
          label={<FormattedMessage
            id="app.details"
            defaultMessage="Details"
          />}
          value={departmentDetails} /> */}
            <ProfileItemRow //label="Designation" 
             label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
            value={designation} />
        <ProfileItemRow //label="Department"
         label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />} 
        value={department} />
        <ProfileItemRow //label="Level" 
        label={<FormattedMessage
            id="app.level"
            defaultMessage="Level"
          />} 
        value={level || ""} />
        <ProfileItemRow 
          label={<FormattedMessage
            id="app.usertype"
            defaultMessage="User type"
          />}
          value={userType} />
{/* 
        <ProfileItemRow
          // label="Reporting Manager"
          label={<FormattedMessage
            id="app.reportingmanager"
            defaultMessage="Reporting Manager"
          />}
          // value={metaData.email || ""}
          // value={`${metaData.firstName} ${metaData.lastName || ""}`}
        /> */}
        {/* <ProfileItemRow label="TimeZone" value={timeZone} /> */}
        {/* <ProfileItemRow label="Role" value={role} /> */}
      </>
    );
  }
}

export default EmployeeAboutView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-0.3125em" }}>{value}</SubTitle>
    </FlexContainer>
  );
};
