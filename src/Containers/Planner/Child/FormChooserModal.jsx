import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../Components/UI/Antd";
import { FlexContainer } from "../../../Components/UI/Layout";

import { handleChooserModal } from "../PlannerAction";
import PlannerTab from "./PlannerTab.jsx";

class FormChooserModal extends React.Component {
  render() {
    const {
      chooserModal,
      handleChooserModal,
      handleCallModal,
      handleEventModal,
      handleTaskModal,
    } = this.props;
    return (
      <>
        <StyledModal
          //    title="Schedule"

          title={<FormattedMessage
            id="app.schedule"
            defaultMessage="Schedule"
          />}
          visible={chooserModal}
          width={"55vw"}
          bodyStyle={{ padding: 0 }}
          style={{ overflow: "visible", top: 40 }}
          maskClosable={false}
          destroyOnClose
          onCancel={() => handleChooserModal(false)}
          footer={null}
        >
          <FlexContainer alignItems="center" justifyContent="space-evenly">
            <PlannerTab />
          </FlexContainer>
        </StyledModal>
      </>
    );
  }
}

const mapStateToProps = ({ call, event, task, planner, leave }) => ({
  chooserModal: planner.chooserModal,
  callModal: call.callModal,
  eventModal: event.eventModal,
  taskModal: task.taskModal,
  leaveModal: leave.leaveModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleChooserModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormChooserModal);
