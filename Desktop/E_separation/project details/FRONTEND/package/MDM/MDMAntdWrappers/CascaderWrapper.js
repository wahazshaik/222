import PropTypes from "prop-types";
import React from 'react';
import {Cascader, Form} from 'antd';

function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase()
        .indexOf(inputValue.toLowerCase()) > -1);
}

export default class AndtDCascaderWrapper extends React.Component {
    state = {
        oneTimeApiCall: true,
    };

    onChange = (value) => {
        if (this.props.editDataAvailable) {
            Object.defineProperty(this.props.editFormData, this.props.decorator, {
                value: value,
                writable: true,
            });
        }
        if (this.props.hasOwnProperty("onChangeCascader")) {
            this.props.onChangeCascader(this.props.options, value, this.props.decorator);
        }
    };

    render() {
        if (this.props.editDataAvailable) {
            this.props.formRef.current.setFieldsValue({
                [this.props.decorator]: this.props.editFormData[this.props.decorator],
            });

            if (this.props.dropdown_dependent_field && this.state.oneTimeApiCall) {
                this.props.onChangeCascader(this.props.options, this.props.editFormData[this.props.decorator], this.props.decorator);
                this.setState({oneTimeApiCall: false})
            }

        }
        return (

            <Form.Item name={this.props.decorator} label={this.props.label}
                       rules={[
                           {
                               type: 'array',
                               required: this.props.required,
                               message: this.props.message
                           },
                           ...this.props.validators,
                       ]}>
                <Cascader
                    options={this.props.options}
                    onChange={this.onChange}
                    showSearch={{filter}}
                    disabled={this.props.disabled}
                />
            </Form.Item>

        );
    }
}
AndtDCascaderWrapper.propTypes = {
  decorator: PropTypes.any,
  disabled: PropTypes.any,
  dropdown_dependent_field: PropTypes.any,
  editDataAvailable: PropTypes.any,
  editFormData: PropTypes.any,
  formRef: PropTypes.shape({
    current: PropTypes.shape({
      setFieldsValue: PropTypes.func
    })
  }),
  hasOwnProperty: PropTypes.func,
  label: PropTypes.any,
  message: PropTypes.any,
  onChangeCascader: PropTypes.func,
  options: PropTypes.any,
  required: PropTypes.any,
  validators: PropTypes.any
}
