import React from "react";
import { CityLogo } from "../Utils/tools";

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <CityLogo
                    link={true}
                    linkTo={'/'}
                    width='70px'
                    height='70px'
            /></div>
            <div className="footer_desc1">
                Manchester City @2022. All rights reserved
                <br/>
                Designed and Developed by Himon Sarkar
            </div>
        </footer>
    )
}

export default Footer