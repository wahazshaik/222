import React from "react";
import {Form, Select} from "antd";

const {Option} = Select;

export default class AndtDMultipleSelectBoxWrapper extends React.Component {

    onSelect = (value) => {
        if (this.props.editDataAvailable) {
            let oldValue = this.props.editFormData[this.props.decorator];
            oldValue.push(value);
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: oldValue,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onSelectMultiSelect")) {
            this.props.onSelectMultiSelect(this.props.decorator, value)
        }
    };

    onDeselect = (value) => {
        if (this.props.editDataAvailable) {
            let oldValue = this.props.editFormData[this.props.decorator];
            oldValue.map((item, index) => {
                if (item === value) {
                    oldValue.splice(index, 1);
                }
                return null;
            });
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: oldValue,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onDeselectMultiSelect")) {
            this.props.onDeselectMultiSelect(this.props.decorator, value)
        }
    };

    render() {
        let listItems = [];
        if (
            this.props.editDataAvailable &&
            this.props.editFormData[this.props.decorator]
        ) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
            listItems = this.props.editFormData[this.props.decorator].map((value) => {
                return (
                    <Option key={value} value={value}>
                        {value}
                    </Option>
                );
            });

        }

        return (
            <Form.Item
                name={this.props.decorator}
                label={this.props.label}
                validateTrigger="onBlur"
                rules={[
                    {
                        required: this.props.required,
                        message: this.props.message,
                    },
                    ...this.props.validators,
                ]}
            >
                <Select
                    onSelect={this.onSelect}
                    onDeselect={this.onDeselect}
                    mode="multiple"
                    placeholder={this.props.placeholder}
                    showSearch
                    optionFilterProp="children"
                >
                    {listItems}
                </Select>
            </Form.Item>
        );
    }
}
