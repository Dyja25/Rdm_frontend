import React, { Component, Suspense, lazy } from 'react';
import { ActionHeader } from '../../Components/Utils';
import { BundleLoader } from "../../Components/Placeholder";

const UploadActionLeft =lazy(()=>import("../Upload/UploadActionLeft"));
// const UploadActionRight =lazy(()=>import("../Upload/UploadActionRight"));

class UploadHeader extends Component {
    render() {
        // const {
        //     viewType,
        //     setShipperViewType,
        //     setCurrentData,
        //     currentData,
        //     handleClear,
        //     handleShipperModal,
        // } = this.props;

        return (
            <>
                <ActionHeader
                    leftComponent={
                        <Suspense fallback={<BundleLoader />}>
                        <UploadActionLeft
                             handleClick={this.props.handleClick}
       activeIcon={this.props.activeIcon}
                       
       
                        /></Suspense>
                    }
                    // rightComponent={
                    //     <Suspense fallback={<BundleLoader />}>
                    //     <UploadActionRight
    
                    //         /></Suspense>
                    // }
                />
            </>
        )
    }
}
export default UploadHeader;
