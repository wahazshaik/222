import React from "react";

/**
 * Higher Order CheckBox Group Component to bind required component at run time
 */

function MDMCheckBoxGroupWrapper(DynamicComponent) {
    return class CheckBoxGroup extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMCheckBoxGroupWrapper;