import React from "react";
import {Form,} from "antd";
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default class AndtDRichTextAreaWrapper extends React.Component {
    state = {
        data: "",
        oneTimeDataSet: false,
    };

    setData = () => {
        if (!this.state.oneTimeDataSet) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
            this.setState({data: this.props.editFormData[this.props.decorator], oneTimeDataSet: true});
        }
    };

    onChange = (e) => {
        let value = e.editor.getData();
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: value,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeRichText")) {
            this.props.onChangeRichText(this.props.decorator, value)
        }
    };

    render() {
        if (this.props.editDataAvailable && this.props.editFormData[this.props.decorator]) {
            this.setData()
        }
        return (
            <Form.Item name={this.props.decorator} label={this.props.label}
                       validateTrigger="onBlur"
                       rules={[
                           {
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <CKEditor
                    type={this.props.editorType}
                    readOnly={this.props.disabled}
                    data={this.state.data}
                    onChange={this.onChange}>

                </CKEditor>
            </Form.Item>
        );
    }
}