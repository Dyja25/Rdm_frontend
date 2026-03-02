import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import PersonIcon from '@mui/icons-material/Person';
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";
import {  Tooltip, Badge } from "antd";
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Groups2Icon from '@mui/icons-material/Groups2';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { bindActionCreators } from "redux";
import { inputCustomerDataSearch, getRecords,getRecordDelete, getCategoryRecords } from "../CustomerAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const CustomerActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];


  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords(props.userId);
    } else if (props.viewType === "list") {
      props.getCategoryRecords("White")
    } else if (props.viewType === "dashboard") {
      props.getCategoryRecords("blue")
    } else if (props.viewType === "delete") {
      props.getRecordDelete(props.userId)
    }
  }, [props.viewType, props.userId]);
  return (
    <FlexContainer alignItems="center">
      <Tooltip
        title={<FormattedMessage id="app.all" defaultMessage="All" />}
      >
        <Badge size="small" count={props.recordData.customer || 0} overflowCount={999}>
          <span
            onClick={() => props.setCustomerViewType("table")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "table" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            <Groups2Icon/>
            {/* <FontAwesomeIcon icon={solid('users')} /> */}
          </span>
        </Badge>
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.white" defaultMessage="White" />}
      >
        <Badge size="small" count={props.recordCategoryData.customer || 0} overflowCount={999}>
          <span
            onClick={() => props.setCustomerViewType("list")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "list" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            <PermIdentityIcon/>
            {/* <FontAwesomeIcon icon={regular('user')} /> */}
          </span>
        </Badge>
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.blue" defaultMessage="Blue" />}
      >
        <Badge size="small" count={props.recordCategoryDataBlue.customer || 0} overflowCount={999}>
          <span
            onClick={() => props.setCustomerViewType("dashboard")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "dashboard" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            {/* <i class="fa-solid fa-user-helmet-safety"></i> */}
            {/* <i class="fa-solid fa-user-tie"></i> */}
            {/* <i class="fa-solid fa-user-gear"></i> */}
            {/* <FontAwesomeIcon icon={solid("user-gear")} /> */}
             {/* <PersonIcon/> */}
             <ManageAccountsIcon/>
          </span>
        </Badge>
      </Tooltip>
  <Tooltip
        title="Delete Customer"
        
      > 
       <Badge size="small" count={props.viewType === "delete" && props.recordDataDelete.deletedCustomer
      || 0} overflowCount={999}>    
        <span
          onClick={() => props.setCustomerViewType("delete")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "delete" && "#1890ff",
            fontSize: "1.0625em",
            cursor: "pointer",
          }}
        >
          <DeleteIcon/>
          {/* <FontAwesomeIcon icon={solid("trash")} /> */}
        </span>
        </Badge>
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
const mapStateToProps = ({ customer, auth }) => ({
  // topicList: account.topicList,
  // dateRangeList: account.dateRangeList,
  // user: auth.userDetails,
  user: auth.userDetails,
  recordData: customer.recordData,
  recordCategoryData: customer.recordCategoryData,
  recordCategoryDataBlue: customer.recordCategoryDataBlue,
  userId: auth.userDetails.userId,
  recordDataDelete: customer.recordDataDelete,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAccountTopicList,
      inputCustomerDataSearch,
      getRecords,
      getRecordDelete,
      getCategoryRecords
    },
    dispatch
  );

export default (
  connect(mapStateToProps, mapDispatchToProps)(CustomerActionLeft)
);
