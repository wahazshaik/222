import React from "react";
import {Form, Input,} from "antd";

const {TextArea} = Input;

export default class AndtDTextAreaWrapper extends React.Component {

    state = {
        textareaLength: 0,
        oneTimeUpdate: true,
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
        if (this.props.maxlength) {
            this.setState({textareaLength: value.length});
        }
        if (this.props.hasOwnProperty("onChangeTextArea")) {
            this.props.onChangeTextArea(this.props.decorator, value)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });

            if (this.state.oneTimeUpdate) {
                this.setState({
                    textareaLength: this.props.editFormData[this.props.decorator] ?
                        this.props.editFormData[this.props.decorator].length : 0,
                    oneTimeUpdate: false
                })
            }
        }

        let textCounter = null;
        if (this.props.maxlength) {
            textCounter = (
                <div style={{textAlign: "end", marginTop: "-5px"}}>
                    <span>
                        {this.state.textareaLength}/{this.props.maxlength}
                    </span>
                </div>
            )
        }

        return (
            <div>
                <Form.Item name={this.props.decorator} label={this.props.label}
                           validateTrigger="onBlur"
                           rules={[
                               {
                                   required: this.props.required,
                                   message: this.props.message
                               },
                               ...this.props.validators,
                           ]}>
                    <TextArea
                        placeholder={this.props.placeholder}
                        required={this.props.required}
                        minLength={this.props.minlength}
                        maxLength={this.props.maxlength}
                        onChange={this.onChange}
                        id={this.props.decorator}
                        disabled={this.props.disabled}
                        name={this.props.decorator}
                        rows={4}
                    />

                </Form.Item>
                {textCounter}
            </div>

        );
    }
}

