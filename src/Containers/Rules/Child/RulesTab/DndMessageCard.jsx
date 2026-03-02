import React, { Component, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  border: 0.0625em solid lightgrey;
  border-radius: 0.125em;
  padding: 0.5em;
  margin-bottom: 0.5em;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

class DndMessageCard extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.tasks.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.tasks.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default DndMessageCard;
