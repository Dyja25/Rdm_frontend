import React, { Component } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ContactDetailActionLeft from "./ContactDetailActionLeft.jsx";

class ContactDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<ContactDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default ContactDetailHeader;
