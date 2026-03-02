import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const CandidateEducationForm = lazy(() =>
  import("../Education/CandidateEducationForm.jsx")
);

class AddCandidateEducationModal extends Component {
  render() {
    const {
      addCandidateEducationModal,
      handleCandidateEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          // title="Education"
          title={
            <FormattedMessage id="app.education" defaultMessage="Education" />
          }
          width="60%"
          visible={addCandidateEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleCandidateEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <CandidateEducationForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddCandidateEducationModal;
