import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Tooltip,Input, Button, message } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTable, StyledPopconfirm } from "../../../Components/UI/Antd";
import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
import {
  getTaskListRangeByUserId,
  deleteTask,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
} from "../TaskAction";
import Highlighter from "react-highlight-words";
const UpdateTaskModal=lazy(()=>import("./UpdateTaskModal.jsx"));

const ButtonGroup = Button.Group;
class TaskTable extends React.Component {
  componentDidMount() {
    const {
      getTaskListRangeByUserId,
      userDetails: { employeeId },
    } = this.props;
    getTaskListRangeByUserId(employeeId);
  }
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            // icon={<SearchOutlined />}
            // icon="search"
            size="small"
            style={{ width: 90 }}
          >
             <FormattedMessage
                             id="app.search"
                             defaultMessage="Search"
                            />
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        
      </div>
    ),
    filterIcon: (filtered) => (
    //   <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    <SearchIcon
  sx={{ color: filtered ? "#1890ff" : "inherit" }}
/>

    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    //debugger;
    const {
      fetchingTaskListRangeByUserId,
      taskListRangeByUserId,
      deleteTask,
      approveTaskByTaskId,
      rejectTaskByTaskId,
      handleUpdateTaskModal,
      updateTaskModal,
      setEditTask,
      userDetails: { employeeId },
    } = this.props;

    const columns = [
      {
        // title: "Priority",
        dataIndex: "priority",
        width:"4%",
        render: (name, item, i) => {
          //debugger;
          return (
            <div>
              {item.priority === "High" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "2.1875em",
                    width: "2.1875em",
                    backgroundColor: "red",
                  }}
                >
                  {/* {item.taskType === "Email" && (
                    <span>
                      <Tooltip title={"Email"}>
                        <Icon
                          type="mail"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Partner Login" && (
                    <span>
                      <Tooltip title={"Collaboration"}>
                        <i
                          className={`fas fa-user-shield`}
                          style={{
                            // fontSize: "1.25em",
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></i>
                        {/* <Icon
                          type="file-done"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon> */}
                      {/* </Tooltip>
                    </span>
                  )} */} 
                  {/* {item.taskType === "LinkedIn post" && (
                    <span>
                      <Tooltip title={"LinkedIn post"}>
                        <Icon
                          type="linkedin"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Ticket" && (
                    <span>
                      <Tooltip title={"Ticket"}>
                        <Icon
                          type="idcard"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Documentation" && (
                    <span>
                      <Tooltip title={"Documentation"}>
                        <Icon
                          type="file"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Research" && (
                    <span>
                      <Tooltip title={"Research"}>
                        <Icon
                          type="file-search"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Collaborate" && (
                    <span>
                      <Tooltip title={"Collaborate"}>
                        <Icon
                          type="wechat"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.type === "Call" && (
                    <span>
                      <Tooltip title={"Call"}>
                        <Icon
                          type="phone"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>*/}
                  
                </div>
              )} 
              {item.priority === "Medium" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "2.1875em",
                    width: "2.1875em",
                    backgroundColor: "orange",
                  }}
                >
                  {/* {item.taskType === "Partner Login" && (
                    <span>
                      <Tooltip title={"Collaboration"}>
                        <i
                          className={`fas fa-user-shield`}
                          style={{
                            // fontSize: "1.25em",
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></i> */}
                        {/* <Icon
                          type="file-done"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon> */}
                      {/* </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Email" && (
                    <span>
                      <Tooltip title={"Email"}>
                        <Icon
                          type="mail"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "LinkedIn post" && (
                    <span>
                      <Tooltip title={"LinkedIn post"}>
                        <Icon
                          type="linkedin"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Ticket" && (
                    <span>
                      <Tooltip title={"Ticket"}>
                        <Icon
                          type="idcard"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Documentation" && (
                    <span>
                      <Tooltip title={"Documentation"}>
                        <Icon
                          type="file"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Research" && (
                    <span>
                      <Tooltip title={"Research"}>
                        <Icon
                          type="file-search"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Collaborate" && (
                    <span>
                      <Tooltip title={"Collaborate"}>
                        <Icon
                          type="wechat"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.type === "Call" && (
                    <span>
                      <Tooltip title={"Call"}>
                        <Icon
                          type="phone"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}

                  {/* <Icon type="mail" style={{ color: "whiteSmoke", margin: "0.625em" }} /> */}
                </div>
              )}
              {item.priority === "Low" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "2.1875em",
                    width: "2.1875em",
                    backgroundColor: "teal",
                  }}
                >
                  {/* {item.taskType === "Partner Login" && (
                    <span>
                      <Tooltip title={"Collaboration"}>
                        <i
                          className={`fas fa-user-shield`}
                          style={{
                            // fontSize: "1.25em",
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></i>
                        {/* <Icon
                          type="file-done"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon> */}
                      {/* </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Email" && (
                    <span>
                      <Tooltip title={"Email"}>
                        <Icon
                          type="mail"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "LinkedIn post" && (
                    <span>
                      <Tooltip title={"LinkedIn post"}>
                        <Icon
                          type="linkedin"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Ticket" && (
                    <span>
                      <Tooltip title={"Ticket"}>
                        <Icon
                          type="idcard"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Documentation" && (
                    <span>
                      <Tooltip title={"Documentation"}>
                        <Icon
                          type="file"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.taskType === "Research" && (
                    <span>
                      <Tooltip title={"Research"}>
                        <Icon
                          type="file-search"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )}
                  {item.taskType === "Collaborate" && (
                    <span>
                      <Tooltip title={"Collaborate"}>
                        <Icon
                          type="wechat"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>
                  )} */}
                  {/* {item.type === "Call" && (
                    <span>
                      <Tooltip title={"Call"}>
                        <Icon
                          type="phone"
                          style={{
                            cursor: "pointer",
                            color: "whiteSmoke",
                            margin: "0.625em",
                          }}
                        ></Icon>
                      </Tooltip>
                    </span>*/}
                  
                </div>  
              )}
            </div>
          );
        },
        sorter: (a, b) =>
          a.priority &&
            a.priority.toLowerCase() > b.pritority &&
            b.priority.toLowerCase()
            ? 1
            : -1,
      },
      {
        //title: "Expense Type",
        title: <FormattedMessage
          id="app.type"
          defaultMessage="Type"
        />,
        dataIndex: "taskType", 
        width:"8%",
        render: (name, item, i) => {
          return <span>{` ${item.taskType || ""}`}</span>; 
        },
      },
      {
        // title: "Name",
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        dataIndex: "taskName",
        width:"12%",
        ...this.getColumnSearchProps('taskName'),
        // render: (name, item, i) => {
        //   return <span>{` ${item.taskName}`}</span>;
        // },
      },
      {
        // title: "Submitted by",
        title: <FormattedMessage id="app.submittedby" defaultMessage="Submitted by" />,
        dataIndex: "submittedBy",
        width:"12%",
        ...this.getColumnSearchProps('submittedBy'),
        // render: (name, item, i) => {
        //   return <span>{` ${item.submittedBy}`}</span>;
        // },
      },
      {
        // title: "Assigned on",
        title: <FormattedMessage id="app.assignedon" defaultMessage="Assigned on" />,
        dataIndex: "assignedOn",
        width:"10%",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.assignedOn).format("ll")}`}</span>;
        },
      },
      {
        // title: "Contact",
        title: <FormattedMessage id="app.talent" defaultMessage="Talent" />,
        dataIndex: "candidateName",
        width:"10%",
        ...this.getColumnSearchProps('candidateName'),
        // defaultSortOrder: "descend",
      },
      {
        // title: "Start",
        title: <FormattedMessage id="app.start" defaultMessage="Start" />,
        dataIndex: "startDate",
        width:"12%",
        defaultSortOrder: "descend",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.startDate).format("llll")}`}</span>;
        },
        // sorter: (a, b) => {
        //   var startDateA = a.startDate;
        //   var startDateB = b.startDate;
        //   return dayjs.utc(startDateA).diff(dayjs.utc(startDateB));
        // },
      },
      {
        // title: "End",
        title: <FormattedMessage id="app.end" defaultMessage="End" />,
        dataIndex: "endDate",
        width:"12%",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.endDate).format("llll")}`}</span>;
        },
        onFilter: (value, record) => record.endDate.indexOf(value) === 0,
        // sorter: (a, b) => {
        //   var endDateA = a.endDate;
        //   var endDateB = b.endDate;
        //   return dayjs.utc(endDateA).diff(dayjs.utc(endDateB));
        // },
      },
      {
        // title: "Status",
        title: <FormattedMessage id="app.status" defaultMessage="Status" />,
        dataIndex: "taskStatus",
        width:"4%",
        render: (name, item, i) => {
          return (
            <ButtonGroup>
              {item.taskStatus === "To Start" && (
                <StatusIcon
                  type="To Start"
                  iconType="fa-hourglass-start"
                  tooltip="To Start"
                />
              )}
              {item.taskStatus === "In Progress" && (
                <StatusIcon
                  type="In Progress"
                  iconType="fa-hourglass-half"
                  tooltip="In Progress"
                />
              )}
              {item.taskStatus === "Completed" && (
                <StatusIcon
                  type="Completed"
                  iconType="fa-hourglass"
                  tooltip="Completed"
                />
              )}
            </ButtonGroup>
          );
          // return <span>{` ${item.taskStatus}`}</span>;
        },
      },
      {
        title: "",
        dataIndex: "taskName",
        width:"10%",
        render: (name, item, i) => {
          return (
            <span>
              {item.taskStatus === "Completed" && !item.approvedInd ? (
                <>
                  <FlexContainer>
                    <Button
                      onClick={() => approveTaskByTaskId(item.taskId)}
                      style={{ backgroundColor: "teal", color: "white" }}
                    >
                      {/* Approve */}
                      <FormattedMessage id="app.approve" defaultMessage="Approve" />
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(233, 79, 79)",
                        color: "white",
                      }}
                      onClick={() => rejectTaskByTaskId(item.taskId)}
                    >
                      {/* Reject */}
                      <FormattedMessage id="app.reject" defaultMessage="Reject" />
                    </Button>
                  </FlexContainer>
                </>
              ) : (
                  <>
                    {item.approvedInd === "Approved" ? (
                    //   <Icon
                    //     type="check-circle"
                    //     theme="twoTone"
                    //     twoToneColor="#52c41a"
                    //     size={140}
                    //     style={{ fontSize: "1.5625em" }}
                    //   />
                    <CheckCircleIcon
  sx={{
    color: "#52c41a",
    fontSize: "1.5625em",
  }}
/>

                    ) : item.approvedInd === "Rejected" ? (
                    //   <Icon
                    //     type="close-circle"
                    //     theme="twoTone"
                    //     twoToneColor="red"
                    //     size={140}
                    //     style={{ fontSize: "1.5625em" }}
                    //   />
                    <CancelIcon
  sx={{
    color: "red",
    fontSize: "1.5625em",
  }}
/>

                    ) : (
                          <></>
                        )}
                  </>
                )}
            </span>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          return (
           
                <Tooltip title="Edit">
                {/* <Icon
                    type="edit"
                    style={{ cursor: "pointer", fontSize: "12px" }}
                    onClick={() => {
                      this.props.setEditTask(item);
                      handleUpdateTaskModal(true);
                    }}
                  /> */}
                  <EditIcon
  sx={{ cursor: "pointer", fontSize: 12 }}
  onClick={() => {
    this.props.setEditTask(item);
    handleUpdateTaskModal(true);
  }}
/>
                </Tooltip>
           
          );
        },
      },
      {
        title: "",
        dataIndex: "taskId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwishtodelete?" defaultMessage="Do you wish to delete?" />}
              onConfirm={() => deleteTask(item.taskId, employeeId)}
            >
              {/* <Icon type="delete" style={{ cursor: "pointer" }} /> */}
              <DeleteIcon
  fontSize="small"
  style={{ cursor: "pointer" }}
/>
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingTaskListRangeByUserId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <div>
          <StyledTable
            columns={columns}
            dataSource={taskListRangeByUserId}
            pagination={false}
            scroll={{ y: tableHeight }}
            // pagination={{
            //   defaultPageSize: 5,
            //   // showSizeChanger: true,
            //   // pageSizeOptions: ["5", "10"]
            // }}
            expandedRowRender={(record) => {
              return (
                <>
                  <p>{record.taskDescription || ""}</p>
                </>
              );
            }} 
          />
           <UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
        />
          </div>
         
      </>
    );
  }
}
const mapStateToProps = ({ auth, task, opportunity }) => ({
  userDetails: auth.userDetails,
  userId: auth.userDetails.userId,
  updateTaskModal: task.updateTaskModal,
  fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
  taskListRangeByUserId: task.taskListRangeByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTaskListRangeByUserId,
      deleteTask,
      approveTaskByTaskId,
      rejectTaskByTaskId,
      setEditTask,
      handleUpdateTaskModal,
    },
    dispatch
  );

export default 
  connect(mapStateToProps, mapDispatchToProps)(TaskTable)
;

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "orange" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
function overdue(pendingDays) {
  //debugger;
  if (pendingDays === -1) {
    //debugger;
    return <span style={{ color: "red", fontStyle: "italic" }}>1 Day</span>;
  }
  if (pendingDays < 0) {
    //debugger;
    return (
      <span style={{ color: "red", fontStyle: "italic" }}>{`${Math.abs(
        pendingDays
      )} Days`}</span>
    );
  }
  if (pendingDays === 1) {
    //debugger;
    return (
      <span
        style={{ color: "#21ce21", fontStyle: "italic" }}
      >{`${pendingDays} Day`}</span>
    );
  }
  if (pendingDays > 0) {
    //debugger;
    return (
      <span
        style={{ color: "#21ce21", fontStyle: "italic" }}
      >{`${pendingDays} Days`}</span>
    );
  }
}
