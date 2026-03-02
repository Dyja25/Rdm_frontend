import React, { Component,lazy } from 'react'
import { ActionHeader } from '../../../Components/Utils';
// import EventActionLeft from "./EventActionLeft";
const EventActionRight =lazy(()=>import("./EventActionRight.jsx"));

class EventHeader extends Component {
    render() {
        // const { viewType, setEventViewType } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={null}
                    rightComponent={<EventActionRight
                    />}
                />
            </div>
        )
    }
}

export default EventHeader;