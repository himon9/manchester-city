import React from "react";
import {Link } from "react-router-dom";//withRouter injects props  to the component that we are using even if they are not linked

import { ListItem } from "@mui/material";
import {logoutHandler} from '../../Utils/tools'

//Modified version and we are not using withRouter
const AdminNav = () => {
    const links= [
        {
            title:'Matches',
            linkTo:'/admin_matches'
        },
        {
            title:'Players',
            linkTo:'/admin_players'
        }
    ]

    const renderItems = () => (
        links.map(link=>(
            <Link to={link.linkTo} key={link.title}>
                <ListItem button className="admin_nav_link">
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    return (
        <div>
            {renderItems()}
            <ListItem button className="admin_nav_link"
                onClick={()=>logoutHandler()}
            >
                Log out
            </ListItem>
        </div>
    )
} 

export default AdminNav