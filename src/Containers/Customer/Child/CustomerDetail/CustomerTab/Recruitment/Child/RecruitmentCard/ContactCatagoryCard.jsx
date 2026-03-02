import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../../../Components/UI/Elements";
import ContactCatagoryView from "./ContactCatagoryView";

class ContactCatagoryCard extends Component {
  render() {
    const { contact } = this.props;
    console.log(contact);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ContactCatagoryView
                contact={contact}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactCatagoryCard;
