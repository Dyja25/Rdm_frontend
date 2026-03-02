import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

 import SkillBarChartForm from "../../Recruitment/child/SkillBarChartForm.jsx";

const SkillBarChartModal = (props) => {
  const { ...formProps } = props;
  console.log("Post",props.candidatePostData)
  return (
    <>
      <StyledModal
        title="Description"
        width="70vw"
        visible={props.showBarChartModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleBarChartOrderModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <OrderJumpStart particularRowData={props.particularRowData} />
          <Spacer /> */}
          <SkillBarChartForm 
          skillsCount={props.skillsCount}
           candidatePostData={props.candidatePostData}
          //particularRowData={props.particularRowData} 
          />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default SkillBarChartModal;
