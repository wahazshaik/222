import React from "react";
import {AutoComplete, Form, Input} from "antd";
const AutoCompleteOption = AutoComplete.Option;
export default class AndtDWebsiteWrapper extends React.Component {

    state = {
        autoCompleteResult: [],
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = this.props.domainSuggestion.map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onWebsiteChange")) {
            this.props.onWebsiteChange(this.props.decorator, value)
        }
    };

    render() {
        const websiteOptions = this.state.autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
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
                <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                >
                    <Input/>
                </AutoComplete>
            </Form.Item>

        );
    }
}

