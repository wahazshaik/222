import React from "react";
import {Form, Input,} from "antd";

export default class AndtDTextBoxWrapper extends React.Component {

    setData = () => {
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: this.props.editFormData[this.props.decorator],
        });
    };

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
        if (this.props.hasOwnProperty("onChangeText")) {
            this.props.onChangeText(this.props.decorator, value)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.setData()
        }
        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                       validateTrigger="onBlur"
                       rules={[
                           {
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <Input
                    minLength={this.props.minlength}
                    maxLength={this.props.maxlength}
                    style={(this.props.casetype && this.props.casetype === "uppercase") ? {textTransform: "uppercase"} : null}
                    disabled={this.props.disabled}
                    onChange={this.onChange}
                    placeholder={this.props.placeholder}/>
            </Form.Item>
        );
    }
}
