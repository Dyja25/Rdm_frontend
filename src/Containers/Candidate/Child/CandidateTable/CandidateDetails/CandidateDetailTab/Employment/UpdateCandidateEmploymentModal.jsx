import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateCandidateEmploymentForm = lazy(() =>
  import("../Employment/UpdateCandidateEmploymentForm.jsx")
);

class AddEmploymentModal extends Component {
  render() {
    const {
      updateCandidateEmploymentModal,
      handleCandidateUpdateEmploymentModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          //title="Employment"
          title={
            <FormattedMessage id="app.employment" defaultMessage="Employment" />
          }
          width="30%"
          visible={updateCandidateEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleCandidateUpdateEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCandidateEmploymentForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddEmploymentModal;
