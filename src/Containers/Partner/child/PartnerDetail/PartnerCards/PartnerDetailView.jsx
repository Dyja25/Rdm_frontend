import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";

class PartnerDetailView extends Component {
  render() {
    console.log(this.props.partner);
    const {
      partner: { url, phoneNo,countryDialCode, sector,status,address },
    } = this.props;
    console.log(address)
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    const addressdata5=address&&address.length&&address[0].houseNo;
    const statusdata=status?"True":"False"
    return (
      <>
        <PartnerItemRow label="URL" value={url} />
        <PartnerItemRow label="Phone Number" 
    value= {`${countryDialCode || ""} ${phoneNo || ""}`}/>
        <PartnerItemRow label="Sector" value={sector} />
        <PartnerItemRow label="Status" value={statusdata} />
        <PartnerItemRow label="House No" value={addressdata5||""} />
        <PartnerItemRow label="Street" value={addressdata1||""} />
        <PartnerItemRow label="City" value={addressdata2||""} />
        <PartnerItemRow label="State" value={addressdata3||""} />
        <PartnerItemRow label="Postal Code" value={addressdata4||""} />
      </>
    );
  }
}
export default PartnerDetailView;

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
