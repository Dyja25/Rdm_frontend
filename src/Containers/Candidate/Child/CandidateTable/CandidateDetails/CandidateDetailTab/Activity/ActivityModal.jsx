import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Icon } from "antd";

import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import ActivityTab from "./ActivityTab.jsx";

class ActivityModal extends Component {
  render() {
    const {
      addCandidateActivityModal,
      handleCandidateActivityModal,
      ...formProps
    } = this.props;

    return (
      <>
        <StyledModal
          title="Activity"
          visible={addCandidateActivityModal}
          width={"55vw"}
          bodyStyle={{ padding: 0 }}
          style={{ top: 40 }}
          maskClosable={false}
          destroyOnClose
          onCancel={() => handleCandidateActivityModal(false)}
          footer={null}
        >
          <FlexContainer alignItems="center" justifyContent="space-evenly">
            <ActivityTab />
          </FlexContainer>
        </StyledModal>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
