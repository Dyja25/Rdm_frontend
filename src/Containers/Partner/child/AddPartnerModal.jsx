import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
const AddPartnerForm=lazy(()=>import ("./AddPartnerForm.jsx"));

const AddPartnerModal = (props) => {
  return (
    <>
      <StyledModal
        // title="Partner"
        title={<FormattedMessage
          id="app.vendor"
          defaultMessage="Vendor"
        />}
        width="60%"
        visible={props.addPartnerModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => props.handlePartnerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AddPartnerForm />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddPartnerModal;
