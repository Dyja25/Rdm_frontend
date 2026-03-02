import React from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import CategoryProfileCard from "./CategoryProfileCard";

function CategoryActionLeft(props) {
  console.log(props.rules);
  return (
    <div>
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <CategoryProfileCard
          handleRuleClick={props.handleRuleClick}
          rules={props.rules}
          currentRulesOpen={props.currentRulesOpen}
        //   recruitProAdvance={props.recruitProAdvance}
        //   handleRecruitProAdvance={props.handleRecruitProAdvance}
        />
      </FlexContainer>
    </div>
  );
}
export default CategoryActionLeft;