import React from "react";
import amns from '../../assets/images/amns.jpg'


class NavbarLogo extends React.Component {

    home = () => {
        window.location.href = process.env.REACT_APP_PROJECT_ROUTE==="/null"?"/":process.env.REACT_APP_PROJECT_ROUTE;
    };

    render() {
        return (
            <div className="logo-amns">
                <img src={amns} alt="" onClick={this.home}/>
            </div>
        );
    }
}

export default NavbarLogo