import { identity } from "lodash";
import dayjs from "dayjs";
import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTable } from "../../../Components/UI/Antd";
import { getMileageByUserId } from "../MileageAction";
import { mileageReducer } from "../MileageReducer";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
const MileageTable2=lazy(()=>import("./MileageTable2"));

class MileageTable extends React.Component {
  state = {
    expand: false,
    voucherId: "",
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    this.props.getMileageByUserId(this.props.userId);
  }
  render() {
    const {
      MileageDat,
      fetchingMileageByUserId,
      fetchingMileageByUserIdError,
    } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Status",
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
              {/* {item.status === "Rejected" && (
                <Tooltip placement="right" title="Rejected">
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                    size={140}
                    style={{ fontSize: "1.25em" }}
                  />
                </Tooltip>
              )} */}
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
        title: "Voucher ID",

        dataIndex: "voucherId",
        render: (name, item, i) => {
          return (
            <div
              onClick={() => this.handleExpand(item.voucherId)}
              style={{
                cursor: "pointer",
                color:
                  this.state.voucherId === item.voucherId
                    ? "orange"
                    : "#1890ff",
              }}
            >
              {item.voucherId}
            </div>
          );
        },
        // render: (name, item, i) => {
        //   return (
        //     <span onClick={() => this.handleExpand(item.voucherId)}>
        //       {item.voucherId}
        //     </span>
        //   );
        // },
      },
      {
        title: "Voucher Date",
        render: (name, item, i) => {
          return <span>{dayjs(item.voucherDate).format("MMM Do YY")}</span>;
        },
      },
      {
        title: "Amount",
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

    if (fetchingMileageByUserIdError) {
      return <APIFailed />;
    }
    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={MileageDat}
          Loading={fetchingMileageByUserId || fetchingMileageByUserIdError}
          scroll={{ y: 460 }}
          pagination={false}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {this.state.expand && (
          <MileageTable2 voucherId={this.state.voucherId} />
        )}
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  MileageDat: mileage.MileageDat,
  fetchingMileageByUserId: mileage.fetchingMileageByUserId,
  fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageTable);
