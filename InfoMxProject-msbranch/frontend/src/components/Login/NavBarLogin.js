//Logo Bar above Login Page
import React, { useState } from 'react';
import secondaryLogo from '../../images/secondaryLogo.png';
import primaryLogo from '../../images/primaryLogo.png';
import Typography from '@material-ui/core/Typography';

function NavBarLogin () {

    const imgStyle = {
        width: "80px",
        height: "90px"
    }

    return (
        <div className = "navBarLoginTest">
            <img 
                style={imgStyle}
                src={secondaryLogo} 
                alt=""/>
            <h2 style={{color:'#482642'}}>Welcome to InfoMx</h2>
        </div>
    )

}
export default NavBarLogin;