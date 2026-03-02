import React, { Component, useState } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DndMessageCard from "./DndMessageCard";
const Container = styled.div`
  margin: 0.5em;
  border: 0.0625em solid lightgrey;
  border-radius: 0.125em;
  width: 13.75em;

  flex-direction: column;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 0.5em;
`;
const TaskList = styled.div`
  padding: 0.5em;
  min-height: 6.25em;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 1;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
`;

class DndColumn extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>

        <Droppable droppableId={this.props.column.id} type="task">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <DndMessageCard Key={task.id} tasks={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default DndColumn;
