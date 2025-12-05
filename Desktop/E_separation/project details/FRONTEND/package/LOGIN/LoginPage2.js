import React from 'react';
import amns from "../assets/images/amns_transparent.png";
import './LoginPage2.css'
import { Button, Card, Form, Input } from "antd";
import "./LoginPage.css"
import { apiCall, localStorageVariableName, settings } from '../AppConfigs'
import { post_api_login_call } from "../COMS/Utils/ApiCommunicaton";
import { openNotification } from "../COMS/NotificationMessageMapping";
import { notificationMessage, notificationTitle, openNotificationType } from "../MDM/MDMUIConfigs/MDMUIMappings";
import FormLoader from "../MDM/MDMScreens/FormView/FormLoader";
import Modal from "react-bootstrap/Modal";

export default class LoginPage extends React.Component {
    form = React.createRef('login')
    state = {
        showProgress: false,
    }

    render() {

        return (
            <div className="row">

                <div className="col-lg-4 col-md-12" style={{ paddingRight: "0px" }}>
                    <div style={{ height: "100vh", backgroundColor: "#c12016" }} >
                        <h1 className={"application-name"}>
                            {settings.appTitle}
                        </h1>
                    </div>
                </div>

                <div className="col-lg-8 col-md-12" style={{ paddingLeft: "0px" }}>
                    <div style={{ height: "100vh", backgroundColor: "white" }} >
                        <img src={amns} width="200" />
                        <div className={"loginDiv"}>
                            <Card title="Login" bordered={false} className={"loginCard"}>

                                <Form
                                    ref={this.form}
                                    className={"loginForm"}
                                    layout={"vertical"}
                                    name="basic"
                                    initialValues={{
                                        username: this.props.username,
                                        password: this.props.password,
                                    }}
                                    onFinish={this.props.onFinish}
                                    onFinishFailed={this.props.onFinishFailed}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input style={{ height: "42px" }} placeholder={this.props.usernamePlaceholder} autoFocus={true} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder={this.props.passwordPlaceholder} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType={"submit"} onClick={() => {

                                            if (this.props.onCustomFinish) {
                                                // this.props.onCustomFinish(prepareValues(this.form, setProgressState), setProgressState);
                                            } else {
                                                // onDefaultFinish(this.form, setProgressState)
                                            }
                                        }}>
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}