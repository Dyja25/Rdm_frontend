import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
const EmailSendForm = lazy(() => import("./EmailSendForm.jsx"));

const CandidateRowEmailModal = (props) => {
  const { addCandidateRowEmailModal,handleCandidateRowEmailModal,  ...formProps } = props;

  return (
    <>
      <StyledDrawer
        // title="Opportunity"
        title={<FormattedMessage
          id="app.email"
          defaultMessage="Email"
        />}
        width={400}
        visible={props.addCandidateRowEmailModal}
        // maskClosable={false}
        closable
        destroyOnClose
         maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
         style={{ top: "1.2em" }}
         onClose={() => props.handleCandidateRowEmailModal(false)}
        //  footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <EmailSendForm {...formProps} />
          {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CandidateRowEmailModal;
