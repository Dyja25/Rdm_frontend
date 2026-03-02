import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../../../Components/UI/Elements";
import ContactAvailibityView from "./ContactAvalibilityView";

class ContactAvailibityCard extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ContactAvailibityView
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

export default ContactAvailibityCard;
