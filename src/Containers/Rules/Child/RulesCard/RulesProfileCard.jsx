import React from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import RulesProfileView from "./RulesProfileView";

function RulesProfileCard(props) {
  console.log(props.currentRulesOpen);
  return (
    <div>
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <RulesProfileView
              rule={props.rule}
              handleRuleClick={props.handleRuleClick}
              toggleViewType={toggleViewType}
              current={props.currentRulesOpen}
            />
          ) : null
        }
      </ViewEditCard>
    </div>
  );
}

export default RulesProfileCard;
