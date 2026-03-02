import React, { useEffect } from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { FlexContainer } from "../../../../Components/UI/Layout";


function OpportunityDetailActionRight(props) {
  // useEffect(() => {
  //   props.dropOpportunity(props.opportunity.opportunityId);
  // }, []);
  const { opportunity, fetchingOpportunityById } = props;
  console.log(opportunity);
  // const {
  //     opportunity: { stageMapper },
  // } = props;
  // useEffect(() => {
  //     props.getStageCheckByStageId(
  //         opportunity.stageId,
  //         opportunity.opportunityId
  //     );
  // }, [opportunity.stageId, opportunity.opportunityId]);
  // console.log(stageMapper);
  return (
    <FlexContainer alignItems="center">
      {/* <div style={{ width: "5vw" }}> */}
        {/* <StyledPopconfirm
          //title="Drop this Opportunity ?"
          title={<FormattedMessage
            id="app.dropthisopportunity ?"
            defaultMessage="Drop this Opportunity ?"
          />}
        >
          <Button type="primary" ghost>
            <FormattedMessage
              id="app.drop"
              defaultMessage="Drop"
            /> */}
            {/* Drop */}
          {/* </Button> */}
        {/* </StyledPopconfirm> */}
      {/* </div> */}
      {/* {fetchingOpportunityById ? (
                <div style={{ marginLeft: "18.125em" }}>
                    <Spin />
                </div>
            ) : (
                // <BundleLoader />
                <OpportunityStatsCard opportunity={opportunity} />
            )} */}
      {/* <FlexContainer justifyContent="center"> */}

      {/* </FlexContainer> */}
    </FlexContainer>
  );
}
const mapStateToProps = ({ opportunity }) => ({
  deleteOpportunity: opportunity.deleteOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // dropOpportunity,
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(OpportunityDetailActionRight)
);
