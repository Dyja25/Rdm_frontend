import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../Components/UI/Layout";
import { Input } from "antd";
import { FormattedMessage } from "react-intl";
import {

    inputJobOrderSearch,
    getAllRequirementTable,
    // inputCandidateSkillDataSearch,
    // getRecords,
    //  getAllRecords,
  } from "../Requirement/RequirementAction";
import { StyledSelect } from "../../Components/UI/Antd";
import { useIntl } from "react-intl";


import { Button,Tooltip } from "antd";
const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;

const RequirementActionLeft = (props) => {

  const intl = useIntl();
    useEffect(() => {
        // props.getRecords(props.userId);
        // if (transcript) {
        //   console.log(">>>>>>>",transcript)
        //   props.setCurrentData(transcript)
        // }
},[]);

const{user}=props;
return (
<FlexContainer alignItems="center">
<div >
          <Input
            placeholder="Search By Job ID"
             placeholder={intl.formatMessage({
            id: "app.searchByJobID",
            defaultMessage: "Search By Job ID",
          })}
            // enterButton="Search"
            // style={{marginLeft:"1rem",}}
           
            // suffix={suffix}
            onSearch={(value) => {
              props.inputJobOrderSearch(value);
              props.setCurrentData(value);

            }}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
        &nbsp;
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputJobOrderSearch(props.currentData);

          }}
        >
          {/* {translatedMenuItems[13]} */}
          <FormattedMessage
                    id="app.submit"
                    defaultMessage="Submit"
                  />
        </Button>
        &nbsp;
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.handleClear();
            props.getAllRequirementTable(props.orgId,0);
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
          {/* Clear */}
        </Button>
      

</FlexContainer>
);
};

const mapStateToProps = ({ auth, requirement }) => ({
//   user: auth.userDetails,
//   recordData: candidate.recordData,
//   userId: auth.userDetails.userId,
//   recordAllData: candidate.recordAllData,
orgId:auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputJobOrderSearch,
      getAllRequirementTable
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequirementActionLeft);