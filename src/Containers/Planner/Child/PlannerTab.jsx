import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import CallForm from "../../Call/Child/CallForm.jsx";
import EventForm from "../../Event/Child/EventForm";
import TaskForm from "../../Task/Child/TaskForm.jsx";
import LeaveForm from "../../Leave/Child/Tab/LeaveForm.jsx";
import ProjectForm from "../../Project/ProjectForm";
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { FormattedMessage } from "react-intl";


const TabPane = StyledTabs.TabPane;

export class PlannerTab extends Component {
  render() {
    const {
      plannerStartDate,
      plannerEndDate,
      plannerStartTime,
      plannerEndTime,
    } = this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="2"
            style={{ overflow: "visible", width: "53vw", padding: "0.9375em" }}
            animated={false}
          >
            <TabPane
              tab={
                <span>
                  <PhoneIcon  />
                  {/* Calls */}
                  <FormattedMessage
                              id="app.calls"
                              defaultMessage="Calls"
                            />
                </span>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <CallForm
                  startDate={plannerStartDate}
                  endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <CalendarMonthIcon />
                  {/* Events */}
                  <FormattedMessage
                              id="app.event"
                              defaultMessage="Events"
                            />
                </span>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                <EventForm
                  // startDate={plannerStartDate}
                  // endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  {/* <Icon type="edit" /> */}
                  <i class="fas fa-tasks"></i> &nbsp;
                  {/* Tasks */}
                    <FormattedMessage
                              id="app.task"
                              defaultMessage="Tasks"
                            />
                </span>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                <TaskForm
                // startDate={plannerStartDate}
                // endDate={plannerEndDate}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="fas fa-luggage-cart"></i>&nbsp;
                  {/* Leaves */}
                  <FormattedMessage
                              id="app.leaves"
                              defaultMessage="Leaves"
                            />
                </span>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                <LeaveForm
                  // startDate={plannerStartDate}
                  // endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <span>
                  <Icon type="luggage-cart" />
                  Travel
                </span>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                <LeaveForm
                  startDate={plannerStartDate}
                  endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane> */}


            <TabPane
              tab={
                <span>
                  <WorkIcon />
                  {/* Projects */}
                  <FormattedMessage
                              id="app.project"
                              defaultMessage="Projects"
                            />
                </span>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                <ProjectForm
                  startDate={plannerStartDate}
                  endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      </>
    );
  }
}

const mapStateToProps = ({ planner }) => ({
  plannerStartDate: planner.plannerStartDate,
  plannerEndDate: planner.plannerEndDate,
  plannerStartTime: planner.plannerStartTime,
  plannerEndTime: planner.plannerEndTime,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerTab);
