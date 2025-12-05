import React from "react";
import {Form, InputNumber,} from "antd";
import {decoratorTypes, fieldErrorMessage} from "../MDMUIConfigs/MDMUIMappings";

export default class AndtDNumberBoxWrapper extends React.Component {

    onChange = (value) => {
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: value,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeNumber")) {
            this.props.onChangeNumber(this.props.decorator, value)
        }
    };

    putDecimalLimit = (e) => {
        let input = "" + e;
        if (input.includes(".") && this.props.decimalLimit) {
            let inputArr = input.split(".");
            if (inputArr[1].length > this.props.decimalLimit) {
                inputArr[1] = inputArr[1].substr(0, this.props.decimalLimit);
                e = inputArr.join(".");
                return parseFloat(e)
            }
            return e
        }
        return e
    };

    render() {

        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: parseFloat(this.props.editFormData[this.props.decorator]),
            });
        }

        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                       validateTrigger="onBlur"
                       rules={[
                           {
                               type: decoratorTypes.number,
                               message: fieldErrorMessage.numberMessage,
                           },
                           {
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <InputNumber
                    parser={value => {
                        return this.putDecimalLimit(value)
                    }}
                    onChange={this.onChange}
                    min={this.props.min}
                    max={this.props.max}
                    disabled={this.props.disabled}
                    step={this.props.step}
                    style={{width: "100%"}}
                    placeholder={this.props.placeholder}
                    minLength={this.props.minlength}
                    maxLength={this.props.maxlength}
                />
            </Form.Item>

        );
    }
}
