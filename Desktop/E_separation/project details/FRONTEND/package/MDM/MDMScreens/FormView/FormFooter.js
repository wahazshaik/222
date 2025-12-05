import React, {Component} from "react";
import {layout1} from "../../MDMUIConfigs/MDMUILayout";
import {Button, Form,} from "antd";
import {buttonTypes} from "../../MDMUIConfigs/MDMUIMappings";

export default class FormFooter extends Component {

    render() {
        return (
            this.props.toShowFooter ?
                <div className="row textAlignCenter">
                    <div className={layout1}>
                        <Form.Item>
                            <Button
                                id="submitButton"
                                className="button-styling marginRight1Perc"
                                type={buttonTypes.primary} htmlType="submit"
                            >
                                Submit
                            </Button>
                            <Button
                                className="button-styling marginLeft1Perc"
                                onClick={() => {
                                    this.props.formRef.current.resetFields();
                                }}
                            >
                                Clear
                            </Button>
                        </Form.Item>
                    </div>
                </div> : null
        );
    }
}
