import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {  Tooltip, Button, Empty,Input} from "antd";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";

import "../../../../App.css";

import {
  deleteCall,
  getCallListRangeByUserId,
  handleCallModal,
  setEditNote,
  getNotesListByCallId,
} from "../../CallAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import Highlighter from "react-highlight-words";

class CallTable extends React.Component {
  componentDidMount() {
    const {
      getCallListRangeByUserId,
      userDetails: { employeeId },
    } = this.props;
    getCallListRangeByUserId(employeeId);
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
            icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
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
<SearchIcon
  fontSize="small"
  style={{ color: filtered ? "#1890ff" : undefined }}
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
    const {
      fetchingCallListRangeByUserId,
      fetchingCallListRangeByUserIdError,
      callListRangeByUserId,
      deleteCall,
      userDetails: { employeeId },
      setEditNote,
    } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Type",
        title: <FormattedMessage id="app.type" defaultMessage="Type" />,
        dataIndex: "callType",
        render: (name, item, i) => {
          console.log(item);
          return (
            <span>
              {item.callType === "Inbound" && (
                <Tooltip title="Inbound">
                  <span>
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                </Tooltip>
              )}
              {item.callType === "Outbound" && (
                <Tooltip title="Outbound">
                  <span>
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                </Tooltip>
              )}
              {item.callType === "Conference" && (
                <Tooltip title="Conference">
                  <span>
                    <i className="fas fa-network-wired"></i>
                  </span>
                </Tooltip>
              )}
            </span>
          );
        },
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.callType.indexOf(value) === 0,
        sorter: (a, b) => a.callType > b.callType,
      },
      {
        // title: "Topic",
        title: <FormattedMessage id="app.subject" defaultMessage="Subject" />,
        dataIndex: "callPurpose",
        render: (name, item, i) => {
          return <span>{` ${item.callPurpose}`}</span>;
        },  
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.callPurpose.indexOf(value) === 0,
        sorter: (a, b) =>
          a.callPurpose &&
          a.callPurpose.toLowerCase() > b.callPurpose &&
          b.callPurpose.toLowerCase()
            ? 1
            : -1,
      },
      {
        // title: "Contact",
        title: <FormattedMessage id="app.contact" defaultMessage="Contact" />,
        dataIndex: "contactName",
        defaultSortOrder: "descend",
        ...this.getColumnSearchProps("contactName"),
      },
      {
        // title: "Start",
        title: (
          <FormattedMessage id="app.date" defaultMessage="Date" />
        ),
        dataIndex: "startDate",
        defaultSortOrder: "descend",
        render: (text, item) => {
          const startDate = dayjs(item.startDate).format("llll");
          return <span> {item.startDate ? dayjs(item.startDate).format("llll") : ""}</span>;
        },
        // render: (name, item, i) => {
        //   return <span>{` ${dayjs(item.startDate).format("llll")}`}</span>;
        // }
        // sorter: (a, b) => {
        //   var startDateA = a.startDate;
        //   var startDateB = b.startDate;
        //   return dayjs.utc(startDateA).diff(dayjs.utc(startDateB));
        // }
      },

      {
        // title: "Contact",
        title: <FormattedMessage id="app.talent" defaultMessage="Talent" />,
        dataIndex: "candidateName",
        ...this.getColumnSearchProps("candidateName"),
        // defaultSortOrder: "descend",
      },
  

      // {
      //   // title: "End",
      //   title: <FormattedMessage id="app.end" defaultMessage="End" />,
      //   dataIndex: "endDate",
      //   render: (text, item) => {
      //     const endDate = dayjs(item.endDate).format("llll");
      //     return <span>{endDate}</span>;
      //   },

      // },

      {
        title: "",
        dataIndex: "callId",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={
                <FormattedMessage
                  id="app.doyouwanttodelete?"
                  defaultMessage="Do you want to delete?"
                />
              }
              onConfirm={() => deleteCall(item.callId, employeeId)}
            >
             <DeleteIcon
  fontSize="small"
  style={{ cursor: "pointer" }}
/>

              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
     
    ];

    if (fetchingCallListRangeByUserIdError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="callId"
          columns={columns}
          dataSource={callListRangeByUserId}
          Loading={
            fetchingCallListRangeByUserId || fetchingCallListRangeByUserIdError
          }
          onChange={this.onChange}
          scroll={{ y: tableHeight }}
          pagination={false
            // defaultPageSize: 15,
            // showSizeChanger: true,
            // pageSizeOptions: ["15", "25", "40", "50"],
          }
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.callDescription || ""}</p>
              </>
            );
          }}
          // pagination={{
          //   defaultPageSize: 10,
          // }}

          locale={{
            emptyText: (
              <Empty
                description={
                  <NoDataComponent
                    description="No calls "
                    buttonText="Create call"
                    onClick={() => this.props.handleCallModal(true)}
                  />
                }
              />
            ),
          }}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, call }) => ({
  userDetails: auth.userDetails,
  fetchingCallListRangeByUserId: call.fetchingCallListRangeByUserId,
  fetchingCallListRangeByUserIdError: call.fetchingCallListRangeByUserIdError,
  callListRangeByUserId: call.callListRangeByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallListRangeByUserId,
      deleteCall,
      handleCallModal,
      setEditNote,
      getNotesListByCallId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallTable);

function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <FlexContainer
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <p>{description || "We couldn't find relevant data"}</p>
        {/* <Button onClick={onClick}>{buttonText || "Create"}</Button> */}
      </FlexContainer>
    </div>
  );
}
