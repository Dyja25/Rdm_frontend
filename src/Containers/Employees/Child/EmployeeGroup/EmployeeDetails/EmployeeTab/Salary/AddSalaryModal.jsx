import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import SalaryDocumentForm from "./SalaryDocumentForm";


class AddSalaryModal extends Component {
    render() {
        const { addSalaryModal, handleSalaryModal, ...formProps } = this.props;
        return (
            <>
                <StyledModal
                    //title="Salary"
                    title={<FormattedMessage
                        id="app.salary"
                        defaultMessage="Salary"
                    />}
                    width="49%"
                    visible={addSalaryModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleSalaryModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <SalaryDocumentForm />
                    </Suspense>
                </StyledModal>
            </>
        );
    }
}

export default AddSalaryModal;
