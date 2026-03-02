import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import PersonalDocumentForm from "./PersonalDocumentForm.jsx";
import { FormattedMessage } from "react-intl";
class AddPersonalModal extends Component {
  render() {
    const { addPersonalModal, handlePersonalModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="Emergency Contact"
          title={
            <FormattedMessage
              id="app.emergencycontact"
              defaultMessage="Emergency Contact"
            />
          }
          width="55%"
          visible={addPersonalModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handlePersonalModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PersonalDocumentForm employeeId={this.props.employeeId}/>
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddPersonalModal;
