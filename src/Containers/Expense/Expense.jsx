import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddExpenseModal from "./Child/AddExpenseModal.jsx";
import ExpenseHeader from "./Child/ExpenseHeader.jsx";
import { handleExpenseModal } from "./ExpenseAction";
const ExpenseTable = lazy(() => import("./Child/ExpenseTable.jsx"));

class Expense extends Component {
  render() {
    return (
      <React.Fragment>
        <ExpenseHeader />
        <AddExpenseModal
          handleExpenseModal={this.props.handleExpenseModal}
          addExpenseModal={this.props.addExpenseModal}
        />
        <ExpenseTable />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ expense }) => ({
  addExpenseModal: expense.addExpenseModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleExpenseModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
