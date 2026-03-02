import React, { Component } from "react";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import ContactAvailibityCard from "./RecruitmentCard/ContactAvailibityCard";

import ContactCatagoryCard from "./RecruitmentCard/ContactCatagoryCard";

import RecruitmentContactCard from "./RecruitmentCard/RecruitmentContactCard";
import RecruitmentDetailsRight from "./RecruitmentDetailsRight"
// import TaskOppCard from "./TaskOppCard/TaskOppCard";
// import TaskOppStatsCard from "./TaskOppCard/TaskOppStatsCard";
// import TaskOppAboutCard from "./TaskOppCard/TaskOppAboutCard";

class RecruitmentDetailsLeft extends Component {
  render() {
    const { contact } = this.props;
    return (
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <RecruitmentContactCard contact={contact} />
        <ContactCatagoryCard contact={contact} />
        <ContactAvailibityCard contact={contact} />
        {/* <TaskOppStatsCard opportunity={opportunity} />
        <TaskOppAboutCard opportunity={opportunity} /> */}
      </FlexContainer>
    );
  }
}

export default RecruitmentDetailsLeft;
