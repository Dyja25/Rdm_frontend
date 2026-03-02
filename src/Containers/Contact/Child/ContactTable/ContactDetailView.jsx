import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ContactDetailView extends Component {
  render() {
    console.log("contactId", this.props.contactId);
    return (
      <>
       <Link
          to={`/contact/${this.props.contactId}`}
        
        
        >
            {this.props.contactName}
            </Link>
      </>
    );
  }
}
export default ContactDetailView;
