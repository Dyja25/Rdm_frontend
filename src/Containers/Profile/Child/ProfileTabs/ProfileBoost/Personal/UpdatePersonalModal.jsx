import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import UpdatePersonalForm from "./UpdatePersonalForm";
import { FormattedMessage } from "react-intl";
class UpdatePersonalModal extends Component {
  render() {
    const {
      updatePersonalModal,
      handleUpdatePersonalModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          //title="Emergency Contact "
          title={
            <FormattedMessage
              id="app.emergencycontact"
              defaultMessage="Emergency Contact"
            />
          }
          width="35%"
          visible={updatePersonalModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleUpdatePersonalModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdatePersonalForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default UpdatePersonalModal;
