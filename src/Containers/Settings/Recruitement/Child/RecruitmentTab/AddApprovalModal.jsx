import React, { lazy, Suspense } from "react";
import { handleApprovalModal } from "../../../SettingsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ApprovalForm from "./ApprovalForm";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
// import SchedulerTab from "../CustomerScheduler/SchedulerTab.";
// import CustomerOrderTable from "./CustomerOrderTable";

const AddApprovalModal = (props) => {
  // console.log(props.contactId);
  const { addRecruitmentApprovalModal, handleApprovalModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Approval"
        width="40vw"
        visible={props.addRecruitmentApprovalModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleApprovalModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CustomerOrderTable
            contactId={props.contactId}
          // orderCustomerId={props.orderCustomerId}
          /> */}
          <ApprovalForm 
          recruitmentProcessId={props.recruitmentProcessId}
          stageId={props.stageId}
          />
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ settings }) => ({
  addRecruitmentApprovalModal:settings.addRecruitmentApprovalModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleApprovalModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddApprovalModal);

// export default AddApprovalModal;
