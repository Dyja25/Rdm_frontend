import React from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import RecruitmentProfileCard from "./Child/RecruitmentCard/RecruitmentProfileCard";

function RecruitmentActionLeft(props) {
  console.log(props.rules);
  return (
    <div>
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <RecruitmentProfileCard
          handleRuleClick={props.handleRuleClick}
          rules={props.rules}
          currentRulesOpen={props.currentRulesOpen}
          recruitProAdvance={props.recruitProAdvance}
          handleRecruitProAdvance={props.handleRecruitProAdvance}
        />
      </FlexContainer>
    </div>
  );
}
export default RecruitmentActionLeft;
