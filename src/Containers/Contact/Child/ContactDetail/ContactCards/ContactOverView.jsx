import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class ContactOverView extends Component {
  render() {
    const {
      contact: { salutation, firstName, middleName, lastName },
      toggleViewType,
    } = this.props;
    const fullName = `${salutation || ""} ${firstName || ""} ${middleName ||
      ""} ${lastName || ""} `;
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "70%" }}
          >
            <div style={{ width: "25%" }}>
              <MultiAvatar />
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "70%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {` ${fullName || ""} `}
              </Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}
export default ContactOverView;
