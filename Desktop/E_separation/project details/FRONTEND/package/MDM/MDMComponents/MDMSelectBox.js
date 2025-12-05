import React from "react";

/**
 * Higher Order Select Box Component to bind required component at run time
 */

function MDMSelectBoxWrapper(DynamicComponent) {
    return class SelectBox extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMSelectBoxWrapper;