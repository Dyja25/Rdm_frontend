import dayjs from "dayjs";
import React,{component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button,Input } from "antd";
import { StyledTable,StyledPopconfirm } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { getExpenseByVoucherId, 
  handleDocumentUploadModal,
  setEditExpense,handleUpdateExpenseModal,
  deleteExpense } from "../ExpenseAction";
import { expenseReducer } from "../ExpenseReducer";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { base_url } from "../../../Config/Auth";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

const AddDocumentModal=lazy(()=>import("./AddDocumentModal"));
const UpdateExpenseModal=lazy(()=>import("./UpdateExpense/UpdateExpenseModal"));

class ExpenseTable2 extends React.Component {
  componentDidMount() {
    const { voucherId } = this.props;
    this.props.getExpenseByVoucherId(voucherId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { voucherId } = this.props;
    if (this.props.voucherId !== prevProps.voucherId) {
      this.props.getExpenseByVoucherId(voucherId);
    }
  }
  
  
  //  handleSetCurrentExpenseId(expenseId) {
  //   setCurrentExpenseId(expenseId);
  //   console.log(expenseId);
  // }
  render() {
    console.log(this.props.particularRowData)
    const {
      fetchingExpenseByVoucherIdError,
      expenseByExpenseId,
      currentExpenseId,
      deleteExpense,
      setCurrentExpenseId,
      handleUpdateExpenseModal,
      updateExpenseModal,
      fetchingExpenseByVoucherId,
      documentUploadModal,
      handleDocumentUploadModal,
    } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Expense #",
        title: <FormattedMessage
          id="app.expense"
          defaultMessage="Expense #"
        />,
        dataIndex: "expenseId",
      },

      {
        //title: "Expense Type",
        title: <FormattedMessage
          id="app.type"
          defaultMessage="Type"
        />,
        dataIndex: "expenseType",
      },
      {
        // title: "Date",
         title: <FormattedMessage
          id="app.date"
          defaultMessage="Date"
        />,
        render: (name, item, i) => {
          return <span>{dayjs(item.voucherDate).format("ll")}</span>;
        },
      },

      {
        // title: "Attributed To",
        title: <FormattedMessage
          id="app.customer"
          defaultMessage="Customer"
        />,
        dataIndex: "clientName",
      },

      {
        //title: "Particulars",
        title: <FormattedMessage
          id="app.particular"
          defaultMessage="Particulars"
        />,
        dataIndex: "particular",
      },

      {
        // title: "Amount",
        title: <FormattedMessage
          id="app.amount"
          defaultMessage="Amount"
        />,
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
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <Tooltip title="Upload Document">
              <FileUploadIcon
                type="upload"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleDocumentUploadModal(true);
                  
                }}
              />
            </Tooltip>
          );
      },
    },
    {
      title: "",
      // dataIndex: "documentTypeId",
      width: "5%",
      render: (name, item, i) => {
        return (
          <a
            href={`${base_url}/document/${item.documentId}`}
          // target="_blank"
          >
            <GetAppIcon
              type="download"
              // onClick={() => startDownload()}
              style={{ cursor: "pointer" }}
            />
          </a>
        );
      },
    },
      {
        title: "",
        dataIndex: "documentId",
        width:"2%",
        render: (name, item, i) => {
          return (
            <>
            {this.props.particularRowData.status === "Pending" && 
            <Tooltip title="Edit">
              <BorderColorIcon
                type="edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                 this.props.setEditExpense(item);
                  handleUpdateExpenseModal(true);
                  // handleSetCurrentExpenseId(item.expenseId);
                }}
              />
            </Tooltip>
        }
            </>
          );
        },
        
      },
      {
        title: "",
        dataIndex: "expenseId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <>
             {this.props.particularRowData.status === "Pending" && 
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteExpense(item.expenseId)}
            >
              <DeleteOutlineIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
        }
        </>
          );
        },
      },
    ];
    if (fetchingExpenseByVoucherIdError) {
      return <APIFailed />;
    }
    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={this.props.expVoucherId}
          Loading={
            fetchingExpenseByVoucherId || fetchingExpenseByVoucherIdError
          }
          scroll={{ y:280 }}
          pagination={false}
        />
          <UpdateExpenseModal
        expenseId={currentExpenseId}
        updateExpenseModal={updateExpenseModal}
        handleUpdateExpenseModal={handleUpdateExpenseModal}
        // handleSetCurrentExpenseId={handleSetCurrentExpenseId}
      />
      <AddDocumentModal
        documentUploadModal={documentUploadModal}
        handleDocumentUploadModal={handleDocumentUploadModal}
      />
      </>
    );
  }
}
const mapStateToProps = ({ expense }) => ({
  fetchingExpenseByVoucherId: expense.fetchingExpenseByVoucherId,
  fetchingExpenseByVoucherIdError: expense.fetchingExpenseByVoucherIdError,
  expVoucherId: expense.expVoucherId,
  documentUploadModal: expense.documentUploadModal,
  updateExpenseModal:expense.updateExpenseModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseByVoucherId,
      deleteExpense,
      setEditExpense,
      handleUpdateExpenseModal,
      handleDocumentUploadModal,
    },

    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable2);
