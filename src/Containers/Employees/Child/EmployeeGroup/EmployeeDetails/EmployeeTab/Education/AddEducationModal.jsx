import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

const EducationDocumentForm = lazy(() =>
  import("./EducationDocumentForm")
);

class AddEducationModal extends Component {
  render() {
    const {
      addEducationModal,
      handleEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          // title="Education"
          title={<FormattedMessage
            id="app.education"
            defaultMessage="Education"
          />}
          width="60%"
          visible={addEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EducationDocumentForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddEducationModal;
