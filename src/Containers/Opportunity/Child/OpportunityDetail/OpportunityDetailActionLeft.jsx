import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { FlexContainer } from "../../../../Components/UI/Layout";
import OpportunityStatsCard from "./OpportunityCards/OpportunityStatsCard.jsx";
import { Spin, Tooltip } from "antd";
import { ActionIcon } from "../../../../Components/Utils";


const OpportunityDetailActionLeft = (props) => {
     const navigate = useNavigate();
  const { opportunity, fetchingOpportunityById } = props;
  console.log(opportunity);
  const {
    opportunity: { stageMapper },
  } = props;
  // useEffect(() => {
  //   props.getStageCheckByStageId(
  //     opportunity.stageId,
  //     opportunity.opportunityId
  //   );
  // }, [opportunity.stageId, opportunity.opportunityId]);
  console.log(stageMapper);
  return (
    <FlexContainer alignItems="center">
        <ActionIcon
            style={{ marginRight: "0.3rem", color: "#1890ff", fontSize: "1.5625em" }}
            iconType="arrowBack"
            //tooltipTitle="Back"
            tooltiptitle={<FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />}
         
            handleIconClick={() => navigate(-1)}
          />
      {fetchingOpportunityById ? (
        <div style={{ marginLeft: "18.125em" }}>
          <Spin />
        </div>
      ) : (
          // <BundleLoader />
          <OpportunityStatsCard opportunity={opportunity} />
        )}
      {/* <FlexContainer justifyContent="center"> */}

      {/* </FlexContainer> */}
    </FlexContainer>
  );
};
const mapStateToProps = ({ opportunity, account, auth }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getStageCheckByStageId,
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(OpportunityDetailActionLeft)
);
