import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

class CandidateAddressView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { noticePeriod,noticeDetail,experience,address,location },
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    const addressdata5=address&&address.length&&address[0].country;
    const addressdata6=address&&address.length&&address[0].houseNo;
    return (
      <>
       <CandidateItemRow label="House No" value={addressdata6||""} />
        <CandidateItemRow label="Street" value={addressdata1||""} />
        <CandidateItemRow label="City" value={addressdata2||""} />
        <CandidateItemRow label="State" value={addressdata3||""} />
        <CandidateItemRow label="Pin Code" value={addressdata4||""} />
        <CandidateItemRow label="Country" value={addressdata5||""} />
       
       
      </>
    );
  }
}
export default CandidateAddressView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</SubTitle>
    </FlexContainer>
  );
};



