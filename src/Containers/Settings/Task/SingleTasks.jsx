
import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Tooltip } from "antd";
import EditableInput from "../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleTasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            taskType: "",
            editInd:true
        }
    }
    render() {
        const { task: { taskType, taskTypeId }, handleChange, name, value, linkedTasks,
            updatingTasks, handleUpdateTask, handleDeleteTask} = this.props;
        console.log(linkedTasks)
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <TaskWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <FlexContainer justifyContent='space-between'>
                                <TaskName style={{ flexBasis: '90%' }}>
                                    {taskType}
                                </TaskName>
                                <div>
                                {this.props.task.editInd?
                                <ActionIcon
                                tooltipTitle="Edit"
                                 iconType="edit"
                                handleIconClick={toggleViewType}
                               size="0.75em"
                               /> :null }
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
                                    // value={value || taskType}
                                    defaultValue={taskType}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                                <br />
                                <br />
                                <div style={{ marginLeft:"auto" }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingTasks}
                                    disabled={!value}
                                    onClick={() => handleUpdateTask(taskTypeId, value, toggleViewType())}
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
            </TaskWrapper>
        )
    }
}

export default SingleTasks;

const TaskWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const TaskName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const TaskValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
