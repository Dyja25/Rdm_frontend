import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

class CandidateDetailExtra extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { noticePeriod,noticeDetail,experience,location },
    } = this.props;
    // const extraData=;
    // const extraData1=address&&address.length&&address[0].street;
    // const extraData2=address&&address.length&&address[0].city;
    // const extraData3=address&&address.length&&address[0].state;
    // const extraData4=address&&address.length&&address[0].postalCode;
    return (
      <>
        <CandidateItemRow 
        // label="Notice Period" 
        label= {<FormattedMessage
            id="app.noticePeriod"
            defaultMessage="Notice Period"
          />}
         value={`${noticePeriod } months ${noticeDetail}`}/> 
        {/* <CandidateItemRow label="Notice Remarks" value={noticeDetail} /> */}
        <CandidateItemRow 
        // label="Experience"
         label= {<FormattedMessage
            id="app.experience"
            defaultMessage="Experience"
          />}
         value={experience} />
        {/* <CandidateItemRow label="Location" value={location} /> */}
        {/* <CandidateItemRow label="Postal Code" value={extraData4||""} /> */}
       
      </>
    );
  }
}
export default CandidateDetailExtra;

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



