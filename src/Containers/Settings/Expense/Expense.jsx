import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleExpenses from "./SingleExpenses";
// import * as Yup from "yup";
import {
  getExpenses,
  addExpenses,
   //   removeSectors,
  updateExpenses,
} from "./ExpenseAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";

// const SectorsSchema = Yup.object().shape({
//   sectorName: Yup.string().required("Input needed !"),
// });

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedExpenses: [],
      isTextInputOpen: false,
      addingExpense: false,
      expenseType: "",
      type: "",
      singleExpense: "",
      editInd:true
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddExpenses = () => {
    const { addExpenses, expenses } = this.props;
    const { expenseType, addingExpenses, isTextInputOpen,editInd } = this.state;
    let expense = { expenseType,editInd };

    let exist =
    expenses &&
    expenses.some((element) => element.expenseType == expenseType);

    if (exist) {
      message.error(
        "Can't create as another expense type exists with same name!"
      );
    } else {
      addExpenses(expense, () => console.log("add expense callback"));
    }

    this.setState({
      expenseType: "",
      singleExpense: "",
      isTextInputOpen: false,
      editInd:true
    });
  };
  // handleDeleteSector = (id) => {
  //   this.props.removeSectors(id);
  //   this.setState({ sectorName: "", singleSector: "" });
  // };
  handleUpdateExpense = (expenseType, expenseTypeId,editInd, cb) => {
    this.props.updateExpenses(expenseType, expenseTypeId,editInd, cb);
    this.setState({ expenseType: "", singleExpense: "",editInd:true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { 
      getExpenses
     } = this.props;
    console.log();
    getExpenses();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingExpenses,
      fetchingExpensesError,
      expenses,
      addingExpenses,
      updatingExpenses,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      expenseType,
      singleExpense,
      linkedExpenses,
    } = this.state;
    if (fetchingExpenses) return <p>Loading ...</p>;
    if (fetchingExpensesError) return <p>We are unable to load data</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <FlexContainer flexDirection="column">
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {expenses.length &&
                  expenses.map((expense, i) => (
                    <SingleExpenses
                      key={i}
                      value={singleExpense}
                      name="singleExpense"
                      expense={expense}
                      linkedExpenses={linkedExpenses}
                      updatingExpenses={updatingExpenses}
                      handleChange={this.handleChange}
                      handleUpdateExpense={this.handleUpdateExpense}
                      //   handleDeleteSector={this.handleDeleteSector}
                    />
                  ))}
              </MainWrapper>
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Type"
                  name="expenseType"
                 value={expenseType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!expenseType}
                  Loading={addingExpenses}
                  onClick={this.handleAddExpenses}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                   Loading={addingExpenses}
                    onClick={this.toggleInput}
                  >
                    {/* Add Type */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ expenses}) => ({
  addingExpenses: expenses.addingExpenses,
  addingExpensesError: expenses.addingExpensesError,
     expenses: expenses.expenses,

//   removingEducations: expense.removingEducations,
//   removingEducationsError: expense.removingEducationsError,
  fetchingExpenses: expenses.fetchingExpenses,
  fetchingExpensesError: expenses.fetchingExpensesError,

  updatingExpenses: expenses.updatingExpenses,
  updatingExpensesError: expenses.updatingExpensesError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenses,
     addExpenses,
      //   removeSectors,
     updateExpenses,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Expense);
