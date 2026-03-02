import { Button, DatePicker, message, Select } from "antd";
import React, { useState, useEffect } from "react";
// import { FormattedMessage } from "react-intl";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import { getExpenses } from "../../Settings/Expense/ExpenseAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCurrency } from "../../Auth/AuthAction";
import { addExpense, getExpenseById } from "../ExpenseAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const { Option } = Select;

function ExpenseForm(props) {
  const [row, setRows] = useState([
    {
      expenseDate: "",
      clientName: "",
      particular: "",
      expenseType: "",
      amount: "",
      currency: props.user.currency,
      userId: props.userId,
      expenseTypeId:props.expenseTypeId,
      id: 1, 
    },
  ]);
  const [id, setId] = useState(1);
  function onChangeDatePicker(date, dateString, id) {
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}date` === id) {
          console.log(dateString);
          return { ...data, expenseDate: dayjs(dateString).toISOString() };
        } else {
          return data;
        }
      });
    });
  }
  function handleChange(id, billType) {
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}select` === id) {
          return { ...data, billType: billType };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangeattribute(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}attribute`);
        console.log(e.target.name);

        if (`${d.id}attribute` === e.target.name) {
          return { ...d, clientName: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  useEffect(() => {
    props.getCurrency();
    props.getExpenses();
  }, []);
  function handleCurrencyChange(currency, id) {
    console.log(currency);
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}curr` === id) {
          return { ...data, currency: currency };
        } else {
          return data;
        }
      });
    });
  }
  function handleExpenseChange(expenseType, id) {
    console.log(expenseType);
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}expenseType` === id) {
          return { ...data, expenseType: expenseType };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangeBillType(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}billType`);
        console.log(e.target.name);

        if (`${d.id}billType` === e.target.name) {
          return { ...d, billType: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChangeParticular(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}particular`);
        console.log(e.target.name);

        if (`${d.id}particular` === e.target.name) {
          return { ...d, particular: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChangeAmount(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}amount`);
        console.log(e.target.name);

        if (`${d.id}amount` === e.target.name) {
          return { ...d, amount: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleAddRowClick() {
    setId((v) => v + 1);
    setRows((v) => [
      ...v,
      {
        expenseDate: "",
        clientName: "",
        particular: "",
        expenseType: "",
        amount: "",
        id: id + 1,
      },
    ]);
  }
  function handleDelete(row) {
    setRows((v) => v.filter((d) => d.id !== row.id));
  }

  function handleCallBack(status) {
    if (status === "Success") {
      props.getExpenseById(props.userId);
    } else {
      message.error("Some Error Occourd");
    }
  }
  function handleSubmit() {
    console.log(row);

    if (row) {
      row.map((item) => {
        if (
          !item.expenseDate &&
          !item.expenseType &&
          !item.clientName &&
          !item.particular &&
          !item.amount
        ) {
          alert("All Fields Required");
        } else {
          props.addExpense(row, handleCallBack);
        }
      });
    } else {
    }
  }
  const { addingExpense } = props;
  return (
    <div>
      <table>
        <th>Date</th>
        <th>Assigned To</th>

        <th>Expense Type</th>
        <th>More Information</th>
        <th>Amount</th>
        <th>Currency</th>
        {row.map((item) => {
          return (
            <tr>
              <td style={{ width: "18%" }}>
                <DatePicker
                  style={{ width: "96%" }}
                  onChange={(date, dateString) =>
                    onChangeDatePicker(date, dateString, `${item.id}date`)
                  }
                  isRequired
                />
              </td>
              <td style={{ width: "24%" }}>
                <TextInput
                  style={{ width: "95%" }}
                  name={`${item.id}attribute`}
                  value={`${item.clientName}`}
                  onChange={handleChangeattribute}
                />
              </td>

              <td style={{ width: "19%" }}>
                <Select
                  isRequired
                  style={{ width: "96%" }}
                  onSelect={(value) =>
                    handleExpenseChange(value, `${item.id}expenseType`)
                  }
                 
                >
                  {/* <Option value="Cellphone">Cellphone</Option>
                  <Option value="Fuel Bill">Fuel Bill</Option>
                  <Option value="Internet">Internet</Option>
                  <Option value="Hardware">Hardware</Option>
                  <Option value="Stationary">Stationary</Option>
                  <Option value="Team Welfare">Team Welfare</Option>
                  <Option value="Team outing">Team outing</Option>
                  <Option value="Others">Others</Option> */}
                   {props.expenses.map((item) => {
                    return (
                      <Option value={item.expenseType} >
                        {item.expenseType}
                      </Option>
                    );
                  })}
                </Select>
              </td>
              <td style={{ width: "19%" }}>
                <TextInput
                  style={{ width: "96%" }}
                  name={`${item.id}particular`}
                  value={`${item.particular}`}
                  onChange={handleChangeParticular}
                />
              </td>
              <td style={{ width: "10%" }}>
                <TextInput
                  name={`${item.id}amount`}
                  value={`${item.amount}`}
                  onChange={handleChangeAmount}
                  style={{ width: "90%" }}
                  isRequired
                />
              </td>
              <td>
                <Select
                  style={{ width: 70 }}
                  onSelect={(value) =>
                    handleCurrencyChange(value, `${item.id}curr`)
                  }
                  disabled
                  defaultValue={props.user.currency}
                >
                  {props.currencies.map((item) => {
                    return (
                      <Option value={item.currencyName} defaultValue={props.user.address[0].country}>
                        {item.currencyName}
                      </Option>
                    );
                  })}
                </Select>
              </td>
              <td>
                {/* <Select
                 style={{ width: 120 }}
                ></Select> */}
              </td>
              {row.length > 1 && (
                <DeleteOutlineIcon
                  style={{
                    color: "red",
                    fontSize: "1.125em",
                    marginLeft: "0.3125em",
                  }}
                  type="delete"
                  onClick={() => handleDelete(item)}
                />
              )}
            </tr>
          );
        })}
      </table>
      <Spacer />
      <Button
        style={{ float: "right" }}
        type="primary"
        onClick={handleSubmit}
        Loading={addingExpense}
      >
        Submit
      </Button>
      &nbsp; &nbsp; &nbsp;
      <Button
        style={{ float: "right", marginRight: "1%" }}
        type="primary"
        onClick={handleAddRowClick}
        Loading={addingExpense}
      >
        Add more
      </Button>
    </div>
  );
}

const mapStateToProps = ({ expense, auth,expenses }) => ({
  addingExpense: expense.addingExpense,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  expenses: expenses.expenses,
  user: auth.userDetails,
  expenseTypeId:expenses.expenseTypeId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addExpense,
      getExpenseById,
      getCurrency,
      getExpenses
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
