import React from "react";
import PageSet from "../Page/PageSet";
import {withRouter} from "react-router-dom";
import {Breadcrumb} from "antd";

/**
 * Container for ContentPane
 * @param {Header} : Project title and navbar toggle button
 * @param {PageSet} : All working part displayed over here
 */
class ContentPane extends React.Component {

    capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    breadCrumbs = () => {
        const routes = this.props.location.pathname.split("/");
        if (routes.length > 1) {
            routes.shift();
        }
        const main_route = this.capitalizeFirstLetter(routes[0]);
        routes.shift();
        return (
            <Breadcrumb>
                <Breadcrumb.Item key={"main_route"}>
                    <span>{main_route}</span>
                </Breadcrumb.Item>
                {routes.map((route, index) => {
                    return (
                        <Breadcrumb.Item key={index}>
                            <span
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    this.props.history.replace(
                                        "/" + main_route.toUpperCase() + "/" + route
                                    );
                                }}
                            >
                                {route}
                            </span>
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        )
    };

    render() {

        return (
            <div>
                <div className="content-pane">
                    {this.breadCrumbs()}
                </div>
                <div className="page-content-wrapper">
                    <PageSet {...this.props} />
                </div>
            </div>
        );
    }
}

export default withRouter(ContentPane);
