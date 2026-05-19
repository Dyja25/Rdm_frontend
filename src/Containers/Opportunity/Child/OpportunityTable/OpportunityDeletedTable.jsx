import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Input,Button } from "antd";
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
import { StyledTable } from "../../../../Components/UI/Antd";

import ReinstateToggle from "../../Child/ReinstateToggle.jsx"
import {
  getDeletedOpportunity,

} from "../../OpportunityAction";
import OpportunityDetailView from "./OpportunityDetailView";

import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import { SearchOutlined } from "@ant-design/icons";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityDeletedTable(props) {
  useEffect(() => {
    props.getDeletedOpportunity();
  }, []);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
            
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
              onClick={() => handleReset(clearFilters)}
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
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
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
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchOutlined
        type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    fetchingDeletedOpportunity,
    fetchingDeletedOpportunityError,
    deletedOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
  } = props;
  // if (fetchingDeletedOpportunity) {
  //   return <BundleLoader />;
  // }
  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      //title: "Name",
      title: <FormattedMessage
        id="app.opportunityName"
        defaultMessage="Name"
      />,

      dataIndex: "opportunityName",
      ...getColumnSearchProps('opportunityName'),
      defaultSortOrder: "ascend",
      width: "20%",
      render: (name, item, i) => {
        return (
          <OpportunityDetailView
            opportunityId={item.opportunityId}
            opportunityName={item.opportunityName}
          />
        );
      },
    },
    {
      //title: "Start Date",
      title: <FormattedMessage
        id="app.startdate"
        defaultMessage="Start Date"
      />,

      dataIndex: "startDate",
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        var nameA = a.startDate; // ignore upper and lowercase
        var nameB = b.startDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        return 0;
      },
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    {
      //title: "End Date",
      title: <FormattedMessage
        id="app.enddate"
        defaultMessage="Endd Date"
      />,
      dataIndex: "endDate",
      //defaultSortOrder: "descend",
      sorter: (a, b) => {
        var nameA = a.endDate; // ignore upper and lowercase
        var nameB = b.endDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        return 0;
      },
      render: (text, item) => {
        const endDate = dayjs(item.endDate).format("ll");
        return <span>{endDate}</span>;
      },
    },
    {
      //title: "Proposal Amount",
      title: <FormattedMessage
        id="app.proposalamount"
        defaultMessage="Proposal Amount"
      />,

      //dataIndex: "proposalAmount",
      width: "20%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {item.proposalAmount} {item.currency}
          </>
        );
      },
    },
    {
      // title: "Reinstate",
       title: <FormattedMessage
        id="app.reinstate"
        defaultMessage="Reinstate"
      />,
      margin: "8%",
      render: (name, item, i) => {
        return (
          <>
            <ReinstateToggle 
            opportunityId={item.opportunityId} 
            />
          </>
        );
      },
    },
  ];
  if (fetchingDeletedOpportunityError) {
    return <APIFailed />;
  }

  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={deletedOpportunity}
        onChange={onChange}
        Loading={fetchingDeletedOpportunity || fetchingDeletedOpportunityError}
        // pagination={{
        //   defaultPageSize: 10,
        // }}
        scroll={{ y: 460 }}
        // pagination={{
        //   defaultPageSize: 15,
        //   showSizeChanger: true,
        //   pageSizeOptions: ["15", "25", "40", "50"],
        // }}
          pagination={false}
      />

    
    </>
  );
}

// }
const mapStateToProps = ({ auth, account, opportunity }) => ({
//   userId: auth.userDetails.userId,
  fetchingDeletedOpportunity: opportunity.fetchingDeletedOpportunity,
  fetchingDeletedOpportunityError: opportunity.fetchingDeletedOpportunityError,
  deletedOpportunity: opportunity.deletedOpportunity,
//   updateOpportunityModal: opportunity.updateOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedOpportunity,
    //   handleUpdateOpportunityModal,
    //   setEditOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDeletedTable);
