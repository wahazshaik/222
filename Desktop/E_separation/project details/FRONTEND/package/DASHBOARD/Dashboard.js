import React from "react";
import {Select} from "antd";
import Dashlets from "./Dashlets";
import LoadingIndicator from "../COMS/LoadingIndicator/LoadingIndicator";
import {dynamic_dashboard_api_call, options_main_api_call,} from "../COMS/Utils/ApiCommunicaton";
import {apiCall, APP_NAME, screenRootNotificationData} from "../AppConfigs";
import {openNotification} from "../COMS/NotificationMessageMapping";

import "./Dashboard.css";

const APP = APP_NAME.MASTER;
const {Option} = Select;

class Dashboard extends React.Component {
    state = {
        dashletsData: [],
        isLoading: false,
        apps: [],
        screens: [],
    };

    componentDidMount() {
        this.setState({isLoading: true}, () => {
            options_main_api_call(APP, apiCall.screenRootOptionCall)
                .then((res) => {
                    if (res.ok) {
                        res.json().then((screens) => {
                            let Apps = [],
                                AppScreens = [];

                            if (screens.length > 0) {
                                AppScreens = screens.filter(
                                    (s) => Object.keys(s)[0] !== "auto_generation_sections"
                                );

                                Apps = screens.filter(
                                    (s) => Object.keys(s)[0] === "auto_generation_sections"
                                );

                                if (Apps.length > 0) {
                                    Apps = Apps[0]["auto_generation_sections"];
                                } else {
                                    Apps = [];
                                }
                            }

                            this.setState(
                                {isLoading: false, screens: AppScreens, apps: Apps},
                                () => {
                                    if (AppScreens.length > 0) {
                                        this.getDashboardData(AppScreens[0].sectionName);
                                    }
                                }
                            );
                        });
                    } else {
                        openNotification(
                            screenRootNotificationData.messageType,
                            screenRootNotificationData.messageTitle,
                            screenRootNotificationData.message
                        );
                    }
                })
                .catch(() => {
                    openNotification(
                        screenRootNotificationData.messageType,
                        screenRootNotificationData.messageTitle,
                        screenRootNotificationData.message
                    );
                });
        });
    }

    //Function to get dashboard data of particular app
    getDashboardData = (app) => {
        try {
            let AppScreens = this.state.screens.filter((s) =>
                s.sectionName.includes(app)
            );

            if (AppScreens.length === 0) {
                openNotification(
                    screenRootNotificationData.messageType,
                    screenRootNotificationData.messageTitle,
                    screenRootNotificationData.message
                );
                return;
            }

            this.setState({isLoading: true}, () => {
                dynamic_dashboard_api_call(JSON.stringify(AppScreens[0].screens)).then(
                    (response) => {
                        if (response.ok) {
                            response.json().then((responseJson) => {
                                this.setState({
                                    dashletsData: responseJson,
                                    isLoading: false,
                                });
                            });
                        } else {
                            this.setState({isLoading: false});
                            openNotification(
                                screenRootNotificationData.messageType,
                                screenRootNotificationData.messageTitle,
                                screenRootNotificationData.message
                            );
                        }
                    }
                );
            });
        } catch (error) {
            openNotification(
                screenRootNotificationData.messageType,
                screenRootNotificationData.messageTitle,
                screenRootNotificationData.message
            );
        }
    };

    render() {
        const apps = this.state.apps;

        return (
            <>
                {this.state.isLoading && <LoadingIndicator/>}
                <h1 className="h1Style">
                    Dashboard
                    {apps.length > 0 && (
                        <Select
                            className="selectStyle"
                            onChange={this.getDashboardData}
                            defaultValue={apps[0]}
                        >
                            {this.state.apps.map((app) => (
                                <Option value={app}>{app}</Option>
                            ))}
                        </Select>
                    )}
                </h1>

                {this.state.dashletsData.map((dashlets) => (
                    <>
                        <hr/>
                        <p className="location-title"> {dashlets.model} </p>

                        <div className="row dashletsDiv">
                            <div className="marginBottom  col-lg-3">
                                <Dashlets title="Total" value={dashlets.total}/>
                            </div>

                            {dashlets.in_workflow && (
                                <>
                                    <div className="marginBottom  col-lg-3">
                                        <Dashlets title="Approved" value={dashlets.approved}/>
                                    </div>

                                    <div className="marginBottom  col-lg-3">
                                        <Dashlets title="Pending" value={dashlets.pending}/>
                                    </div>

                                    <div className="marginBottom  col-lg-3">
                                        <Dashlets title="Rejected" value={dashlets.rejected}/>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                ))}
            </>
        );
    }
}

export default Dashboard;
