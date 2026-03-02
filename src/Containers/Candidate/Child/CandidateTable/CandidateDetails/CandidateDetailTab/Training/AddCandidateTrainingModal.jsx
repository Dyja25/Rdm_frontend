import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const CandidateTrainingForm = lazy(() =>
  import("../Training/AddCandidateTrainingForm.jsx")
);

class AddCandidateTrainingModal extends Component {
  render() {
    const {
      addCandidateTrainingModal,
      handleCandidateTrainingModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          //title="Training"
          title={
            <FormattedMessage id="app.training" defaultMessage="Training" />
          }
          width="55%"
          // height="20vh"
          visible={addCandidateTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleCandidateTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <CandidateTrainingForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddCandidateTrainingModal;
