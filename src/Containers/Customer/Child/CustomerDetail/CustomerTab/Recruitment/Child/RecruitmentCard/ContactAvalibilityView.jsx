import dayjs from "dayjs";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { SubTitle } from "../../../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../../../Components/UI/Layout";

class ContactAvailibityView extends Component {
  render() {
    const {
      contact: { availableDate, billing, currency },
    } = this.props;

    return (
      <>
        <ContactItemRow
          //label="Availability"
          label={<FormattedMessage
            id="app.availability"
            defaultMessage="Availability"
          />}
          value={dayjs(availableDate).format("ll")}
        />
        <ContactItemRow
          // label="Billing / hr"
          label={<FormattedMessage
            id="app.billing"
            defaultMessage="Billing / hr"
          />}
          value={`${billing || ""} ${currency || ""}`}
        />
      </>
    );
  }
}

export default ContactAvailibityView;

const ContactItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "-2rem" }}
      >
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
