//Show Default Tab for Default User
import React, { useState } from 'react';

import DefaultMainPageMenu from '../../components/Default/DefaultMainPageMenu'
import NavBarDefaultMainPage from '../../components/Default/NavBarDefaultMainPage';

function DefaultMainPage () {
    return (
        <div>
            <NavBarDefaultMainPage/>
            <DefaultMainPageMenu/>
        </div>
    )
}
export default DefaultMainPage;