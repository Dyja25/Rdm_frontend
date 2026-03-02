import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateEducationForm = lazy(() =>
  import("./UpdateEducationForm")
);

class UpdateEducationModal extends Component {
  render() {
    const {
      updateEducationModal,
      handleUpdateEducationModal,
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
          visible={updateEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateEducationForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateEducationModal;
