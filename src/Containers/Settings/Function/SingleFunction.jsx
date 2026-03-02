import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Tooltip } from "antd";
import EditableInput from "../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleFunctions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            functionType: "",

        }
    }
    render() {
        const { Function: { functionType, functionTypeId }, handleChange, name, value, linkedFunctions,
            updatingFunctions, handleUpdateFunction, handleDeleteSector } = this.props;
        console.log(linkedFunctions)
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <FunctionWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <FlexContainer justifyContent='space-between'>
                                <FunctionName style={{ flexBasis: '90%' }}>
                                    {functionType}
                                </FunctionName>
                                <div>
                                <ActionIcon
                                tooltipTitle="Edit"
                                 iconType="edit"
                                handleIconClick={toggleViewType}
                               size="0.75em"
                               />
                                &nbsp;
                                {/* <ActionIcon
                                  tooltipTitle="Delete"
                                 iconType="delete"
                                  handleIconClick={() => handleDeleteSector(typeId)}
                                  size="0.75em"
                                theme="filled"
                               style={{ color: "#666" }}
                                 /> */}
                                    
                                  
                                </div>
                            </FlexContainer>
                            :
                            <FlexContainer >
                                <TextInput
                                    name={name}
                                    // value={value || educationType}
                                    defaultValue={functionType}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                                <br />
                                <br />
                                <div style={{ marginLeft:"auto" }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingFunctions}
                                    disabled={!value}
                                    onClick={() => handleUpdateFunction(functionTypeId, value, toggleViewType())}
                                >
                                    {/* Save */}
                                    <FormattedMessage
                                       id="app.update"
                                       defaultMessage="Update"
                                    />
                                </Button>&nbsp;
                                <Button
                                    type='primary'
                                    ghost
                                    onClick={() => toggleViewType()}
                                >
                                    {/* Cancel */}
                                    <FormattedMessage
                                        id="app.cancel"
                                        defaultMessage="Cancel"
                                    />
                                </Button>
                                </div>
                            </FlexContainer>
                    )}
                </ViewEditCard>
            </FunctionWrapper>
        )
    }
}

export default SingleFunctions;

const FunctionWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const FunctionName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const FunctionValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
