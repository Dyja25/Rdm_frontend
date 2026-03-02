import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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

class LinkedInvoice extends Component {
  componentDidMount() {
    // const {
    //   customer: { customerId },
    //   getCustomerDocument,
    // } = this.props;
    // getCustomerDocument(customerId);
  }
  render() {
    // const {
    //   documentsByCustomerId,
    //   fetchingDocumentsByCustomerId,
    //   fetchingDocumentsByCustomerIdError,
    //     deleteDocument,
    // } = this.props;
    const columns = [
      {
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        dataIndex: "creationDate",
      },
      {
   
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        dataIndex: "documentTitle",
      },
      {
        title: (
          <FormattedMessage id="app.description" defaultMessage="Description" />
        ),
        dataIndex: "documentDescription",
        width: "20%", 
      },
      {
        title: (
          <FormattedMessage id="app.uploadedBy" defaultMessage="Uploaded By" />
        ),
        dataIndex: "uploadedBy",
      },
    
      {
        title: "",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <ArrowDownwardIcon
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
       dataIndex: "documentId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title={<FormattedMessage
                id="app.doyouwanttodelete?"
                defaultMessage="Do you want to delete?"
              />}
            // onConfirm={() => deleteDocument(item.documentId)}
            >
              <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
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
            rowKey="CustomerId"
            columns={columns}
            // dataSource={documentsByCustomerId}
            // Loading={
            //   fetchingDocumentsByCustomerId ||
            //   fetchingDocumentsByCustomerIdError
            // }
            // onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ customer }) => ({
//   customer: customer.customer,
//   fetchingDocumentsByCustomerId: customer.fetchingDocumentsByCustomerId,
//   fetchingDocumentsByCustomerIdError:
//     customer.fetchingDocumentsByCustomerIdError,
//   documentsByCustomerId: customer.documentsByCustomerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getCustomerDocument,
        // deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedInvoice);

