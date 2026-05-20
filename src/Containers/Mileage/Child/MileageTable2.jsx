import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMileageByVoucherId,handleUpdateMileageModal,
  setEditMileage,updateMileage} from "../MileageAction";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip,Button,Input } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { mileageReducer } from "../MileageReducer";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
const UpdateMileageModal=lazy(()=>import("./UpdateMileageModal"));

class MileageTable2 extends React.Component {
  componentDidMount() {
    const { voucherId } = this.props;
    this.props.getMileageByVoucherId(voucherId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { voucherId } = this.props;
    if (this.props.voucherId !== prevProps.voucherId) {
      this.props.getMileageByVoucherId(voucherId);
    }
  }

  render() {
    const {handleUpdateMileageModal,updateMileageModal,currentMileageId}=this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Mileage #",
          title: <FormattedMessage id="app.mileage#" defaultMessage="Mileage #" />,
        dataIndex: "mileageId",
      },
      {
        // title: "Attributed To",
         title: <FormattedMessage id="app.attributedto" defaultMessage="Attributed To" />,
        dataIndex: "clientName",
        key: "attribute",
      },
      {
        // title: "Date",
         title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        render: (name, item, i) => {
          return <span>{dayjs(item.mileageDate).format("ll")}</span>;
        },
      },
      {
        // title: "From",
        title: <FormattedMessage id="app.from" defaultMessage="From" />,
        dataIndex: "fromLocation",
      },
      {
        // title: "To",
        title:<FormattedMessage id="app.to" defaultMessage="To" />,
        dataIndex: "toLocation",
      },

      {
        // title: "Distance/Km",
         title:<FormattedMessage id="app.distance" defaultMessage="Distance/Km" />,
        dataIndex: "distances",
      },
      {
        // title: "Remarks",
        title:<FormattedMessage id="app.remarks" defaultMessage="Remarks" />,
        dataIndex: "remark",
      },
      {
        // title: "Mileage rate",
        title: <FormattedMessage id="app.mileagerate" defaultMessage="Mileage Rate" />,
        dataIndex: "mileageRate",
        render: (name, item, i) => {
          return (
            <span>
              {item.mileageRate ? (
                <>
                  <CurrencySymbol currencyType={item.currency} />{" "}
                  {` ${item.mileageRate || ""}`}
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
        render: (name, item, i) => {
          return <div>{/* <EyeOutlined /> */}</div>;
        },
      },

      {
        title: "",
        dataIndex: "documentId",
        width:"2%",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
              <BorderColorIcon
                type="edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                 this.props.setEditMileage(item);
                  handleUpdateMileageModal(true);
                  
                }}
              />
            </Tooltip>
          );
        },
        
      },

    ];

    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={this.props.mileageVoucherId}
          scroll={{ y: 460 }}
          pagination={false}
        />
        <UpdateMileageModal
        mileageId={currentMileageId}
        updateMileageModal={updateMileageModal}
        handleUpdateMileageModal={handleUpdateMileageModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ mileage }) => ({
  fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
  fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
  mileageVoucherId: mileage.mileageVoucherId,
  updateMileageModal:mileage.updateMileageModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByVoucherId,
      handleUpdateMileageModal,
      setEditMileage,
      updateMileage,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageTable2);
