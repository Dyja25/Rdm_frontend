import React from "react";
import { StyledModal } from "../../../../../../../Components/UI/Antd";


import PartnerReactSpeechForm from "../../../OpportunityTab/Recruitment/child/PartnerReactSpeechForm";

const ReactPartnerSpeechModal = props => {
  const { addPartnerSpeechModal,handlePartnerReactSpeechModal } = props;
  console.log(props);
  return (
    <>
      <StyledModal
        title="Click to start Recording"
        // title={<FormattedMessage
        //   id="app.linkdelivery"
        //   defaultMessage="Link Delivery"
        // />}
        width="40vw"
        visible={addPartnerSpeechModal}
        maskClosable={false}
        destroyOnClose
        style={{ top: 40 }}
        // mask={false}
        // zIndex={1002}
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handlePartnerReactSpeechModal(false)}
        footer={null}
      >
        <PartnerReactSpeechForm
        partnerId={props. partnerId}
        />
      </StyledModal>
    </>
  );
};
export default ReactPartnerSpeechModal;
