import React from 'react';
import './LoadingIndicator.css'
import Logo from './images/amns-trnsparent-logo.png'

export default function LoadingIndicator() {
    return (
        <div className="overlay">
            <div className="customStyles"/>
            <img src={Logo} alt="Logo" className="logo"/>
        </div>
    )
}