import React, { useEffect, useState,useMemo,lazy } from "react";
import { connect } from "react-redux"; import {
     getDeletedPartner,
 } from "../../PartnerAction";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";

import { CompassOutlined, EditOutlined, GlobalOutlined,SearchOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import Highlighter from 'react-highlight-words';

import { StyledTable,  } from "../../../../Components/UI/Antd";
import { Tooltip,Button,Input,Select } from "antd";
import { MultiAvatar,  } from "../../../../Components/UI/Elements";
import { 
  // getAllPartnerListByUserId,
  // getPartnerListByUserId,
  setEditPartner,
  handleUpdatePartnerModal,
  updateOwnerpartnerById,
  getPartnerPagination,
  getPartnerListByUserId,
  deletePartnerData
 } from "../../PartnerAction";
 import PartnerSkillsLoadMore from "../PartnerDetail/PartnerTab/PartnerSkillsLoadMore.jsx";
 import {
  getSectors,

} from "../../../Settings/Sectors/SectorsAction";
import { getRecruiterName,
  getAllSalesList} from "../../../Opportunity/OpportunityAction"

import PartnerDetailView from "./PartnerDetailView.jsx";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import InfiniteScroll from "react-infinite-scroll-component";
import ReinstateToggleForLost from "./ReinstateToggleForLost.jsx";
const UpdatePartnerModal=lazy(()=>import("../UpdatePartner/UpdatePartnerModal.jsx"));

const Option =Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function PartnerDeletedTable(props) {
  

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [visibleselect, setvisibleselect]=useState(false);
const [selectedValue,setselectedValue]=useState("");
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(0);

  useEffect(() => {
    // props.getPartnerListByUserId(props.userId);
    props.getSectors();
    props.getAllSalesList();
    props.getRecruiterName();
    setPage(page + 1);
    props.getDeletedPartner(props.userId,page);
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
      // props.getRoles(props.organizationId);
    props.getAllSalesList();
            setPage(page + 1);
            props.getDeletedPartner(props.userId,page);
    }, 100);
  
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
  const newSkill=props.skillList&&props.skillList.map((item)=> {
    return { skillName:item,  };
      });
  
  const mergedlist=salelist.concat(recruiterlist)
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
 



function handleTransferClick (){
  setvisibleselect(true)
}
function handleSelected (value){
  setselectedValue(value)
  console.log(value)
}
function handleSend (){
  let data={
    // userId:props.userId,
    partnerIds:selectedRowKeys
  }
  setselectedValue(props.updateOwnerpartnerById(selectedValue,data));
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

function handleSelected (value){
  setselectedValue(value)
  console.log(value)
}

  

  const [currentPartnerId, setCurrentPartnerId] = useState("");

  function handleSetCurrentPartnerId(partnerId) {
    setCurrentPartnerId(partnerId);
    console.log(partnerId);
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
              icon={<SearchOutlined />}
          
              size="small"
              style={{ width: 90 }}
            >
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
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
       
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()): "",
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
            textToHighlight={text ? text.toString(): ""}
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

  const sectorNameOption = useMemo(() => {
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
    fetchingPartners,
    user,
    partnerByUserId,
    allpartnerByUserId,
    handleUpdatePartnerModal,
    updatePartnerModal,
    fetchingPartnersError,
    deletePartnerData
    // fetchingAllPartnersError,
    // fetchingAllPartners,
  } = props;

  const columns = [
    {
      title: "",
      width: "1%",
    },
    {
      // title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "partnerName",
      width: "15%",
      ...getColumnSearchProps('partnerName'),
      // defaultSortOrder: "ascend",
      sorter: (a, b) => {
        var nameA = a.partnerName; // ignore upper and lowercase
        var nameB = b.partnerName; // ignore upper and lowercase
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
        // const fullName = ` ${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.lastName || ""}`;
        return (
          <>
          <PartnerDetailView
            partnerId={item.partnerId}
            partnerName={item.partnerName}
          />
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
      title: "",
      width: "2%",
      render: (name, item, i) => {
        //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
        const dataLoc =` Address : ${item.address &&item.address.length &&item.address[0].address1} 
         Street : ${item.address && item.address.length && item.address[0].street}   
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${(item.address && item.address.length && item.address[0].country
          ) ||
          ""} 
         PostalCode : ${item.address && item.address.length && item.address[0].postalCode} `
        return (
          <Tooltip
          // className="ant-tooltip-inner"
          // placement="rightTop" 
          overlayStyle={{maxWidth: '300px'}}
      
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
      // title: "URL",
      title: <FormattedMessage id="app.url" defaultMessage="URL" />,
      dataIndex: "url",
      width: "12%",
      
    },
    {
      
      title: <FormattedMessage id="app.sector" defaultMessage="Sector" />,
      dataIndex: "sector",
      width: "15%",
      filters: sectorNameOption,
      

      onFilter: (value, record) => {
        return record.sector === value;
      },
      

    },

    {
      //title: "Email",
      title: <FormattedMessage id="app.email" defaultMessage="Email" />,
      dataIndex: "email",
      width: "17%",
      ...getColumnSearchProps('email'),
    },
    // {
    //   //title: "Phone #",
    //   title: <FormattedMessage id="app.phoneNumber" defaultMessage="Phone #" />,
    //   dataIndex: "phoneNumber",
    //   width: "20%",
    // },

    // {
    //   // title: "Address",
    //   title: <FormattedMessage id="app.address" defaultMessage="Address" />,
    //   // width: "5%",
    //   // dataIndex: "address[0].address1",
    //   render: (name, item, i) => {
    //     console.log(item);
    //     return `${(item.address &&
    //       item.address.length &&
    //       item.address[0].address1) ||
    //       ""} 
    //     ${(item.address && item.address.length && item.address[0].address2) ||
    //       ""}
    //      ${(item.address && item.address.length && item.address[0].street) ||
    //        ""} 
    //        ${(item.address && item.address.length && item.address[0].city) || ""},
    //        ${(item.address && item.address.length && item.address[0].state) ||
    //         ""} 
    //           ${(item.address && item.address.length && item.address[0].country
    //             ) ||
    //             ""}
    //             ${(item.address && item.address.length && item.address[0].postalCode) ||
    //               ""}  
          

    //         `;
    //   },
    //   width: "25%",
    // },

  {
    //title: "Email",
    title: <FormattedMessage id="app.country" defaultMessage="Country" />,
    dataIndex: "country",
    width: "8%",
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
    // render:(name,item,i)=>{
    //   return `${item.address && item.address.length && item.address[0].country || ""}`;
    // }
  },
  {
    // title: <FormattedMessage
    // id="app.category" defaultMessage=""
    //  />,
    dataIndex: "chanel",
    width: "2%",
    render: (name, item, i) => {
      //debugger;
      return (
        <div>
          <Tooltip title={item.chanel}>
            <div
              style={{
                borderRadius: "45%",
                height: "1.1em",
                width: "1.1em",
                // backgroundColor: "blue",
                color:
                  item.chanel === "Website"
                    ? "blue"
                    : item.chanel === "Self"
                    ? "red"
                    : null,
              }}
            >
              {item.chanel === "Website" ? (
                <GlobalOutlined />
              ) : item.chanel === "Self" ? (
                <CompassOutlined />
              ) : null}
            </div>
          </Tooltip>
        </div>
      );
    },
  },

  {
    // title: "Skills",
    title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
    //dataIndex: "skillName",
    width: "18%",
    ...getColumnSearchProps('skillName'),
    render: (name, item, i) => {
      return (
        <>
            <span>
              <PartnerSkillsLoadMore skill={item.skill} />
            </span>
            </>
      );
      
    },
    // render: (name, item, i) => {
    //   return (
    //     <>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexWrap: "wrap",
    //           width: "100%",
    //         }}
    //       >
    //         {item.skill && item.skill.map((option, i) => {
    //           return (

    //             <div key={i} style={{
    //               border: "2px solid rgb(125 241 193)",
    //               padding: "0px 0.62em",
    //               textAlign: "center",
    //               margin: "2px",
    //               borderRadius: "0.62em",
    //             }}>
    //               {option.skillName}
    //             </div>


    //           );
    //         })}
    //       </div>
    //     </>
    //   );
    // }
 
  
   
  },
  {
    //title: "Email",
    title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
    dataIndex: "ownerName",
    width: "6%",
    filters:ownerlistType,
      
      onFilter: (value, record) => {
        return record.fullName === value;
      },
    // ...getColumnSearchProps('ownerName'),
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
  width: "2%",
  render: (name, item, i) => {
    return (
      // <Tooltip title="Edit">
      <Tooltip title={<FormattedMessage
        id="app.edit"
        defaultMessage="Edit"
      />}>
   {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
   {props.user.vendorUpdateInd ===true && (
        <EditOutlined
          type="edit"
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.setEditPartner(item);
            handleUpdatePartnerModal(true);
            handleSetCurrentPartnerId(item.partnerId);
          }}
        />
         )}
      </Tooltip>
    );
  },
},
{
    // title: "Reinstate",
    title:<FormattedMessage
        id="app.reinstate"
        defaultMessage="Reinstate"
      />,
    margin: "10%",
    render: (name, item, i) => {
      return (
        <>
          <ReinstateToggleForLost 
          partnerId={item.partnerId} 
          
          
          />

        </>
      );
    },
  },
];
  if (fetchingPartnersError) {
    return <APIFailed />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;
  return (
    <>

     {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
     <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
     {/* Clear */}
       <FormattedMessage
                                                           id="app.clear"
                                                           defaultMessage="Clear"
                                                          />
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Button type="primary" onClick={handleTransferClick} disabled={!hasSelected}>
          {/* Select */}
           <FormattedMessage
                                                                id="app.select"
                                                                defaultMessage="Select"
                                                               />
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
<InfiniteScroll
                dataLength={props.deletedPartner.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={600}
            >
      <StyledTable
       
        rowSelection={rowSelection}
        rowKey={(record) => record.partnerId}
        columns={columns}
        pagination={false}
        dataSource={props.deletedPartner}
        // dataSource={allpartnerByUserId}
        Loading={props.fetchingDeletedPartner || props.fetchingDeletedPartnerError}
       
        
      />
 </InfiniteScroll>
      <UpdatePartnerModal
        partnerId={currentPartnerId}
        updatePartnerModal={updatePartnerModal}
        handleUpdatePartnerModal={handleUpdatePartnerModal}
        handleSetCurrentPartnerId={handleSetCurrentPartnerId}
      />
    </>
  );
}
// }
const mapStateToProps = ({ auth, partner,opportunity,sector }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  partnerByUserId: partner.partnerByUserId,
  sectors: sector.sectors,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  allpartnerByUserId:partner.allpartnerByUserId,
  fetchingPartners: partner.fetchingPartners,
  fetchingPartnerPagination:partner.fetchingPartnerPagination,
  // fetchingAllPartners:partner.fetchingAllPartners,
  fetchingPartnerPaginationError:partner.fetchingPartnerPaginationError,
  // fetchingAllPartnersError:partner.fetchingAllPartnersError,
  fetchingPartnersError: partner.fetchingPartnersError,
    updatePartnerModal: partner.updatePartnerModal,
    partnerPagination:partner.partnerPagination,
  // accounts: accountSelector(account),
     fetchingDeletedPartner: partner.fetchingDeletedPartner,
   fetchingDeletedPartnerError: partner.fetchingDeletedPartnerError,
   deletedPartner: partner.deletedPartner,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getPartnerListByUserId,
      getPartnerPagination,
      getRecruiterName,
      getAllSalesList,
      getDeletedPartner,
        handleUpdatePartnerModal,
        setEditPartner,
        getSectors,
        updateOwnerpartnerById,
        getPartnerListByUserId,
        deletePartnerData
        // getAllPartnerListByUserId
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PartnerDeletedTable);
