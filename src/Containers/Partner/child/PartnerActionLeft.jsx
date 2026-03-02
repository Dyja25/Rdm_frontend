import React, { useEffect } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import {
   inputPartnerDataSearch ,
   getRecords,
   //inputPartnerSearch
} 
from "../PartnerAction";
import { Button, Input,Badge,Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const PartnerActionLeft = (props) => {
  const { user, setPartnerViewType, viewType, dateRangeList, setSelectedTimeInterval,
    setTimeRange, startDate,
    endDate, } = props;

    useEffect(() => {
      props.getRecords(props.userId);
  }, [props.userId]);

  return (
    <div style={{width:"125%"}}>
  <FlexContainer >  
      <div>    
       <Tooltip
        title={<FormattedMessage id="app.vendor" defaultMessage="Vendor"/>}
      >
        <Badge size="small" count={props.recordData.PartnerDetails || 0} overflowCount={5000}>
        <span
          onClick={() => props.setPartnerViewType("list")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "list" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
        <i class="far fa-handshake"></i>
        </span>
        </Badge>
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.deletedPartner" defaultMessage="Deleted Partner" />}
      > 
       {/* <Badge size="small" count={viewType === "dashboard" && recorddeleteOpportunityData.opportunityDetails
      || 0} overflowCount={999}>     */}
        <span
          onClick={() => props.setPartnerViewType("dashboard")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "dashboard" && "#1890ff",
            fontSize: "1.0625em",
            cursor: "pointer",
          }}
        >
        <DeleteOutlined/>
        </span>
        {/* </Badge> */}
      </Tooltip>
      </div>
      &nbsp;&nbsp;
       <div style={{ width: "50%", marginLeft: "3px" }}>
          <Input
            placeholder="Search by Name & RegNo "
            // enterButton="Search"
            width={"100%"}
            // suffix={suffix}
            //  onSearch={(value) => {
            //    props.inputPartnerDataSearch(value);
            //    props.setCurrentData(value);

            //  }}
           onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
        &nbsp;
        {props.currentData  && (
        <div>
          
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputPartnerDataSearch(props.currentData);
            // props.getCandidateCountSearch(props.currentData)
          }}
        >
          Submit
        </Button>
        </div>
          )} 
        &nbsp;
        <div>
        <Button
          type={props.currentData ? "primary" : "danger"}
          // onClick={props.handleClear}
          onClick={() => {
            props.handleClear();
            // props.getCandidateCountSearch()
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
          {/* Clear */}
        </Button>
        </div>        
      
     
  </FlexContainer>
  </div>
  );
};
const mapStateToProps = ({auth,partner}) => ({
  userId: auth.userDetails.userId,
  //fetchingPartnerInputSearch:partner.fetchingPartnerInputSearch,
  fetchingPartnerInputSearchData:partner.fetchingPartnerInputSearchData,
  recordData: partner.recordData,
  userId: auth.userDetails.userId,


});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputPartnerDataSearch,
  //inputPartnerSearch,
  getRecords
}, dispatch);

export default (
  connect(mapStateToProps, mapDispatchToProps)(PartnerActionLeft)
);
