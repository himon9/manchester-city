import React from "react";
import { AppBar,Toolbar,Button } from "@mui/material"; 

//We cant use <a> tag so we use ...Link
import { Link } from "react-router-dom";

import {CityLogo} from '../Utils/tools'
import { handleBreakpoints } from "@mui/system";
import { logoutHandler } from "../Utils/tools";

const Header = ({user}) => {

    

    return (
       <AppBar
            position='fixed'
            style={{
                backgroundColor: '#98c5e9',
                boxShadow: 'none',
                padding: '10px 0',
                borderBottom: '2px solid #00285e'
            }}
       >
            <Toolbar style={{ display: 'flex '}}>
                <div style={{flexGrow:1}}>
                    <div className="header_logo">
                        <CityLogo
                            link={true}
                            linkTo={'/'}
                            width="70px"
                            height="70px"
                        />
                    </div>

                </div>

            <Link to='/the_team'>
                <Button color="inherit">The Team</Button>
            </Link>

            <Link to='/the_matches'>
                <Button color="inherit">Matches</Button>
            </Link>

            {   user ? 
                <div>
                    <Link to='/dashboard'>
                         <Button color="inherit">Dashboard</Button>
                    </Link> 
                         <Button color="inherit"
                                onClick={()=>{
                                    logoutHandler()
                                }}>Logout</Button>
                    
                </div>
                    : 
                <div>
                    <Link to='/dashboard'>
                        <Button color="inherit">Dashboard</Button>
                    </Link>
                </div>
            } 
           

            </Toolbar>
                
            
       </AppBar>
    )
}

export default Header