import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

const UpdateSalaryForm = lazy(() => import("./UpdateSalaryForm"));

class UpdateSalaryModal extends Component {
  render() {
    const {
      updateSalaryModal,
      handleUpdateSalaryModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          // title="Salary"
          title={<FormattedMessage
            id="app.salaray"
            defaultMessage="Salary"
          />}
          width="30%"
          visible={updateSalaryModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdateSalaryModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateSalaryForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdateSalaryModal;
