import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";

class CandidateOverView extends Component {
  render() {
    const {
      candidate: { firstName, middleName, lastName },
      toggleViewType,
      candidate,
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
                primaryTitle={candidate.firstName}
                imageId={candidate.imageId}
                imageURL={candidate.imageURL}
              />
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${firstName || ""} ${middleName || ""} ${lastName || ""}`}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}
export default CandidateOverView;
