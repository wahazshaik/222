import React from "react";
import PropTypes from "prop-types";
import NavbarLogo from '../NavBar/NavbarLogo'
import { Popover } from 'antd';
import { settings, localStorageVariableName } from '../../AppConfigs'
import { withRouter } from "react-router-dom";
import { post_api_logout_call } from '../../COMS/Utils/ApiCommunicaton'
import { openNotification } from "../../COMS/NotificationMessageMapping";
import { notificationMessage, notificationTitle, openNotificationType } from "../../MDM/MDMUIConfigs/MDMUIMappings";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
/**
 * Header Layout
 * @param {toggleNavigation} : Toggle button to change display mode of navbar
 */

class Header extends React.Component {

    static get propTypes() {
        return {
            appTitle: PropTypes.any,
            toggleNavigation: PropTypes.func,
        };
    }

    onLogout = () => {
        const pendingSave = localStorage.getItem(localStorageVariableName.pendingSave);
        if(pendingSave!=="true"){
            this.showLogoutDialog("Are you sure, you want to logout?");
        }else{
            this.showLogoutDialog("You have unsaved changes on this page. Do you want to still want to logout and discard your changes or stay on this page?");
        }
    };

    logout = () => {
        const route_url = process.env.REACT_APP_LOGOUT_ROUTE?
            process.env.REACT_APP_LOGOUT_ROUTE:
            process.env.REACT_APP_PROJECT_ROUTE==="/null"?
            "/":
            process.env.REACT_APP_PROJECT_ROUTE;
        post_api_logout_call()
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then(loginAuth => {
                            localStorage.clear();
                            this.props.history.push({
                                pathname: route_url,
                            });
                            window.location.reload();
                        });
                } else {
                    localStorage.clear();
                    this.props.history.push({
                        pathname: route_url,
                    });
                    window.location.reload();
                    openNotification(openNotificationType.error, notificationTitle.api, notificationMessage.apiConnectionError);
                }
            })
            .catch(() => {
                localStorage.clear();
                this.props.history.push({
                    pathname: route_url,
                });
                window.location.reload();
                openNotification(openNotificationType.error, notificationTitle.api, notificationMessage.apiConnectionError);
            });
    }

    changePassword = () => {
        const route_url = process.env.REACT_APP_PROJECT_ROUTE==="/null"?"":process.env.REACT_APP_PROJECT_ROUTE;
        window.location.href = route_url + "/change-password";
    }

    showLogoutDialog = (message) =>{
        confirm({
            title: message,
            icon: <ExclamationCircleOutlined />,
            onOk: this.logout,
            okText:"Yes",
            cancelText:"No",
            closable: false,
            onCancel() {
            },
          });
    }

    render() {
        return (
            <div className="header">
                <NavbarLogo />
                <p
                    className="btn btn-link"
                    role="button"
                    id="menu-toggle"
                    onClick={() => {
                        if (!window.location.pathname.includes("ApprovalForm")) {
                            this.props.toggleNavigation()
                        }
                    }}
                >
                    <i className="fa fa-bars" />
                </p>
                <h4 className="header-title">{settings.appTitle}</h4>
                
                <Popover
                    placement="bottomRight"
                    content={
                        <div>
                            {localStorage.getItem(localStorageVariableName.isStaff) === "false" ?
                                <p class="headerOptions" onClick={this.changePassword}>Change Password</p> : null}
                            <p class="headerOptions" onClick={this.onLogout}>Logout</p>
                        </div>
                    }
                    
                    trigger="click">
                    <button className="userButton">
                        <i className="fa fa-user-circle" aria-hidden="true" />
                    </button>
                   
                </Popover>
                
                <p className="userButton" style={{marginBottom: 0, marginTop: "7px"}}>{localStorage.getItem(localStorageVariableName.userName)}</p>
                {this.props.headerLinks?this.props.headerLinks():null}
                {localStorage.getItem(localStorageVariableName.showNotificationDrawer) === "true" ?
                <button className="userButton" onClick={()=>this.props.toggleNotification()}>
                    <i className="fa fa-bell" aria-hidden="true" />
                </button>:null}
            </div>
        );
    }
}

export default withRouter(Header)