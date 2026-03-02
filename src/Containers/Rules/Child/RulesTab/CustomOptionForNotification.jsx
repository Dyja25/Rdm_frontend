import React, { Component } from "react";
import { EditorState, Modifier } from "draft-js";
import PropTypes from "prop-types";
import { Select } from "antd";
const { Option } = Select;
const data = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
];

const data1 = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
  { lable: "Opportunity_name", value: "Opportunity_name" },
  { lable: "Proposal_value", value: "Proposal_value" },
  { lable: "Currency", value: "Currency" },
  { lable: "Customer_Name", value: "Customer_Name" },
  { lable: "Task_Name", value: "Task_Name" },
  { lable: "Personal_Signature", value: "Personal_Signature" },
  { lable: "Organization_Signature", value: "Organization_Signature" },
];
const data2 = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
  { lable: "Opportunity_name", value: "Opportunity_name" },
  { lable: "Proposal_value", value: "Proposal_value" },
  { lable: "Currency", value: "Currency" },
  { lable: "Customer_Name", value: "Customer_Name" },
  { lable: "Task_Name", value: "Task_Name" },
  { lable: "Personal_Signature", value: "Personal_Signature" },
];
const data3 = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
  { lable: "Opportunity_name", value: "Opportunity_name" },
  { lable: "Proposal_value", value: "Proposal_value" },
  { lable: "Currency", value: "Currency" },
  { lable: "Customer_Name", value: "Customer_Name" },
  { lable: "Task_Name", value: "Task_Name" },

  { lable: "Organization_Signature", value: "Organization_Signature" },
];
class CustomOptionForNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: "",
    };
  }
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  handleChange = async (value) => {
    const { editorState, onChange } = this.props;
    console.log("inside function...............");

    await this.setState({ selectedData: value });
    console.log(this.state.selectedData ? this.state.selectedData : "");

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      // ` {${value}} `,
      this.state.selectedData ? `{${this.state.selectedData}}` : "",
      editorState.getCurrentInlineStyle()
    );

    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    // console.log(this.props.signatureInd);
    // const personal = this.props.signatureInd.personal_ind;
    // console.log(personal);
    // const admin = this.props.signatureInd.admin_ind;
    // console.log(admin);
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.3125em",
          }}
        >
          {/* <div style={{ margin: "0em 0em", fontWeight: "bold" }}>Tag</div> */}
          &nbsp; &nbsp;
          <Select
            style={{ width: 200 }}
            placeholder="Select Tag"
            onSelect={this.handleChange}
          >
            {data.map((item) => {
              return <Option value={item.value}>{item.lable} </Option>;
            })}
            {/* {this.props.signatureInd.admin_ind ? (
              <>
                {data3.map((item) => {
                  return <Option value={item.value}>{item.lable} </Option>;
                })}
              </>
            ) : this.props.signatureInd.personal_ind ? (
              <>
                {data2.map((item) => {
                  return <Option value={item.value}>{item.lable} </Option>;
                })}
              </>
            ) : this.props.signatureInd.personal_ind && this.props.admin_ind ? (
              <>
                {data1.map((item) => {
                  return <Option value={item.value}>{item.lable} </Option>;
                })}
              </>
            ) : (
              <>
                {data.map((item) => {
                  return <Option value={item.value}>{item.lable} </Option>;
                })}
              </>
            )} */}
          </Select>
          {/* <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("First_Name")}
          >
            First_Name
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Last_Name")}
          >
            Last_Name
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Opportunity_name")}
          >
            Opportunity_name
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Proposal_value")}
          >
            Proposal_value
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Currency")}
          >
            Currency
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Customer_Name")}
          >
            Customer_Name
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Task_Name")}
          >
            Task_Name
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Task_Name")}
          >
            Personal_Signature
          </div>
          <div
            style={{
              border: "0.0625em solid #1890ff",
              fontSize: "0.6875em",
              borderRadius: "1.375em",
              display: "flex",
              boxRadius: "1.875em",
              justifyItems: "center",
              alignItems: "center",
              height: "1.5625em",
              padding: "0em 0.5em",
              margin: "0em 0em 0em 0.3125em ",
              cursor: "pointer",
            }}
            onClick={() => this.handleChange("Task_Name")}
          >
            Organization_Signature
          </div> */}
        </div>
      </>
    );
  }
}
export default CustomOptionForNotification;
