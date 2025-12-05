import React from "react";

/**
 * Higher Order Component to bind required component at run time
 */

function dynamicPage(DynamicComponent, ...props) {
    return class Page extends React.Component {
        render() {
            return (
                <DynamicComponent {...this.props} />
            );
        }
    };

}

export default dynamicPage;
