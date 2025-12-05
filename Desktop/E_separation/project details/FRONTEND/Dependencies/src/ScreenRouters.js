import React from "react";
import {Route} from "react-router-dom";
// import CapexForm from './capex/CapexForm'
// import CapexList from './capex/CapexList'

/**
 * Custom component mapping
 * @param {component} : Component being mapped
 * @param {routers} : Creating route for a component specified with route link
 */
function getRoutes() {
    return ({
        // "CapexForm": {
        //     component: CapexForm,
        //     routers: [<Route path="/app/CapexForm/" component={CapexForm}/>],
        // },
        // "CapexList": {
        //     component: CapexList,
        //     routers: [<Route path="/app/CapexList/" component={CapexList}/>],
        // }
    })
}

export default getRoutes;