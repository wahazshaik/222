import React from "react";

/**
 * Higher Order Time Picker Component to bind required component at run time
 */

function MDMTimePickerWrapper(DynamicComponent) {
    return class TimePicker extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMTimePickerWrapper;