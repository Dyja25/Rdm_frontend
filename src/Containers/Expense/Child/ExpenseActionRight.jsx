import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import {  Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
import { handleExpenseModal } from "../ExpenseAction";
import { FormattedMessage } from "react-intl";
// import { setExpenseFilterText, setExpenseFilterUser } from "../ExpenseAction";
// import { getUsers } from "../../Team/TeamAction";

const Option = StyledSelect.Option;

class ExpenseActionRight extends React.Component {
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
    return (
      <FlexContainer alignItems="center">
        {/* <Button
                    type="primary"
                    default
                    disabled
                >
                    Import
                </Button>

                <Button
                    type="primary"
                    default
                    disabled
                >
                    Import
                </Button> */}
        <Button
          type={this.state.isClicked === "import" ? "primary" : ""}
          onClick={() => this.handleClicked("import")}
        >
          Import
        </Button>
        &nbsp;
        <Spacer />
        <Button
          type={this.state.isClicked === "export" ? "primary" : ""}
          onClick={() => this.handleClicked("export")}
          // ghost
        >
          Export
        </Button>
        &nbsp;
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handleExpenseModal(true)}
          >
            {/* Add */}
            <FormattedMessage id="app.add" defaultMessage="Add" />
          </Button>
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, team, Expense }) => ({
  //   userId: auth.userDetails.userId,
  //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
  //   ExpenseFilterText: Expense.ExpenseFilterText,
  //   users: team.users,
  //   filterByUserOption: team.filterByUserOption,
  //   user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleExpenseModal,
    },
    dispatch
  );
export default (
  connect(mapStateToProps, mapDispatchToProps)(ExpenseActionRight)
);

// function onChangeDatePicker(date, dateString, dataPass) {
//   console.log(date);
//   console.log(dateString);
//   console.log(dataPass);
//   setRows((value) => {
//     console.log(value);
//     return value.map((data) => {
//       if (`${data.id}date` === dataPass) {
//         console.log(dateString);
//         return { ...data, date: dateString };
//       } else {
//         return data;
//       }
//     });
//   });
// }
