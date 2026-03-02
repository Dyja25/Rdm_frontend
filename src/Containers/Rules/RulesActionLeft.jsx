import React from "react";
import { FlexContainer } from "../../Components/UI/Layout";
import RulesProfileCard from "./Child/RulesCard/RulesProfileCard";
function RulesActionLeft(props) {
  console.log(props.currentRulesOpen);
  return (
    <div>
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <RulesProfileCard
          handleRuleClick={props.handleRuleClick}
          rule={props.rule}
          currentRulesOpen={props.currentRulesOpen}
        />
      </FlexContainer>
    </div>
  );
}
export default RulesActionLeft;
