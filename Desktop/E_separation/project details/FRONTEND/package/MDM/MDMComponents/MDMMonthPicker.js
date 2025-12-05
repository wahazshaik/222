import React from "react";

/**
 * Higher Order Month Picker Component to bind required component at run time
 */

function MDMMonthPickerWrapper(DynamicComponent) {
    return class MonthPicker extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMMonthPickerWrapper;