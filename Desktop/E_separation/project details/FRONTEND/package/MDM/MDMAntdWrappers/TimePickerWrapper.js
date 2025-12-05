import React from "react";
import {Form, TimePicker,} from "antd";
import moment from "moment";
import {decoratorTypes} from "../MDMUIConfigs/MDMUIMappings";

export default class AndtDTimePickerWrapper extends React.Component {

    onChange = (time, timeString) => {
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: timeString,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: timeString,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeTime")) {
            this.props.onChangeTime(this.props.decorator, time, timeString)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: moment(this.props.editFormData[this.props.decorator], this.props.timeFormatList),
            });
        }
        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                       validateTrigger="onBlur"
                       rules={[
                           {
                               type: decoratorTypes.object,
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <TimePicker className="width100Perc"
                            onChange={this.onChange}
                            format={this.props.timeFormatList}/>
            </Form.Item>

        );
    }
}

