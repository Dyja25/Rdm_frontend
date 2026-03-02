import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class CustomerOverView extends Component {
  render() {
    const {
      customer: { name },
      toggleViewType,
      customer,
    } = this.props;

    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "15%" }}>
              <MultiAvatar
                primaryTitle={customer.name}
                imageId={customer.imageId}
                imageURL={customer.imageURL}
              />
            </div>
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${name || ""}`}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}
export default CustomerOverView;
