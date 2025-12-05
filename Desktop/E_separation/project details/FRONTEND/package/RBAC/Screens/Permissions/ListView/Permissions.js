import React, {Component} from "react";
import {Form, Select} from "antd";
import FormHeader from "../../../../MDM/MDMScreens/FormView/FormHeader";
import GridViewWrapper from "../../../../UI/AgGrid/GridViewWrapper";
import {openNotification} from "../../../../COMS/NotificationMessageMapping";
import {PERMISSIONS_ENDPOINT} from "../../../Config/API";
import {PermissionsDataProvider} from "../PermissionsDataProvider";
import {defaultColDef, permissionsColumnsDef} from "../../../constants";
import {notificationMessage, notificationTitle, openNotificationType,} from "../../../Config/Mappings";

const Option = {Select};

const DROPDOWN_TYPE = ["User", "Group"];

class Permissions extends Component {
    dataProvider = new PermissionsDataProvider();

    state = {
        selectedDropDown: DROPDOWN_TYPE[1],
        selectedUserOrGroup: null,
        searchUserGroupObj: null,
        searchModelObj: null,
        modelList: [],
        rowData: [],
        groupsData: [],
        defaultColDef: defaultColDef,
        listview: permissionsColumnsDef,
        selectedData: [],
        groupUsersData: [],
    };

    formRef = React.createRef();

    componentDidMount() {
        this.fetchModels();
        this.getGroupsData();
    }

    getGroupsData = () => {
        this.dataProvider.getGroupsApi().then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.setState({groupUsersData: response});
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

    getUsersData = () => {
        this.dataProvider.getUsersApi().then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.setState({groupUsersData: response});
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

    fetchModels = () => {
        this.dataProvider
            .fetchModelsApi(process.env.REACT_APP_API_NAME)
            .then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        this.setState({modelList: JSON.parse(response)});
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

    validateData = () => {
        if (this.state.searchModelObj == null) {
            return false;
        }
        if (this.state.searchUserGroupObj == null) {
            return false;
        }
        return true;
    };

    searchPermission = () => {
        if (!this.validateData()) {
            return;
        }

        this.dataProvider
            .searchPermissionsApi(this.state.searchModelObj)
            .then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        this.setState({rowData: response}, () => {
                            if (this.state.searchUserGroupObj.type === DROPDOWN_TYPE[1]) {
                                this.getPermissionsByGroup(
                                    this.state.searchModelObj,
                                    this.state.searchUserGroupObj.item
                                );
                            } else {
                                this.getPermissionsByUser(
                                    this.state.searchModelObj,
                                    this.state.searchUserGroupObj.item
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

    getPermissionsByUser = (model, user) => {
        this.dataProvider.getPermissionByUserApi(model, user).then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.gridApi.forEachNode(function (node) {
                        response.map((obj) => {
                            if (Object.values(obj).indexOf(node.data.codename) > -1) {
                                node.setSelected(true);
                            }
                            return null;
                        });
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

    getPermissionsByGroup = (model, group) => {
        this.dataProvider.getPermissionByGroupApi(model, group).then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.gridApi.forEachNode(function (node) {
                        response.map((obj) => {
                            if (Object.values(obj).indexOf(node.data.codename) > -1) {
                                node.setSelected(true);
                            }
                            return null;
                        });
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
        params.api.sizeColumnsToFit();
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

    onBackPressed = () => {
        this.props.history.replace({
            pathname: process.env.REACT_APP_PROJECT_ROUTE + PERMISSIONS_ENDPOINT,
        });
    };

    onFinish = (e) => {
        var model = this.state.searchModelObj;
        var item = this.state.searchUserGroupObj.item;
        var type = this.state.searchUserGroupObj.type;
        var permissions = [];
        this.state.selectedData.map((data) => {
            permissions.push(data.id);
            return null;
        });

        var params = {
            model: model,
            item: item,
            type: type,
            permissions: permissions,
        };

        var jsonParams = JSON.stringify(params);

        this.dataProvider.updatePermissionApi(jsonParams).then((response) => {
            if (response.ok) {
                openNotification(
                    openNotificationType.success,
                    notificationTitle.success,
                    notificationMessage.formUpdateSuccess
                );

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.error,
                    notificationMessage.formUpdateError
                );
            }
        });
    };

    onTypeChange = (type) => {
        this.setState({selectedDropDown: type});

        if (type === DROPDOWN_TYPE[1]) {
            this.getGroupsData();
        } else {
            this.getUsersData();
        }
    };

    render() {
        return (
            <>
                <Form
                    className="ant-form ant-form-vertical"
                    onFinish={(e) => this.onFinish(e)}
                    ref={this.formRef}
                    layout={"vertical"}
                >
                    <FormHeader
                        onBackPressed={this.onBackPressed}
                        editDataAvailable={true}
                    />

                    <div className="row form-box">
                        <legend class="form-legend"> Permissions</legend>

                        <div className="col-lg-6 col-md-12">
                            <Form.Item
                                name="type"
                                label="Searching for:"
                                rules={[{required: true}]}
                                initialValue={DROPDOWN_TYPE[1]}
                            >
                                <Select onChange={(e) => this.onTypeChange(e)}>
                                    {DROPDOWN_TYPE.map((type) => (
                                        <Option value={type}>{type}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <Form.Item
                                name="Search"
                                label="Search Users/Groups:"
                                rules={[{required: true}]}
                            >
                                <Select
                                    onChange={(e) =>
                                        this.setState({
                                            searchUserGroupObj: {
                                                item: e,
                                                type: this.state.selectedDropDown,
                                            },
                                        })
                                    }
                                >
                                    {this.state.groupUsersData.map((item) => (
                                        <Option
                                            key={item.id}
                                            value={
                                                item.username === undefined ? item.name : item.username
                                            }
                                        >
                                            {item.username === undefined ? item.name : item.username}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <Form.Item
                                name="models"
                                label="Models:"
                                rules={[{required: true}]}
                            >
                                <Select
                                    showSearch
                                    onChange={(e) =>
                                        this.setState({searchModelObj: e}, () =>
                                            this.searchPermission()
                                        )
                                    }
                                >
                                    {this.state.modelList.map((model, index) => (
                                        <Option key={index} value={model}>
                                            {model}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <GridViewWrapper
                                columnDefs={this.state.listview}
                                defaultColDef={this.state.defaultColDef}
                                rowData={this.state.rowData}
                                onSelectionChanged={this.onSelectionChanged}
                                onGridReady={this.onGridReady}
                                rowSelection="multiple"
                            />
                        </div>
                    </div>
                </Form>
            </>
        );
    }
}

export default Permissions;
