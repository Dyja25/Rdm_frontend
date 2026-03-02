import React, { useEffect, useState,useMemo,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {getSectors} from "../../../Settings/Sectors/SectorsAction";
import dayjs from "dayjs";
import { StyledTable,StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Tooltip,Button,Input ,Select} from "antd";
import Highlighter from 'react-highlight-words';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import {
  getCustomerListByUserId,
  handleUpdateCustomerModal,
  setEditCustomer,
  updateOwnercustomerById,
  deleteCustomerData
} from "../../CustomerAction";
import {getAllSalesList,getRecruiterName} from "../../../Opportunity/OpportunityAction"
import { BundleLoader } from "../../../../Components/Placeholder";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
const CustomerDetailView=lazy(()=>import("./CustomerDetailView.jsx"));
const UpdateCustomerModal=lazy(()=>import("../UpdateCustomer/UpdateCustomerModal.jsx"));
const Option =Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
const [visibleselect, setvisibleselect]=useState(false);
const [selectedValue,setselectedValue]=useState("");

function handleTransferClick (){
  setvisibleselect(true)
}

function handleSelected (value){
  setselectedValue(value)
  console.log(value)
}
function handleSend (){
  let data={
    // userId:selectedValue,
    customerIds:selectedRowKeys
  }
  setselectedValue(props.updateOwnercustomerById(selectedValue,data));
  console.log(selectedValue,selectedRowKeys)
}
  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  useEffect(() => {
    props.getCustomerListByUserId(props.userId);
    props.getAllSalesList();
    props.getRecruiterName(); 
  }, []);

  

  const [currentCustomerId, setCurrentCustomerId] = useState("");
  // const [isShown, setIsShown] = useState(false);

  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }

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
              // icon={<SearchOutlined />}
              icon="search"
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
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
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          
        </div>
      ),
      filterIcon: (filtered) => (
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
       <SearchIcon/>
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
  const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]); 

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const salelist=props.sales.map((item)=> {
    return {label:item.fullName,
            value:item.employeeId,
    }
  })
  const recruiterlist=props.recruiterName.map((item)=> {
    return {label:item.fullName,
            value:item.employeeId,
    }
  })
  const mergedlist=salelist.concat(recruiterlist)

  const sectorsNameOption = useMemo(() => {
    if (!props.sectors) return [];
    return (
      props.sectors.length &&
      props.sectors.map((sectors) => {
        return {
          text: sectors.sectorName || "",
          value: sectors.sectorName,
        };
      })
    );
  }, [props.sectors]);


  const {
    fetchingCustomers,
    customerByUserId,
    handleUpdateCustomerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
  } = props;
  // if (fetchingCustomers) {
  //   return <BundleLoader />;
  // }
  console.log("ee")
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "name",
      ...getColumnSearchProps('name'),
      width: "19%",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => {
        var nameA = a.name; // ignore upper and lowercase
        var nameB = b.name; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const fullName = ` ${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""}`;

        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
          <span style={{ color: "#09477efa" }}><CustomerDetailView customerId={item.customerId} name={item.name} /></span>
          &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },
    {
      //title: "URL",
      title: <FormattedMessage id="app.category" defaultMessage="Category" />,
      dataIndex: "category",
      width:"8%",
    },
    {
      //title: "URL",
      title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "url",
      width:"15%",
    },
   
    {
      //title: "Group",
      title: <FormattedMessage id="app.sector" defaultMessage="Sector" />,
      dataIndex: "sector",
       width: "13%",
       filters: sectorsNameOption,
      

       onFilter: (value, record) => {
         return record.sector === value;
       },
    },

    {
      //title: "Email",
      title: <FormattedMessage id="app.email" defaultMessage="Email" />,
      dataIndex: "email",
      width: "19%",
      ...getColumnSearchProps('email'),
    },

    {
      // title: "Address",
      title: (
        <FormattedMessage
          id="app.address"
          defaultMessage="Address"
        />
      ),
      // dataIndex: "address[0].address1",
      render: (name, item, i) => {
        console.log(item);
        return `${(item.address &&
          item.address.length &&
          item.address[0].address1) ||
          ""} 
        ${(item.address && item.address.length && item.address[0].address2) ||
          ""}
         ${(item.address && item.address.length && item.address[0].street) ||
           ""} 
           ${(item.address && item.address.length && item.address[0].city) || 
            ""},
           ${(item.address && item.address.length && item.address[0].state) ||
            ""} 
            ${(item.address && item.address.length && item.address[0].country
              ) ||
              ""} 
            ${(item.address && item.address.length && item.address[0].postalCode) ||
              ""} 
            `;
      },
      width: "30%",
    },
    {
      //title: "Email",
      title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      width: "10%",
      sorter: (a, b) => {
        var nameA = a.country; // ignore upper and lowercase
        var nameB = b.country; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
    },
    {
      //title: "Email",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      width: "10%",
      //...getColumnSearchProps('ownerName'),
      filters:ownerlistType,
      render: (name, item, i) => {
        return (
          <>
           <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
            </span>
           </Tooltip>
          
           </>
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width:"3%",
     
      render: (name, item, i) => {
        // const IconShowhover = item.documentId !== null ? true : false;
       
        return (
           
          <>
          {/* {IconShowhover && */}
          <Tooltip title="Edit">
          {props.user.customerUpdateInd ===true && (
            <BorderColorIcon
             // type="edit"
              style={{ cursor: "pointer",fontSize: "17px" }}
              onClick={() => {
                props.setEditCustomer(item);
                handleUpdateCustomerModal(true);
                handleSetCurrentCustomerId(item.customerId);
              }}

            />
          )}
           
          </Tooltip>
         {/* }  */}
            </>
           
        );
     
      },
    },
    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() =>
              props.deleteCustomerData(item.customerId
              //   , {
              //   reInStateInd: true,
              //   customerId: item.customerId,
              // }
            )
            }
          >
            {/* <FontAwesomeIcon
              icon={solid("trash")}
              type="delete"
              style={{
                verticalAlign: "center",
                marginLeft: "5px",
                color: "red",
              }}
            /> */}
           <Tooltip title="Delete">
             <DeleteIcon  style={{ cursor: "pointer" ,fontSize: "16px"}} />
           </Tooltip>
          </StyledPopconfirm>
        );
      },
    },
  ];
  if (fetchingCustomersError) {
    return <APIFailed />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
     {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
     <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Clear
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Button type="primary" onClick={handleTransferClick} disabled={!hasSelected}>
          Select
        </Button>
        {visibleselect && hasSelected && (
          <>
        <Select  style={{ width: 120 }} onChange={handleSelected}>
          {mergedlist.map((item)=>{
            return <Option value={item.value}>{item.label}</Option>
          }
          )}
    </Select>
    <Button type="primary" 
    onClick={handleSend} 
    >
    Transfer
  </Button>
  </>
        )}
      <StyledTable
        // rowKey="accountId"
        rowSelection={rowSelection}
        rowKey={(record) => record.customerId}
        columns={columns}
        dataSource={customerByUserId}
        loading={fetchingCustomers || fetchingCustomersError || fetchingAllCustomers}
        // scroll={{ y: 500 }}
        // pagination={false
        scroll={{ y: tableHeight }}
       
        pagination={false}
          // defaultPageSize: 15,
          // showSizeChanger: true,
          // pageSizeOptions: ["15", "25", "40", "50"],
        
      />

      <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
      />
    </>
  );
}
// }
const mapStateToProps = ({ auth, customer,sector,opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  customerByUserId: customer.customerByUserId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers:customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
  updateCustomerModal: customer.updateCustomerModal,
  // accounts: accountSelector(account),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerListByUserId,
      handleUpdateCustomerModal,
      setEditCustomer,
      getSectors,
      updateOwnercustomerById,
      getRecruiterName,
      getAllSalesList,
      deleteCustomerData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
