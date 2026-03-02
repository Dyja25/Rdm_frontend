import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const UpdateCustomerOpportunityForm = lazy(() => import("./UpdateCustomerOpportunityForm"));

const AddCustomerUpdateOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledModal
        // title="Opportunity"
        title={
          <FormattedMessage id="app.opportunity" defaultMessage="Opportunity" />
        }
        width="45%"
        visible={props.addUpdateCustomerOpportunityModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateCustomerOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerOpportunityForm opportunityId={props.opportunityId} /> {" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddCustomerUpdateOpportunityModal;
