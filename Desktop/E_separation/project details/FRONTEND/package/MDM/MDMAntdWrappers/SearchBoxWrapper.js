import React from "react";
import {Form, Input,} from "antd";

const {Search} = Input;

export default class AndtDSearchBoxWrapper extends React.Component {

    onChange = (event) => {
        const value = event.target.value;
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: value,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeSearch")) {
            this.props.onChangeSearch(this.props.decorator, value)
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
                label={
                    this.props.label
                }
                validateTrigger="onBlur"
                rules={[
                    {
                        required: this.props.required,
                        message: this.props.message,
                    },
                    ...this.props.validators
                ]}
            >
                <Search
                    disabled={this.props.disabled}
                    onSearch={this.props.onSearch}
                    onChange={this.onChange}
                    enterButton
                    placeholder={this.props.placeholder}
                />
            </Form.Item>
        );
    }
}
