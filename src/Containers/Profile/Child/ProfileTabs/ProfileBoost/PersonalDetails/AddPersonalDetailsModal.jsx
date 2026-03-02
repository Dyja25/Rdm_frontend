import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import PersonalDocumentForm from "../Personal/PersonalDocumentForm";
import PersonalDetailDocumentForm from "./PersonalDetailsDocumentForm.jsx";

import { FormattedMessage } from "react-intl";

// const BankDocumentForm = lazy(() =>
//     import("../Bank/BankDocumentForm")
// );

class AddPersonalDetailsModal extends Component {
  render() {
    const {
      addPersonalDetailsModal,
      handlePersonalDetailsModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          // title="Personal Details"
          title={
            <FormattedMessage
              id="app.personaldetails"
              defaultMessage="Personal Details"
            />
          }
          width="60%"
          visible={addPersonalDetailsModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handlePersonalDetailsModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PersonalDetailDocumentForm employeeId={this.props.employeeId}/>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddPersonalDetailsModal;
