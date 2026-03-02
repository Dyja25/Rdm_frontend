import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class PartnerOverView extends Component {
  render() {
    const {
      partner: { partnerName },
      toggleViewType,
      partner,
    } = this.props;

    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "25%" }}>
              <MultiAvatar
                primaryTitle={partner.partnerName}
                imageId={partner.imageId}
                imageURL={partner.imageURL}
              />
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"22px"}
              >
                {`${partnerName || ""}`}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}
export default PartnerOverView;
