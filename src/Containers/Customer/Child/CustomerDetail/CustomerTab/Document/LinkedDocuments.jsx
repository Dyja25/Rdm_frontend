import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import { Link } from "../../../../../../Components/Common";
import {
  getCustomerDocument,
  deleteDocument,
} from "../../../../CustomerAction";

import { elipsize } from "../../../../../../Helpers/Function/Functions";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      customer: { customerId },
      getCustomerDocument,
    } = this.props;
    getCustomerDocument(customerId);
  }
  render() {
    const {
      documentsByCustomerId,
      fetchingDocumentsByCustomerId,
      fetchingDocumentsByCustomerIdError,
        deleteDocument,
    } = this.props;
    const columns = [
      {
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        dataIndex: "creationDate",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.creationDate).format("ll")}`}</span>;
        },
      },
      {
        //title: "Name",
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        dataIndex: "documentTitle",
        onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
        sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
      },
      // {
      //   title: "Description",
      //   dataIndex: "documentDescription",
      //   onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //   sorter: (a, b) => a.taskType.length - b.taskType.length
      // },
      {
        //title: "Description",
        title: (
          <FormattedMessage id="app.description" defaultMessage="Description" />
        ),
        dataIndex: "documentDescription",
        width: "20%",
        render: (name, item, i) => {
          console.log(item);
          return <span>{elipsize(item.documentDescription || "", 15)}</span>;
        },
        onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        sorter: (a, b) => a.taskType.length - b.taskType.length,
      },
      {
        //title: "Uploaded By",
        title: (
          <FormattedMessage id="app.uploadedby" defaultMessage="Uploaded By" />
        ),
        dataIndex: "uploadedBy",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },
      // {
      //   // title: "Circulation",
      //   title: (
      //     <FormattedMessage id="app.circulation" defaultMessage="Circulation" />
      //   ),
      //   render: (name, item, i) => {
      //     debugger;

      //     if (item.levelType && item.levelType === "Above") {
      //       return (
      //         <SubTitle style={{ height: "0.3125em", marginBottom: "0.75em" }}>
      //           {item.type === "confidential"
      //             ? "Private"
      //             : `${item.type || ""} (${item.department || ""})
      //             (${item.documentLevel[0] || ""}
      //             `}
      //           <Icon type="to-top" />)
      //         </SubTitle>
      //       );
      //     } else {
      //       debugger;
      //       return (
      //         <SubTitle style={{ height: "0.3125em", marginBottom: "0.75em" }}>
      //           {item.type === "confidential"
      //             ? "Private"
      //             : `${item.type || ""} (${item.department || ""})(${item
      //               .documentLevel[0] || ""})`}{" "}
      //           &nbsp;
      //         </SubTitle>
      //       );
      //     }
      //   },

      //   onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //   sorter: (a, b) => a.taskType.length - b.taskType.length,
      // },
      // {
      //     title: 'Stage',
      //     dataIndex: 'documentDescription',
      //     onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //     sorter: (a, b) => a.taskType.length - b.taskType.length,
      // },
      {
        title: "",
        // dataIndex: "documentTypeId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              {/* <Icon
                type="download"
                // onClick={() => startDownload()}
                style={{ cursor: "pointer" }}
              /> */}
            </a>
          );
        },
      },
      {
        title: "",
       // dataIndex: "documentTypeId",
       dataIndex: "documentId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              //title="Do you want to delete?"
              title={<FormattedMessage
                id="app.doyouwanttodelete?"
                defaultMessage="Do you want to delete?"
              />}
            // onConfirm={() => deleteDocument(item.documentTypeId)}
            onConfirm={() => deleteDocument(item.documentId)}
            >
              {/* <Icon type="delete" style={{ cursor: "pointer", color: "red" }} /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingDocumentsByCustomerIdError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: tableHeight }}
            expandedRowRender={(record) => {
              //debugger;
              return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="CustomerId"
            columns={columns}
            dataSource={documentsByCustomerId}
            // Loading={
            //   fetchingDocumentsByCustomerId ||
            //   fetchingDocumentsByCustomerIdError
            // }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ customer }) => ({
  customer: customer.customer,
  fetchingDocumentsByCustomerId: customer.fetchingDocumentsByCustomerId,
  fetchingDocumentsByCustomerIdError:
    customer.fetchingDocumentsByCustomerIdError,
  documentsByCustomerId: customer.documentsByCustomerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerDocument,
        deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
