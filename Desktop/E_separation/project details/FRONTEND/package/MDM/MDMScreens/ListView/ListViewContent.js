import React, {Component} from "react";
import ListHeader from "./ListHeader";
import ListRenderer from "./ListRenderer";
import ListFooter from "./ListFooter";

/**
 * List view content
 */

export default class ListViewContent extends Component {
    render() {
        return (
            <div className="col-md-12">
                <ListHeader {...this.props} />
                <ListRenderer {...this.props} />
                <ListFooter {...this.props} />
            </div>
        );
    }
}
