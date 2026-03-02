import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { message } from "antd";
class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props)
    }
    // componentWillMount() {
    //     axios.interceptors.response.use((response) => {
    //         return response;
    //     }, (error) => {
    //         console.log(error.response)
    //         //catches if the session ended!
    //         if (error.response.status == 401) {
    //             console.log("EXPIRED TOKEN!");
    //             sessionStorage.clear();
    //             // store.dispatch({ type: LOGOUT });
    //             this.props.history.push('/login');
    //             message.error('Session has expired!')
    //         }
    //         return Promise.reject(error);
    //     });
    //     console.log('------------------------')
    //     if (!this.props.token) {
    //         console.log('------------------------')
    //         this.props.history.push('/login');
    //         message.error('Session has expired!')
    //     }
    // };

    // componentWillUpdate(nextProps) {
    //     console.log('------------------------')
    //     if (!nextProps.token) {
    //         console.log('------------------------')
    //         this.props.history.push('/login');
    //     }
    // };
    render() {
        console.log('inside protected auth')
        console.log(this.props)
        const { component: Component, ...rest } = this.props
        return (
            <Route
                {...rest}
                render={props =>{
                    console.log(props)
                    console.log(this.props)
                   return this.props.userType === 'ADMIN' ? <Component {...props} /> : message.error('Access denied!')}
                }
            />
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    userType: auth.userDetails.userType
})

export default (connect(mapStateToProps)(ProtectedRoute));