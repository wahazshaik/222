import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import "./MDMApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { route_url } from "./AppConfigs";
import ScreenRoot from "./UI/ScreenRoot";
import Header from "./UI/Header/Header";


export default class MDMApp extends React.Component {

    state = {
        navToggle: false,
        notificationToggle: false,
    };
    isIE = /*@cc_on!@*/false || !!document.documentMode;
    componentDidMount() {
        try {
            if (window.innerWidth < 700) {
                this.toggleNavigation()
            }
            if (window.screen.availWidth > 1024) {
                let content = document.getElementById("wrapper");
                content.style.paddingLeft = "230px";
            }
        } catch {
        }
    }

    toggleNavigation = () => {
        this.setState({ navToggle: !this.state.navToggle }, () => {
            if (window.screen.availWidth > 1024) {
                let content = document.getElementById("wrapper");
                if (this.state.navToggle) {
                    content.style.paddingLeft = "0px";
                } else {
                    content.style.paddingLeft = "230px";

                }
            }
        });

    }

    toggleNotification = () => {
        this.setState({ notificationToggle: !this.state.notificationToggle });
    }

    render() {
        return (
            <div id="navbar" className={this.state.navToggle ? "toggled" : ""} style={this.isIE ? { paddingBottom: "80px" } : {}}>
                <Header toggleNavigation={this.toggleNavigation} toggleNotification={this.toggleNotification} headerLinks={this.props.headerLinks} />
                <Router>
                    <Switch>
                        <Route
                            path={route_url.url}
                            render={() => <ScreenRoot toggleNavigation={this.toggleNavigation} routes={this.props.routes} toggleNotification={this.toggleNotification} notificationToggle={this.state.notificationToggle} />}
                        />
                        <Redirect from={""} to={route_url.url} />
                    </Switch>
                </Router>
                {this.isIE ? <p class="ie-incompaitable">You are using Internet Explorer some functionality and features may not work, please switch to Mozilla Firefox® 16.x or higher, Safari 5.1 or higher, Chrome 23 or higher, Edge 44.x or higher</p> : null}
            </div>
        );
    }
}

