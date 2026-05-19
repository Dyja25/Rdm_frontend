import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";

import { FlexContainer } from "../../../Components/UI/Layout";

import { StyledSelect } from "../../../Components/UI/Antd";
import OpportunityShareForm from "./OpportunityShareForm.jsx";


const Option = StyledSelect.Option;

class OpportunityActionRight extends React.Component {
  // componentDidMount() {
  //   this.props.getUsers();
  // }
  render() {
    const {
      userId,
      subscriptionType,
      users,
      user,
      department,
      accountFilterText,
      handleOpportunityModal,
      setAccountFilterText,
      setAccountFilterUser,
    } = this.props;
    return (
      <FlexContainer alignItems="center">
         {user.employee_type !=="External" && (
      <OpportunityShareForm/>
         )}
      &nbsp;
        <Button
          type="primary"
          default
        href={`${base_url}/excel/export/user/opportunity/${userId}`}
        >
          {/* Export */}
          <FormattedMessage
                id="app.export"
                defaultMessage="Export"
              />
        </Button>
        &nbsp;
        {/* <Tooltip placement="left" title="Create"> */}
        <Tooltip placement={"left"} title={<FormattedMessage
                id="app.create"
                defaultMessage="Create"
              />}>
           {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
           {user.opportunityCreateInd ===true && (
          <Button
            type="primary"
            // ghost
            onClick={() => handleOpportunityModal(true)}
          >
            {/* Add */}
            <FormattedMessage
                                        id="app.add"
                                        defaultMessage="Add"
                                      />
          </Button>
            )}  
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
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
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionRight)
);
