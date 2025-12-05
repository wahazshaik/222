import React from "react";
import {Checkbox, Col, Form, Row} from "antd";


export default class AndtDCheckBoxGroupWrapper extends React.Component {
    
    onChange = (value) => {
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: value,
        });
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeCheckBoxGroup")) {
            this.props.onChangeCheckBoxGroup(this.props.decorator, value)
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
        }
        let listItems = [];
        if (this.props.options != null) {
            listItems = this.props.options.map((item) => {
                if (item.id) {
                    return <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>;
                } else {
                    return Object.entries(item)
                        .map(([key, value]) => {
                            return <Checkbox key={key} value={value}>{value}</Checkbox>;
                        });
                }
            });
        }
        return (

            <Form.Item name={this.props.decorator} label={this.props.label} className="marginBottom0"
                       validateTrigger="onBlur"
                       rules={[
                           {
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <Checkbox.Group onChange={this.onChange}>
                    <Row>
                        <Col span={this.props.colspan}>
                            {listItems}
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>

        );
    }
}

