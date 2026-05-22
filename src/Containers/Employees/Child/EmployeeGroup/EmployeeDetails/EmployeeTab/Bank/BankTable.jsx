import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import {
  StyledTable,
  StyledModal,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import UpdateBankModal from "./UpdateBankModal";
import {
  handleUpdateBankModal,
  setEditBank,
} from "../../../../../../Profile/ProfileAction";
// import { handleBankModal } from "../../../../ProfileAction";
// import AddBankModal from "./AddBankModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { getBankDetails } from "../../../../../../Profile/ProfileAction";
import { deleteBankTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
// import EditEmailForm from "../../../../../Settings/Email/Child/EditEmailForm"

class BankTable extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });
  componentDidMount() {
    const { getBankDetails, employeeId } = this.props;
    getBankDetails(this.props.employeeId);
  }
  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bank,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
      deleteBankTable,
    } = this.props;
    const columns = [
      {
        //title: "Bank Name",
        title: (
          <FormattedMessage id="app.accountHolder" defaultMessage="Account Holder" />
        ),
        dataIndex: "accountHolderName",
        // width: "35%"
      },
      {
        //title: "Bank Name",
        title: (
          <FormattedMessage id="app.bankname" defaultMessage="Bank Name" />
        ),
        dataIndex: "bankName",
        // width: "35%"
      },

      {
        //title: "Branch Name",
        title: (
          <FormattedMessage id="app.branchname" defaultMessage="Branch Name" />
        ),
        dataIndex: "branchName",
      },

      {
        //title: "A/C Number",
        title: (
          <FormattedMessage id="app.accountNo" defaultMessage=" Account#" />
        ),
        dataIndex: "accountNo",
      },

      {
        //title: "IFSC CODE",
        title: (
          <FormattedMessage id="app.ifscCode" defaultMessage="SWIFT Code" />
        ),
        dataIndex: "ifscCode",
      },


      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              // type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditBank(item);
                handleUpdateBankModal(true);
              }}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "4%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteBankTable(item.id)}
            >
              <DeleteIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingBankDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={bank}
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdateBankModal
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
        />

        {/* )} */}
        {/* <StyledModal
                    title={"Configure"}
                    width="36%"
                    // height="50%"
                    visible={this.state.emailModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={this.handleEmailModalVisible}
                    footer={null}
                >
                    <EditEmailForm handleEmailModalVisible={this.handleEmailModalVisible} />
                </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  bank: profile.bankDetails,
  fetchingBankDetails: profile.fetchingBankDetails,
  fetchingBankDetailsError: profile.fetchingBankDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBankDetails,
      handleUpdateBankModal,
      setEditBank,
      deleteBankTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BankTable);
