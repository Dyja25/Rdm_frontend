import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ProfileForm = lazy(() => import("./ProfileForm.jsx"));

const AddTagProfileModal = (props) => {
  return (
    <>
      <StyledModal
        // title="Tag Position"
        title={<FormattedMessage
          id="app.tagposition"
          defaultMessage="Tag Position"
        />}
        width="24%"
        visible={props.addTagProfileModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleTagProfileModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProfileForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddTagProfileModal;
