import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";





const BankDocumentForm = lazy(() =>
    import("./BankDocumentForm")
);

class AddBankModal extends Component {
    render() {
        const { addBankModal, handleBankModal, ...formProps } = this.props;
        return (
            <>
                <StyledModal
                    //title="Bank"
                    title={<FormattedMessage
                        id="app.bank"
                        defaultMessage="Bank"
                    />}
                    width="25%"

                    visible={addBankModal}
                    destroyOnClose

                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleBankModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <BankDocumentForm />
                    </Suspense>
                </StyledModal>
            </>
        );
    }
}

export default AddBankModal;
