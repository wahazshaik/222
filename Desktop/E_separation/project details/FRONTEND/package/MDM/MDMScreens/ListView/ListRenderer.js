import React, {Component} from "react";
import {component_mapping} from "../../MDMUIConfigs/MDMUIContentMapping";
import {wrapperCall} from "../../MDMUIConfigs/MDMUIMappings";

/**
 * Grid view renderer
 */

export default class ListRenderer extends Component {

    render() {
        return (
            <div>
                {React.createElement(
                    component_mapping[wrapperCall.gridView],
                    {...this.props,}
                )}
            </div>
        );
    }
}
