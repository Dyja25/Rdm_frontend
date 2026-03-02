import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { CurrencySymbol } from "../../../../Components/Common";
// import AccountOwnerDetail from "./AccountOwnerDetail";
// import { getAccounts } from "../../AccountAction";
// import { accountSelector } from "../../AccountSelector";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
// import { Link } from "../../../../Components/Common";
// import CurrencyCompressor from "../../../../Components/Common/CurrencyCompressor";
// import AccountInitiative from "./AccountInitiative";
import { getOpportunityListByCustomerId,handleUpdateCustomerOpportunityModal,
  setEditCustomerOpportunity} from "../../../../CustomerAction";
// import OpportunityDetailView from "./OpportunityDetailView";
import { Tooltip,Button,Input } from "antd";
const AddCustomerUpdateOpportunityModal =lazy(()=>import("./AddCustomerUpdateOpportunityModal")); 

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  useEffect(() => {
    props.getOpportunityListByCustomerId(props.customerId);
  }, []);
  console.log(props.customerId);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    user,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.accountName}
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
      // title: "Name",
      title: (
        <FormattedMessage id="app.name" defaultMessage="Name" />
      ),
      dataIndex: "opportunityName",
      defaultSortOrder: "ascend",
      width: "20%",
      // render: (name, item, i) => {
      //   return (
      //     <OpportunityDetailView opportunityId={item.opportunityId} opportunityName={item.opportunityName} />
      //   );
      // },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.accountName.indexOf(value) === 0,
      // sorter: (a, b) => {
      //   const accountNameA = a.accountName && a.accountName.toLowerCase();
      //   const accountNameB = b.accountName && b.accountName.toLowerCase();
      //   if (accountNameA < accountNameB) {
      //     return -1;
      //   }
      //   if (accountNameA > accountNameB) {
      //     return 1;
      //   }

      //   // names must be equal
      //   return 0;
      // },
    },
    {
      //title: "Start Date",
      title: (
        <FormattedMessage id="app.startDate" defaultMessage="Start Date" />
      ),
      dataIndex: "startDate",
      width: "20%",
      defaultSortOrder: "descend",
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    {
      //title: "End Date",
      title: <FormattedMessage id="app.endDate" defaultMessage="End Date" />,
      dataIndex: "endDate",
      width: "20%",
      defaultSortOrder: "descend",
      render: (text, item) => {
        const endDate = dayjs(item.endDate).format("ll");
        return <span>{endDate}</span>;
      },
    },
    {
      //title: "Proposal Amount",
      title: (
        <FormattedMessage
          id="app.proposalAmount"
          defaultMessage="Proposal Amount"
        />
      ),
      dataIndex: "proposalAmount",
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
      //title: "sponsor",
      title: (
        <FormattedMessage
          id="app.sponsor"
          defaultMessage="Sponsor"
        />
      ),
      dataIndex: "sponsor",
      width: "20%",
      onFilter: (value, record) => record.contactName.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {item.contactName} 
          </>
        );
      },
    },
    // {
    //   // title: "Currency",
    //   title: <FormattedMessage id="app.currency" defaultMessage="Currency" />,
    //   dataIndex: "currency",
    //   width: "20%",
    // },

    {
      title: "",
      dataIndex: "documentId",
      width:"2%",
      render: (name, item, i) => {
        return (
          <Tooltip title="Edit">
             {user.opportunityUpdateInd ===true && (
   
  <BorderColorIcon
    style={{ cursor: "pointer" }}
    onClick={() => {
      props.setEditCustomerOpportunity(item);
      handleUpdateCustomerOpportunityModal(true);
      handleSetCurrentOpportunityId(item.opportunityId);
    }}
  />


            )}
          </Tooltip>
        );
      },
    },
  ];
  // if (fetchingCustomerOpportunityError) {
  //   return <APIFailed />;
  // }
  const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={
          !Array.isArray(opportunityByCustomerId) ? [] : opportunityByCustomerId
        }
        scroll={{ y: tableHeight }}
        pagination={false
          // defaultPageSize: 15,
          // showSizeChanger: true,
          // pageSizeOptions: ["15", "25", "40", "50"],
        }
      />
      <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        
      />
    </>
  );
}
// }
const mapStateToProps = ({ customer,auth }) => ({
  user: auth.userDetails,
  fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
  fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
  customerId: customer.customer.customerId,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByCustomerId,
      handleUpdateCustomerOpportunityModal,
      setEditCustomerOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
