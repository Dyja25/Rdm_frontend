import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";


const SequenceForm = lazy(() => import("./SequenceForm"));

class AddSequenceModal extends Component {
  render() {
    const { addSequenceModal, handleSequenceModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Sequence"
          width="50%"
          height="20vh"
          visible={addSequenceModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleSequenceModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <SequenceForm />
            

            {/* <SequenceTaskForm />
            <SequenceCallForm /> */}
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddSequenceModal;
