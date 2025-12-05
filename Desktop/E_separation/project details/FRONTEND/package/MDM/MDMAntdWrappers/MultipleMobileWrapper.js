import React from "react";
import {Form, Input} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";

class NumberInput extends React.Component {
    id = 0;
    state = {
        data: this.props.value,
    };

    handleNoChange = (e) => {
        let phone_number = e.target.value;
        if (!/\d/.test(phone_number)) {
            phone_number = phone_number.substring(0, phone_number.length - 1)
        }
        let data = this.state.data;
        data.phone_number = isNaN(phone_number) ? data.phone_number : phone_number;
        this.props.updateStateValue(this.props.id, data);
    };

    render() {
        let data = this.state.data;
        let isIE = /*@cc_on!@*/ !!document.documentMode;
        return (
            <span>
                <Input
                    value={data.country_code}
                    disabled={this.props.disabled}
                    required={this.props.required}
                    style={{
                        width: "20%",
                        marginRight: "1%",
                        marginBottom: isIE ? "-2.2%" : "0%",
                    }}
                >
                </Input>
                <Input
                    type="text"
                    required={this.props.required}
                    minLength="5"
                    maxLength="14"
                    disabled={this.props.disabled}
                    value={data.phone_number}
                    onChange={this.handleNoChange}
                    style={{width: "65%", marginRight: "1.5%"}}
                />
            </span>
        );
    }
}

export default class AndtDMultiMobileWrapper extends React.Component {

    state = {
        data: [],
        oneTimeSetData: true,
    };

    updateStateValue = (id, value) => {
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data.value = value;
            }
        }
        this.setState({data});
        let form = this.props.formRef.current;
        if (form != null) {
            form.setFieldsValue({
                [this.props.decorator]: data,
            });
        }
    };

    componentDidMount() {
        this.setData();
    }

    setData = () => {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });
            if (this.props.editFormData[this.props.decorator].length === 0) {
                this.add();
                this.setState({
                    oneTimeSetData: false,
                });
            }else{
                let data = [...this.props.editFormData[this.props.decorator]]
                data = data.map((item)=>{
                    item.id = this.id++;
                    return item;
                })
                this.setState({
                    oneTimeSetData: false,
                    data: data,
                });
            }
        } else {
            this.add();
        }
    };

    remove = (k) => {
        let form = this.props.formRef.current;
        if (this.state.data.length === 1) {
            return;
        }
        let newKeys = this.state.data.filter((d) => d.id !== k.id);
        form.setFieldsValue({
            [this.props.decorator]: newKeys,
        });
        this.setState({data: newKeys});
    };

    add = () => {
        if (this.state.data.length > this.props.limit) {
            return;
        }

        let form = this.props.formRef.current;
        let data = [];
        if (form !== null && form.getFieldValue(this.props.decorator) !== undefined) {
            data = form.getFieldValue(this.props.decorator);
        }
        const nextKeys = data.concat({
            id: this.id++,
            value: {country_code: "+91"},
        });

        if (form !== null) {
            form.setFieldsValue({
                [this.props.decorator]: nextKeys,
            });
        }

        this.setState({data: nextKeys});
    };

    render() {
        if (this.props.editDataAvailable && this.state.oneTimeSetData) {
            this.setData();
        }
        const formItems = this.state.data.map((k, index) => (
            <Form.Item
                label={index === 0 ? this.props.label : ""}
                required={this.props.required}
                key={k.id}
                rules={[
                    {
                        required: this.props.required,
                        whitespace: true,
                        message: this.props.message,
                    },
                ]}
            >
                <NumberInput
                    name={this.props.decorator + "" + k.id}
                    className="multiple_mobile_input"
                    value={k.value}
                    disabled={this.props.disabled}
                    id={k.id}
                    required={this.props.required}
                    country_codes={this.state.country_codes}
                    updateStateValue={this.updateStateValue}
                />
                {this.state.data.length > 0 ? (
                    <PlusCircleOutlined
                        className="operationPlusMinus"
                        onClick={() => !this.props.disabled?this.add():null}
                    />
                ) : null}
                &nbsp;&nbsp;
                {this.state.data.length > 1 ? (
                    <MinusCircleOutlined
                        className="operationPlusMinus"
                        onClick={() => !this.props.disabled?this.remove(k):null}
                    />
                ) : null}
            </Form.Item>
        ));

        return (
            <div>
                <Form.List name={this.props.decorator} className="form_list">
                    {(fields, {add, remove}) => {
                        return <div>{formItems}</div>;
                    }}
                </Form.List>
            </div>
        );
    }
}
