import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateCandidateEducationForm = lazy(() =>
  import("../Education/UpdateCandidateEducationForm.jsx")
);

class UpdateEducationModal extends Component {
  render() {
    const {
      updateCandidateEducationModal,
      handleUpdateCandidateEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          //title="Education"
          title={
            <FormattedMessage id="app.education" defaultMessage="Education" />
          }
          width="30%"
          visible={updateCandidateEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateCandidateEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCandidateEducationForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateEducationModal;
