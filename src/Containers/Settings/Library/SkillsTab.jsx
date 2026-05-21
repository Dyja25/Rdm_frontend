import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { Badge } from "antd";

import Library from "./Library";
import Certifications from "../Recruitement/Child/Certifications/Certifications";
import { FormattedMessage } from "react-intl";
const TabPane = StyledTabs.TabPane;

const SkillsTab = (props) => {
  const [activeKey, setActiveKey] = useState("1");
  const [value, setValue] = useState(1);
 
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <FlexContainer flexWrap="nowrap">
        <div style={{ width: "100%" }}>
          <TabsWrapper style={{height:"90vh"}}>
            <StyledTabs defaultActiveKey="0" onChange={handleTabChange}>
              <TabPane
                tab={
                  <>
                    <span style={{ marginLeft: "0.25em" }}>
                    <Badge offset={[10]} style={{fontSize:"11px"}} count={props.skillsRecordData.skillCount} overflowCount={999}>
                    {/* Skills */}
                     <FormattedMessage
                                        id="app.skills"
                                        defaultMessage="Skills"
                                      />
                      </Badge>
                      
                      </span>
                  </>
                }
                key="1"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Library 
               
                  />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                 
                    <span style={{ marginLeft: "0.25em" }}>
                    
                     
                      {/* Certifications */}
                     
                  <FormattedMessage
                                        id="app.certification"
                                        defaultMessage="Certification"
                                      />
                      </span>
                  </>
                }
                key="2"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Certifications 
                 />
                </Suspense>
              </TabPane>


            </StyledTabs>
          </TabsWrapper>
        </div>
      </FlexContainer>
    </>
  );
};

const mapStateToProps = ({countrys,equipment,role,librarys}) => (
  {
    skillsRecordData:librarys.skillsRecordData,
});
const mapDispatchToProps = (dispatch) => 
bindActionCreators(
  {
   
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SkillsTab);















