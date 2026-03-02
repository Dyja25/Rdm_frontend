import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import RulesActionLeft from "./RulesActionLeft";
import RulesActionRight from "./RulesActionRight";
class RulesHeader extends Component {
    render() {
        const { viewType, setTaskViewType } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={<RulesActionLeft />}
                    rightComponent={<RulesActionRight />}
                />
            </div>
        );
    }
}

export default RulesHeader;
