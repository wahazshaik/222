import React from "react";

/**
 * Higher Order Check Box Component to bind required component at run time
 */

function MDMCheckBoxWrapper(DynamicComponent) {
    return class CheckBox extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMCheckBoxWrapper;