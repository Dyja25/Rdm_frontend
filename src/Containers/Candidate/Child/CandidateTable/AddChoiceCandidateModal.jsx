
import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
 const CandidateChooseForm = lazy(() => import("../CandidateTable/CandidateChooseForm.jsx"));

const AddChoiceCandidateModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledModal
     title="Choose Fields"
    
        width="50%"
        visible={props.addCandidateChoiceModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleChoiceCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateChooseForm 
          selectedValue={props.selectedValue}
          selectedRowKeys={props.selectedRowKeys}
           handleCandidateEmailModal={props.handleCandidateEmailModal}
          {...formProps} 
          />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddChoiceCandidateModal;

