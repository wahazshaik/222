import React from "react";
import { Form, Input, } from "antd";
import { decoratorTypes, fieldErrorMessage } from "../MDMUIConfigs/MDMUIMappings";

export default class AndtDEmailBoxWrapper extends React.Component {

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
        }
        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                validateTrigger="onBlur"
                rules={[
                    {
                        type: decoratorTypes.email,
                        message: fieldErrorMessage.emailMessage,
                    },
                    {
                        required: this.props.required,
                        message: this.props.message
                    },
                    ...this.props.validators,
                ]}>
                <Input
                    minLength={this.props.minlength}
                    maxLength={this.props.maxLength}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder} />
            </Form.Item>

        );
    }
}