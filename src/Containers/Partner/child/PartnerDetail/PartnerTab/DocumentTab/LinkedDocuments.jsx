import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";

import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";

import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";

import {
  getPartnerDocument,
  deleteDocument,
} from "../../../../PartnerAction";

import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";


class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      partner: { partnerId },
      getPartnerDocument,
    } = this.props;
    getPartnerDocument(partnerId);
  }
  render() {
    const {
      documentsByPartnerId,
      fetchingDocumentsByPartnerId,
      fetchingDocumentsByPartnerIdError,
        deleteDocument,
    } = this.props;
    const columns = [
      {
        // title: "Date",
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        dataIndex: "creationDate",
        sorter: (a, b) => {
          var nameA = a.creationDate; // ignore upper and lowercase
          var nameB = b.creationDate; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
    
          return 0;
        },
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.creationDate).format("ll")}`}</span>;
        },
      },
      {
        // title: "Name",
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
        // title: "Description",
        title: <FormattedMessage id="app.description" defaultMessage="Description" />,
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
        // title: "Uploaded By",
        title: <FormattedMessage id="app.uploadedby" defaultMessage="Uploaded By" />,
        dataIndex: "uploadedBy",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },
      // {
      //   title: "Circulation",
      //   render: (name, item, i) => {
      //     debugger;

      //     if (item.levelType && item.levelType === "Above") {
      //       return (
      //         <SubTitle style={{ height: "5px", marginBottom: "12px" }}>
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
      //         <SubTitle style={{ height: "5px", marginBottom: "12px" }}>
      //           {item.type === "confidential"
      //             ? "Private"
      //             : `${item.type || ""} (${item.department || ""})(${item
      //                 .documentLevel[0] || ""})`}{" "}
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
          console.log(item)
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
              // target="_blank"
            >
              
              <DownloadOutlined
                type="download"
                // onClick={() => startDownload()}
                style={{ cursor: "pointer" }}
              />
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
              title="Do you want to delete?"
              // onConfirm={() => deleteDocument(item.documentTypeId)}
              onConfirm={() => deleteDocument(item.documentId)}
        >
              <DeleteOutlined
              type="delete" style={{ cursor: "pointer", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingDocumentsByPartnerIdError) {
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
            rowKey="PartnerId"
            columns={columns}
            dataSource={documentsByPartnerId}
            // Loading={
            //   fetchingDocumentsByPartnerId ||
            //   fetchingDocumentsByPartnerIdError
            // }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ partner }) => ({
  partner: partner.partner,
  fetchingDocumentsByPartnerId: partner.fetchingDocumentsByPartnerId,
  fetchingDocumentsByPartnerIdError: partner.fetchingDocumentsByPartnerIdError,
  documentsByPartnerId: partner.documentsByPartnerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerDocument,
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
