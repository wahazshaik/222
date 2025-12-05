import React, {Component} from "react";

export default class FormLoader extends Component {
    render() {
        return (
            <div hidden={!this.props.loading} style={{
                margin: "5%",
                textAlign: "center",
                display: "flow-root",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div hidden={this.props.source === "Modal"}><p>Please wait..</p></div>
            </div>
        );
    }
}
