import React from "react";
import {Form, Input} from "antd";
import {AgGridReact} from "ag-grid-react/lib/agGridReact";
import {openNotification} from "../../../../COMS/NotificationMessageMapping";
import FormHeader from "../../../../MDM/MDMScreens/FormView/FormHeader";
import {UserDataProvider} from "../UsersDataProvider";
import {notificationMessage, notificationTitle, openNotificationType,} from "../../../Config/Mappings";
import {USERS_ENDPOINT} from "../../../Config/API";
import {defaultColDef, user_form_group_column_headers,} from "../../../constants";

class DjangoUsers extends React.Component {
    dataProvider = new UserDataProvider();

    formRef = React.createRef();

    state = {
        rowData: null,
        selectedData: [],
    };

    componentDidMount() {
        if (this.props.match.params.username !== undefined) {
            this.getUserGroups();
        }
        this.getAllGroups();
    }

    getUserGroups = () => {
        this.dataProvider
            .getGroupsByUserApi(this.props.match.params.username)
            .then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        this.gridApi.forEachNode((node) => {
                            try {
                                response.map((obj) => {
                                    if (Object.values(obj).indexOf(node.data.name) > -1) {
                                        node.setSelected(true);
                                    }
                                    return null;
                                });
                            } catch (err) {
                                openNotification(
                                    openNotificationType.error,
                                    notificationTitle.error,
                                    notificationMessage.apiConnectionError
                                );
                            }
                        });
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.apiConnectionError
                    );
                }
            });
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
    };

    getAllGroups = () => {
        this.dataProvider.getGroupsApi().then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.setState({rowData: response}, () => {
                        if (this.props.match.params.username) {
                            this.getUserGroups();
                        }
                    });
                });
            } else {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.error,
                    notificationMessage.apiConnectionError
                );
            }
        });
    };

    submit = (values) => {
        var groups = [];

        this.state.selectedData.forEach((data) => {
            groups.push(data.id);
        });

        let data = {
            userName: values["Username"],
            userPassword: values["Username"],
            groups: groups,
        };

        if (this.props.match.params.username) {
            this.patchUsers(data);
        } else {
            this.postUsers(data);
        }
    };

    postUsers = (params) => {
        this.dataProvider.addNewUserApi(params).then((response) => {
            if (response.ok) {
                openNotification(
                    openNotificationType.success,
                    notificationTitle.success,
                    notificationMessage.formSubmitSuccess
                );
                this.onBackPressed();
            } else {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.error,
                    notificationMessage.formSubmitError
                );
                return null;
            }
        });
    };

    patchUsers = (params) => {
        this.dataProvider
            .updateUserGroupApi(this.props.location.data, params)
            .then((response) => {
                if (response.ok) {
                    openNotification(
                        openNotificationType.success,
                        notificationTitle.success,
                        notificationMessage.formUpdateSuccess
                    );
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.formUpdateError
                    );
                    return null;
                }
            });
    };

    onBackPressed = () => {
        this.props.history.replace({
            pathname: process.env.REACT_APP_PROJECT_ROUTE + "/" + USERS_ENDPOINT,
        });
    };

    onSelectionChanged = (event) => {
        var selectedData = [];
        var selectDataArr = event.api.getSelectedNodes();
        selectDataArr.map((select) => {
            selectedData.push(select.data);
            return null;
        });
        this.setState({
            selectedData,
        });
    };

    render() {
        return (
            <>
                <Form
                    className="ant-form ant-form-vertical"
                    ref={this.formRef}
                    onFinish={(e) => this.submit(e)}
                    layout={"vertical"}
                >
                    <FormHeader
                        toShowBackButton={true}
                        onBackPressed={this.onBackPressed}
                        editDataAvailable={true}
                    />

                    <div className="row form-box">
                        <legend class="form-legend"> Users</legend>

                        <div className="col-lg-6 col-md-12">
                            <Form.Item
                                name="Username"
                                label="Username"
                                rules={[{required: true}]}
                                initialValue={this.props.match.params.username}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <Form.Item
                                name="user_password"
                                label="Password"
                                rules={[{required: true}]}
                            >
                                <Input type="password" placeholder="Password"/>
                            </Form.Item>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <Form.Item label="Add user to group:" required={true}>
                                <div
                                    style={{height: "300px"}}
                                    className="table-responsive
                  table-bordered table table-hover 
                  table-bordered ag-theme-balham"
                                >
                                    <AgGridReact
                                        columnDefs={user_form_group_column_headers}
                                        defaultColDef={defaultColDef}
                                        animateRows={true}
                                        rowData={this.state.rowData}
                                        suppressRowClickSelection={false}
                                        onSelectionChanged={this.onSelectionChanged}
                                        suppressPaginationPanel={true}
                                        rowSelection="multiple"
                                        onGridReady={this.onGridReady}
                                        onFirstDataRendered={(params) => {
                                            params.api.sizeColumnsToFit();
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </>
        );
    }
}

export default DjangoUsers;
