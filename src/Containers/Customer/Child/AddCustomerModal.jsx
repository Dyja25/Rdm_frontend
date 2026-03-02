import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
const CustomerForm = lazy(() => import("./CustomerForm.jsx"));

const AddCustomerModal = (props) => {
  return (
    <>
      <StyledModal
        // title="Customer"
        title={<FormattedMessage
          id="app.customer"
          defaultMessage="Customer"
        />}
        width="60%"
        visible={props.addCustomerModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => props.handleCustomerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerForm />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddCustomerModal;
