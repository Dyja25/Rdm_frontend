import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTable } from "../../../Components/UI/Antd";
import ExpenseTable2 from "./ExpenseTable2";
import { getExpenseById } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
// class ExpenseTable extends React.Component {
//   state = {
//     expand: false,
//     voucherId: "",
//   };
function ExpenseTable(props) {
  const [expand, setExpand] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularRowData(item) {
    console.log(item);
    setParticularRowData(item);   
  }

  function handleExpand(voucherId) {
    setExpand(!expand);    
    setvoucherId(voucherId);
  }

  useEffect(() => {
    props.getExpenseById(props.userId);
  }, [props.userId]);

 
    const {
      Expenses,
      fetchingExpenseById,
      fetchingExpenseByIdError,
    } = props;
    const columns = [
      {
        title: "",
        width: "2%",
      },

      {
        //title: "Status",
        title: <FormattedMessage id="app.status" defaultMessage="Status" />,
        render: (name, item, i) => {
          return (
            <span>
              {item.status === "Approved" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "25px",
                    width: "25px",
                    backgroundColor: "green",
                  }}
                ></div>
              )}
              {item.status === "Rejected" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "25px",
                    width: "25px",
                    backgroundColor: "red",
                  }}
                ></div>
              )}
              {item.status === "Pending" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "25px",
                    width: "25px",
                    backgroundColor: "yellow",
                  }}
                ></div>
              )}
            </span>
          );
        },
      },
      {
        //title: "Voucher ID",
        title: (
          <FormattedMessage id="app.voucherId" defaultMessage="Voucher ID" />
        ),
        dataIndex: "voucherId",
        render: (name, item, i) => {
          return (
            <span
              onClick={() =>{ 
                handleExpand(item.voucherId);
                handleSetParticularRowData(item);
              }}
              style={{
                cursor: "pointer",
                color: expand && item.voucherId === voucherId ? "orange" : "#1890ff",
              }}
            >
              {item.voucherId}
            </span>
          );
        },
      },
      // {
      //   // title: "Type",
      //   title: <FormattedMessage id="app.type" defaultMessage="Type" />,
      //   dataIndex: "type",
      // },
      {
        // title: "Voucher date",
        title: (
          <FormattedMessage
            id="app.voucherDate"
            defaultMessage="Voucher date"
          />
        ),
        dataIndex: "voucherDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.voucherDate).format("MMM Do YY")}</span>;
        },
      },
      {
        // title: "Amount",
        title: <FormattedMessage id="app.amount" defaultMessage="Amount" />,
        dataIndex: "amount",
        render: (name, item, i) => {
          return (
            <span>
              {item.amount ? (
                <>
                  <CurrencySymbol currencyType={item.currency} />{" "}
                  {` ${item.amount || ""}`}
                </>
              ) : (
                ""
              )}
            </span>
          );
        },
      },
    ];
    if (fetchingExpenseByIdError) {
      return <APIFailed />;
    }

    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={Expenses}
          Loading={fetchingExpenseById || fetchingExpenseByIdError}
          scroll={{ y: 280 }}
          pagination={false}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {expand && (
          <ExpenseTable2
           voucherId={voucherId} 
           particularRowData={particularRowData}/>
        )}
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError: expense.fetchingExpenseByIdError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
