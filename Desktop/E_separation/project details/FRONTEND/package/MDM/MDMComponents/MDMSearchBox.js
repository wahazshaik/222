import React from "react";

/**
 * Higher Order Text Box Component to bind required component at run time
 */

function MDMSearchBoxWrapper(DynamicComponent) {
    return class SearchBox extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMSearchBoxWrapper;