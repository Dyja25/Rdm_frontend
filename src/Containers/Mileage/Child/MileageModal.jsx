import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";

const EmployeeForm = lazy(() => import("../Child/EmployeeForm"));

class MileageModal extends Component {
  render() {
    const { addMileageModal, handleMileageModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Enroll Employee"
          width="50%"
          visible={addMileageModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleMileageModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EmployeeForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default MileageModal;
