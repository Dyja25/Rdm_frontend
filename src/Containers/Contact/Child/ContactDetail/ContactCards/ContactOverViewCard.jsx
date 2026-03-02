import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ContactOverView from "./ContactOverView.jsx";

class ContactOverviewCard extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? <ContactOverView contact={contact} /> : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactOverviewCard;
