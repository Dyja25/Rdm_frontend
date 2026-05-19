import React, { useEffect } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { CurrencySymbol } from "../../../../../../Components/Common";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";




import { getOpportunityListByContactId } from "../../../../ContactAction";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  useEffect(() => {
    props.getOpportunityListByContactId(props.contactId);
  }, []);
  console.log(props.contactId);
  // render() {
  const { fetchingContactOpportunity, opportunityByContactId } = props;
  // if (fetchingContactOpportunity) {
  //   return <BundleLoader />;
  // }
  const columns = [
    {
      title: "",
      width: "2%",
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   width: "5%",
    //   render: (name, item, i) => {
    //     return (
    //       <SubTitle>
    //         <MultiAvatar
    //           primaryTitle={item.accountName}
    //           imageId={item.imageId}
    //           imageURL={item.imageURL}
    //           imgWidth={"2.5em"}
    //           imgHeight={"2.5em"}
    //         />
    //       </SubTitle>
    //     );
    //   },
    // },
    {
      // title: "Name",
      title: <FormattedMessage
        id="app.opportunityName"
        defaultMessage="Name"
      />,
      dataIndex: "opportunityName",
      defaultSortOrder: "ascend",
      width: "20%",

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
      // title: "Start Date",
      title: <FormattedMessage
        id="app.startdate"
        defaultMessage="Start Date"
      />,
      dataIndex: "startDate",
      width: "20%",
      defaultSortOrder: "descend",
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    {
      // title: "End Date",
      title: <FormattedMessage
        id="app.enddate"
        defaultMessage="End Date"
      />,
      dataIndex: "endDate",
      width: "20%",
      defaultSortOrder: "descend",
      render: (text, item) => {
        const endDate = dayjs(item.endDate).format("ll");
        return <span>{endDate}</span>;
      },
    },
    {
      // title: "Proposal Amount",
      title: <FormattedMessage
        id="app.proposalamount"
        defaultMessage="Proposal Amount"
      />,
      dataIndex: "proposalAmount",
      width: "20%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
            {/* {item.billing} {item.currency} */}
            <span>
            <CurrencySymbol currencyType={item.currency} />
            {item.proposalAmount}
          </span>
          </>
        );
      },
    },
    // {
    //   // title: "Currency",
    //   title: <FormattedMessage
    //     id="app.currency"
    //     defaultMessage="Currency"
    //   />,
    //   dataIndex: "currency",
    //   width: "20%",
    // },
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;

  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={opportunityByContactId}
        onChange={onChange}
        Loading={fetchingContactOpportunity}
        // pagination={{
        //   defaultPageSize: 10,
        // }}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
    </>
  );
}
// }
const mapStateToProps = ({ auth, contact, opportunity }) => ({
  userId: auth.userDetails.userId,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  // accounts: accountSelector(account),
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
  // opportunityId: opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
