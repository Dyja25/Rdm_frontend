import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CalendarInstance } from "../../../../Components/Utils";
import dayjs from "dayjs";
import {
  MainWrapper,
} from "../../../../Components/UI/Layout";
import FormChooserModal from "../FormChooserModal.jsx";
import { handleChooserModal, setPlannerDate } from "../../PlannerAction";
import {
  getCallsListByUserId,
  getEventsListByUserId,
  getTasksListByUserId,
  getTasksListByAdmin,
  getLeavesByUserId,
} from "../../../Auth/AuthAction";

import {
  eventSelector,
  callSelector,
  taskSelector,
  leaveSelector,
  holidaySelector,
} from "../../PlannerSelector.jsx";
import AddEventModal from "../../../Event/Child/AddEventModal.jsx";
import AddCallModal from "../../../Call/Child/AddCallModal.jsx";
import AddTaskModal from "../../../Task/Child/AddTaskModal.jsx";
import AddLeavesModal from "../../../Leave/Child/Tab/AddLeavesModal.jsx";
// import AddProjectModal from "../../../Project/AddProjectModal.jsx";
import { handleLeavesModal } from "../../../Leave/LeavesAction";
import { handleEventModal } from "../../../Event/EventAction";
import { handleCallModal } from "../../../Call/CallAction";
import { handleTaskModal } from "../../../Task/TaskAction";
import { getHoliday } from "../../../Holiday/HolidayAction";
import { handleProjectModal } from "../../../Project/ProjectAction.js";
// import { LeavesReducer } from "../../../Leave/LeavesReducer";
export class PlannerCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvent: {},
      selectedCall: {},
      selectedTask: {},
      selectedLeaves: {},
      selectedProject: {},
    };
  }
  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color;
    var color = event.fontColor;
    var style = {
      backgroundColor: backgroundColor,
      // animation: animation,
      borderRadius: "0.1875em",
      padding: 0,
      paddingLeft: "0.3rem",
      opacity: 0.8,
      color: color,
      fontWeight: 600,
      border: "0em",
      display: "block",
    };
    return {
      style: style,
    };
  };

  componentDidMount() {
    const {
      getCallsListByUserId,
      getEventsListByUserId,
      getTasksListByUserId,
      getLeavesByUserId,
      getHoliday,
      getTasksListByAdmin,
      userDetails: { userId,role },
    } = this.props;
    getCallsListByUserId(userId);
    getEventsListByUserId(userId);
    getLeavesByUserId(userId); 
    // getTasksListByUserId(userId);
    getHoliday();
    if (role === 'ADMIN') {
      getTasksListByAdmin(userId);
    } else {
      getTasksListByUserId(userId);
    }
  }

  onSelectEvent = (e) => {
    console.log(e);
    if (e.type === "event") {
      this.props.handleEventModal(true);
      this.setState({ selectedEvent: e.data });
    }
    if (e.type === "call") {
      this.props.handleCallModal(true);
      this.setState({ selectedCall: e.data });
    }
    if (e.type === "task") {
      this.props.handleTaskModal(true);
      this.setState({ selectedTask: e.data });
    }
    if (e.type === "leave") {
      this.props.handleLeavesModal(true);
      this.setState({ selectedLeaves: e.data });
    }
    if (e.type === "project") {
      this.props.handleProjectModal(true);
      this.setState({ selectedProject: e.data });
    }
  };

  render() {
    const {
      handleChooserModal,
      setPlannerDate,
      events,
      calls,
      tasks,
      leaves,
      holidays,
      projects,
      addCallModal,
      addEventModal,
      addTaskModal,
      addLeavesModal,
      //addProjectModal,
      handleCallModal,
      handleEventModal,
      handleTaskModal,
      handleLeavesModal,
      handleProjectModal,
    } = this.props;
    return (
      <MainWrapper>
        <CalendarInstance
          selectable
          handleChooserModal={handleChooserModal}
          eventPropGetter={this.eventStyleGetter}
          onSelectSlot={setPlannerDate}
          onSelectEvent={this.onSelectEvent}
          events={[...calls, ...events, ...tasks, ...leaves, ...holidays]}
        />
        <FormChooserModal />
        <AddEventModal
          isEditing
          prefillEvent={{
            ...this.state.selectedEvent,
            startDate: dayjs(this.state.selectedEvent.startDate),
            endDate: dayjs(this.state.selectedEvent.endDate),
            startTime: dayjs(this.state.selectedEvent.startDate),
            endTime: dayjs(this.state.selectedEvent.endDate),
          }}
          addEventModal={addEventModal}
          handleEventModal={handleEventModal}
        />
        <AddCallModal
          isEditing
          prefillCall={{
            ...this.state.selectedCall,

            startDate: dayjs(this.state.selectedCall.startDate),
            endDate: dayjs(this.state.selectedCall.endDate),
            startTime: dayjs(this.state.selectedCall.startDate),
            endTime: dayjs(this.state.selectedCall.endDate),
          }}
          addCallModal={addCallModal}
          handleCallModal={handleCallModal}
        />
        <AddTaskModal
          addTaskModal={addTaskModal}
          handleTaskModal={handleTaskModal}
          selectedTask={this.state.selectedTask}
          isEditing
          prefillTask={{
            ...this.state.selectedTask,

            startDate: dayjs(this.state.selectedTask.startDate),
            endDate: dayjs(this.state.selectedTask.endDate),
            startTime: dayjs(this.state.selectedTask.startDate),
            endTime: dayjs(this.state.selectedTask.endDate),
          }}
        />
        <AddLeavesModal
          addLeavesModal={addLeavesModal}
          handleLeavesModal={handleLeavesModal}
          selectedLeaves={this.state.selectedLeaves}
          isEditing
          prefillLeave={{
            ...this.state.selectedLeaves,

            startDate: dayjs(this.state.selectedLeaves.startDate),
            endDate: dayjs(this.state.selectedLeaves.endDate),
          }}
        />

        {/* <AddProjectModal
          isEditing
          prefillEvent={{
            ...this.state.selectedProject,
            startDate: dayjs(this.state.selectedProject.startDate),
            endDate: dayjs(this.state.selectedProject.endDate),
            startTime: dayjs(this.state.selectedProject.startDate),
            endTime: dayjs(this.state.selectedProject.endDate),
          }}
          addProjectModal={addProjectModal}
          handleProjectModal={handleProjectModal}
        /> */}
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({ auth, leave, call, event, task, holiday, project }) => ({
  userDetails: auth.userDetails,
  fetchingCallsListByUserId: auth.fetchingCallsListByUserId,
  callsListByUserId: auth.callsListByUserId,
  fetchingEventsListByUserId: auth.fetchingEventsListByUserId,
  eventsListByUserId: auth.eventsListByUserId,
  fetchingTasksListByUserId: auth.fetchingTasksListByUserId,
  tasksListByUserId: auth.tasksListByUserId,
  fetchingLeavesByUserId: auth.fetchingLeavesByUserId,
  fetchingLeavesByUserIdError: auth.fetchingLeavesByUserIdError,
  leavesListByUserId: auth.leavesListByUserId,
  calls: callSelector(auth),
  events: eventSelector(auth),
  tasks: taskSelector(auth),
  leaves: leaveSelector(auth),
  holidays: holidaySelector(holiday),
  // projects: projectSelector(auth),
  addCallModal: call.addCallModal,
  addEventModal: event.addEventModal,
  addTaskModal: task.addTaskModal,
  addLeavesModal: leave.addLeavesModal,
  //addProjectModal: project.addProjectModal,
  tasksListByAdmin:auth.tasksListByAdmin,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleChooserModal,
      setPlannerDate,
      getCallsListByUserId,
      getEventsListByUserId,
      getTasksListByUserId,
      getLeavesByUserId,
      handleEventModal,
      handleCallModal,
      handleTaskModal,
      handleLeavesModal,
      handleProjectModal,
      getHoliday,
      getTasksListByAdmin
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlannerCalendar);
