import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateCandidateTrainingForm = lazy(() =>
  import("../Training/UpdateCandidateTrainingForm.jsx")
);

class UpdateCandidateTrainingModal extends Component {
  render() {
    const {
      updateCandidateTrainingModal,
      handleUpdateCandidateTrainingModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          //title="Training"
          title={
            <FormattedMessage id="app.training" defaultMessage="Training" />
          }
          width="30%"
          // height="20vh"
          visible={updateCandidateTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateCandidateTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCandidateTrainingForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateCandidateTrainingModal;
