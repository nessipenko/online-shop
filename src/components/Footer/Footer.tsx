import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import fb from '../../assets/icons/socials/fb.svg'
import insta from '../../assets/icons/socials/inst.svg'
import twitter from '../../assets/icons/socials/twitter.svg'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className='footer__title'>
                    <Link to='/'>
                        Nova Nexus
                    </Link>
                </div>
                <div className="footer__wrapper">
                    <div className="footer__nav">
                        <div className="footer__nav_title">
                            About us
                        </div>
                        <ul className='footer__nav_items'>
                            <li className='footer__nav_item'><Link to="#">About Us</Link></li>
                            <li className='footer__nav_item'><Link to="#">Contact Us</Link></li>
                            <li className='footer__nav_item'><Link to="#">Privacy Policy</Link></li>
                            <li className='footer__nav_item'><Link to="#">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="footer__nav">
                        <div className="footer__nav_title">
                            Company
                        </div>
                        <ul className='footer__nav_items'>
                            <li className='footer__nav_item'><Link to="#">Explore World</Link></li>
                            <li className='footer__nav_item'><Link to="#">Trending Video</Link></li>
                            <li className='footer__nav_item'><Link to="#">Book a Trip</Link></li>
                            <li className='footer__nav_item'><Link to="#">Visit Gallery</Link></li>
                        </ul>
                    </div>

                    <div className="footer__nav">
                        <div className="footer__nav_title">
                            USEFUL LINKS
                        </div>
                        <ul className='footer__nav_items'>
                            <li className='footer__nav_item'><Link to="#">Buy this theme</Link></li>
                            <li className='footer__nav_item'><Link to="#">Drile Landing</Link></li>
                            <li className='footer__nav_item'><Link to="#">Documentation</Link></li>
                            <li className='footer__nav_item'><Link to="#">Video tutorial</Link></li>
                        </ul>
                    </div>
                    <div className="footer__nav">
                        <div className="footer__nav_title">
                            FOLLOW US
                        </div>
                        <ul className='footer__nav_items'>
                            <li className='footer__nav_item'><img src={fb} alt="" /><Link to="#">Facebook</Link></li>
                            <li className='footer__nav_item'><img src={twitter} alt="" /><Link to="#">Twitter</Link></li>
                            <li className='footer__nav_item'><img src={insta} alt="" /><Link to="#">Instagram</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                © Copyright 2024 | nova nexus | All right reserved.
            </div>
        </footer>
    )
}

export default Footer