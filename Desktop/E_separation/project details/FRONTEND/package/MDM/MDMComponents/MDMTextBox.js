import React from "react";

/**
 * Higher Order Text Box Component to bind required component at run time
 */

function MDMTextBoxWrapper(DynamicComponent) {
    return class TextBox extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMTextBoxWrapper;