import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";

import { FormattedMessage } from "react-intl";
import {
    
    setReportViewType,
   
  } from "../../Reports/ReportAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { inputOpportunityDataSearch,getRecords } from "../OpportunityAction";
// import { getAccountTopicList } from "../AccountAction";
import { Input,Tag } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;


const DashboardActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];

//   useEffect(() => {
//     props.getRecords(props.userId);
// }, [props.userId]);

  const {
    reportViewType,
    user,
    role
  } = props;
  // const creationDate = user.creationDate;

  // useEffect(() => {
  //   if (props.viewType === "table") {
  //     props.getCustomerTopicList();
  //   }
  // }, [props.viewType]);
  return (
    <FlexContainer alignItems="center">
            {/* { user.department=== "Management" && role === "ADMIN" && ( 
            <>
            <div style={{width:"46%"}}>
              <Tag
                color={reportViewType === "ME" ? "	#FFA500" : "orange"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: reportViewType === "ME" ? "bold" : null,
                  textAlign: "center",
                  borderColor: "orange",
                }}
                onClick={() => setReportViewType("ME")}
              >My View</Tag>
              </div>
              <div style={{width:"7%"}}>
              <Tag
                color={reportViewType === "ALL" ? "#FFA500" : "orange"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: reportViewType === "ALL" ? "bold" : null,
                  textAlign: "center",
                  borderColor: "orange",
                }}
                onClick={() => setReportViewType("ALL")}
              >

                <FormattedMessage
                  id="app.organization"
                  defaultMessage="Organization"
                />
              </Tag>
            </div>
            </>
           )}  */}
      {/* <Badge
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
      </Badge> */}

      {/* <Tooltip
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
const mapStateToProps = ({ account,report, auth,opportunity }) => ({
  // topicList: account.topicList,
  // dateRangeList: account.dateRangeList,
//   user: auth.userDetails,
//   recordData: opportunity.recordData,
reportViewType: report.reportViewType,
user: auth.userDetails,
role: auth.userDetails.role,
//   userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    setReportViewType,

      // getAccountTopicList,
    //   inputOpportunityDataSearch,
    //   getRecords,
    },
    dispatch
  );

export default(
  connect(mapStateToProps, mapDispatchToProps)(DashboardActionLeft)
);
