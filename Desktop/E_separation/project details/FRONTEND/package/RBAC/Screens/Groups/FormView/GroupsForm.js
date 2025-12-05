import React from "react";
import {Form, Input} from "antd";
import {AgGridReact} from "ag-grid-react/lib/agGridReact";
import {openNotification} from "../../../../COMS/NotificationMessageMapping";
import ListFooter from "../../../../MDM/MDMScreens/ListView/ListFooter";
import FormHeader from "../../../../MDM/MDMScreens/FormView/FormHeader";
import {GroupsDataProvider} from "../GroupsDataProvider";
import {notificationMessage, notificationTitle, openNotificationType,} from "../../../Config/Mappings";
import {GROUPS_ENDPOINT} from "../../../Config/API";
import {defaultColDef, group_form_user_column_headers,} from "../../../constants";

class GroupsForm extends React.Component {
    dataProvider = new GroupsDataProvider();

    formRef = React.createRef();

    state = {
        rowData: null,
        selectedData: [],
    };

    componentDidMount() {
        if (this.props.match.params.groupname !== undefined) {
            this.getGroupUsers();
        }

        this.getAllUsers();
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
    };

    getGroupUsers = () => {
        this.dataProvider
            .getUsersByGroupApi(this.props.match.params.groupname)
            .then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        this.gridApi.forEachNode(function (node) {
                            try {
                                response.map((obj) => {
                                    if (Object.values(obj).indexOf(node.data.username) > -1) {
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

    getAllUsers = () => {
        this.dataProvider.getUsersApi().then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.setState({rowData: response}, () => {
                        if (this.props.match.params.groupname) {
                            this.getGroupUsers();
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

    prepareData = () => {
        var users = [];
        var groupName = this.formRef.current.getFieldValue("group_name");
        this.state.selectedData.map((data) => {
            users.push(data.id);
            return null;
        });

        var params = {
            groupName: groupName,
            users: users,
        };

        return params;
    };

    submit = () => {
        if (this.props.match.params.groupname) {
            this.patchGroups(this.prepareData());
        } else {
            this.postGroups(this.prepareData());
        }
    };

    postGroups = (params) => {
        this.dataProvider
            .addNewGroupApi(params)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.formSubmitError
                    );
                    return null;
                }
            })
            .then((response) => {
                if (response != null) {
                    openNotification(
                        openNotificationType.success,
                        notificationTitle.success,
                        notificationMessage.formSubmitSuccess
                    );
                    this.props.history.replace({
                        pathname:
                            process.env.REACT_APP_PROJECT_ROUTE + "/" + GROUPS_ENDPOINT,
                    });
                }
            });
    };

    patchGroups = (params) => {
        this.dataProvider
            .updateGroupUsersApi(this.props.location.data, params)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.formUpdateError
                    );
                    return null;
                }
            })
            .then((response) => {
                if (response != null) {
                    openNotification(
                        openNotificationType.success,
                        notificationTitle.success,
                        notificationMessage.formUpdateSuccess
                    );
                    this.props.history.replace({
                        pathname:
                            process.env.REACT_APP_PROJECT_ROUTE + "/" + GROUPS_ENDPOINT,
                    });
                }
            });
    };

    onBackPressed = () => {
        this.props.history.replace({
            pathname: process.env.REACT_APP_PROJECT_ROUTE + "/" + GROUPS_ENDPOINT,
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

    onPageSizeChange = (pageNo, pageSize) => {
        console.log(pageNo, pageSize);
    };

    render() {
        return (
            <>
                <Form
                    className="ant-form ant-form-vertical"
                    ref={this.formRef}
                    onFinish={this.submit}
                    layout={"vertical"}
                >
                    <FormHeader
                        toShowBackButton={true}
                        onBackPressed={this.onBackPressed}
                        editDataAvailable={true}
                    />

                    <div className="row form-box">
                        <legend class="form-legend"> Groups</legend>

                        <div className="col-lg-6 col-md-12">
                            <Form.Item
                                name="group_name"
                                label="Group Name"
                                rules={[{required: true}]}
                                initialValue={this.props.match.params.groupname}
                            >
                                <Input/>
                            </Form.Item>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <Form.Item label="Group Members:" required={true}>
                                <div
                                    style={{height: "300px"}}
                                    className="table-responsive
                                table-bordered table table-hover 
                                table-bordered ag-theme-balham"
                                >
                                    <AgGridReact
                                        columnDefs={group_form_user_column_headers}
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

                <ListFooter
                    total={this.state.total}
                    onPageSizeChange={(pageNo, pageSize) =>
                        this.onPageSizeChange(pageNo, pageSize)
                    }
                />
            </>
        );
    }
}

export default GroupsForm;
