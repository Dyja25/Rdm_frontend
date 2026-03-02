import React, { Component, PureComponent } from "react";
import { Link } from 'react-router-dom';
class OpportunityDetailView extends PureComponent {
  render() {
  //  alert("opportunityId", this.props.opportunityId);
    return (
      <>
      
         <Link
          to={`/opportunity/${this.props.opportunityId}`}
         className="candidate-link"
        
        >
            {this.props.opportunityName}
            </Link>
      </>
    );
  }
}
export default OpportunityDetailView;
