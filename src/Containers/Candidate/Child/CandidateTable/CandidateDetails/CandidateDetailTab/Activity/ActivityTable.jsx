import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input} from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";

import { getActivityListByCandidateId } from "../../../../../CandidateAction";
import Highlighter from "react-highlight-words";
import { CheckCircleOutlined, FileDoneOutlined, PhoneOutlined, ScheduleOutlined, SearchOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const ButtonGroup = Button.Group;
class LinkedCandidateActivity extends Component {
 
  componentDidMount() {
      this.props.getActivityListByCandidateId(this.props.candidateId); 
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
           
            size="small"
            style={{ width: 90 }}
          >
            {/* Search */}
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
            {/* Reset */}
             <FormattedMessage
                                  id="app.reset"
                                  defaultMessage="Reset"
                                />
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
            {/* Filter */}
            <FormattedMessage
                                  id="app.filter"
                                  defaultMessage="Filter"
                                />
          </Button>
        
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
      type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
    // console.log(this.props.candidateId);
    const { fetchingActivityCandidate,candidateId } = this.props;
    // console.log(candidateId);

    const columns = [
      {
        title: "",
        width: "5%",
        dataIndex: "activity",
        render: (name, item, i) => {
          return (
            <>
              {item.activity === "Call" && <PhoneOutlined
              type="phone" />}
              {item.activity === "Event" && <ScheduleOutlined
              type="schedule" />}
              {item.activity === "Task" && <FileDoneOutlined
              type="file-done" />}
            </>
          );
        },
      },
      {
        // title: "Type",
        title: <FormattedMessage
                                  id="app.type"
                                  defaultMessage="Type"
                                />,
        width: "12%",
        dataIndex: "type",
      },
      {
        // title: "Topic",
         title: <FormattedMessage
                                  id="app.topic"
                                  defaultMessage="Topic"
                                />,
        width: "20%",
        dataIndex: "topic",
        ...this.getColumnSearchProps("topic"),
        
      },
      {
        // title: "Start",
         title: <FormattedMessage
                                  id="app.start"
                                  defaultMessage="Start"
                                />,
        width: "20%",
        dataIndex: "startDate",
        defaultSortOrder: "descend",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.startDate).format("lll")}`}</span>;
        },
        sorter: (a, b) => {
          var startDateA = a.startDate;
          var startDateB = b.startDate;
          return dayjs.utc(startDateA).diff(dayjs.utc(startDateB));
        },
      },
      {
        // title: "End",
        title: <FormattedMessage
                                  id="app.end"
                                  defaultMessage="End"
                                />,
        width: "20%",
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.endDate).format("lll")}`}</span>;
        },
        onFilter: (value, record) => record.endDate.indexOf(value) === 0,
        sorter: (a, b) => {
          var endDateA = a.endDate;
          var endDateB = b.endDate;
          return dayjs.utc(endDateA).diff(dayjs.utc(endDateB));
        },
      },
      {
        title: "",
        width: "3%",
        dataIndex: "completionInd",
        render: (name, item, i) => {
          return (
            <span>
              {item.completionInd === true && (
                <CheckCircleOutlined
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                  size={180}
                  style={{ fontSize: "20px" }}
                />
              )}
            </span>
          );
        },
      },
      {
        // title: "Status",
title: <FormattedMessage
                                  id="app.status"
                                  defaultMessage="Status"
                                />,
        dataIndex: "status",
        width: "8%",
      },
      {
        // title: "Priority",
        title: <FormattedMessage
                                  id="app.priority"
                                  defaultMessage="Priority"
                                />,
        width: "6%",
        dataIndex: "priority",
      },
    ];

    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          pagination={false}
          scroll={{ y: 280 }}
          // expandedRowRender={(record) => {
          //   return <p style={{ margin: 0 }}>{record.callSubject}</p>;
          // }}
          rowKey=""
          columns={columns}
          dataSource={this.props.activityCandidate}
          Loading={fetchingActivityCandidate}
         
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  activityCandidate: candidate.activityCandidate,
  fetchingActivityCandidate: candidate.fetchingActivityCandidate,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getActivityListByCandidateId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedCandidateActivity);
