//Logo Bar above Default Main Page(Dashboard)
import React, { useState } from 'react';
import secondaryLogo from '../../images/secondaryLogo.png';
import primaryLogo from '../../images/primaryLogo.png';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

function NavBarDefaultMainPage() {
    const history = useHistory();
    const imgStyle = {
        width: "15%"
    }

    const logout = async () => {
        await sessionStorage.clear()
        //await history.replace('/');
        history.push({
            pathname: "/",
            openResetDialog: false
        });
    }

    const reset = async () => {
        //await sessionStorage.clear()
        //await history.replace('/');
        history.push({
            pathname: "/",
            openResetDialog: true
        });
    }

    return (
        <div className="navBarDefaultMainPage">
            <img
                style={{ width: '15%', alignSelf: 'center', marginBottom: '0.5%' }}
                src={primaryLogo}
                alt="" />
            <Typography variant="h4" style={{ color: '#482642', fontWeight: 'bold', alignSelf: 'center' }}>
                Welcome to InfoMx</Typography>
            <div style={{display:'flex',flexDirection:'row',height:'3%',alignSelf:'center'}}>
            {sessionStorage.getItem('role')==='2'? 
             <Button
             style={{ color: '#482642', height: '100%', alignSelf: 'center', marginRight: '3%' }}
             onClick={reset}
             size='small'>
             <Grid container direction="column" alignItems="center">
                 <RotateLeftIcon /><Typography variant="caption">Reset Password</Typography>
             </Grid>
         </Button>  : null}
           
            <Button
                style={{ color: '#d91d4d', height: '100%', alignSelf: 'center', marginRight: '3%'}}
                onClick={logout}
                size='small'>
                <Grid container direction="column" alignItems="center">
                    <PowerSettingsNewIcon /><Typography variant="caption">Logout</Typography>
                </Grid>
            </Button>
            
            </div>
            
            
        </div>
    )

}
export default NavBarDefaultMainPage;