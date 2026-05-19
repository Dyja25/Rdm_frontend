import {  useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import CandidateRowEmailModal from "../CandidateRowEmailModal.jsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid,
//   regular,
//   brands,
// } from "@fortawesome/fontawesome-svg-core/import.macro";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SkillsLoadMore from "./SkillsLoadMore.jsx";
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import AddChoiceCandidateModal from "../CandidateTable/AddChoiceCandidateModal.jsx";
import { FormattedMessage } from "react-intl";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button, Select, Tooltip, Input } from "antd";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../Components/UI/Elements";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  handleUpdateCandidateModal,
  handleupdateCandidateResumeModal,
  handleChoiceCandidateModal,
  setEditCandidate,
  updateOwnershipById,
  getBlackListCandidate,
  handleCandidateEmailModal,
  handleDonotCallModal,
  handleCandidateRowEmailModal,
  shareCandidatePermission,
  getCandidateListByUserId,
  deleteCandidateData,
  emptyCandidate,
} from "../../CandidateAction";
import AddDonotCallModal from "../CandidateTable/AddDonotCallModal.jsx";
import { getRoles } from "../../../Settings/Category/Role/RoleAction";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import UpdateCandidateResumeModal from "../CandidateTable/UpdateCandidateResumeModal.jsx";
import { BundleLoader } from "../../../../Components/Placeholder";
import StatusToggle from "./StatusToggle.jsx";
// import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import Highlighter from "react-highlight-words";
import AddEmailCandidateModal from "../CandidateTable/AddEmailCandidateModal";
import {
  getAllSalesList,
  getRecruiterName,
} from "../../../Opportunity/OpportunityAction";
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone';import { UpCircleFilled, CompassOutlined, DeleteOutlined, EditOutlined, MailOutlined, SearchOutlined, WalletOutlined } from "@ant-design/icons";
const Option = Select;

const UpdateCandidateModal = lazy(() =>
  import("../UpdateCandidate/UpdateCandidateModal")
);
const CandidateDetailsView = lazy(() =>
  import("../CandidateDetails/CandidateDetailsView.jsx")
);

