import React, { Component, Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { BundleLoader } from "../../Components/Placeholder";
import AddEventModal from './Child/AddEventModal.jsx'
import EventHeader from "./Child/EventHeader.jsx";
import { handleEventModal } from "./EventAction";
const EventTable = lazy(() => import('./Child/EventTable/EventTable.jsx'))

class Event extends Component {

    render() {
        const { addEventModal, handleEventModal } = this.props;
        return (
            <React.Fragment>
                <EventHeader
                    handleEventModal={handleEventModal} />
                <AddEventModal
                    addEventModal={addEventModal}
                    handleEventModal={handleEventModal} />
                <Suspense fallback={<BundleLoader />}>
                    <EventTable />
                </Suspense>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ event }) => ({
    addEventModal: event.addEventModal,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleEventModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Event);