import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

const TrainingDocumentForm = lazy(() =>
    import("./TrainingDocumentForm")
);

class AddTrainingModal extends Component {
    render() {
        const { addTrainingModal, handleTrainingModal, ...formProps } = this.props;
        return (
            <>
                <StyledModal
                    //title="Training"
                    title={<FormattedMessage
                        id="app.training"
                        defaultMessage="Training"
                    />}
                    width="55%"
                    // height="20vh"
                    visible={addTrainingModal}
                    destroyOnClose

                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleTrainingModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <TrainingDocumentForm />
                    </Suspense>
                </StyledModal>
            </>
        );
    }
}

export default AddTrainingModal;
