import React from "react";
import {DatePicker, Form,} from "antd";
import moment from "moment";
import {decoratorTypes} from "../MDMUIConfigs/MDMUIMappings";

export default class AndtDDatePickerWrapper extends React.Component {

    onChange = (date, dateString) => {
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: dateString,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: dateString,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeDate")) {
            this.props.onChangeDate(this.props.decorator, date, dateString)
        }
    };

    render() {
        if (this.props.editDataAvailable && this.props.editFormData[this.props.decorator]!==null) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: moment(this.props.editFormData[this.props.decorator], this.props.dateFormatList),
            });
        }
        return (

            <Form.Item name={this.props.decorator} label={this.props.label}
                       rules={[
                           {
                               type: decoratorTypes.object,
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <DatePicker 
                    disabled={this.props.disabled}
                    disabledDate={this.props.disabledDate}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder} 
                    className="width100Perc"
                    format={this.props.dateFormatList}
                />
            </Form.Item>

        );
    }
}
