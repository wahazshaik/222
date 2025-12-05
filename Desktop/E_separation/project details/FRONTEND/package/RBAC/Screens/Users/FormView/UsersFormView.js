import React, {Component} from "react";
import CustomUsers from "./CustomUsers";
import DjangoUsers from "./DjangoUsers";

class UsersFormView extends Component {
    render() {
        return process.env.REACT_APP_RBAC_USERPROFILE_CHECK ? (
            <CustomUsers {...this.props} />
        ) : (
            <DjangoUsers {...this.props} />
        );
    }
}

export default UsersFormView;
