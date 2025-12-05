import React from "react";

/**
 * Higher Order Date Picker Component to bind required component at run time
 */

function MDMDatePickerWrapper(DynamicComponent) {
    return class DatePicker extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMDatePickerWrapper;