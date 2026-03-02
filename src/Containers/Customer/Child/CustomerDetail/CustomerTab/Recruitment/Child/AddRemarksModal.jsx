import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const RemarkForm = lazy(() => import("./RemarkForm"));

class AddRemarksModal extends Component {
  render() {
    const { addRemarksModal, handleRemarksModal, ...formProps } = this.props;
    console.log(this.props.stageList);
    return (
      <>
        <StyledModal
          // title="Remarks"
          title={<FormattedMessage id="app.remarks" defaultMessage="Remarks" />}
          width="25%"
          visible={addRemarksModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleRemarksModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <RemarkForm
              stageList={this.props.stageList}
              profileId={this.props.profileId}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddRemarksModal;
