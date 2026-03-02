import React from "react";
import { StyledSelect } from "../../../../../../Components/UI/Antd";
const Option = StyledSelect.Option;
function RecruitmentFilter(props) {
  function handleChange(value) {
    props.filter(value);
  }
  return (
    <>
      <StyledSelect
        // showArrow={false}
        value={props.name || undefined}
        disabled={props.stageInd || props.approveInd || props.rejectInd}
        showSearch
        style={{ width: 120 }}
        placeholder="Filter Category"
        onChange={(e) => handleChange(e)}
      >
        {props.category.map((item) => {
          return <Option value={item}>{item} </Option>;
        })}
      </StyledSelect>
    </>
  );
}
export default RecruitmentFilter;
