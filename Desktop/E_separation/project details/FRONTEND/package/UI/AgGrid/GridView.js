import React from "react";

/**
 * Higher Order Grid View Component to bind required component at run time
 */

function GridViewHOC(DynamicComponent) {
    return class GridView extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default GridViewHOC;