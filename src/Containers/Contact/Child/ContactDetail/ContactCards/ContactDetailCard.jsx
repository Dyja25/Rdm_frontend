import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ContactDetailView from "./ContactDetailView.jsx";

class ContactDetailCard extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ContactDetailView
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

export default ContactDetailCard;
