import React, { useEffect, lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { getProcess } from "../../../Settings/SettingsAction";
const MessagingForm = lazy(() => import("./MessagingForm"));
const SlaForm = lazy(() => import("./SlaForm"));

const TabPane = StyledTabs.TabPane;

function ExclasionTab(props) {
  const [currentProcess, setCurrentProcess] = useState([]);
  useEffect(() => {
    props.getProcess();
  }, []);

  function handleProcessClick(item) {
    setCurrentProcess(item);
    // props.getSla(item.processId);

    // console.log(this.state.currentProcess)
  }
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
          {props.Process.map((item, i) => {
            return (
              <TabPane
                key={i}
                tab={
                  <span onClick={() => handleProcessClick(item)}>
                    {item.processName}
                  </span>
                }
              ></TabPane>
            );
          })}
        </StyledTabs>
      </TabsWrapper>

      {currentProcess.processId && (
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" type="card">
            <TabPane tab={`Service Level Agreement`} key="1">
              <div style={{ marginTop: 20 }}>
                <SlaForm processId={currentProcess.processId} />
              </div>
            </TabPane>
            <TabPane tab={`Messaging`} key="2">
              <div style={{ marginTop: 20 }}>
                {/* <MessagingForm processId={currentProcess.processId} /> */}
              </div>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      )}
    </>
  );
}

const mapStateToProps = ({ settings, rule }) => ({
  Process: settings.Process,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getProcess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExclasionTab);
