import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import Event from "../Event/Event";
import Task from "../Task/Task";
import Country from "./Country/Country";
const TabPane = StyledTabs.TabPane;

class CategoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      value: 1,
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    return (
      <>
        <FlexContainer flexWrap="nowrap">
        <div style= {{width:"46%"}}>
          <TabsWrapper>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
           
              <TabPane
                tab={
                  <>
                   <i class="far fa-calendar-check"></i>
                    <span style={{ marginLeft: "0.25em" }}>Event</span>
                  </>
                }
                key="1"
              >
                <Suspense>
                  <Event />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Task</span>
                  </>
                }
                key="2"
              >
                <Suspense>
                  <Task />
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Country</span>
                  </>
                }
                key="3"
              >
                <Suspense>
                  <Country />
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          </div>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryActivity);
