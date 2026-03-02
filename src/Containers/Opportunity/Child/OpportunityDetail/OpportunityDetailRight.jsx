import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OpportunityReportCard from "./OpportunityCards/OpportunityReportCard.jsx"
// import OpportunityAboutCard from "./OpportunityCards/OpportunityAboutCard";
import OpportunityAboutViewCard from "./OpportunityCards/OpportunityAboutViewCard.jsx";
import OpportunityAboutCard from "./OpportunityCards/OpportunityAboutCard.jsx";


class OpportunityDetailRight extends Component {
  render() {
    const {
      opportunity,
    } = this.props;
    return (
      <>
      <div style={{display:"flex"}}>
        <div style={{ width: "30%" }}>
          {/* <OpportunityDetailTab
          //  opportunity={opportunity}
            // department={this.props.department}
            // partnerLogin={this.props.partnerLogin}
          /> */}
            <OpportunityAboutViewCard
          opportunity={opportunity}
          
        />
        </div>
        <div style={{ width: "20%" ,}}>
          <OpportunityAboutCard
          opportunity={opportunity}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          tradeCurrency={this.props.tradeCurrency}
        />
        </div>
         <div style={{width: "26%"}}>
         <OpportunityReportCard
          opportunity={opportunity}
          
        />
        </div>
        </div>
        
        
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  // department: auth.userDetails && auth.userDetails.department,
  // partnerLogin: auth.user && auth.userDetails.partnerLogin,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailRight);
