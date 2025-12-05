import React from "react";

/**
 * Higher Order Text Area Component to bind required component at run time
 */

function MDMTextAreaWrapper(DynamicComponent) {
    return class TextArea extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMTextAreaWrapper;