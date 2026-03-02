import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import { StyledTable, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import {  Tooltip } from "antd";
import { getLeaveListRangeByUserId,
updateLeaves,
setEditLeave,
handleUpdateLeaveModal} from "../../LeavesAction";
import UpdateLeavesModal from "./UpdateLeavesModal";
import { LeavesReducer } from "../../LeavesReducer";
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { handleBankModal } from "../../../../ProfileAction";
// import AddBankModal from "./AddBankModal";
// import UpdateBankModal from "../../ProfileBoost/Bank/UpdateBankModal";
// import { handleUpdateBankModal, setEditBank } from "../../../../ProfileAction";
// import { getBankDetails } from "../../../../ProfileAction";
// import EditEmailForm from "../../../../../Settings/Email/Child/EditEmailForm"
import dayjs from "dayjs";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";

function LeaveTable(props) {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });
 
  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);
   
  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

   function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }
 
    const {
      leaveListRangeByUserId,
      fetchingLeaveListRangeByUserId,
      fetchingLeaveListRangeByUserIdError,
      handleUpdateLeaveModal,
      updateLeaveModal,
      
      // fetchingBankDetails,
      // bank,
      // handleUpdateBankModal,
      // updateBankModal,
      // setEditBank,
    } = props;
    const columns = [
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
        title: "Start Date",
        dataIndex: "startDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("LL")}</span>;
        },
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.endDate).format("LL")}</span>;
        },
      },
      {
        title: "Cover",
        dataIndex: "coverDetails",
      },

      // {
      //     title: "Status",
      //     dataIndex: "status",
      // },
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
                 props.setEditLeave(item);
                  handleUpdateLeaveModal(true);
                  handleSetCurrentLeaveId(item.leaveId);
                  
                }}
              />
            </Tooltip>
          );
        },
        
      },
    ];

    if (fetchingLeaveListRangeByUserIdError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={leaveListRangeByUserId}
          Loading={
            fetchingLeaveListRangeByUserId ||
            fetchingLeaveListRangeByUserIdError
          }
          scroll={{ y: 460 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.reason || ""}</p>
              </>
            );
          }}
        />
        <UpdateLeavesModal
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
        />
      </>
    );
  }


const mapStateToProps = ({ leave, auth }) => ({
  userId: auth.userDetails.userId,
  fetchingLeaveListRangeByUserId: leave.fetchingLeaveListRangeByUserId,
  fetchingLeaveListRangeByUserIdError:
    leave.fetchingLeaveListRangeByUserIdError,
  leaveListRangeByUserId: leave.leaveListRangeByUserId,
  // fetchingBankDetails: profile.fetchingBankDetails,
  updateLeaveModal:leave.updateLeaveModal,
  // updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      // getBankDetails,
      // handleUpdateBankModal,
      // setEditBank,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTable);
