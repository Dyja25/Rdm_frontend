import React, { Component, PureComponent } from "react";
import { Link } from 'react-router-dom';
class RequirementDetailView extends PureComponent {
  render() {
  //  alert("opportunityId", this.props.opportunityId);
    return (
      <>
        {/* <Link
          toUrl={`/opportunity/${this.props.opportunityId}`}
          title={`${this.props.jobOrder}`}
        /> */}
         <Link
                  to={`/opportunity/${this.props.opportunityId}`}
                
                
                >
                    {this.props.jobOrder}
                    </Link>
      </>
    );
  }
}
export default RequirementDetailView;
