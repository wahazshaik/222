import React from "react";
import {Form, Input} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";

class NumberInput extends React.Component {
    id = 0;
    state = {
        data: this.props.value,
    };

    handleNumberChange = (e) => {
        const region_code = parseInt(e.target.value);
        if (isNaN(region_code)) {
            return;
        }
        let data = this.state.data;
        data.region_code = region_code;
        this.props.updateStateValue(this.props.id, data);
    };

    handleNoChange = (e) => {
        const phone_number = parseInt(e.target.value || 0, 10);
        if (isNaN(phone_number)) {
            return;
        }
        let data = this.state.data;
        data.phone_number = phone_number;
        this.props.updateStateValue(this.props.id, data);
    };

    handleCountryCodeChange = (e) => {
        const country_code = e.target.value;
        let data = this.state.data;
        data.country_code = country_code;
        this.props.updateStateValue(this.props.id, data);
    };

    render() {
        let data = this.state.data;
        return (
            <span>
                <Input
                    value={data.country_code ? data.country_code : "+91"}
                    style={{width: "15%", marginRight: "1%"}}
                    minLength="2"
                    maxLength="7"
                    required={this.props.required}
                    disabled={this.props.disabled}
                    onChange={this.handleCountryCodeChange}
                />
                <Input
                    type="text"
                    minLength="2"
                    maxLength="7"
                    required={this.props.required}
                    disabled={this.props.disabled}
                    value={data.region_code}
                    onChange={this.handleNumberChange}
                    style={{width: "20%", marginRight: "1%"}}
                />
                <Input
                    type="text"
                    required={this.props.required}
                    disabled={this.props.disabled}
                    minLength="5"
                    maxLength="14"
                    value={data.phone_number}
                    onChange={this.handleNoChange}
                    style={{width: "50%", marginRight: "1%"}}
                />
            </span>
        );
    }
}

export default class AndtDMultiPhoneWrapper extends React.Component {

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
                    id={k.id}
                    disabled={this.props.disabled}
                    required={this.props.required}
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
