import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import discussIcon from "../../assets/images/discuss-icon.svg";
import walletIcon from "../../assets/images/wallet-icon.svg";
import settingsIcon from "../../assets/images/settings-icon.svg";
import facebookIcon from "../../assets/images/facebook-icon.svg";
import twitterIcon from "../../assets/images/twitter-icon.svg";
import instagramIcon from "../../assets/images/instagram-icon.svg";
import youtubeIcon from "../../assets/images/youtube-icon.svg";
import Logo from "../logo/Logo";

class SideNav extends Component {
    render() {
        return (
            <div className="sidenav">
                <Logo />
                <div className="nav-items">
                    <div className="item">
                        <NavLink
                            to={{
                                pathname: "/my-cases-list",
                                state: { label: undefined, source: "SideNav" }
                            }}
                        >
                            <img src={discussIcon} alt="الأسئلة" />
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink to="/my-wallet">
                            <img src={walletIcon} alt="المحفظة" />
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink to="/user-settings">
                            <img src={settingsIcon} alt="الإعدادات" />
                        </NavLink>
                    </div>
                </div>

                <div className="social-links">
                    <div className="link">
                        <a href="!#" target="_blank">
                            <img src={facebookIcon} alt="Facebook" />
                        </a>
                    </div>
                    <div className="link">
                        <a href="!#" target="_blank">
                            <img src={twitterIcon} alt="Twitter" />
                        </a>
                    </div>
                    <div className="link">
                        <a href="!#" target="_blank">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                    </div>
                    <div className="link">
                        <a href="!#" target="_blank">
                            <img src={youtubeIcon} alt="Youtube" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideNav;
