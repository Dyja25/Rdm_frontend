import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
// import PersonalDocumentForm from "../Personal/PersonalDocumentForm";
// import UpdatePersonalDetailDocumentForm from "./UpdatePersonalDetailsDocumentForm";





const UpdatePersonalDetailsDocumentForm = lazy(() =>
    import("./UpdatePersonalDetailsDocumentForm")
);

class UpdatePersonalDetailsModal extends Component {
    render() {
        const { updatePersonalDetailsModal, handleUpdatePersonalDetailsModal, ...formProps } = this.props;
        return (
            <>
                <StyledModal
                    //title="Personal Details"
                    title={<FormattedMessage
                        id="app.personaldetails"
                        defaultMessage="Personal Details"
                      />}
                    width="60%"

                    visible={updatePersonalDetailsModal}
                    destroyOnClose

                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleUpdatePersonalDetailsModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UpdatePersonalDetailsDocumentForm />
                    </Suspense>
                </StyledModal>
            </>
        );
    }
}

export default UpdatePersonalDetailsModal;
