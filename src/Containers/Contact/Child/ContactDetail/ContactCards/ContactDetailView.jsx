import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class ContactDetailView extends Component {
  render() {
    const {
      contact: {
        tagWithCompany,
        designation,
        department,
        mobileNumber,
        emailId,
      },
    } = this.props;
    return (
      <>
        <ContactItemRow //label="Company" 
          label={<FormattedMessage
            id="app.company"
            defaultMessage="Company"
          />}
          value={tagWithCompany} />
        <ContactItemRow //label="Department" 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />}
          value={department} />
        <ContactItemRow //label="Designation" 
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} />
        <ContactItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ContactItemRow //label="Mobile #" 
          label={<FormattedMessage
            id="app.mobile#"
            defaultMessage="Mobile #"
          />}
          value={mobileNumber} />
      </>
    );
  }
}
export default ContactDetailView;

const ContactItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em" }}>{value}</SubTitle>
    </FlexContainer>
  );
};
