import React from "react";
import { Form, Input } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined, } from "@ant-design/icons";

export default class AndtDMultiEmailWrapper extends React.Component {
    id = 0;
    state = {
        data: [],
        oneTimeSetData: true,
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

    handleChange = (event) => {
        let form = this.props.formRef.current;
        let state = this.state.data;
        for (let i = 0; i < state.length; i++) {
            if (state[i].id.toString() === event.target.id) {
                state[i].value = event.target.value;
            }
        }
        form.setFieldsValue({
            [this.props.decorator]: state,
        });
        this.setState({ data: state });
    };

    remove = (k) => {
        let form = this.props.formRef.current;
        if (this.state.data.length === 1) {
            return;
        }
        let newKeys = this.state.data.filter((d) => d.id !== k.id);
        newKeys = newKeys.filter((item) => (item !== null || item!==undefined))
        form.setFieldsValue({ [this.props.decorator]: newKeys, });
        this.setState({ data: newKeys });
    };

    add = () => {
        if (this.state.data.length > this.props.limit) {
            return;
        }
        let form = this.props.formRef.current;
        let data = [...this.state.data];
        if (form !== null && form.getFieldValue(this.props.decorator) !== undefined) {
            data = form.getFieldValue(this.props.decorator);
        }
        const nextKeys = data.concat({ id: this.id++, value: "" });

        if (form !== null) {
            form.setFieldsValue({ [this.props.decorator]: nextKeys, });
        }
        this.setState({ data: nextKeys });
    };

    validateInput = (k) => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (k.value === "") {
            return "Enter Email";
        } else if (!regex.test(k.value)) {
            return "Must be valid email address";
        }
    };

    render() {
        if (this.props.editDataAvailable && this.state.oneTimeSetData) {
            this.setData();
        }
        const formItems = this.state.data.map((k, index) => (
            <Form.Item
                name={k.id}
                label={index === 0 ? this.props.label : ""}
                required={this.props.required}
                key={k.id}
                validateTrigger={["onBlur"]}
                >
                <Input
                    id={k.id}
                    value={k.value}
                    minLength={this.props.minlength}
                    maxLength={this.props.maxLength}
                    onChange={this.handleChange}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    style={{ width: "87%", marginRight: 8 }} />
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
                <Form.List name={this.props.decorator} style={{ marginBottom: "20px" }}>
                    {(fields, { add, remove }) => {
                        return <div>{formItems}</div>;
                    }}
                </Form.List>
            </div>
        );
    }
}
