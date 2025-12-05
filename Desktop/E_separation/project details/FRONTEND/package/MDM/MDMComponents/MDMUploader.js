import React from "react";

/**
 * Higher Order Text Box Component to bind required component at run time
 */

function MDMUploadWrapper(DynamicComponent) {
    return class Uploader extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMUploadWrapper;