import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {  Empty, Tooltip,Input,Button } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { deleteEvent, getEventListRangeByUserId,
  handleUpdateEventModal,
  setEditEvents,} from "../../EventAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import Highlighter from "react-highlight-words";
const UpdateEventModal=lazy(()=> import("../UpdateEventModal.jsx"));

class EventTable extends React.Component {
  componentDidMount() {
    const {
      getEventListRangeByUserId,
      userDetails: { employeeId },
    } = this.props;
    getEventListRangeByUserId(employeeId);
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
      fetchingEventListRangeByUserId,
      fetchingEventListRangeByUserIdError,
      eventListRangeByUserId,
      deleteEvent,
      setEditNoteEvent,
      updateEventModal,
    handleUpdateEventModal,
      userDetails: { employeeId },
    } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Type",
        title: <FormattedMessage id="app.type" defaultMessage="Type" />,
        dataIndex: "eventType",
        render: (name, item, i) => {
          return <span>{` ${item.eventType}`}</span>;
        },
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.eventType.indexOf(value) === 0,
        sorter: (a, b) =>
          a.eventType &&
          a.eventType.toLowerCase() > b.eventType &&
          b.eventType.toLowerCase()
            ? 1
            : -1,
      },
      {
        // title: "Subject",
        title: <FormattedMessage id="app.subject" defaultMessage="Subject" />,
        dataIndex: "eventSubject",
        ...this.getColumnSearchProps('eventSubject'),
        render: (name, item, i) => {
          return <span>{` ${item.eventSubject || ""}`}</span>;
        },
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.eventSubject.indexOf(value) === 0,
        sorter: (a, b) =>
          a.eventSubject &&
          a.eventSubject.toLowerCase() > b.eventSubject &&
          b.eventSubject.toLowerCase()
            ? 1
            : -1,
      },
      // {
      //   title: "Contact",
      //   dataIndex: "contact",
      //   defaultSortOrder: "descend",
      // },

      {
        // title: "Start",
        title: <FormattedMessage id="app.start" defaultMessage="Start" />,
        dataIndex: "startDate",
        defaultSortOrder: "descend",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.startDate).format("llll")}`}</span>;
        },
        sorter: (a, b) => {
          var startDateA = a.startDate;
          var startDateB = b.startDate;
          return dayjs.utc(startDateA).diff(dayjs.utc(startDateB));
        },
      },
      // {
      //   title: "End",
      //   dataIndex: "endDate",
      //   render: (name, item, i) => {
      //     return <span>{` ${dayjs(item.endDate).format("llll")}`}</span>;
      //   },
      //   onFilter: (value, record) => record.endDate.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     var endDateA = a.endDate;
      //     var endDateB = b.endDate;
      //     return dayjs.utc(endDateA).diff(dayjs.utc(endDateB));
      //   },
      // },
      {
        // title: "Contact",
        title: <FormattedMessage id="app.talent" defaultMessage="Talent" />,
        dataIndex: "candidateName",
        ...this.getColumnSearchProps('candidateName'),
        // defaultSortOrder: "descend",
        
      },

      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <Tooltip title="Edit">
              
              <EditIcon
  sx={{ cursor: "pointer", fontSize: 12 }}
  onClick={() => {
     this.props.setEditEvents(item);
                  handleUpdateEventModal(true);
  }}
/>

            </Tooltip>
          );
        },
      },
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
          const dataLoc = ` Address : ${item.address &&
            item.address.length &&
            item.address[0].address1} 
           Street : ${item.address &&
             item.address.length &&
             item.address[0].street}   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${(item.address &&
           item.address.length &&
           item.address[0].country) ||
           ""} 
           PostalCode : ${item.address &&
             item.address.length &&
             item.address[0].postalCode} `;
          return (
            <Tooltip
              // className="ant-tooltip-inner"
              // placement="rightTop"
              overlayStyle={{ maxWidth: "300px" }}
              title={dataLoc}
            >
              <span
                // onClick={() => handleReasonOfDelete(item.orderId)}
                style={{
                  // color:
                  //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </Tooltip>
          );
        },
      },

      {
        title: "",
        dataIndex: "eventId",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwanttodelete" defaultMessage="Do you want to delete" />}
              onConfirm={() => deleteEvent(item.eventId, employeeId)}
            >
<DeleteIcon
  fontSize="small"
  style={{ cursor: "pointer" }}
/>
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingEventListRangeByUserIdError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="eventId"
          columns={columns}
          dataSource={eventListRangeByUserId}
          Loading={
            fetchingEventListRangeByUserId ||
            fetchingEventListRangeByUserIdError
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
                <p>{record.eventDescription || ""}</p>
              </>
            );
          }}
          locale={{
            emptyText: (
              <Empty
                description={
                  <NoDataComponent
                    description="No events "
                    buttonText="Create event"
                    // onClick={() => this.props.handleCallModal(true)}
                  />
                }
              />
            ),
          }}
        />
        <UpdateEventModal
        updateEventModal={updateEventModal}
        handleUpdateEventModal={handleUpdateEventModal}
      />
      </>
    );
  }
}
const mapStateToProps = ({ auth, event }) => ({
  userDetails: auth.userDetails,
  fetchingEventListRangeByUserId: event.fetchingEventListRangeByUserId,
  fetchingEventListRangeByUserIdError:
    event.fetchingEventListRangeByUserIdError,
  eventListRangeByUserId: event.eventListRangeByUserId,
  updateEventModal: event.updateEventModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEventListRangeByUserId,
      deleteEvent,
      handleUpdateEventModal,
      setEditEvents,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventTable);
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
