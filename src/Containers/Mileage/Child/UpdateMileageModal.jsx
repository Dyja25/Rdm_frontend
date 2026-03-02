import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateMileageForm=lazy(()=>import("./UpdateMileageForm"));

const UpdateMileageModal = (props) => {
  const { updateMileageModal, handleUpdateMileageModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        // title="Mileage"
        title={<FormattedMessage
          id="app.mileage"
          defaultMessage="Mileage"
        />}
        width="70%"
        visible={updateMileageModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleUpdateMileageModal(false)}
        style={{ top: 40 }}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateMileageForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateMileageModal;
