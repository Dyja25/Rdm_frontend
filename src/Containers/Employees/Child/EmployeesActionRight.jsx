import React,{lazy}from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {  Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
import DescriptionIcon from '@mui/icons-material/Description';
import { FormattedMessage } from "react-intl";
// import { setAccountFilterText, setAccountFilterUser } from "../AccountAction";
// import { getUsers } from "../../Team/TeamAction";
// const EmployeeShareForm=lazy(()=>import("./EmployeeShareForm"));

const Option = StyledSelect.Option;

class EmployeesActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleEmployeeModal, userId } = this.props;
    return (
      <>
      <FlexContainer alignItems="center">
      {/* <EmployeeShareForm/> */}
      &nbsp;
        {this.props.role === "ADMIN" && (
          // <Button
          //   type="primary"
          //   default
          //   href={`${base_url}/excel/export/vendor/user/employee/${userId}`}
          // >
          //   {/* //Export */}
          //   <FormattedMessage
          //     id="app.export"
          //     defaultMessage="Export"
          //   />
          // </Button>
          <Tooltip placement="left" title="XL">
            <a href={`${base_url}/excel/export/vendor/user/employee/${userId}`}>
            <DescriptionIcon/>
            {/* <FontAwesomeIcon icon={solid('file-excel')} style={{fontSize: "x-large"}}/> */}
            </a>
         </Tooltip>
        )}
        &nbsp;&nbsp;
        {/* <FlexContainer alignItems="center"> */}

        <Button type="primary"
         ghost onClick={() => handleEmployeeModal(true)}>

          {/* Add */}
          <FormattedMessage id="app.add" defaultMessage="Add" />
        </Button>

        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  //   accountFilterText: account.accountFilterText,
  //   users: team.users,
  //   filterByUserOption: team.filterByUserOption,
  //   user: auth.userDetails,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default (
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionRight)
);
