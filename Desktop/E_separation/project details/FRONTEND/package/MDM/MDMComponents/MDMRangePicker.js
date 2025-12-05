import React from "react";

/**
 * Higher Order Range Picker Component to bind required component at run time
 */

function MDMRangePickerWrapper(DynamicComponent) {
    return class RangePicker extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMRangePickerWrapper;