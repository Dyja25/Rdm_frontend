import React, { Component, useEffect, useState,useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import Highlighter from 'react-highlight-words';
import { getAllSalesList } from "../../../Opportunity/OpportunityAction";
import PartnerDetailView from "./PartnerDetailView";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button, Empty,  Tooltip,Input } from "antd";
import { MultiAvatar,SubTitle } from "../../../../Components/UI/Elements";
import {getContactPartnerListByUserId,deleteContactData} from "../../ContactAction";


import {getSectors} from "../../../Settings/Sectors/SectorsAction";
import {getDesignations} from "../../../Settings/Designation/DesignationAction";
import ReactPartnerSpeechModal from "../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/ReactPartnerSpeechModal.jsx";
import {
  handlePartnerReactSpeechModal
} from "../../../Partner/PartnerAction";
import { DeleteOutlined, FilterOutlined, PhoneOutlined } from "@ant-design/icons";
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
function ContactTable(props) {
  useEffect(() => {
    props.getContactPartnerListByUserId(props.userId);
    props.getAllSalesList();
  }, []);

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
          
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            &nbsp;
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            &nbsp;
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
        // <FilterOutlined
        // type="search" style={{ color: filtered ? 'tomato' : '1890ff' }} />
        <SearchIcon style={{fontSize:"20px"}}/>
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

  const designationTypeOption = useMemo(() => {
    if (!props.designations) return [];
    return (
      props.designations.length &&
      props.designations.map((designations) => {
        return {
          text: designations.designationType || "",
          value: designations.designationType,
        };
      })
    );
  }, [props.designations]);


  const {
    fetchingContactPartners,
    fetchingContactPartnersError,
    contactPartnerByUserId,
    handlePartnerReactSpeechModal,
    addPartnerSpeechModal,
    handleUpdateContactModal,
    updateContactModal,
  } = props;
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
        );
      },
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "firstName",
      ...getColumnSearchProps('firstName'),
      width: "15%",
      defaultSortOrder: "descend",
      render: (name, item, i) => {
        const fullName = `${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""} `;
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          console.log(date, currentdate, currentdate === date);
        return (
          <>
          <span style={{ color: "#375cb0" }}>
          <PartnerDetailView
            contactId={item.contactId}
            contactName={fullName}
          />
          </span>
          &nbsp;&nbsp;
          {date === currentdate ? (
           <span className="blink">
              New
            </span>
          ) : null}
          </>
        );
      },
    },

    // {
    //   //title: "Type",
    //   title: <FormattedMessage id="app.contactType" defaultMessage="Type" />,
    //   dataIndex: "contactType",
    //   width: "15%",
    // },
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    {
      //title: "Company",
      title: <FormattedMessage id="app.company" defaultMessage="Company" />,
      dataIndex: "tagWithCompany",
      ...getColumnSearchProps('tagWithCompany'),
      width: "15%",
    },
    {
      //title: "Designation",
      title: (
        <FormattedMessage id="app.designation" defaultMessage="Designation" />
      ),
      dataIndex: "designation",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.designation - b.designation,
      filters:designationTypeOption,

      onFilter: (value, record) => {
        return record.designation === value;
      },
    },
    {
      //title: "Department",
      title: (
        <FormattedMessage id="app.sector" defaultMessage="Sector" />
      ),
      width: "15%",
      dataIndex: "department",
      // dataIndex:"secor",
      filters: sectorNameOption,
      

       onFilter: (value, record) => {
         return record.sector === value;
       },
    },
    {
      // title: "Mobile #",
      title: <FormattedMessage id="app.mobile" defaultMessage="Mobile #" />,
      dataIndex: "mobileNumber",
      width: "15%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNumber}
          </span>
        );
      },
    },
    {
      //title: "Email #",
      title: <FormattedMessage id="app.email" defaultMessage="Email #" />,
      width: "15%",
      dataIndex: "emailId",
    },
    {
      //title: "Email",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      // ...getColumnSearchProps('ownerName'),
      width: "8%",

      filters:ownerlistType,
      
      onFilter: (value, record) => {
        return record.fullName === value;
      },
      render: (name, item, i) => {
        return (
           <Tooltip title={item.ownerName}>
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "notes",
      width: "5%",
      render: (name, item, i) => {
        return (
          // <Tooltip title="Edit">
          <Tooltip
          title="Voice to Text">

        <span                       
                  onClick={()=>handlePartnerReactSpeechModal(true)}
               >
                  {/* <FontAwesomeIcon
                   icon={solid("microphone")}/> */}
                   <MicIcon
                style={{ cursor: "pointer",fontSize:"17px" }} />
                  
                  </span>
          </Tooltip>
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
                          props.deleteContactData(item.contactId,props.viewType
                         )
                        }
                      >
            
                      <DeleteOutlined
              sx={{
                verticalAlign: "middle",
                marginLeft: "5px",
                color: "red",
                fontSize: "16px",
                cursor: "pointer",
              }}
            />
                      </StyledPopconfirm>
                    );
                    // <Tooltip title="Delete">
                    //               <FontAwesomeIcon
                    //                 icon={solid("trash")}
                    //                 onClick={() =>
                    //                   props.deleteCandidateData(
                    //                     item.candidateId,
                    //                         {
                    //                           reInStateInd:true,
                    //                           candidateId:item.candidateId
                    //                         },
                    //                       )
                    //                     }
                    //                 size="14px"
                    //                 style={{
                    //                   verticalAlign: "center",
                    //                   marginLeft: "5px",
                    //                   color: "red",
                    //                 }}
                    //               />
                    //             </Tooltip>
                  },
                },
   

     ];

  // if (fetchingContactPartnersError) {
  //   return <APIFailed />;
  // }

  // const tab = document.querySelector(".ant-table-body");
  // const tableHeight = tab && tab.offsetHeight *2.0;

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactPartnersLazyLoading}> */}
      <StyledTable
        rowKey="contactId"
        columns={columns}
        loading={fetchingContactPartners || fetchingContactPartnersError}
        dataSource={contactPartnerByUserId}
        // scroll={{ y: 350 }}
        scroll={{ y: tableHeight }}
        // pagination={false}
        // scroll={{ y: tableHeight }}
       
        pagination={false}
        expandedRowRender={(record) => {
          return (
            <>
              <div>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;
                {record.address1 || ""} &nbsp;
                {record.city || ""} 
                {record.state || ""} &nbsp;
                {record.country || ""} &nbsp;
                {record.postalCode || ""}&nbsp;
              </div>
            </>
          );
        }}
      />

    <ReactPartnerSpeechModal
           //partnerId={partnerId}
          handlePartnerReactSpeechModal={handlePartnerReactSpeechModal}
          addPartnerSpeechModal={addPartnerSpeechModal}
          />
      
    </>
  );
}
const mapStateToProps = ({ auth,partner, contact, account,sector,designations,opportunity,}) => ({
  userId: auth.userDetails.userId,
  sales: opportunity.sales,
  contactPartnerByUserId: contact.contactPartnerByUserId,
  fetchingContactPartners: contact.fetchingContactPartners,
  fetchingContactPartnersError: contact.fetchingContactPartnersError,
  sectors: sector.sectors,
  designations:designations.designations,
  partnerId: partner.partnerId,
  addPartnerSpeechModal:partner.addPartnerSpeechModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactPartnerListByUserId,
      getSectors,
      getDesignations,
      getAllSalesList,
      handlePartnerReactSpeechModal,
      deleteContactData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactTable);
