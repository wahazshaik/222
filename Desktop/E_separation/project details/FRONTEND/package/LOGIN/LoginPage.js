import React from "react"
import {Button, Card, Form, Input} from "antd";
import "./LoginPage.css"
import {apiCall, localStorageVariableName, settings} from '../AppConfigs'
import amns from "../assets/images/amns_transparent.png";
import {post_api_login_call} from "../COMS/Utils/ApiCommunicaton";
import {openNotification} from "../COMS/NotificationMessageMapping";
import {notificationMessage, notificationTitle, openNotificationType} from "../MDM/MDMUIConfigs/MDMUIMappings";
import FormLoader from "../MDM/MDMScreens/FormView/FormLoader";
import Modal from "react-bootstrap/Modal";
import { alterUsername, encryptPassword } from "../COMS/Utils/encrypt-pass";

const {useState} = React;
const  isIE = /*@cc_on!@*/false || !!document.documentMode;
const onDefaultFinish = (form, setProgressState) => {
    const login = prepareValues(form, setProgressState);
    if (login == null) {
        return
    }
    if (process.env.ENCRYPT_PASSWORD) {
          login["password"] = encryptPassword(login['password'], alterUsername(login['username']));
    }
    post_api_login_call(apiCall.login, login)
        .then((res) => {
            setProgressState(false);
            if (res.ok) {
                res.json()
                    .then(loginAuth => {
                        localStorage.setItem(localStorageVariableName.authToken, JSON.stringify("Token " + loginAuth["Your Token"]));
                        localStorage.setItem(localStorageVariableName.userName, login.username);
                        localStorage.setItem(localStorageVariableName.isLoggedIn, true);
                        window.location.reload();
                    });
            } else {
                res.json().then(errorResponse=> {
                    if(errorResponse.hasOwnProperty('Error')){
                        openNotification(openNotificationType.error, notificationTitle.api, errorResponse.Error);
                    }
                    else if(errorResponse.hasOwnProperty('message')){
                        openNotification(openNotificationType.error, notificationTitle.api, errorResponse.message);
                    }
                    else{
                        openNotification(openNotificationType.error, notificationTitle.api, notificationMessage.apiConnectionError);
                    }
                });
            }
        })
        .catch(() => {
            setProgressState(false);
            openNotification(openNotificationType.error, notificationTitle.api, notificationMessage.apiConnectionError);
        });
};

const prepareValues = (form, setProgressState) => {

    if (form.getFieldValue("username") !== undefined && form.getFieldValue("username") !== "" &&
        form.getFieldValue("password") !== undefined && form.getFieldValue("password") !== "") {

        setProgressState(true);
        return {
            "username": form.getFieldValue("username").toLowerCase(),
            "password": form.getFieldValue("password"),
            "userType": "guest"
        };
    } else {
        setProgressState(false);
        return null;
    }

};

const LoginPage = (props) => {
    const [form] = Form.useForm();
    const [showProgress, setProgressState] = useState(false);

    return (
        <div style={{backgroundColor: "white", textAlign: "center"}}>
            <img src={amns} alt="" style={{width: "150px"}}/>
            <Modal show={showProgress} centered>
                <Modal.Body>
                    <FormLoader loading="true"/>
                </Modal.Body>
            </Modal>
            <div className={"loginDiv"}>
                <Card title={"Login in " + settings.appTitle} bordered={false} className={"loginCard"}>

                    <Form
                        form={form}
                        className={"loginForm"}
                        layout={"vertical"}
                        name="basic"
                        initialValues={{
                            username: props.username,
                            password: props.password,
                        }}
                        onFinish={props.onFinish}
                        onFinishFailed={props.onFinishFailed}
                        autoComplete={"off"}
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
                            <Input style={{height: "42px"}} placeholder={props.usernamePlaceholder} autoFocus={true}/>
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
                            <Input.Password placeholder={props.passwordPlaceholder}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType={"submit"} onClick={() => {

                                if (props.onCustomFinish) {
                                    props.onCustomFinish(prepareValues(form, setProgressState), setProgressState);
                                } else {
                                    onDefaultFinish(form, setProgressState)
                                }
                            }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            {isIE?<p class="ie-incompaitable">You are using Internet Explorer some functionality and features may not work, please switch to Mozilla Firefox® 16.x or higher, Safari 5.1 or higher, Chrome 23 or higher, Edge 44.x or higher</p>:null}
            <div className={"loginFooter"}>
                <p className={"loginFooterText"}>Developed and managed by AM/NS IT team</p>
            </div>

        </div>
    );
};

export default LoginPage;
