import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCandidateStatus, getCandidateListByUserId } from "../../CandidateAction"

function StatusToggle(props) {

    const [toggle, setToggle] = React.useState(props.active)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (props.active) {
            props.linkCandidateStatus(
                {
                    candidateId: props.candidateId,
                    userId: props.userId,
                    // status: true,
                    active: props.active ? false : true,
                },
                props.candidateId,
                props.userId,
                //  handleCallbackFalse
            );
            setToggle( props.active ? false : true);
        } else {
            props.linkCandidateStatus(
                {
                    candidateId: props.candidateId,
                    userId: props.userId,
                    // status: true,
                    active: props.active ? false : true,
                },
                props.candidateId,
                props.userId,
                //  handleCallback
            );
            setToggle( props.active ? false : true);
        }
    }

    function handleCancel() {
        if (props.active) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    
                    <Switch className="toggle-clr"
                        checked={props.active || toggle}
                        // disabled={props.status}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
                   
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, candidate }) => ({
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkCandidateStatus,
            getCandidateListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(StatusToggle);
