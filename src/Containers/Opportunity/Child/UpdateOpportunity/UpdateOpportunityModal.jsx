import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
const UpdateOpportunityForm = lazy(() => import("./UpdateOpportunityForm.jsx"));

const UpdateOpportunityModal = (props) => {
  return (
    <>
      <StyledModal
        //title="Update Opportunity"
        title={<FormattedMessage
          id="app.updateopportunity" 
          defaultMessage="Update Opportunity"
        />}
        width="47%"
        visible={props.updateOpportunityModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateOpportunityForm opportunityId={props.opportunityId} />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateOpportunityModal;
