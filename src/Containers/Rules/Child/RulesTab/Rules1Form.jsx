
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { Button, Switch, Icon, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import dayjs from "dayjs";
import { Spacer } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { FormattedMessage } from "react-intl";
import { InputComponent1 } from "../../../Components/Forms/Formik/InputComponent1";
import { SelectComponent1 } from "../../../Components/Forms/Formik/SelectComponent1";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker1 } from "../../../Components/Forms/Formik/DatePicker1";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { StyledLabel } from "../../../Components/UI/Elements";

class Rules1Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    handleChange = (checked) => {
        this.setState({
            visible: checked
        })
    }

    render() {

        return (
            <>
                <Formik
                    initialValues={{
                        type: "",

                    }}

                    onSubmit={values => {

                    }}
                >
                    {({ values }) => (

                        <Form className="form-background">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "98%",

                                    }}
                                >
                                    <FlexContainer justifyContent="space-between" >
                                        <div style={{ width: "50%", marginTop: "0.625em" }}>
                                            <StyledLabel>Stage Progress</StyledLabel>
                                            <Switch
                                                style={{ width: "5em", marginLeft: "0.625em" }}
                                                onChange={this.handleChange}
                                                checked={this.state.visible}

                                                checkedChildren="Yes"
                                                unCheckedChildren="No"

                                            />
                                        </div>
                                        {this.state.visible && (
                                            <div style={{ width: "50%" }}>
                                                <Field
                                                    name="type"

                                                    component={SelectComponent}
                                                    options={[
                                                        "Aging",
                                                        "Days in Final stage",

                                                    ]}
                                                    inlineLabel
                                                    isColumn
                                                    style={{ flexBasis: "80%", marginTop: "0.25em" }}
                                                // defaultValue='low'
                                                />
                                            </div>
                                        )}


                                    </FlexContainer>
                                    <Spacer />
                                    {
                                        values.type && (
                                            <FlexContainer justifyContent="space-between">
                                                <div style={{ width: "65%" }}>
                                                    <Field
                                                        name="unit"
                                                        //label="Time"
                                                        label={<FormattedMessage
                                                            id="app.unit"
                                                            defaultMessage="Time"
                                                        />}
                                                        isColumn
                                                        width={"100%"}
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            flexBasis: "80%",
                                                            marginTop: "0.25em",
                                                            height: "2.0625em"
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "30%", marginTop: "1.375em" }}>

                                                    <FastField
                                                        name="unitValue"
                                                        isRequired
                                                        label={<FormattedMessage
                                                            id="app.unitValue"
                                                            defaultMessage="text"
                                                        />}
                                                        type="text"
                                                        isColumn
                                                        options={["Days", "Hours"]}
                                                        component={SelectComponent}
                                                        inlineLabel
                                                        className="field"
                                                        style={{
                                                            flexBasis: "80%",
                                                            margintop: "0.25em"
                                                        }}
                                                    />

                                                </div>
                                            </FlexContainer>
                                        )
                                    }

                                </div>


                            </div>
                            <Spacer />
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"

                                >
                                    Add Rule
                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ settings }) => ({

});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Rules1Form);
