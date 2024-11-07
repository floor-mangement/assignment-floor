import { IconButton } from '@material-ui/core';
import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import '../styles/comman.css';

const SideNav = () => {

    const HandleHomePage = () => {
        alert("click home page");
        // push    

    }

    return (
        <>
            <div className='side-nav-main-cmp'>
                <IconButton onClick={HandleHomePage}>
                    <HomeIcon fontSize="inherit" />
                </IconButton>
                <IconButton onClick={HandleHomePage}>
                    <CalendarViewMonthIcon fontSize="inherit" />
                </IconButton>
            </div>
        </>
    )
}

export default SideNav;