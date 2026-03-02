import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const TrainingDocumentForm = lazy(() =>
  import("./TrainingDocumentForm.jsx")
);

class AddTrainingModal extends Component {
  render() {
    const { addTrainingModal, handleTrainingModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="Training"
          title={
            <FormattedMessage id="app.training" defaultMessage="Training" />
          }
          width="55%"
          // height="20vh"
          visible={addTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <TrainingDocumentForm employeeId={this.props.employeeId}/>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddTrainingModal;
