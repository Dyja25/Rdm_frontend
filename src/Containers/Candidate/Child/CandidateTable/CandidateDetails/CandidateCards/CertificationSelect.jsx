import React, { Component, useMemo, useState,useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
    addCertificationByCandidateId,
  // getTopicsByCandidateId,
  // deleteTopicByCandidateId,
} from "../../../../CandidateAction";
//import { getCertification } from "../../../../../Settings/Recruitement/Child/Certification/CertificationAction";
import { StyledSelect } from "../../../../../../Components/UI/Antd";
const { Option } = Select;
function CertificationSelect(props) {
  const [selectType, setSelectType] = useState("");
  
  function handleChange(selectType) {
    // useEffect(() => {
    //   props.getCertification(props.organizationId);
    
    // }, []);
    props.addCertificationByCandidateId(
      {
        candidateCertificationName: selectType,
        candidateId: props.candidateId,
      },
      props.candidateId
    );
  }

  return (
    <div>
      <Select style={{ width: "14rem" }} onChange={(e) => handleChange(e)}>
        {props.certifications.map((item, i) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
      </Select>
    </div>
  );
}
const mapStateToProps = ({ candidate, auth, certifications }) => ({
  user: auth.userDetails,
  certifications:certifications.certifications,
  organizationId: auth.userDetails.organizationId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addCertificationByCandidateId,
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CertificationSelect);
