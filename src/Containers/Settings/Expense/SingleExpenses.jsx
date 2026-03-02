import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Tooltip } from "antd";
import EditableInput from "../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleExpenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            expenseType: "",

        }
    }
    render() {
        const { expense: { expenseType, expenseTypeId }, handleChange, name, value, linkedExpenses,
            updatingExpenses, handleUpdateExpense, handleDeleteExpense } = this.props;
        console.log(linkedExpenses)
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <ExpenseWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <FlexContainer justifyContent='space-between'>
                                <ExpenseName style={{ flexBasis: '90%' }}>
                                    {expenseType}
                                </ExpenseName>
                                <div>
                                    {this.props.expense.editInd?
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
                                    // value={value || expenseType}
                                    defaultValue={expenseType}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                                <br />
                                <br />
                                <div style={{ marginLeft:"auto" }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingExpenses}
                                    disabled={!value}
                                    onClick={() => handleUpdateExpense(expenseTypeId, value, toggleViewType())}
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
            </ExpenseWrapper>
        )
    }
}

export default SingleExpenses;

const ExpenseWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const ExpenseName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const ExpenseValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
