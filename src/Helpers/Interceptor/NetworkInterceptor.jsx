import axios from 'axios';
import { UNAUTH_USER, LOGOUT } from '../../Containers/Auth/AuthTypes';

export default {
    setupInterceptors: (store) => {
        console.log('inside setupinterseptor')
        // axios.interceptors.request.use(request => {
        //   console.log('Starting Request', request)
        //   if(true){
        //     console.log('asfkjahslfjaksfk')
        //     return window.location.href = '/login'
        //   }
        //   return request
        // })

        // axios.interceptors.response.use(response => {
        //     console.log('Response:', response)
        //     return response
        // })
        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            console.log(response)
            return response;
        }, function (error) {
            console.log( error)
            //catches if the session ended!
            if ( error.response.status == 401) {
                console.log("EXPIRED TOKEN!");
                sessionStorage.clear();
                store.dispatch({ type: LOGOUT });
            }
            return Promise.reject(error);
        });

    }
};