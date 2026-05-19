import React, { useEffect, useState,useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button, Tooltip, Popover } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const CustomerShareForm=lazy(()=> import("./CustomerShareForm"));

const Option = StyledSelect.Option;

class CustomerActionRight extends React.Component {
  // componentDidMount() {
  //   this.props.getUsers();
  // }
  render() {
    const {
      userId,
      subscriptionType,
      users,
      user,
      role,
      department,
      accountFilterText,
      handleCustomerModal,
      setAccountFilterText,
      setAccountFilterUser,
      customerId
    } = this.props;
    return (
      <FlexContainer alignItems="center">
         {user.employee_type !=="external" && (
      <CustomerShareForm/>
         )}
      &nbsp;
      &nbsp;
      {role == "ADMIN" && ( 
        <Tooltip placement="left" title="XL">

            <a href={`${base_url}/excel/export/user/customer/${userId}`}>
            <NoteAddIcon/>
            </a>
    
         </Tooltip>
      )}
        &nbsp;
        &nbsp;
        <Tooltip placement="left" title="Create">
          {/* {user.department === "Sales" && ( */}
          {this.props.user.customerCreateInd ===true && (
          <Button
            type="primary"
            //className=".add-btn1"
            //ghost
            onClick={() => handleCustomerModal(true)}
          >
            {/* Add */}
            <FormattedMessage id="app.add" defaultMessage="Add" />
          </Button>
           )} 
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  // subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  // accountFilterText: account.accountFilterText,
  // users: team.users,
  // filterByUserOption: team.filterByUserOption,
  // department: auth.userDetails && auth.userDetails.department,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // setAccountFilterText, getUsers, setAccountFilterUser
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(CustomerActionRight)
);
