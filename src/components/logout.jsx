import React, { useEffect } from 'react';
import authService from '../services/authService';

function Logout(props) {
    useEffect(() =>{
        authService.logout();
        window.location = "/";
    },[]);
    return null;
}

export default Logout;