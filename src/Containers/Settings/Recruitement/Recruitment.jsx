import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { MainWrapper } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";
import { FlexContainer } from "../../../Components/UI/Layout";
import RecruitmentActionRight from "./RecruitmentActionRight";

import {
   getProcessForRecruit,
    dataClear,
    // enableRecruitmentAdvance,
} from "../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import Template from "../../Template/Template"
 import RecruitmentTab from "./Child/RecruitmentTab/RecruitmentTab";
import { handleProcessModal } from "../SettingsAction";
// import RecruitTab from "../../Rules/Child/RulesTab/RecruitPro/RecruitTab";
import SeachTab from "./Child/RecruitmentTab/SearchTab";
import IndeedForm from "./Child/Indeed/IndeedTab";
import Library from "../Library/Library";
import Commission from "./Child/Commission/Commission";
// import ReportScheduler from "./Child/ReportScheduler/ReportScheduler";
// import ThirdPartyAccess from "./Child/ThirdPartyAccess/ThirdPartyAccess";
import Access from "./Child/Access/Access";
import ComplianceForm from "./Child/Compliance/ComplianceForm";
import SkillsTab from "../Library/SkillsTab";
const RecruitmentActionLeft = lazy(() => import("./RecruitmentActionLeft"));

function Recruitment(props) {
  const name = [
    {
      rulesName: "Workflow",
      ruleId: "1",
      component: <RecruitmentTab />,
    },
    // {
    //   rulesName: "Template",
    //   ruleId: "4",
    //   component: <Template />,
    // },
    // {
    //   rulesName: "Automation",
    //   ruleId: "2",
    //   component: <RecruitTab />,
    // },
    {
      rulesName: "Search",
      ruleId: "3",
      component: <SeachTab />,
    },
    {
      rulesName: "Sourcing",
      ruleId: "5",
      component: <IndeedForm />,
    },
    {
      rulesName: "Skills and Certifications",
      ruleId: "6",
      component: <SkillsTab/>,

    },
    // {
    //   rulesName: "Report Scheduler",
    //   ruleId: "8",
    //   component: <ReportScheduler />,
    // },

    // {
    //   rulesName: "Engagement",
    //   ruleId: "9",
    //   component: <ThirdPartyAccess />,
    // },
   
    {
      rulesName: "Access",
      ruleId: "12",
      component: <Access />,
    },

    {
      rulesName: "Compliance",
      ruleId: "13",
      component: <ComplianceForm />,
    },
    {
      rulesName: "Commission",
      ruleId: "7",
      component: <Commission/>,
    },
     ];
  const [rules, setRules] = useState(name);
  const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);
  const [recruitProAdvance, setRecruitProAdvance] = useState(
  props.advanceRecruitmentInd
  );
  const handleRuleClick = (item) => {
    setCurrentRulesOpen(item);
    props.dataClear();
  };
  // function handleRecruitProAdvance(checked) {
  //   props.enableRecruitmentAdvance(props.recruitmentDetailsId);
  // }
  // useEffect(() => {
  //   setRecruitProAdvance(props.advanceRecruitInd);
  // }, [props.advanceRecruitInd]);
  //gfgfghvfghvf

  return (
    <div>
      <FlexContainer>
        <Suspense fallback={"Loading..."}>
          <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
            <div style={{ width: "20%" }}>
              <RecruitmentActionLeft
                handleRuleClick={handleRuleClick}
                rules={rules}
                currentRulesOpen={currentRulesOpen}
                // recruitProAdvance={recruitProAdvance}
                // handleRecruitProAdvance={handleRecruitProAdvance}
              />
            </div>
            <div style={{ width: "80%" }}>
              <RecruitmentActionRight current={currentRulesOpen} />
            </div>
          </FlexContainer>
        </Suspense>
      </FlexContainer>
      {/* )} */}
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
       getProcessForRecruit,
         dataClear,
        //  enableRecruitmentAdvance
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Recruitment);
