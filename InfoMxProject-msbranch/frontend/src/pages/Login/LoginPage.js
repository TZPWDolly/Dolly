import React, { useState } from 'react';
import LoginForm from '../../forms/Login/LoginForm';
import NavBarLogin from '../../components/Login/NavBarLogin';

function LoginPage () {

    return (
        <div>
            <NavBarLogin/>
            <LoginForm/>
        </div>
    )

}
export default LoginPage;


