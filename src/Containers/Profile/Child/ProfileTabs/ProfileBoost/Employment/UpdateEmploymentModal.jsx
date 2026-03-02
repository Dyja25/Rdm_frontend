import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateEmploymentForm = lazy(() =>
  import("./UpdateEmploymentForm")
);

class AddEmploymentModal extends Component {
  render() {
    const {
      updateEmploymentModal,
      handleUpdateEmploymentModal,
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
          visible={updateEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateEmploymentForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddEmploymentModal;
