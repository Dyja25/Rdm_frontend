import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal, StyledTabs } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const EducationDocumentForm = lazy(() => import("../../Profile/Child/ProfileTabs/ProfileBoost/Education/EducationDocumentForm"));
const EmployeeForm = lazy(() => import("./EmployeeForm"));
const TabPane = StyledTabs.TabPane;

class AddEmployeeModal extends Component {
  render() {
    const { addEmployeeModal, handleEmployeeModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="New Joinee"
          title={<FormattedMessage
            id="app.newjoinee"
            defaultMessage="New Joinee"
          />}

          width="55%"
          visible={addEmployeeModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleEmployeeModal(false)}
          footer={null}
        >
          {/* <Suspense fallback={<BundleLoader />}>
            <EmployeeForm />
          </Suspense> */}
          <StyledTabs defaultActiveKey="1">
            <TabPane tab={`Employee`} key="1">
              <div style={{ marginTop: 20 }}>
                <EmployeeForm />
              </div>
            </TabPane>
            {/* <TabPane tab={`Education`} key="2">
              <div style={{ marginTop: 20 }}>
                <EducationDocumentForm />
              </div>
            </TabPane> */}
          </StyledTabs>
        </StyledModal>
      </>
    );
  }
}

export default AddEmployeeModal;
