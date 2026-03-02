import React, { Component } from "react";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip } from "antd";
class OrganizationOverviewView extends Component {
  render() {
    const {
      organization: { organizationName, imageId, imageURL },
      toggleViewType,
    } = this.props;
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer justifyContent="flex-start" flexWrap="nowrap">
            <div style={{ width: "3.75em" }}>
              <MultiAvatar
                primaryTitle={organizationName}
                imageId={imageId}
                imageURL={imageURL}
              />
            </div>
            <FlexContainer flexDirection="row">
              <Title fontSize={"1.375em"}>{organizationName}</Title>
              {/* <SubTitle>{designation}</SubTitle> */}
            </FlexContainer>
          </FlexContainer>
          <Tooltip title="Edit">
            <BorderColorIcon
              fontSize="small"
              onClick={toggleViewType}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </FlexContainer>

        {/* <SubTitle>{email}</SubTitle> */}
        {/* <SubTitle>{designation}</SubTitle> */}
      </>
    );
  }
}

export default OrganizationOverviewView;
