import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ActionIcon } from "../../../Components/Utils";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect, StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import dayjs from "dayjs";
import { Button ,Tooltip,Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { inputCustomerDataSearch,getRecords,getCategoryRecords } from "../PublishAction";
// import { getAccountTopicList } from "../AccountAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const PublishActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
//   
  // const {
  //   viewType,
  //   setAccountViewType,
  //   dateRangeList,
  //   useuseEffect(() => {
//     props.getRecords(props.userId);
// }, [props.userId]);r,
  // } = props;
  // const creationDate = user.creationDate;

//   useEffect(() => {
//     if (props.viewType === "table") {
//       props.getRecords(props.userId);
//     } else if (props.viewType === "list") {
//       props.getCategoryRecords("White")
//     }else if(props.viewType === "dashboard") {
//       props.getCategoryRecords("blue")
//     }
//   }, [props.viewType,props.userId]);
  return (
    <FlexContainer alignItems="center">
       <Tooltip
        title={<FormattedMessage id="app.website" defaultMessage="Website" />}
      >
       
        <span
        //   onClick={() => props.setPublishViewType("table")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "table" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          <GroupIcon />
         
        </span>
       
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.jobSites" defaultMessage="Job Sites" />}
      >
       
        <span
        //   onClick={() => props.setPublishViewType("list")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "list" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
       {/* <FontAwesomeIcon icon={regular('user')}/> */}
        <PersonIcon />
        </span>
    
      </Tooltip>

    

      {/* <div style={{ marginLeft: "30px" }}>
        <Search
          placeholder="Search By Name"
          onSearch={(value) => {
            props.inputCustomerDataSearch(value);
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
        
      </Button> */}
      &nbsp; &nbsp;
      {/* <div style={{ fontSize: "1em", fontWeight: "bold", color: "tomato" }}>
        # Records -{" "}{props.recordData.customer || 0}{" "}
      </div> */}

{/* {props.viewType === "table" ? (
        <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
          # Records - {props.recordData.customer || 0}{" "}
        </div>
      ) 
      : props.viewType === "list" ?
      (
        <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
          # Records -{" "}{props.recordCategoryData.customer || 0}{" "}
        </div>
      ) 
      :props.viewType ==="dashboard" ?
       (
        <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
          # Records -{" "}{props.recordCategoryData.customer || 0}{" "}
        </div>
      ) : null} */}
    </FlexContainer>
  );
};
const mapStateToProps = ({ publish, auth }) => ({
  // topicList: account.topicList,
  // dateRangeList: account.dateRangeList,
  // user: auth.userDetails,
//   user: auth.userDetails,
//   recordData: publish.recordData,
//   recordCategoryData:customer.recordCategoryData,
//   userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAccountTopicList,
    //   inputPublishDataSearch,
    //   getRecords,
    //   getCategoryRecords
    },
    dispatch
  );

export default
  connect(mapStateToProps, mapDispatchToProps)(PublishActionLeft)
;