import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionIcon } from "../../../Components/Utils";
import GridOnIcon from '@mui/icons-material/GridOn';
import { FlexContainer } from "../../../Components/UI/Layout";
import { inputEmployeeDataSearch } from "../EmployeeAction";
import { Button, Input, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

const { Search } = Input;

const EmployeesActionLeft = (props) => {
  return (
    <FlexContainer alignItems="center">
      {/* <ActionIcon
                style={{ marginRight: '0.5rem', color: props.viewType === 'grid' && '#1890ff' }}
                iconType='appstore-o'
                tooltipTitle='Tile View'
            // handleIconClick={() => props.setEmployeesViewType('grid')}
            /> */}
            <Tooltip title="Active Users">
      <GridOnIcon
        style={{
          marginRight: "0.5rem",
          color: props.viewType === "table" && "#1890ff",
        }}
        onClick={() => props.setEmployeeViewType("table")}
      />
      </Tooltip>
      {/* <ActionIcon
        style={{
          marginRight: "0.5rem",
          color: props.viewType === "map" && "#1890ff",
        }}
        iconType="global"
        tooltipTitle="Suspended Users"
      // handleIconClick={() => props.setEmployeesViewType('map')}
      /> */}

      <div style={{ marginLeft: "30px" }}>
        <Search
          placeholder="Search By Name ,Email & Mobile No"
          onSearch={(value) => {
             props.inputEmployeeDataSearch(value);
             props.setCurrentData(value);
            
          }}
           allowClear
           enterButton
        />
      </div>
      &nbsp; &nbsp;
      <Button
        type={props.currentData ? "primary" : "default"}
        onClick={props.handleClear}
      >
        <FormattedMessage
          id="app.clear"
          defaultMessage="Clear"
        />
        {/* Clear */}
      </Button>
    </FlexContainer>
  );
};

const mapStateToProps = ({auth}) => ({
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputEmployeeDataSearch,
}, dispatch);
export default (
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionLeft));
