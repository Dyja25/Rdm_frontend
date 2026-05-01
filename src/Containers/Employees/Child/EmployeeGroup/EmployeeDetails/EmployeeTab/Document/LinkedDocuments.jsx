import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { base_url } from "../../../../../../../Config/Auth";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../../Components/UI/Elements";
import { Link } from "../../../../../../../Components/Common";
import {
  getEmployeeDocument,
  deleteDocument,
} from "../../../../../EmployeeAction";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { elipsize } from "../../../../../../../Helpers/Function/Functions";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      
      getEmployeeDocument,
    } = this.props;
    getEmployeeDocument(this.props.employeeId);
  }
  render() {
    const {
      documentsByEmployeeId,
      fetchingDocumentsByEmployeeId,
      fetchingDocumentsByEmployeeIdError,
      deleteDocument,
    } = this.props;
    const columns = [
      {
        //title: "Date",
        title: <FormattedMessage
          id="app.date"
          defaultMessage="Date"
        />,
        dataIndex: "creationDate",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.creationDate).format("ll")}`}</span>;
        },
      },
      {
        //title: "Name",
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
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
        title: <FormattedMessage
          id="app.description"
          defaultMessage="Description"
        />,
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
        title: <FormattedMessage
          id="app.uploadedBy"
          defaultMessage="Uploaded By"
        />,
        dataIndex: "uploadedBy",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },
     
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
              <FileDownloadIcon
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
        dataIndex: "documentTypeId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteDocument(item.documentTypeId)}
            >
              <DeleteIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingDocumentsByEmployeeIdError) {
      return <APIFailed />;
    }
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
            rowKey="employeeId"
            columns={columns}
            dataSource={documentsByEmployeeId}
            Loading={
              fetchingDocumentsByEmployeeId ||
              fetchingDocumentsByEmployeeIdError
            }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  employee: employee.employee,
   employeeId: employee.singleEmployee.employeeId,
  fetchingDocumentsByEmployeeId: employee.fetchingDocumentsByEmployeeId,
  fetchingDocumentsByEmployeeIdError:
    employee.fetchingDocumentsByEmployeeIdError,
  documentsByEmployeeId: employee.documentsByEmployeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeeDocument,
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
