import React, { lazy, Suspense } from "react";
import { useState } from "react";

import CandidateDateForm from "../Recruitment/CandidateDateForm.jsx"

import { BundleLoader } from "../../../../../../Components/Placeholder";

import { StyledModal } from "../../../../../../Components/UI/Antd";
// const RequirementForm = lazy(() => import("./RequirementForm"));

const AddCandidateDateModal = (props) => {
   
  const [visible, setVisible] = useState(true)
  console.log("profile1",props.profileId)
  // setTimeout(() => {
  //   return (
  //     setVisible(true)
  //   )
  // }, 3000)
  return (
 
    <>
      
      <StyledModal
        title="Date"
        width="25%"
        visible={props.addCandidateDateModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleCandidateDateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          < CandidateDateForm 
          //  candidateId={props.candidateId}
           // candidate={this.props.candidate}
           profileId={props.profileId}
          />
        


        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddCandidateDateModal;
