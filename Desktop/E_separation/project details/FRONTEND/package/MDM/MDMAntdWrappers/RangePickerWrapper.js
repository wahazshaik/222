import React from "react";
import {DatePicker, Form,} from "antd";
import moment from "moment";
import {decoratorTypes} from "../MDMUIConfigs/MDMUIMappings";

const {RangePicker} = DatePicker;

export default class AndtDRangePickerWrapper extends React.Component {

    onChange = (dates, dateStrings) => {
        if (dateStrings.length <= 1) {
            return;
        }
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: dateStrings,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: dateStrings,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeRange")) {
            this.props.onChangeRadio(this.props.decorator, dates, dateStrings)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]:
                    [
                        moment(this.props.editFormData[this.props.decorator][0], this.props.rangeFormatList),
                        moment(this.props.editFormData[this.props.decorator][1], this.props.rangeFormatList)
                    ],
            });
        }
        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                       validateTrigger="onBlur"
                       rules={[
                           {
                               type: decoratorTypes.array,
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <RangePicker className="width100Perc"
                             onChange={this.onChange}
                             picker={this.props.pickerType}
                             format={this.props.rangeFormatList}/>
            </Form.Item>

        );
    }
}

