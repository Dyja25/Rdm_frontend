import React, { Component } from "react";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../../../../Components/UI/Elements";

import ContactCatagory from "./ContactCatagory";
class ContactCatagoryView extends Component {
  render() {
    const { contact, toggleViewType, notAdd } = this.props;
    console.log(contact);
    return (
      <>
        <Title
          fontSize="0.8125em"
          style={{ fontWeight: 600, marginBottom: "0.2rem" }}
        >
          Category{" "}
        </Title>
        <ContactCatagory contact={contact} />
      </>
    );
  }
}

export default ContactCatagoryView;
