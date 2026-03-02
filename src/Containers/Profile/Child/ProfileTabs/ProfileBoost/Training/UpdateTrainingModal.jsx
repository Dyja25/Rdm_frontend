import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateTrainingForm = lazy(() => import("./UpdateTrainingForm"));

class UpdateTrainingModal extends Component {
  render() {
    const {
      updateTrainingModal,
      handleUpdateTrainingModal,
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
          visible={updateTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateTrainingForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateTrainingModal;
