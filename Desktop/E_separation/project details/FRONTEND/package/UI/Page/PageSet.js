import React from "react";
import PropTypes from "prop-types";
import dynamicPage from "./Page";
import {Route, withRouter} from "react-router-dom"; // Sends all routing details specified in Route to local history
import WrappedFormView from "../../MDM/MDMScreens/FormView/FormView";
import ListView from "../../MDM/MDMScreens/ListView/ListView";
import PageContentBoxTitle from "./PageContentBoxTitle";
import {route_url as routeUrl} from '../../AppConfigs'
import {rbac_component_router_mapping} from '../../RBAC/Config/RBACScreenRouters'

const route_url = routeUrl.url + "/";

/**
 * Page Layout
 * @param {screens} : Content details of each every display page need to be displayed
 * @param {section} : Each section in screen object
 * @param {screen.type} : Base on screen type creating route
 * @param {routers} : Routing Details for each screen
 * @param {Route} : Multiple routes details for each master screen
 * @param {component} : Mapping related component for each route
 * @param {dynamicPage} : HOC to map route with related component
 * @param {component_router_mapping} : Custom component mapping based on screen name
 * @param {PageContentBoxTitle} : Title being displayed
 */

class PageSet extends React.Component {
    // export default class PageSet extends React.Component {
    static get propTypes() {
        return {
            screens: PropTypes.any,
        };
    }

    render() {
        const routers = [];
        // routers.push(<Route exact path={route_url + "dashboard"} component={Dashboard} />)
        this.props.screens.forEach(section => {
            section.screens.forEach(screen => {
                if (this.props.routes && this.props.routes().hasOwnProperty(screen.screen)) {
                    const custom_routes = this.props.routes();
                    custom_routes[screen.screen].routers.forEach((router) => {
                        routers.push(router);
                    });
                } else if (screen.type === "master") {
                    routers.push(<Route replace path={route_url + screen.screen + "/new"} key={screen.screen + "new"}
                                        component={dynamicPage(WrappedFormView)}/>);
                    routers.push(<Route exact path={route_url + screen.screen} key={screen.screen}
                                        component={ListView}/>);
                    if(process.env.REACT_APP_PROJECT_ROUTE==="/null"){
                        if (this.props.location.pathname.substr(1).split("/")[1] !== "new") {
                            routers.push(<Route exact
                                                path={route_url + screen.screen + "/" + this.props.location.pathname.substr(1).split("/")[1]}
                                                key={screen.screen + "edit"}
                                                component={dynamicPage(WrappedFormView, {edit: true})}/>);
                        }
                    }else{
                        if (this.props.location.pathname.substr(1).split("/")[2] !== "new") {
                            routers.push(<Route exact
                                                path={route_url + screen.screen + "/" + this.props.location.pathname.substr(1).split("/")[2]}
                                                key={screen.screen + "edit"}
                                                component={dynamicPage(WrappedFormView, {edit: true})}/>);
                        }
                    }
                    
                }
                if (rbac_component_router_mapping.hasOwnProperty(screen.screen)) {
                    rbac_component_router_mapping[screen.screen].routers.forEach((router) => {
                        routers.push(router);
                    });
                }
            });
        });

        return (
            <div>
                <div className="container-fluid main-container">
                    <div className="row">
                        <div className="col-md-12 view-container">
                            <div className="mainDiv">
                                <div className="panel panel-default">
                                    <PageContentBoxTitle {...this.props} />
                                    <div className="panel-body">
                                        {routers}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PageSet)