import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { StyledTable } from "../../../../Components/UI/Antd";


function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function ChooseCandidateEmailTable(props) {
  useEffect(() => {
   // props.getOpportunityListByCustomerId(props.customerId);
  }, []);
//   console.log(props.customerId);
//   const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  
//   function handleSetCurrentOpportunityId(opportunityId) {
//     setCurrentOpportunityId(opportunityId);
//     console.log(opportunityId);
//   }
  const {
    chooseCandidateEmail,
    tablevalue,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;
  console.log("td",tablevalue)
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
    //   render: (name, item, i) => {
    //     return (
    //       <SubTitle>
    //         <MultiAvatar
    //           primaryTitle={item.accountName}
    //           imageId={item.imageId}
    //           imageURL={item.imageURL}
    //           imgWidth={"2.1em"}
    //           imgHeight={"2.1em"}
    //         />
    //       </SubTitle>
    //     );
    //   },
    },
    {
      // title: "Name",
      title: (
        <FormattedMessage id="app.name" defaultMessage="Name" />
      ),
      hidden:tablevalue.includes("Name") ? false : true,
      dataIndex: "name",
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
   
        title:"Role",
      hidden:tablevalue.includes("Role") ? false : true,
        
   
    
      
   
     
      dataIndex: "role",
      width: "20%",
         render: (text, item) => {
        const endDate = dayjs(item.endDate).format("ll");
        return <span>{endDate}</span>;
      },
    
  
    
},
    
  
    {
      //title: "End Date",
      title: <FormattedMessage id="app.availlabillity" defaultMessage="Availlibillity" />,
     hidden:tablevalue.includes("Available") ? false : true,
      dataIndex: "availableDate",
      width: "20%",
      //defaultSortOrder: "descend",
    //   render: (text, item) => {
    //     const endDate = dayjs(item.endDate).format("ll");
    //     return <span>{endDate}</span>;
    //   },
    },
    {
      //title: "Proposal Amount",
      title: (
        <FormattedMessage
          id="app.mobile"
          defaultMessage="Mobile"
        />
      ),
     hidden:tablevalue.includes("Mobile") ? false : true,
      dataIndex: "mobileNo",
      width: "20%",
      //onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
    //   render: (name, item, i) => {        
    //     return (
    //       <>
    //         {item.proposalAmount} {item.currency}
    //       </>
    //     );
    //   },
    },

    {
      //title: "sponsor",
      title: (
        <FormattedMessage
          id="app.email"
          defaultMessage="Email"
        />
      ),
     hidden:tablevalue.includes("Email") ? false : true,
      dataIndex: "email",
      width: "20%",
      //onFilter: (value, record) => record.contactName.indexOf(value) === 0,
    //   render: (name, item, i) => {        
    //     return (
    //       <>
    //         {item.contactName} 
    //       </>
    //     );
    //   },
    },
    // {
    //   // title: "Currency",
    //   title: <FormattedMessage id="app.currency" defaultMessage="Currency" />,
    //   dataIndex: "currency",
    //   width: "20%",
    // },

    {
      title: "Skills",
     hidden:tablevalue.includes("Skill") ? false : true,
      //dataIndex: "documentId",
      width:"8%",
      hidden: true
    
    //   render: (name, item, i) => {
    //     return (
    //       <Tooltip title="Edit">
    //         <Icon
    //           type="edit"
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             props.setEditCustomerOpportunity(item);
    //             handleUpdateCustomerOpportunityModal(true);
    //             handleSetCurrentOpportunityId(item.opportunityId)
                
    //           }}
    //         />
    //       </Tooltip>
    //     );
    //   },
    },
  ];
  // if (fetchingCustomerOpportunityError) {
  //   return <APIFailed />;
  // }
  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={
            chooseCandidateEmail
        }
        scroll={{ y: 460 }}
        pagination={false
          // defaultPageSize: 15,
          // showSizeChanger: true,
          // pageSizeOptions: ["15", "25", "40", "50"],
        }
      />
      {/* <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        
      /> */}
    </>
  );
}
// }
const mapStateToProps = ({ customer ,candidate}) => ({
  tablevalue:candidate.tablevalue
//   fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
//   fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
//   customerId: customer.customer.customerId,
//   opportunityByCustomerId: customer.opportunityByCustomerId,
//   addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCandidateEmailTable);
