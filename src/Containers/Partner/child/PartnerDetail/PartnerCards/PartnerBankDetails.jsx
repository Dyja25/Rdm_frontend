import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { Tooltip} from "antd";
import { FormattedMessage } from "react-intl";

import { EditOutlined } from "@ant-design/icons";
class PartnerBankDetails extends Component {
  render() {
    console.log(this.props.partner);
    const {
      partner: { businessRegistrationNumber, bankName, taxRegistrationNumber, accountNumber },user
    } = this.props;
    return (
      <>
        <FlexContainer justifyContent="flex-end">
            <Tooltip title="Edit">
              <EditOutlined
              
                onClick={this.props.toggleViewType}
                size="0.875em"
              />
           
            </Tooltip>
             
        </FlexContainer>
        <PartnerItemRow //label="Bussiness Reg. No." 
        label={
        <FormattedMessage id="app.bussinessRegNo" defaultMessage="Bussiness Reg. No." />
        }
        value={businessRegistrationNumber} />
        <PartnerItemRow //label= "Tax Reg. No." 
        label={
        <FormattedMessage id="app.taxRegNo" defaultMessage="Tax Reg. No." />
        }
        value={taxRegistrationNumber}/>
        <PartnerItemRow //label="Bank Name" 
        label={
        <FormattedMessage id="app.bankname" defaultMessage="Bank Name" />
        }
        value={bankName} />
        <PartnerItemRow // label="Account No." 
         label={
        <FormattedMessage id="app.accountNo" defaultMessage="Account No" />
        }
        value={accountNumber}/>
      </>
    );
  }
}
export default PartnerBankDetails;

const PartnerItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px" }}>{value}</SubTitle>
    </FlexContainer>
  );
};
