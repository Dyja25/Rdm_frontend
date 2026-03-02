import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import ContactOverViewCard from "./ContactCards/ContactOverViewCard.jsx";
import ContactDetailCard from "./ContactCards/ContactDetailCard.jsx";

class ContactDetailsLeft extends Component {
  render() {
    const { contact } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <ContactOverViewCard contact={contact} />
          <ContactDetailCard contact={contact} />
        </FlexContainer>
      </>
    );
  }
}
export default ContactDetailsLeft;
