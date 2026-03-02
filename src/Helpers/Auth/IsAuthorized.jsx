import React, { Component } from 'react';
import { connect } from "react-redux";

const IsAuthorized = (props) => {
    if (props.role === 'ADMIN') {
        return props.children
    } else {
        return null
    }
}
const mapStateToProps = ({ auth }) => ({
    role: auth.userDetails.role
})

export default connect(mapStateToProps)(IsAuthorized);