import React, { lazy, Suspense } from "react";
import { useState } from "react";


import { BundleLoader } from "../../../../../../Components/Placeholder";

import { StyledModal } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const RequirementDetailForm = lazy(() => import("./RequirementDetailForm.jsx"));

const AddRequirementDetailModal = (props) => {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <StyledModal
        title={ <FormattedMessage
                        id="app.requirement"
                        defaultMessage="Requirement"
                      />}
        width="58%"
        visible={props.addRequirementDetailModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleAddRequiremenDetailtModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {visible && < RequirementDetailForm />
          }


        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddRequirementDetailModal;
