import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
const UpdateExpenseForm = lazy(() => import("./UpdateExpenseForm"));

const UpdateExpenseModal = (props) => {
  return (
    <>
      <StyledModal
        //title="Update Customer"

        title={<FormattedMessage
          id="app.updatecustomer"
          defaultMessage="Update Expense"
        />}
        width="60vw"
        // height="14vw"
        visible={props.updateExpenseModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateExpenseModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateExpenseForm  />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateExpenseModal;
