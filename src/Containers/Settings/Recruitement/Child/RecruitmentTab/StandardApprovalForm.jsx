import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { Button, Switch, Tooltip, Popconfirm, Popover,Select } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Spacer } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {
  addApproval,
  getApprovalData,
} from "../../../SettingsAction";
import { functions } from "lodash";
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;
function StandardApprovalForm(props) {

    useEffect(() => {
        props.getApprovalData(props.stageId);
    }, [])

    const [rows, setRows] = useState([{ value: "", id: 1 }]);
    const [id, setId] = useState(1);

    function buttonOnClick() {
        var mapped = rows.map(item => ({ [`level${item.id}`]: item.value }));
        var data = Object.assign(
            {},
            ...mapped,
            { levelCount: id },
            { approvalIndicator: props.approvalIndicator },
            { approvalType: props.approvalType },
            { processName: "Indent" },
            { subProcessName: "IndentApproval" }
        );
        console.log(data);
        // props.addIndentApproval(data);
    };


    //     approvalIndicator: true
    // approvalType: "Exception"
    // designationId: "DDG49470159634152021"
    // functionId: "FDG18460358639152021"
    // jobLevel: "3"
    // processName: "BOQ"
    // reportingTo: ""
    // subProcessName: "BOQApprove"
    // threshold: ""
    function handleChangeValue(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, value: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleAddRowClick() {
        setId((v) => v + 1);
        setRows((v) => [...v, { value: "", id: id + 1 }]);
    }

    function handleDelete(row) {
        setRows((v) => v.filter((d) => d.id !== row.id));
    }
    console.log(rows);
    return (
        <div>
            <div className="MainBox">
                <div className="InputBox">
                    {rows.map((row, i) => {
                        return (
                            
                            <div style={{ width: "100%", display: "flex", fontWeight: "bold" }}>
                                
                                <div style={{ width: "16%" }}>
                                    <p>{`Level ${i + 1}`}</p>
                                </div>
                                        
                                <div style={{ width: "47%" }}>
                                    <Select
                                        name={`${row.id}_value`}
                                        value={`${row.value}`}
                                        onChange={(value) =>
                                            handleChangeValue(value, `${row.id}_value`)
                                        }
                                    // placeholder={`select`}
                                    >
                                       {/* <Option value={"Raj"}></Option>; */}
                                       <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        
                                    </Select>
                          
                                </div>
                                {rows.length > 1 && (row.id + 1 > row.id) ? (
                                    <CloseOutlined onClick={() => handleDelete(row)} />

                                ) : null}
                            </div>
                        );
                    })}
                     <FlexContainer justifyContent="space-between">
                            <div style={{ width: "47%" }}>
                              <Field
                                name="reportingTo"
                                label="Threshold"
                                isRequired
                                isColumn
                                component={SelectComponent}
                                options={[
                                  "Best Match",
                                  "Skill set matching job description",
                                  "Skill set matches primary skill requirement",
                                  " Approval not required for all cases" ,
                                ]}
                               
                              />
                            </div>
                            </FlexContainer>
                            
                    <Spacer />
                    <FlexContainer justifyContent="flex-end">
                        <div className="button">
                            <Button type="primary" onClick={handleAddRowClick}>
                                Add Row
                            </Button>
                        </div>
                    </FlexContainer>
                    <Spacer style={{marginTop:"1.25em"}} />
                    {/* <FlexContainer justifyContent="flex-end"
                        style={{ marginLeft: "104%", marginTop: "52px" }}>
                        <Button
                            type="primary"
                            style={{
                                marginRight: "-230px",
                                marginTop: "52px",
                                marginBottom: "5px",
                            }}
                            onClick={() => buttonOnClick()}
                        >
                            Submit
                        </Button>
                    </FlexContainer> */}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = ({ settings, user }) => ({
    addingApproval: settings.addingApproval,
    // functionById: user.functionById,
    // fetchingFunctions:functions.fetchingFunctions,
    functions: functions.functions,
    // designationById: user.designationById,
    approvalData: settings.approvalData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addApproval,
        getApprovalData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StandardApprovalForm);