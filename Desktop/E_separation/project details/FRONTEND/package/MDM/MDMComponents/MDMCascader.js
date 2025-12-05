import React from "react";

/**
 * Higher Order Check Box Component to bind required component at run time
 */

function MDMCascaderWrapper(DynamicComponent) {
    return class Cascader extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMCascaderWrapper;