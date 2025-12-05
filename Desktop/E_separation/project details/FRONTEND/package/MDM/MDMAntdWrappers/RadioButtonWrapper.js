import React from "react";
import {Form, Radio, Space} from "antd";
import {decoratorTypes} from "../MDMUIConfigs/MDMUIMappings";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

export default class AndtDRadioButtonWrapper extends React.Component {
    state = {
        data: [],
        oneTimeSetData: true,
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
        if (this.props.hasOwnProperty("onChangeRadio")) {
            this.props.onChangeRadio(this.props.decorator, value)
        }
    };

    setData = () => {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: capitalize(
                    this.props.editFormData[this.props.decorator].toString()
                ),
            });
        } else {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: "True",
            });
        }
    };

    render() {
        let form = this.props.formRef.current;
        if ((form !== null && this.props.source === "master") || this.props.editDataAvailable) {
            this.setData();
        }

        let listItems = [];
        if (this.props.options != null) {
            listItems = this.props.options.map((item) => {
                if (item.id) {
                    if (this.props.radioType === decoratorTypes.button) {
                        return (
                            <Radio.Button key={item.id} value={item.value}>
                                {item.name}
                            </Radio.Button>
                        );
                    } else {
                        return (
                            <Radio key={item.id} value={item.value}>
                                {item.name}
                            </Radio>
                        );
                    }
                } else {
                    return Object.entries(item).map(([key, value]) => {
                        if (this.props.radioType === decoratorTypes.button) {
                            return (
                                <Radio.Button key={key} value={key}>
                                    {value}
                                </Radio.Button>
                            );
                        } else {
                            return (
                                <Radio key={key} value={key}>
                                    {value}
                                </Radio>
                            );
                        }
                    });
                }
            });
        }

        return (
            <Form.Item
                name={this.props.decorator}
                label={this.props.label}
                className="radio"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: this.props.required,
                        message: this.props.message,
                    },
                    ...this.props.validators,
                ]}
            >
                <Radio.Group
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                    defaultValue={this.props.defaultValue}
                >
                   <Space direction={this.props.isVertical ? "vertical" : "horizontal"}>
                    {listItems}
                   </Space>
                </Radio.Group>
            </Form.Item>
        );
    }
}
