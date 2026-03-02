import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ExpenseForm=lazy(()=> import("./ExpenseForm"));

const AddExpenseModal = (props) => {
  const { addExpenseModal, handleExpenseModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        //title="Expense"
        title={<FormattedMessage
          id="app.expense"
          defaultMessage="Expense"
        />}
        width="60vw"
        visible={addExpenseModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleExpenseModal(false)}
        style={{ top: 40 }}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ExpenseForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddExpenseModal;
