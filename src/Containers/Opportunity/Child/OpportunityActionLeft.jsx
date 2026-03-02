import { useEffect } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import {  Tooltip,Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { inputOpportunityDataSearch,getRecords } from "../OpportunityAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;


const OpportunityActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];

  useEffect(() => {
    props.getRecords(props.userId);
}, [props.userId]);
  return (
    <FlexContainer alignItems="center">
      <Badge
                  count={props.recordData.opportunityDetails}
                  overflowCount={999}
                 
      >
      <Tooltip
        title={<FormattedMessage id="app.listOpportunity" defaultMessage="Opportunity List" />}
      >
        <span
          onClick={() => props.setOpportunityViewType("table")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "table" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
         <i class="far fa-lightbulb"></i>
        </span>
      </Tooltip>
      </Badge>

      <Tooltip
        title={<FormattedMessage id="app.deletedOpportunity" defaultMessage="Deleted Opportunity" />}
      >
        <span
          onClick={() => props.setOpportunityViewType("dashboard")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "dashboard" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          <i class="fas fa-trash"></i>
        </span>
      </Tooltip>

      {/* <Tooltip
        title={<FormattedMessage id="app.deletedOpportunity" defaultMessage="Deleted Opportunity" />}
      >
        <span
          onClick={() => props.setOpportunityViewType("card")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "card" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          <i class="fas fa-trash"></i>
        </span>
      </Tooltip> */}


      {/* <div style={{ marginLeft: "30px" }}>
        <Search
          placeholder="Search By Name" 
          onSearch={(value) => {
            props.inputOpportunityDataSearch(value);
            props.setCurrentData(value);
          }}
          allowClear 
          enterButton
         
          

          
        />
      </div>
      &nbsp; &nbsp; */}
      {/* <Button
        type={props.currentData ? "primary" : "default"}
        onClick={props.handleClear}
      >
        <FormattedMessage
          id="app.clear"
          defaultMessage="Clear"
        />
        
      </Button>
      &nbsp; &nbsp; */}
      {/* &nbsp; &nbsp;
      {props.viewType==="table" ?
      <div style={{ fontSize: "1em", fontWeight: "bold", color: "tomato" }}>
        # Records -{" "}{props.recordData.opportunityDetails || 0}{" "}
      </div>
      : null } */}
    </FlexContainer>
  );
};
const mapStateToProps = ({ account, auth,opportunity }) => ({
  // topicList: account.topicList,
  // dateRangeList: account.dateRangeList,
  user: auth.userDetails,
  recordData: opportunity.recordData,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAccountTopicList,
      inputOpportunityDataSearch,
      getRecords,
    },
    dispatch
  );

export default (
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionLeft)
);
