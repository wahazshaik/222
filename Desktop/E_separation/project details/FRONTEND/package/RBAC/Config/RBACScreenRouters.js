import React from "react";
import {Route, Switch} from "react-router-dom";

import Users from "../Screens/Users/ListView/Users";
import UsersFormView from "../Screens/Users/FormView/UsersFormView";
import Groups from "../Screens/Groups/ListView/Groups";
import GroupsForm from "../Screens/Groups/FormView/GroupsForm";
import Permissions from "../Screens/Permissions/ListView/Permissions";

const app = `${process.env.REACT_APP_PROJECT_ROUTE}`;

export const rbac_component_router_mapping = {
    Groups: {
        component: Groups,
        routers: [
            <Switch>
                <Route exact path={`${app}/Groups`} component={Groups}/>
                <Route exact path={`${app}/Groups/new`} component={GroupsForm}/>
                <Route
                    exact
                    path={`${app}/Groups/:groupname`}
                    component={GroupsForm}
                />
            </Switch>,
        ],
    },
    Users: {
        component: Users,
        routers: [
            <Switch>
                <Route exact path={`${app}/Users`} component={Users}/>
                <Route exact path={`${app}/Users/new`} component={UsersFormView}/>
                <Route exact path={`${app}/Users/:username`} component={UsersFormView}/>
            </Switch>,
        ],
    },
    Permissions: {
        component: Permissions,
        routers: [
            <Switch>
                <Route exact path={`${app}/Permissions`} component={Permissions}/>
            </Switch>,
        ],
    },
};
