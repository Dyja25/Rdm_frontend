import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import PartnerOverviewCard from "../PartnerDetail/PartnerCards/PartnerOverviewCard.jsx";
import PartnerDetailCard from "./PartnerCards/PartnerDetailCard.jsx";
import PartnerTopicOfIntrest from "./PartnerCards/PartnerTopicOfIntrest.jsx";
import PartnerBankDetailsViewCard from "./PartnerCards/PartnerBankDetailsViewCard.jsx";
class PartnerDetailLeft extends Component {
  render() {
    const { partner } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <PartnerOverviewCard partner={partner} />
          <PartnerTopicOfIntrest partner={partner} />
          <PartnerDetailCard partner={partner} />
          <PartnerBankDetailsViewCard partner={partner}/>
        </FlexContainer>
      </>
    );
  }
}
export default PartnerDetailLeft;
