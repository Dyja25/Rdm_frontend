import React, { Component } from "react";


 import CandidateCatagory from "./CandidateCatagory.jsx";
class CandidateCatagoryView extends Component {
  render() {
    const { candidate, toggleViewType, notAdd } = this.props;
    console.log(candidate);
    return (
      <>
        {/* <Title
          fontSize="0.8125em"
          style={{ fontWeight: 600, marginBottom: "0.2rem" }}
        >
          Category {" "}
        </Title> */}
         <CandidateCatagory candidate={candidate} /> 
      </>
    );
  }
}

export default CandidateCatagoryView;
