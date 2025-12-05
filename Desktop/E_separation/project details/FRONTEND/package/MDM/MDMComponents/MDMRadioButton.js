import React from "react";

/**
 * Higher Order Radio Button Component to bind required component at run time
 */

function MDMRadioButtonWrapper(DynamicComponent) {
    return class RadioButton extends React.Component {
        render() {
            return <DynamicComponent {...this.props} />;
        }
    };
}

export default MDMRadioButtonWrapper;