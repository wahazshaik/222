import React from "react";
import {Checkbox, Form,} from "antd";

export default class AndtDCheckBoxGroupWrapper extends React.Component {

    onChange = (e) => {
        let value = e.target.checked;
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: value,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeCheckbox")) {
            this.props.onChangeCheckbox(this.props.decorator, value)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
        }
        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                       className="marginBottom0" valuePropName={this.props.valuePropName}
                       validateTrigger="onBlur"
                       rules={[
                           {
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <Checkbox onChange={this.onChange}>
                    {this.props.value}
                </Checkbox>
            </Form.Item>

        );
    }
}