import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
 const CandidateFilterForm = lazy(() => import("../Child/CandidateFilterForm.jsx"));

const AddCandidateFilterModal = props => {
  const { addCandidateFilterModal, handleCandidateFilterModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Filter Talent"
        // title={<FormattedMessage
        //   id="app.candidate"
        //   defaultMessage="Candidate"
        // />}
        width="55%"
        visible={addCandidateFilterModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleCandidateFilterModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateFilterForm 
          // {...formProps}
          //  responseData={responseData} 
           />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddCandidateFilterModal;
