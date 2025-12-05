import React from "react";
import SideBarNavbar from "./NavBar/SideBarNavbar";
import ContentPane from "./Content/ContentPane";
// import NotificationDrawer from './Notifications/NotificationDrawer'
import {apiCall, APP_NAME, screenRootNotificationData, settings,} from "../AppConfigs";
import {options_main_api_call} from "../COMS/Utils/ApiCommunicaton";
import {openNotification} from "../COMS/NotificationMessageMapping";
import FormLoader from "../MDM/MDMScreens/FormView/FormLoader";
import Modal from "react-bootstrap/Modal";
import {withRouter} from "react-router-dom";
/**
 * Main Screen Layout
 * @param {App} : App name for api call
 * @param {condition} : On base of condition value toggle data
 * @param {screens} : Data to be used for dynamic navbar creations and routing
 * @param {pageTitleName} : Content page header name
 */

const APP = APP_NAME.MASTER;

class ScreenRoot extends React.Component {
    state = {
        screens: [],
        pageTitleName: null,
        showProgressModal: false,
    };

    componentWillMount() {
        if (this.props.location.pathname.includes("ApprovalForm")) {
            localStorage.setItem("approval-authorization", this.props.location.pathname.split("/")[3]);
        }
    }

    /* Changing title of content pane on header on link change */
    changePageTitle = (e) => {
        this.setState({pageTitleName: e});
    }

    componentDidMount() {
        this.setState({showProgressModal: true}, () => {
            options_main_api_call(APP, apiCall.screenRootOptionCall)
                .then((res) => {
                    if (res.ok) {
                        res.json().then((screens) => {
                            this.setState({screens}, () => {
                                this.setState({showProgressModal: false});
                            });
                        });
                    } else {
                        if (res.status === 401){
                            localStorage.clear();
                            openNotification(
                                "error",
                                "LOGIN EXPIRED",
                                "Your session has expired. Please login again"
                            )
                            setTimeout(() => {
                                window.location = process.env.REACT_APP_PROJECT_ROUTE==="/null"?"/":process.env.REACT_APP_PROJECT_ROUTE
                            }, 2500);
                        } else {
                            openNotification(
                                screenRootNotificationData.messageType,
                                screenRootNotificationData.messageTitle,
                                screenRootNotificationData.message
                            );
                        }
                    }
                }).catch(() => {
                openNotification(
                    screenRootNotificationData.messageType,
                    screenRootNotificationData.messageTitle,
                    screenRootNotificationData.message
                );
            });
        });
    }

    render() {
        return (
            <div id="wrapper">
                <Modal show={this.state.showProgressModal} centered>
                    <Modal.Body>
                        <FormLoader source={"Modal"} loading={true}/>
                        <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18px"}}>
                            {"Loading, Please wait.."}
                        </p>
                    </Modal.Body>
                </Modal>
                <SideBarNavbar
                    screens={this.state.screens}
                    toggleNavigation={this.props.toggleNavigation}
                    changePageTitle={this.changePageTitle}
                />
                <ContentPane
                    routes={this.props.routes}
                    navToggle={this.navToggle}
                    pageTitleName={this.state.pageTitleName}
                    appTitle={settings.appTitle}
                    screens={this.state.screens}
                    changePageTitle={this.changePageTitle}
                />
                {/* <NotificationDrawer 
                    notificationToggle={this.props.notificationToggle}
                    toggleNotification={this.props.toggleNotification}
                /> */}
               
            </div>
        );
    }
}

export default withRouter(ScreenRoot);
