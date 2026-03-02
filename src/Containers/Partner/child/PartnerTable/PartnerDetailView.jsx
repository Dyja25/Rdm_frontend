import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
class PartnerDetailView extends Component {
  render() {
    console.log("partnerId", this.props.partnerId);
    return (
      <>
        <Link
          toUrl={`/partner/${this.props.partnerId}`}
          title={`${this.props.partnerName}`}
        />
         
      </>
    );
  }
}
export default PartnerDetailView;
