import React from "react";

/**
 * Higher Order Select Box Component to bind required component at run time
 */

function MDMMultipleAddFieldWrapper(DynamicComponent) {
    return class MultiAddField extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMMultipleAddFieldWrapper;