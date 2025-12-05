import React from "react";

/**
 * Higher Order Number Box Component to bind required component at run time
 */

function MDMNumberBoxWrapper(DynamicComponent) {
    return class NumberBox extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMNumberBoxWrapper;