import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class OpportunityReportDetails extends Component {
  render() {
    console.log(this.props.opportunity);
    const {
      opportunity: { customer },
      
    } = this.props;
    // console.log(recruiterDetails)
    // const recruiterName=recruiterDetails&&recruiterDetails.length&&recruiterDetails[0].fullName || "";
    return (
      <>
        <FlexContainer justifyContent="flex-end">
          
        </FlexContainer>
        <OpportunityItemRow //label="Customer"
          label={ <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />}
         value={customer} 
        />
      
      </>
    );
  }
}
export default OpportunityReportDetails;

const OpportunityItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      // style={{ margin: "5px" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px" ,overflow:"hidden",textOverflow:"ellipsis"}}>{value}</SubTitle>
    </FlexContainer>
  );
};
