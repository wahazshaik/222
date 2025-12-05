import React from "react";

/**
 * Higher Order Password Box Component to bind required component at run time
 */

function MDMPasswordBoxWrapper(DynamicComponent) {
    return class Password extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMPasswordBoxWrapper;