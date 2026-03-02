import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { Menu, Popover } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryActivity from "./CategoryActivity";
import Category from "./Category";
import CategoryActionLeft from "./CategoryActionLeft";
import CategoryActionRight from "./CategoryActionRight";
import OthersTab from "./OthersTab";
const TabPane = StyledTabs.TabPane;

function CategoryTab (props) {

        const name = [

          {
            rulesName: "Sector/Skills",
            ruleId: "1",
            component:<Category/>,
          },
            {
              rulesName: "Activity",
              ruleId: "2",
              component:   <CategoryActivity/>,
            },
            {
              rulesName: "Others",
              ruleId: "3",
              component: <OthersTab />,
            },

          ];
          const [rules, setRules] = useState(name);
          const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);    
          const handleRuleClick = (item) => {
            setCurrentRulesOpen(item);  
          };
        return (
          <div>
          <FlexContainer>
            <Suspense fallback={"Loading..."}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "20%" }}>
                  <CategoryActionLeft
                    handleRuleClick={handleRuleClick}
                    rules={rules}
                    currentRulesOpen={currentRulesOpen}
                  />
                </div>
                <div style={{ width: "80%" }}>
                  <CategoryActionRight current={currentRulesOpen} />
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        </div>
      );
    }
    const mapStateToProps = ({ settings, auth }) => ({
      recruitmentDetailsId:
        auth.userDetails && auth.userDetails.recruitmentDetailsId,
        organizationId: auth.userDetails && auth.userDetails.organizationId,
      advanceRecruitInd:
        auth.userDetails &&
        auth.userDetails.metaData &&
        auth.userDetails.metaData.advanceRecruitInd,
    });
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {  
        },
        dispatch
      );
export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab);
   