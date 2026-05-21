import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import {
  StyledTable,
  StyledModal,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { handleEducationModal } from "../../../../ProfileAction";
// import AddEducationModal from "./AddEducationModal";
import { base_url } from "../../../../../../Config/Auth";
import {
  handleUpdatePersonalDetailsModal,
  getDocumentDetails,
  setEditDocument,
  deletePersonalTable,
} from "../../../../ProfileAction";
import { handleUpdateEducationModal } from "../../../../ProfileAction";
import UpdatePersonalDetailsModal from "./UpdatePersonalDetailsModal";
import { ActionIcon } from "../../../../../../Components/Utils";
import dayjs from "dayjs";
// import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";
class EducationTable extends Component {
  componentDidMount() {
    const { getDocumentDetails, employeeId } = this.props;
    getDocumentDetails(employeeId);
  }
  
  render() {
    const {
      documentDetails,
      fetchingDocumentDetails,
      fetchingDocumentDetailsError,
      handleUpdatePersonalDetailsModal,
      updatePersonalDetailsModal,
      setEditDocument,
      deletePersonalTable,
    } = this.props;

    const columns = [
      {
        //title: " Type",
        title: <FormattedMessage id="app.type" defaultMessage="Type" />,
        dataIndex: "idType",
        // width: "35%"
      },
      {
        //title: "Document ID number",
        title: (
          <FormattedMessage id="app.documentidnumber" defaultMessage="Document ID number" />
        ),
        dataIndex: "idNo",
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "9%",
        render: (name, item, i) => {
          return (
            <>
              {item.documentId ? (
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  <div
                    type="download"
                    // onClick={() => startDownload()}
                    style={{ cursor: "pointer" }}
                  />
                </a>
              ) : null}
            </>
          );
        },
      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <ActionIcon
              tooltipTitle="Edit"
              iconType="edit"
              style={{ fontSize: 16 }}
              handleIconClick={() => {
                setEditDocument(item);
                handleUpdatePersonalDetailsModal(true);
              }}
            />
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
              onConfirm={() => deletePersonalTable(item.id)}
            >
              <div type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingDocumentDetailsError) {
    //   return <APIFailed />;
    // }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={documentDetails}
          loading={fetchingDocumentDetails || fetchingDocumentDetailsError}
          onChange={console.log("task onChangeHere...")}
        />

        <UpdatePersonalDetailsModal
          updatePersonalDetailsModal={updatePersonalDetailsModal}
          handleUpdatePersonalDetailsModal={handleUpdatePersonalDetailsModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  documentDetails: profile.documentDetails,
  fetchingDocumentDetails: profile.fetchingDocumentDetails,
  fetchingDocumentDetailsError: profile.fetchingDocumentDetailsError,  
  updatePersonalDetailsModal: profile.updatePersonalDetailsModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocumentDetails,
      setEditDocument,
      handleUpdatePersonalDetailsModal,
      deletePersonalTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
