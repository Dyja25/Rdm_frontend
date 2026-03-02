import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const EmploymentDocumentForm = lazy(() =>
  import("./EmploymentDocumentForm.jsx")
);

class AddEmploymentModal extends Component {
  render() {
    const {
      addEmploymentModal,
      handleEmploymentModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          // title="Employment"
          title={
            <FormattedMessage id="app.employment" defaultMessage="Employment" />
          }
          width="55%"
          visible={addEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EmploymentDocumentForm employeeId={this.props.employeeId}/>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddEmploymentModal;
