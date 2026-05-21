import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import Documents from "../Documents/Documents"
import Education from "../Educations/Education"
import Expense from "../Expense/Expense";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IdProofs from "../Id Proof/IdProofs";
const TabPane = StyledTabs.TabPane;

class OthersTab extends Component {
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
        <div style= {{width:"100%"}}>
          <TabsWrapper style={{height:"90.3vh"}}>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
             
              <TabPane
                tab={
                  <>
                    <i class="fas fa-vector-square"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* Documents */}
                      <FormattedMessage
                        id="app.documents"
                        defaultMessage="Documents"
                       />
                      </span>
                  </>
                }
                key="1"
              >
                <Suspense>
                  
                  <Documents/>
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                    <i class="fa fa-graduation-cap"></i>
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* Education */}
                       <FormattedMessage
                        id="app.education"
                        defaultMessage="Education"
                       />
                      </span>
                  </>
                }
                key="2"
              >
                <Suspense>
                  <Education />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                    
                    <span 
                    // style={{ marginLeft: "0.25em" }}
                    >
                    {/* Expense */}
                     <FormattedMessage
                        id="app.expense"
                        defaultMessage="Expense"
                       />
                     </span>
                  </>
                }
                key="3"
              >
                <Suspense>
                  <Expense />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                    {/* <FontAwesomeIcon icon={solid('id-card-clip')} /> */}
                    <span style={{ marginLeft: "0.25em" }}>
                      {/* Id Proof */}
                   <FormattedMessage
                        id="app.idproof"
                        defaultMessage="Id Proof"
                       />
                    </span>
                  </>
                }
                key="4"
              >
                <Suspense>
                  <IdProofs/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OthersTab);




