import React from "react";

/**
 * Higher Order Email Box Component to bind required component at run time
 */

function MDMMultiSelectBoxWrapper(DynamicComponent) {
    return class MultiSelectBox extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMMultiSelectBoxWrapper;