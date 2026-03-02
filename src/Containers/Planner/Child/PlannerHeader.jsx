import React, { Component } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import PlannerActionLeft from "./PlannerActionLeft.jsx";
import PlannerActionRight from './PlannerActionRight.jsx';
class PlannerHeader extends Component {
    render() {
        const { viewType, setPlannerViewType } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={<PlannerActionLeft
                        viewType={viewType}
                        setPlannerViewType={setPlannerViewType}
                    />}
                    rightComponent={<PlannerActionRight
                    />}
                />
            </div>
        )
    }
}

export default PlannerHeader;