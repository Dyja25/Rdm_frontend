import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const EducationDocumentForm = lazy(() =>
  import("./EducationDocumentForm.jsx")
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
          title={
            <FormattedMessage id="app.education" defaultMessage="Education" />
          }
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
            <EducationDocumentForm employeeId={this.props.employeeId}/>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddEducationModal;
