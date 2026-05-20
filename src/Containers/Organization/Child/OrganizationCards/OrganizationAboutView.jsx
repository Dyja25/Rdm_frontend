import React, { Component } from "react";
import { Divider, Tooltip } from "antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FormattedMessage } from "react-intl";
class OrganizationAboutView extends Component {
  render() {
    const {
      organization: { industryType, tradeCurrency, companySize },
      toggleViewType,
    } = this.props;
    // console.log(highestLevel);
    return (
      <>
        <FlexContainer justifyContent="flex-end">
         <Tooltip title="Edit">
            <BorderColorIcon
              fontSize="small"
              onClick={toggleViewType}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </FlexContainer>
        {/* <OrganizationItemRow
          label="Fiscal"
          value={`${fiscalStartDate} ${fiscalStartMonth}`}
        /> */}
        <OrganizationItemRow //label="Reporting currency" 
        label={<FormattedMessage
                        id="app.reportingcurrency"
                        defaultMessage="Reporting currency"
                      />} 
        value={tradeCurrency} />
        <OrganizationItemRow //label="Company Size"
          label={<FormattedMessage
                        id="app.companysize"
                        defaultMessage="Company Size"
                      />} 
         value={companySize} />
        <OrganizationItemRow //label="Industry type" 
          label={<FormattedMessage
                        id="app.industrytype"
                        defaultMessage="Industry type"
                      />} 
        value={industryType} />
      </>
    );
  }
}

export default OrganizationAboutView;

const OrganizationItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600, width: 300 }}>
        {label}
      </SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "0.2rem" }}
      >
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
