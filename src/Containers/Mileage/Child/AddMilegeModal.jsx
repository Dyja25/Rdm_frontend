import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const MileageForm=lazy(()=>import("./MileageForm"));

const AddMileageModal = (props) => {
  const { addMileageModal, handleMileageModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        // title="Mileage"
        title={<FormattedMessage
          id="app.mileage"
          defaultMessage="Mileage"
        />}
        width="70%"
        visible={addMileageModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleMileageModal(false)}
        style={{ top: 40 }}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddMileageModal;
