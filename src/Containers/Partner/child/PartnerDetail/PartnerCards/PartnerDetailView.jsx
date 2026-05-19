import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

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
        <PartnerItemRow // label="URL" 
         label={<FormattedMessage
            id="app.url"
            defaultMessage="URL"
          />}
        value={url} />
        <PartnerItemRow //label="Phone Number"
          label={<FormattedMessage
                     id="app.phoneNumber"
                     defaultMessage="Phone Number"
                   />}
    value= {`${countryDialCode || ""} ${phoneNo || ""}`}/>
        <PartnerItemRow label="Sector" value={sector} />
        <PartnerItemRow //label="Status" 
         label={<FormattedMessage
            id="app.status"
            defaultMessage="Status"
          />}
        value={statusdata} />
        <PartnerItemRow //label="House No" 
         label={<FormattedMessage
            id="app.houseNo"
            defaultMessage="House No"
          />}
        value={addressdata5||""} />
        <PartnerItemRow //label="Street" 
         label={<FormattedMessage 
            id="app.street"
            defaultMessage="Street"
          />}
        value={addressdata1||""} />
        <PartnerItemRow //label="City" 
         label={<FormattedMessage 
            id="app.city"
            defaultMessage="City"
          />}
        value={addressdata2||""} />
        <PartnerItemRow //label="State"
         label={<FormattedMessage 
            id="app.state"
            defaultMessage="State"
          />}
         value={addressdata3||""} />
        <PartnerItemRow  //label="Postal Code" 
        label={<FormattedMessage 
            id="app.postalCode"
            defaultMessage="Postal Code"
          />}
        value={addressdata4||""} />
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
