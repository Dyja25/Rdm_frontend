import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { Menu, Popover } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sector from "../Sectors/Sectors";
import Designation from "../Designation/Designation";
import Department from "../Department/Department";
import Role from "./Role/Role";
import RoleTalent from "./Role/RoleTalent";
// import IdProof from "../Id Proof/IdProof";
const TabPane = StyledTabs.TabPane;

class Category extends Component {
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
                     
                    <span>
                    {/* <Icon type="file"/> */}
                    Sector 
                      </span>
                  </>
                }
                key="0"
              >
                <Suspense>
                <Sector />
                </Suspense>
              </TabPane>
              {/* <TabPane
                tab={
                  <>
                    <i class="fas fa-vector-square"></i>
                    <span style={{ marginLeft: "0.25em" }}>Documents</span>
                  </>
                }
                key="1"
              >
                <Suspense>
                  
                  <Documents/>
                </Suspense>
              </TabPane> */}
              
              {/* <TabPane
                tab={
                  <>
                    <i class="fa fa-graduation-cap"></i>
                    <span style={{ marginLeft: "0.25em" }}>Education</span>
                  </>
                }
                key="2"
              >
                <Suspense>
                  <Education />
                </Suspense>
              </TabPane> */}

              {/* <TabPane
                tab={
                  <>
                    
                    <span 
                    // style={{ marginLeft: "0.25em" }}
                    >
                    <Icon type="database" style={{ color: "black" }}/>Expense
                     </span>
                  </>
                }
                key="3"
              >
                <Suspense>
                  <Expense />
                </Suspense>
              </TabPane> */}

              <TabPane
                tab={
                  <>
                   <i class="fas fa-building"></i>
                    <span style={{ marginLeft: "0.25em" }}>Department</span>
                  </>
                }
                key="4"
              >
                <Suspense>
                  <Department />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                  {/* <FontAwesomeIcon icon={solid('user-tie')} /> */}

                    <span style={{ marginLeft: "0.25em" }}>Role (Internal)</span>
                  </>
                }
                key="5"
              >
                <Suspense>
                  <Role />
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                  {/* <FontAwesomeIcon icon={solid('user-tie')} /> */}

                    <span style={{ marginLeft: "0.25em" }}>Role (Talent)</span>
                  </>
                }
                key="6"
              >
                <Suspense>
                  <RoleTalent />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                    <i class="fab fa-artstation"></i>
                    <span style={{ marginLeft: "0.25em" }}>Designation</span>
                  </>
                }
                key="7"
              >
                <Suspense>
                  <Designation />
                </Suspense>
              </TabPane>

              {/* <TabPane
                tab={
                  <>
                    <FontAwesomeIcon icon={solid('id-card-clip')} />
                    <span style={{ marginLeft: "0.25em" }}>Id Proof</span>
                  </>
                }
                key="7"
              >
                <Suspense>
                  <IdProof />
                </Suspense>
              </TabPane>
               */}

              {/* <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Function</span>
                  </>
                }
                key="8"
              >
                <Suspense>
                  <Function />
                </Suspense>
              </TabPane> */}
            
            </StyledTabs>
          </TabsWrapper>
          </div>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.06em solid #eee",
                width: "100%",
                padding: "1.6rem",
                // marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