function CandidateTable(props) {

  const [loading, setLoading] = useState(false);
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [isSelectAll, setIsSelectAll] = useState(false);

// When new data loads, auto-select rows if "Select All" is active
useEffect(() => {
  if (isSelectAll) {
    setSelectedRowKeys((prevKeys) => [
      ...new Set([...prevKeys, ...props.candidateByUserId.map((row) => row.candidateId)]),
    ]);
  }
}, [props.candidateByUserId]);

const rowSelection = {
  selectedRowKeys,
  onChange: (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
    setIsSelectAll(selectedKeys.length === props.candidateByUserId.length);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    if (selected) {
      setIsSelectAll(true);
      setSelectedRowKeys(props.candidateByUserId.map((row) => row.candidateId));
    } else {
      setIsSelectAll(false);
      setSelectedRowKeys([]);
    }
  },
};


  useEffect(() => {
    // props.getCandidateListByUserId(props.userId);
    props.getDesignations();
    props.getAllSalesList();
    props.getRecruiterName();
    props.getRoles(props.organizationId);
    // props.getCandidatePagination(props.userId);

    setPage(page + 1);
    // props.shareCandidatePermission(page);
    props.getCandidateListByUserId(props.userId, page);
  }, []);

  useEffect(() => {
    return () => props.emptyCandidate();
  }, []);

  const handleLoadMore = () => {
    const PageMapd =
      props.candidateByUserId &&
      props.candidateByUserId.length &&
      props.candidateByUserId[0].pageCount;
    setTimeout(() => {
      if (props.candidateByUserId) {
        if (page < PageMapd) {
          setPage(page + 1);
          props.getCandidateListByUserId(
            props.currentUser ? props.currentUser : props.userId,
            page
          );
        }
        if (page === PageMapd) {
          setHasMore(false);
        }
      }
    }, 100);
  };

  function handleTransferClick() {
    setvisibleselect(true);
  }
  function handlePreview() {
    props.handleContactDrawer();
  }

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }
  function handleSend() {
    let data = {
      // userId:selectedValue,
      candidateIds: selectedRowKeys,
    };
    setselectedValue(props.updateOwnershipById(selectedValue, data));
    console.log(selectedValue, selectedRowKeys);
  }
  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  const hasSelected = selectedRowKeys.length > 0;

  const [currentCandidateId, setCurrentCandidateId] = useState("");
  const [isViewAll, setIsViewAll] = useState(false);

  function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    console.log(candidateId);
  }
  console.log("ccr", props.currentUser);
  const newSkill =
    props.skillList &&
    props.skillList.map((item) => {
      return { skillName: item };
    });

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
        <SearchOutlined
        
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
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

  const salelist = props.sales.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return { label: item.fullName, value: item.employeeId };
  });
  const mergedlist = salelist.concat(recruiterlist);

  console.log("SlR", salelist, recruiterlist);

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

  const roleTypeOption = useMemo(() => {
    if (!props.roles) return [];
    return (
      props.roles.length &&
      props.roles.map((roles) => {
        return {
          text: roles.roleType || "",
          value: roles.roleType,
        };
      })
    );
  }, [props.roles]);

  const {
    // candidateByUserId: {address },
    user,
    fetchingContactsLazyLoading,
    contactsLazyLoading,
    fetchingCandidates,
    fetchingCandidatesError,
    setEditCandidate,
    handleUpdateCandidateModal,
    handleupdateCandidateResumeModal,
    candidateByUserId,
    updateCandidateModal,
    handleChoiceCandidateModal,
    updateCandidateResumeModal,
    handleCandidateRowEmailModal,
    addCandidateRowEmailModal,
    deleteCandidateData,
  } = props;
  // console.log(address)
  const { imgRadius } = props;
  console.log("Talent", user.talentUpdateInd);
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
          </SubTitle>
        );
      },
    },
    {
     
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "fullName",
      width: "10%",
      ...getColumnSearchProps("fullName"),
   
      render: (name, item, i) => {
       
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
       
        return (
          <>
            <CandidateDetailsView
              candidateId={item.candidateId}
              candidateName={item.fullName}
            />
            &nbsp;&nbsp;
            {date === currentdate ? <span className="blink">New</span> : null}
          </>
        );
      },
    },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
        const dataLoc = ` 
         Street : ${item.address &&
           item.address.length &&
           item.address[0].street}  
           City : ${
            item.address && item.address.length && item.address[0].city
          }  
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${(item.address &&
         item.address.length &&
         item.address[0].country) ||
         ""} 
         House No : ${(item.address &&
          item.address.length &&
          item.address[0].houseNo) ||
          ""}
         PostalCode : ${item.address &&
           item.address.length &&
           item.address[0].postalCode} `;
           
        return (
          <Tooltip
            overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc?dataLoc: "No Data" }
          >
            <span
              // onClick={() => handleReasonOfDelete(item.orderId)}
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
              {/* <FontAwesomeIcon icon={solid("location-dot")} /> */}
              <LocationOnIcon fontSize="small" />
            </span>
          </Tooltip>
        );
      },
    },
    {
      dataIndex: "category",
      width: "4%",
      render: (name, item, i) => {
        //debugger;
        return (
          <div>
            <Tooltip title={item.category}>
              <div
                style={{
                  borderRadius: "45%",
                  height: "1.1em",
                  width: "1.1em",
                  backgroundColor:
                    item.category === "White"
                      ? "bisque"
                      : item.category === "Blue"
                      ? "#00afff"
                      : item.category === "Both" && "grey",
                }}
              ></div>
            </Tooltip>
          </div>
        );
      },
      filters: [
        { text: "Both", value: "Both" },
        { text: "White", value: "White" },
        { text: "Blue", value: "Blue" },
      ],
      onFilter: (value, record) => {
        return (record.category = value);
      },
    },

    {
      title: <FormattedMessage id="app.vendor" defaultMessage="Vendor" />,
      dataIndex: "partnerName",
      width: "10%",
      ...getColumnSearchProps("partnerName"),
    },
    {
      title: <FormattedMessage id="app.role" defaultMessage="Role" />,
      dataIndex: "roleType",
      width: "8%",
      filters: roleTypeOption,

      onFilter: (value, record) => {
        return record.roleType === value;
      },
    },

    {
      title: (
        <FormattedMessage id="app.mobileNumber" defaultMessage="Mobile #" />
      ),
      dataIndex: "mobileNumber",
      width: "8%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNumber}
          </span>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip>
            {item.doNotCallInd !== true && (
              <span
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
                style={{
                  marginRight: "0.5rem",
                  //color: props.viewType === "dashboard" && "#1890ff",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
                {/* <FontAwesomeIcon icon={solid("phone-volume")} /> */}
                <PhoneInTalkIcon  fontSize="small"/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
                style={{
                  marginRight: "0.5rem",
                  color: item.doNotCallInd === true && "red",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
              
               
                <PhoneDisabledIcon />
              </span>
            )}
          </Tooltip>
        );
      },
    },
    {
      title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      align: "left",
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
      width: "6%",
    },
    {
      title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
      // dataIndex: "skillList",
      width: "17%",
      ...getColumnSearchProps("skillList"),
      render: (name, item, i) => {
        const data =
          item.skillList === null
            ? []
            : item.skillList.filter((skill) => {
                return skill !== null && skill !== "";
              });
              return (
                <>
                   {item.skillList.length === 0 ? (
                    ""
                  ) : (
                    <span>
                      <SkillsLoadMore skillList={data} />
                    </span>
                  )}
                </>
              );
        //  const newSkill=item.skillList===null?[]:item.skillList.map((item)=> {
        //   return { skillName:item,  };
        //     });
        //   const SkillTitle=newSkill&&newSkill.map((option,i)=>{
        //     return option.skillName
        //   }
        //   )
        //   console.log("Title",SkillTitle)
        // return (
        //   <>
        //     {item.skillList === [] ? (
        //       "No Data"
        //     ) : (
        //       <span>
        //         <SkillsLoadMore skillList={data} />
        //       </span>
        //     )}
        //     {/* <Tooltip
        //   // className="ant-tooltip-inner"
        //   // placement="rightTop" 
        //   overlayStyle={{maxWidth: '300px'}}
      
        //   title={SkillTitle}
        //   >
        //     <span
        //       // onClick={() => handleReasonOfDelete(item.orderId)}
        //       style={{
        //         // color:
        //         //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
        //         cursor: "pointer",
        //       }}
        //     >
        //       <i class="fa fa-map-marker" aria-hidden="true"></i>
        //     </span>
        //   </Tooltip> */}
        //   </>
        // );
      },
    },
 
    {
      title: "",
      width: "5%",
      render: (name, item, i) => {
        const newSkill =
          item.skillList === null
            ? []
            : item.skillList.map((item) => {
                return { skillName: item };
              });
        const SkillTitle =
          newSkill &&
          newSkill.map((option, i) => {
            return (
              <>
                <div
                  key={i}
                  style={{
                    /// border: `2px solid ${option.color}`,
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}
                >
                  {option.skillName}
                </div>
              </>
            );
          });
        console.log("Title", SkillTitle);
        return (
          <>
            <Tooltip
              // className="ant-tooltip-inner"
              // placement="rightTop"
              overlayStyle={{ maxWidth: "300px" }}
              title={SkillTitle}
            >
              <span
                // onClick={() => handleReasonOfDelete(item.orderId)}
                style={{
                  // color:
                  //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                  cursor: "pointer",
                }}
              >
                {/* <FontAwesomeIcon icon={solid("screwdriver-wrench")} /> */}
<ConstructionTwoToneIcon
 style={{
    fontSize: "18px",
    color: "#555",
    cursor: "pointer",
  }}/>             
              </span>
            </Tooltip>
          </>
        );
      },
    },

    {
      dataIndex: "channel",
      width: "2%",
      render: (name, item, i) => {
        //debugger;
        return (
          <div>
            <Tooltip title={item.channel}>
              <div
                style={{
                  borderRadius: "45%",
                  height: "1.1em",
                  width: "1.1em",
                  color:
                    item.channel === "Website"
                      ? "blue"
                      : item.channel === "Self"
                      ? "red"
                      : null,
                }}
              >
                {item.channel === "Website" ? (
                  <LocationOnIcon fontSize="small"/>
                ) : item.channel === "Self" ? (
                  <CompassOutlined />
                ) : null}
              </div>
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: (
        <FormattedMessage id="app.expectation" defaultMessage="Expectation" />
      ),
      dataIndex: "billing",
      align: "left",
      width: "7%",
      render: (name, item, i) => {
        // const data1= item.currency
        const data = item.billing + item.benifit;

        console.log("dff", data);
        return (
          <>
            {/* {item.billing} {item.currency} */}
            <Tooltip title={data}>
              <span>
                {/* <FontAwesomeIcon icon={solid("wallet")} /> */}
                <AccountBalanceWalletTwoToneIcon
                style={{fontSize: "14px",
    color: "#555",
    cursor: "pointer",}}/>
              </span>
            </Tooltip>
          </>
        );
      },
    },

    // {
    //   title: <FormattedMessage id="app.benefits" defaultMessage="Benefits" />,
    //    dataIndex: "benifit",
    //   width: "6%",
    //   render: (name, item, i) => {
    //     return (
    //       <>
    //         {/* {item.billing} {item.currency} */}
    //         <span>
    //         {/* <CurrencySymbol currencyType={item.currency} /> */}
    //         {item.benifit} {item.currency}
    //       </span>
    //       </>
    //     );
    //   },
    // },

    {
      title: <FormattedMessage id="app.available" defaultMessage="Available" />,
      dataIndex: "availableDate",
      width: "7%",
      render: (text, item) => {
        const availableDate = dayjs(item.availableDate).format("ll");
        return (
          <>
            {item.availableDate === null ? (
              ""
            ) : (
              <span>{dayjs(item.availableDate).format("l")}</span>
            )}
          </>
        );
      },
    },

    {
      // title: "",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      // dataIndex: "ownerName",
      width: "6%",
      // ...getColumnSearchProps('ownerName'),
      filters: ownerlistType,

      onFilter: (value, record) => {
        return record.fullName === value;
      },
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
                  // style={{borderRadius:"13px" }}
                />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: <FormattedMessage id="app.active" defaultMessage="Active" />,
      // dataIndex: "active",
      width: "12%",
      render: (name, item, i) => {
        return (
          <StatusToggle
            type={props.active ? "primary" : "danger"}
            candidateId={item.candidateId}
            active={item.active}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger

        return (
          <>
            {user.talentUpdateInd === true && (
              <MailOutlined
               
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.handleCandidateRowEmailModal(true);
                  // handleupdateCandidateResumeModal(true);
                  //  handleSetCurrentCandidateId(item.candidateId);
                }}
              />
            )}
          </>
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger

        return (
          <>
            {user.talentUpdateInd === true && (
              <EditOutlined
                
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setEditCandidate(item);
                  handleupdateCandidateResumeModal(true);
                  handleSetCurrentCandidateId(item.candidateId);
                }}
              />
            )}
          </>
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
         
          <StyledPopconfirm
  title="Do you want to blacklist?"
  onConfirm={() => props.getBlackListCandidate(item.candidateId)}
>
  <UpCircleFilled
    sx={{
      cursor: "pointer",
      fontSize: "16px",
      marginTop:"0px"
    }}
  />
</StyledPopconfirm>
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
              props.deleteCandidateData(item.candidateId, {
                reInStateInd: true,
                candidateId: item.candidateId,
              })
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

  // if (fetchingCandidates) {
  //   return <BundleLoader />;
  // }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;

  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
      <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Clear
      </Button>
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>
      <Button
        type="primary"
        onClick={handleTransferClick}
        disabled={!hasSelected}
      >
        Select
      </Button>

      {visibleselect && hasSelected && (
        <>
          <Select style={{ width: 120 }} onChange={handleSelected}>
            {mergedlist.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
          </Select>
          <Button type="primary" onClick={handleSend}>
            Transfer
          </Button>
          <Button
            type="primary"
            onClick={props.handleChoiceCandidateModal}
            //  handlePreview={() =>
            //   this.props.handleContactDrawer()
            // }
          >
            Email
          </Button>
        </>
      )}

<InfiniteScroll
    dataLength={props.candidateByUserId.length}
    next={handleLoadMore}
    hasMore={hasMore}
    loader={fetchingCandidates ? <div className="flex justify-center"><BundleLoader /></div> : null}
    style={{ scrollbarWidth: "thin" }}
    endMessage={<div className="flex text-center font-poppins font-bold text-xs text-red-500">End of the page</div>}
  >
    <StyledTable
      rowKey={(record) => record.candidateId}
      rowSelection={rowSelection}
      columns={columns}
      pagination={false}
      dataSource={props.candidateByUserId}
      loading={props.fetchingCandidates}
      sticky
  scroll={{ y: 550 }}
    />
  </InfiniteScroll>

      {/* <InfiniteScroll
        dataLength={props.candidateByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCandidates?<div class="flex justify-center"><BundleLoader/></div>:null}
        height={652}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <div class="flex text-center font-poppins font-bold text-xs text-red-500">End of the page</div>}
      > 
        <StyledTable
          rowKey={(record) => record.candidateId}
          rowSelection={rowSelection}
          columns={columns}
          // scroll={{ y: tableHeight }}

          pagination={false}
          //sticky="true"
          //fixed={true}
          //tableLayout={fixed}
          dataSource={props.candidateByUserId}
          loading={props.fetchingCandidates}
          // scroll={{ y: tableHeight }}

          // pagination={false}
          // loading={
          //   fetchingContactsLazyLoading ||
          //   fetchingAccounts ||
          //   fetchingCategoryWiseContact ||
          //   fetchingCategory
          // }
          // dataSource={candidateByUserId}

          // expandedRowRender={(record) => {
          //   return (
          //     <>
          //       <div>
          //         <i class="fa fa-map-marker" aria-hidden="true"></i>
          //         &nbsp;&nbsp;&nbsp;
          //         {record.address[0].address1 || ""} &nbsp;{record.address[0].address2 || ""}
          //         {record.address[0].street || ""} &nbsp;{record.address[0].city || ""}&nbsp;
          //         {record.address[0].postalCode || ""}&nbsp;{record.address[0].state || ""} &nbsp;
          //         {record.address[0].country || ""}

          //       </div>
          //     </>
          //   );
          // }}
        />
      </InfiniteScroll> */}

      <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
      <AddEmailCandidateModal
        selectedValue={selectedValue}
        selectedRowKeys={selectedRowKeys}
        addCandidateEmailModal={props.addCandidateEmailModal}
        // candidateId={currentCandidateId}
        // updateCandidateModal={updateCandidateModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
        // handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
      <AddDonotCallModal
        addDonotCallModal={props.addDonotCallModal}
        candidateId={currentCandidateId}
        // candidateId={currentCandidateId}
        // updateCandidateModal={updateCandidateModal}
        handleDonotCallModal={props.handleDonotCallModal}
        // handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
      <AddChoiceCandidateModal
        //  addCandidateEmailModal={props.addCandidateEmailModal}
        // candidateId={currentCandidateId}
        selectedValue={selectedValue}
        selectedRowKeys={selectedRowKeys}
        addCandidateChoiceModal={props.addCandidateChoiceModal}
        handleCandidateEmailModal={props.handleCandidateEmailModal}
        handleChoiceCandidateModal={handleChoiceCandidateModal}
        // handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />

      <UpdateCandidateResumeModal
        handleResponseData={props.handleResponseData}
        responseData={props.responseData}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        updateCandidateResumeModal={updateCandidateResumeModal}
        handleupdateCandidateResumeModal={handleupdateCandidateResumeModal}
        //  handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
      <CandidateRowEmailModal
        addCandidateRowEmailModal={addCandidateRowEmailModal}
        handleCandidateRowEmailModal={handleCandidateRowEmailModal}
      />
    </>
  );
}
const mapStateToProps = ({
  auth,
  role,
  candidate,
  account,
  designations,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allCandidateData: candidate.allCandidateData,
  talentUpdateInd: auth.userDetails.talentUpdateInd,
  candidateId: candidate.candidateByUserId.candidateId,
  addDonotCallModal: candidate.addDonotCallModal,
  candidateByUserId: candidate.candidateByUserId,
  fetchingCandidates: candidate.fetchingCandidates,
  fetchingCandidatesError: candidate.fetchingCandidatesError,
  updateCandidateModal: candidate.updateCandidateModal,
  designations: designations.designations,
  addCandidateChoiceModal: candidate.addCandidateChoiceModal,
  roles: role.roles,
  candidateByUserId: candidate.candidateByUserId,
  updateCandidateResumeModal: candidate.updateCandidateResumeModal,
  organizationId: auth.userDetails.organizationId,
  sales: opportunity.sales,
  fetchingCandidatesPaginationError:
    candidate.fetchingCandidatesPaginationError,
  recruiterName: opportunity.recruiterName,
  fetchingCandidatesPagination: candidate.fetchingCandidatesPagination,
  addCandidateEmailModal: candidate.addCandidateEmailModal,
  addCandidateRowEmailModal: candidate.addCandidateRowEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateListByUserId,
      handleDonotCallModal,
      handleupdateCandidateResumeModal,
      handleUpdateCandidateModal,
      getBlackListCandidate,
      setEditCandidate,
      handleChoiceCandidateModal,
      getDesignations,
      getRoles,
      getAllSalesList,
      getRecruiterName,
      updateOwnershipById,
      handleCandidateEmailModal,
      handleCandidateRowEmailModal,
      shareCandidatePermission,
      getCandidateListByUserId,
      deleteCandidateData,
      emptyCandidate,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateTable);


