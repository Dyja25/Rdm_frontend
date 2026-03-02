import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;


const StyledTimeinterval = styled.div`
  display: flex;
  flex-direction: row;
   @media (max-width: 640px) {
    display: none; /* hide spans on small screen */
  }
`;
const StyledSpan = styled.span`
  font-size: 0.75rem;
  color: ${(props) => (props.isSelected ? "#1890ff" : props.theme.color)};
  margin: 0.2rem 0.3rem;
  font-weight: 600;
  font-family:poppins;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)}
  cursor:  ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  /* & :: after {
    content: " | ";
  } */
`;
const StyledDropdown = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: block; /* only show dropdown on small screen */
    width: 100%;
  }
`;

            
{/* <div className=" font-poppins text-sm font-semibold " style={{color: `${(props) => (props.isSelected ? "#1890ff" : props.theme.color)}`, opacity: `${(props) => (props.disabled ? 0.3 : 1)}`,  cursor: ` ${(props) => (props.disabled ? "not-allowed" : "pointer")}`}} */}
class TimeInterval extends Component {
  render() {
    const { times, handleClick } = this.props;
    console.log(times);
     console.log(handleClick);
    return (
      <>
      <StyledTimeinterval>
        {/* <h1> Hiring Stats</h1> */}
        {times &&
          times.length &&
          times
            // .filter(time => time.starter || subscriptionType === "PROFESSIONAL")
            .map((time, i) => {
              //////////debugger;

              //////////debugger;
              return (
                <StyledSpan
                  key={i}
                  isSelected={time.isSelected}
                 onClick={() => handleClick(time)}
                
                >
                  {time.value}
                </StyledSpan>
              );
            })}
            
      </StyledTimeinterval>
      <StyledDropdown>
          <Select
            style={{ width: "100%" }}
            placeholder="Select Time"
            value={times.find((t) => t.isSelected)?.value}
            onChange={(val) => {
              const selectedTime = times.find((t) => t.value === val);
              handleClick(selectedTime);
            }}
          >
            {times &&
              times.length > 0 &&
              times.map((time, i) => (
                <Option key={i} value={time.value} disabled={time.disabled}>
                  {time.value}
                </Option>
              ))}
          </Select>
        </StyledDropdown>
        </>
    );
  }
}

TimeInterval.propTypes = {
  times: PropTypes.array,
};
const mapStateToProps = ({ auth }) => ({});
export default connect(mapStateToProps)(TimeInterval);
