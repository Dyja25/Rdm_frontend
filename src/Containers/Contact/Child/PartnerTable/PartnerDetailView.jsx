import React, { Component } from "react";
import { Link } from 'react-router-dom';

class PartnerDetailView extends Component {
  render() {
    console.log("contactId", this.props.contactId);
    return (
      <>
        {/* <Link
          toUrl={`contact/${this.props.contactId}`}
          title={`${this.props.contactName}`}
        /> */}
         <Link
          to={`/contact/${this.props.contactId}`}
           className="candidate-link"
        
        
        >
            {this.props.contactName}
            </Link>
      </>
    );
  }
}
export default PartnerDetailView;
