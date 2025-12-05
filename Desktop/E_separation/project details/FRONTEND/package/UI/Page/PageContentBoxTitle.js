import React from "react";
import PropTypes from "prop-types";

/**
 * Title Details
 */
function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

class PageContentBoxTitle extends React.Component {
    static get propTypes() {
        return {
            pageTitleName: PropTypes.any,
        };
    }

    render() {
        return (
            <div className="panel-heading">
                <div className="panel-title">
                    <p className="title-name">&nbsp;{capitalize(this.props.pageTitleName)}</p>
                </div>
            </div>

        );
    }

}

export default PageContentBoxTitle;