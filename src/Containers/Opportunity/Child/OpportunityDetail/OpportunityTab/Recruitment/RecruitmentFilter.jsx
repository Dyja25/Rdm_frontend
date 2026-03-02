import React from "react";
import { StyledSelect } from "../../../../../../Components/UI/Antd";
const Option = StyledSelect.Option;
function RecruitmentFilter(props) {
  console.log("myProps",props.SkillList)
  function handleChange(value) {
    // props.filter(value);
    console.log(value);
    props.handleSkillsetChoose(value);
  }
 
  return (
    <div>
      <StyledSelect
        // showArrow={false}
         defaultValue={props.skillName}
          // value={props.skillName || props.name}
         disabled={props.candidatetList}
        showSearch
        style={{ width: 120 }}
        placeholder="Filter Category"
         onChange={(e) => handleChange(e)}
      >
      {/* <Option value={"item"}>"item" </Option>; */}
        {props.SkillList.map((item) => {
          return <Option value={item}>{item} </Option>;
        })}
      </StyledSelect>
    </div>
  );
}
export default RecruitmentFilter;
