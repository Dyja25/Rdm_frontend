import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CandidateForm = lazy(() => import("./CandidateForm.jsx"));

const AddCandidateModal = props => {
  const { addCandidateModal, handleCandidateModal,responseData, ...formProps } = props;
  return (
    <>
      <StyledModal
        //title="Candidate"
        title={<FormattedMessage
          id="app.candidate"
          defaultMessage="Candidate"
        />}
        width="65%"
        visible={addCandidateModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => handleCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateForm {...formProps} responseData={responseData} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddCandidateModal;
