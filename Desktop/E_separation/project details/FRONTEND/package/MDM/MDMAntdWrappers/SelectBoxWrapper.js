import React from 'react';
import {Form, Select} from 'antd';
import {get_dropdown_data_api_call} from '../../COMS/Utils/ApiCommunicaton';
import {APP_NAME} from '../../AppConfigs';
import {apiCall, notificationMessage, notificationTitle, openNotificationType,} from '../MDMUIConfigs/MDMUIMappings';
import {openNotification,} from '../../COMS/NotificationMessageMapping';

const APP = APP_NAME.MASTER;

const {Option} = Select;

export default class AndtDSelectBoxWrapper extends React.Component {

    oneTimeCallFlag = false;
    state = {
        dependencyDropDownFlag: false,
        isDataSet: false,
    };

    componentWillReceiveProps() {
        if (this.oneTimeCallFlag === false) {
            if (this.props.editDataAvailable) {
                this.oneTimeCallFlag = true;
                if (this.props.editFormData.hasOwnProperty(this.props.decorator) && this.props.editFormData[this.props.decorator] !== null && this.props.editFormData[this.props.decorator] !== "null") {
                    this.onChangeSelectBox(this.props.editFormData[this.props.decorator][this.props.primary_key_field]);
                }
            }
        }
    }

    onChangeSelectBox = (value, event) => {
        if (value !== undefined) {
            if (this.props.editDataAvailable && this.props.primary_key_field) {
                Object.defineProperty(this.props.editFormData[this.props.decorator], this.props.primary_key_field, {
                    value: value,
                    writable: true,
                });
            } else if (this.props.editDataAvailable) {
                Object.defineProperty(this.props.editFormData, this.props.decorator, {
                    value: value,
                    writable: true,
                });
            }
        }
        if (this.props.dropdown_dependent_field) {
            this.props.dropdown_dependent_field.forEach((item) => {
                get_dropdown_data_api_call(APP, item.apiCall + apiCall.listViewCall + apiCall.dropDownCall + "&" + this.props.decorator + "=" + value)
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            openNotification(
                                openNotificationType.error,
                                notificationTitle.permissions,
                                notificationMessage.nopermissions
                            );
                            this.props.onBackPressed();
                        }
                    })
                    .then(dropdownData => {
                        this.props.setDropDownValue(item.apiCall, dropdownData)
                    });
            })
        }
        try {
            this.props.form.setFieldsValue({
                [this.props.decorator]: value,
            });
        } catch {
        }
        if (this.props.hasOwnProperty("onChangeSelect")) {
            this.props.onChangeSelect(this.props.decorator, value, event)
        }
    };

    render() {
        if (!this.state.dependencyDropDownFlag && this.props.dropdown_dependent_field && this.props.editDataAvailable) {
            this.onChangeSelectBox(this.props.editFormData[this.props.decorator][this.props.primary_key_field]);
            this.setState({dependencyDropDownFlag: true,});
        }
        let listItems = [];
        if (this.props.options != null) {
            let validFlag = false;
            this.props.options.forEach((item) => {
                if (item[this.props.primary_key_field] === this.props.formRef.current.getFieldValue(this.props.decorator)) {
                    validFlag = true;
                }
            });
            if (!validFlag) {
                this.props.formRef.current.setFieldsValue({
                    [this.props.decorator]: null,
                });
            }
            listItems = this.props.options.map((item) => {
                if (item[this.props.primary_key_field]) {
                    return (
                        <Option
                            key={item[this.props.primary_key_field]}
                            value={item[this.props.primary_key_field]}
                        >
                            {item[this.props.foreign_table_attribute_name]}
                        </Option>
                    );
                } else {
                    return Object.entries(item).map(([key, value]) => {
                        return (
                            <Option key={key} value={value}>
                                {value}
                            </Option>
                        );
                    });
                }
            });
        }
        let form = this.props.formRef.current;
        if (form !== null) {
            if (this.props.editDataAvailable) {
                if (this.props.primary_key_field) {
                    if (this.props.editFormData.hasOwnProperty(this.props.decorator) && this.props.editFormData[this.props.decorator] !== null && this.props.editFormData[this.props.decorator] !== "null") {
                        form.setFieldsValue({
                            [this.props.decorator]: this.props.editFormData[this.props.decorator][this.props.primary_key_field],
                        });
                    }
                } else {
                    form.setFieldsValue({
                        [this.props.decorator]: this.props.editFormData[this.props.decorator],
                    });
                }
            } else {
                if (this.props.defaultValue) {
                    form.setFieldsValue({
                        [this.props.decorator]: this.props.defaultValue,
                    });
                }
            }
        }
        if (this.props.options != null && this.props.primary_key_field) {
            let selectedOptionValidFlag = false;
            this.props.options.forEach((item) => {
                if (item[this.props.primary_key_field] === this.props.formRef.current.getFieldValue(this.props.decorator)) {
                    selectedOptionValidFlag = true;
                }
            });
            if (!selectedOptionValidFlag) {
                this.props.formRef.current.setFieldsValue({[this.props.decorator]: null,});
                if (this.props.options.length === 1) {
                    this.props.formRef.current.setFieldsValue({
                        [this.props.decorator]: this.props.options[0][this.props.primary_key_field],
                    });

                    if (this.props.onChangeSelect) {
                        this.props.onChangeSelect(
                            this.props.decorator,
                            this.props.options[0][this.props.primary_key_field],
                            null);
                    }
                }
            }
            try {
                if (this.props.options.length === 1 && !this.state.isDataSet) {
                    this.setState({isDataSet: true}, () => {
                        try {
                            this.props.formRef.current.setFieldsValue({
                                [this.props.decorator]: this.props.options[0][this.props.primary_key_field],
                            });
                        } catch (e) {
                        }
                    });

                }
            } catch (e) {
            }
        }
        return (
            <Form.Item
                name={this.props.decorator}
                label={this.props.label}
                rules={[
                    {
                        required: this.props.required,
                        message: this.props.message,
                    },
                    ...this.props.validators,
                ]}
            >
                <Select
                    onChange={this.onChangeSelectBox}
                    disabled={this.props.disabled}
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

