import React, { Component, lazy,useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import OpportunityDetailHeader from "./OpportunityDetailHeader.jsx";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getOpportunityById } from "../../OpportunityAction";

const OpportunityDetailLeft = lazy(() => import("./OpportunityDetailLeft.jsx"));
 const OpportunityDetailRight = lazy(() => import("./OpportunityDetailRight.jsx"));

function OpportunityDetail (props) {
   const { opportunityId } = useParams();

  useEffect(() => {
    props.getOpportunityById(opportunityId)
    }, []);
 
    const { opportunity, fetchingOpportunityById } = props;
    // console.log(this.props.opportunity&&this.props.opportunity.recruiterDetails.length&&this.props.opportunity.recruiterDetails[0].fullName)
    return (
      <>
        <OpportunityDetailHeader
          opportunity={opportunity}
          fetchingOpportunityById={fetchingOpportunityById}
        />
        {fetchingOpportunityById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <FlexContainer>
            <Suspense fallback={""}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "20%" }}>
                  <OpportunityDetailLeft opportunity={opportunity} />
               
                </div>
                <div style={{ width: "80%" }}>
                  <OpportunityDetailRight 
                  opportunity={opportunity}
                  />
                 
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
      </>
    );
  }


const mapStateToProps = ({ opportunity, auth }) => ({
  fetchingOpportunityById: opportunity.fetchingOpportunityById,
  fetchingOpportunityByIdfailure: opportunity.fetchingOpportunityByIdfailure,
  opportunity: opportunity.opportunity,
  // tradeurrency: auth.userDetails.tradeurrency,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getOpportunityById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDetail);
