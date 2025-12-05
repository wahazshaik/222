import React from "react";
import { Form, Input, } from "antd";

export default class AndtDPasswordBoxWrapper extends React.Component {

    onChange = (e) => {
        let value = e.target.value;
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: value,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangePassword")) {
            this.props.onChangePassword(this.props.decorator, value)
        }
    };

    render() {

        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
        }

        return (
            <Form.Item
                name={this.props.decorator}
                label={this.props.label}
                placeholder={this.props.placeholder}
                validateTrigger="onBlur"
                rules={[
                    {
                        required: this.props.required,
                        message: this.props.message,
                    },
                    ...this.props.validators,
                ]}>
                <Input.Password onChange={this.onChange} />
            </Form.Item>

        );
    }
}
