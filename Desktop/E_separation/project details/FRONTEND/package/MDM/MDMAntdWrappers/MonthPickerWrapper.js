import React from "react";
import {DatePicker, Form,} from "antd";
import moment from "moment";
import {decoratorTypes} from "../MDMUIConfigs/MDMUIMappings";

const {MonthPicker} = DatePicker;

export default class AndtDMonthPickerWrapper extends React.Component {

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
        if (this.props.hasOwnProperty("onChangeMonth")) {
            this.props.onChangeMonth(this.props.decorator, date, dateString)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: moment(this.props.editFormData[this.props.decorator], this.props.monthFormatList),
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
                <MonthPicker className="width100Perc"
                             onChange={this.onChange}
                             format={this.props.monthFormatList}/>
            </Form.Item>
        );
    }
}
