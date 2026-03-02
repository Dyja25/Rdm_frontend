import React, { Component } from "react";

import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../../../Components/UI/Layout";

class ContactView extends Component {
  render() {
    const {
      contact: { firstName, middleName, lastName },
    } = this.props;
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "85%" }}
          >
            {/* <div style={{ width: "20%" }}>
              {accountName && (
                <MultiAvatar
                  primaryTitle={accountName}
                  imageId={imageId}
                  imageURL={imageURL}
                />
              )}
            </div> */}
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "80%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {firstName} {middleName} {lastName}
              </Title>
              <SubTitle overflow="hidden" textOverflow="ellipsis">
                {/* {"accountName"} */}
              </SubTitle>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}

export default ContactView;
