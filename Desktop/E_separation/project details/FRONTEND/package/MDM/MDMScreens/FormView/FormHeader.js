import React, {Component} from "react";
import {Button, Form} from "antd";

class FormHeader extends Component {

    state = {
        status: "",
        hideAction: true,
    };

    getMenuBar = () => {
        return (
            <div className={"form_header"}>
                <Button
                    hidden={this.props.hasOwnProperty("showBackButton") ? !this.props.showBackButton : true}
                    onClick={() => this.props.onBackPressed()}
                    style={{float: "left"}}
                    className="login-form-button">
                    Back
                </Button>
                <Form.Item style={{float: "right"}}
                           hidden={this.props.hasOwnProperty("showSaveButton") ? !this.props.showSaveButton : true}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Save
                    </Button>
                </Form.Item>
                <Form.Item style={{float: "right"}}>
                    <Button
                        type="link"
                        hidden={this.props.editDataAvailable}
                        onClick={() => {
                            this.props.onResetFields
                            ?this.props.onResetFields()
                            :this.props.formRef.current.resetFields()
                        }}
                        className="login-form-button">
                        Clear
                    </Button>
                </Form.Item>
            </div>)
    };

    render() {
        let menubar = null;
        if (!window.location.pathname.includes("ApprovalForm")) {
            menubar = this.getMenuBar()
        }
        return (
            menubar
        );
    }
}

export default FormHeader;
