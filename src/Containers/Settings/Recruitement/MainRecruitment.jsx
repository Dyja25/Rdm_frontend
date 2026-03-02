import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { getProcessForRecruit } from "../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Recruitment from "./Recruitment";
import RecruitmentTab from "./Child/RecruitmentTab/RecruitmentTab";

function MainRecruitment(props) {
  useEffect(() => {
    props.getProcessForRecruit(props.organizationId);
  }, [props.organizationId]);
  const data = useMemo(() => {
    console.log("Re render.......when state changes");
    debugger;
    if (!props.recruitProcess.length) return false;

    debugger;
    return props.recruitProcess.map((item) => {
      return {
        recruitmentProcessName: item.recruitmentProcessName,
        recruitmentProcessId: item.recruitmentProcessId,
        component: (
          <RecruitmentTab
            recruitmentProcessId={item.recruitmentProcessId}
            recruitmentProcessName={item.recruitmentProcessName}
          />
        ),
      };
    });
  }, [props.recruitProcess]);
  console.log("print new data........", data);

  return (
    <div>
      {/* {!false ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : ( */}
      {data.length && (
        <Suspense fallback={"Loading..."}>
          <Recruitment data={data} />
        </Suspense>
      )}
      {/* )} */}
    </div>
  );
}
const mapStateToProps = ({ settings, auth }) => ({
  recruitProcess: settings.recruitProcess,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getProcessForRecruit }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainRecruitment);
