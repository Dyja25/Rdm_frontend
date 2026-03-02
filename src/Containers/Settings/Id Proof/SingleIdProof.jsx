import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Tooltip } from "antd";
import EditableInput from "../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleIdProof extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            IdProofType: "",

        }
    }
    render() {
        const { idProof: { IdProofType, IdProofTypeId }, handleChange, name, value, linkedIdProofs,
        updatingIdProofs, handleUpdateIdProof, handleDeleteIdProof } = this.props;
        console.log(linkedIdProofs)
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <IdProofWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <FlexContainer justifyContent='space-between'>
                                <IdProofName style={{ flexBasis: '90%' }}>
                                    {IdProofType}
                                </IdProofName>
                                <div>
                                    {this.props.idProof.editInd?
                                <ActionIcon
                                tooltipTitle="Edit"
                                 iconType="edit"
                                handleIconClick={toggleViewType}
                               size="0.75em"
                               />:null}
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
                                    // value={value || idProofType}
                                    defaultValue={IdProofType}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                                <br />
                                <br />
                                <div style={{ marginLeft:"auto" }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingIdProofs}
                                    disabled={!value}
                                    onClick={() => handleUpdateIdProof(IdProofTypeId, value, toggleViewType())}
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
            </IdProofWrapper>
        )
    }
}

export default SingleIdProof;

const IdProofWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const IdProofName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const IdProofValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
