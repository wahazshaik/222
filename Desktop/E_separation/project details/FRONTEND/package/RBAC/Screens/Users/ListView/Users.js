import React, {Component} from "react";
import GridViewWrapper from "../../../../UI/AgGrid/GridViewWrapper";
import {withRouter} from "react-router-dom";
import {openNotification, warning,} from "../../../../COMS/NotificationMessageMapping";
import ListFooter from "../../../../MDM/MDMScreens/ListView/ListFooter";
import ListHeader from "../../../../MDM/MDMScreens/ListView/ListHeader";
import {excelDownloadApi, UserDataProvider} from "../UsersDataProvider";
import {
  notificationMessage,
  notificationTitle,
  openNotificationType,
  USERS_APP_NAME,
  USERS_MODEL_NAME,
} from "../../../Config/Mappings";
import {RBAC_ENDPOINT, USERS_ENDPOINT} from "../../../Config/API";
import {defaultColDef, rowSelection, userGridColumns,} from "../../../constants";

const pageSize = process.env.REACT_APP_DEFAULT_PAGINATION_SIZE;
const RBAC_USERPROFILE_CHECK = process.env.REACT_APP_RBAC_USERPROFILE_CHECK;

class Users extends Component {
    dataProvider = new UserDataProvider();
    gridApi = null;

    state = {
        total: 0,
        rowData: [],
        columnsDef: [],
        selectedData: [],
        searchQuery: null,
        filterQuery: null,
        columnDefsForFilter: [],
        rowSelection: rowSelection,
    };

    componentDidMount() {
        this.getListViewColumns();

        this.fetchGridData(1, pageSize);
    }

    getListViewColumns = () => {
        try {
            /**
             * IF REACT_APP_RBAC_USERPROFILE_CHECK is true
             * then display dynamic grid
             * else display default django users
             */

            if (RBAC_USERPROFILE_CHECK) {
                this.dataProvider
                    .getListViewColumnsApi("users", "userprofile")
                    .then((res) => {
                        if (res.ok) {
                            return res.json().then((res) => {
                                res[0]["checkboxSelection"] = true;
                                res[0]["headerCheckboxSelection"] = true;

                                this.setState({columnsDef: res, columnDefsForFilter: res});
                            });
                        } else {
                            openNotification(
                                openNotificationType.error,
                                notificationTitle.error,
                                notificationMessage.apiConnectionError
                            );
                        }
                    });
            } else {
                this.setState({
                    columnsDef: userGridColumns,
                    columnDefsForFilter: userGridColumns,
                });
            }
        } catch (error) {
            openNotification(
                openNotificationType.error,
                notificationTitle.error,
                notificationMessage.apiConnectionError
            );
        }
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridApi.showLoadingOverlay();
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

    fetchGridData = (page, pageSize) => {
        try {
            this.gridApi !== null && this.gridApi.showLoadingOverlay();

            /**
             * IF REACT_APP_RBAC_USERPROFILE_CHECK is true
             * then display dynamic grid
             * else display default django users
             */
            let getAllData = null;

            if (RBAC_USERPROFILE_CHECK) {
                getAllData = this.dataProvider.getAllDataApi(
                    USERS_APP_NAME,
                    USERS_MODEL_NAME,
                    page,
                    pageSize,
                    this.state.searchQuery,
                    this.state.filterQuery
                );
            } else {
                getAllData = this.dataProvider.getUsersApi();
            }

            getAllData.then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        let data =
                            response.results === undefined ? response : response.results;
                        let total =
                            response.results === undefined ? response.length : response.total;

                        this.setState({rowData: data, total}, () => () =>
                            this.gridApi !== null && this.gridApi.hideOverlay()
                        );
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.apiConnectionError
                    );
                }
            });
        } catch (error) {
            openNotification(
                openNotificationType.error,
                notificationTitle.error,
                notificationMessage.apiConnectionError
            );
        }
    };

    addUsers = () => {
        this.props.history.replace({
            pathname: USERS_ENDPOINT + "/new",
        });
    };

    deleteUsers = () => {
        if (this.state.selectedData.length === 0) {
            openNotification(
                openNotificationType.warning,
                notificationTitle.delete,
                notificationMessage.listDeleteDataNotSelected
            );
        } else {
            let id = this.state.selectedData[0].id;

            let deletFunc = null;
            if (RBAC_USERPROFILE_CHECK) {
                deletFunc = this.dataProvider.deleteUserProfileApi(
                    USERS_APP_NAME,
                    USERS_MODEL_NAME,
                    id
                );
            } else {
                deletFunc = this.dataProvider.deleteUserApi(id);
            }

            deletFunc.then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        openNotification(
                            openNotificationType.success,
                            notificationTitle.success,
                            notificationMessage.listDeleteSuccess
                        );
                        this.fetchGridData(1, pageSize);
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.listDeleteError
                    );
                }
            });
        }
    };

    editUsers = () => {
        if (this.state.selectedData.length > 0) {
            RBAC_USERPROFILE_CHECK
                ? this.props.history.push({
                    data: this.state.selectedData[0].id,
                    pathname: `${USERS_ENDPOINT}/${this.state.selectedData[0].id}`,
                })
                : this.props.history.push({
                    data: this.state.selectedData[0].id,
                    pathname: `${USERS_ENDPOINT}/${this.state.selectedData[0].username}`,
                });
        } else {
            openNotification(
                openNotificationType.warning,
                notificationTitle.edit,
                notificationMessage.listEditDataNotSelected
            );
        }
    };

    onBackPressed = () => {
        this.props.history.push({
            pathname: RBAC_ENDPOINT + USERS_ENDPOINT,
        });
    };

    handleSearchApply(value) {
        let quer_param = "search=" + value;

        if (value === "") {
            quer_param = null;
        }
        this.setState({searchQuery: quer_param}, () => this.fetchGridData(1));
    }

    handleFilterApply = (querystring) => {
        this.setState({filterQuery: querystring}, () => this.fetchGridData(1));
    };

    handleResetFilter = () => {
        this.setState({filterQuery: null}, () => this.fetchGridData(1));
    };

    excelExport() {
        if (this.state.selectedData.length === 0) {
            openNotification(
                openNotificationType.warning,
                notificationTitle.export,
                notificationMessage.selectRowsForExport
            );
        } else {
            warning(notificationMessage.exportExcelWait);

            excelDownloadApi(
                USERS_APP_NAME,
                USERS_MODEL_NAME,
                this.state.selectedData,
                this.state.columnDefsForFilter
            );
        }
    }

    render() {
        return (
            <>
                <ListHeader
                    addButton={true}
                    deleteButton={true}
                    editButton={false}
                    addField={this.addUsers}
                    deleteField={this.deleteUsers}
                    excelExport={() => this.excelExport()}
                    onSearch={(q) => this.handleSearchApply(q)}
                    listview={this.state.columnDefsForFilter}
                    onFilter={(q) => this.handleFilterApply(q)}
                    onReset={() => this.handleResetFilter()}
                />

                <GridViewWrapper
                    columnDefs={this.state.columnsDef}
                    onRowDoubleClicked={this.editUsers}
                    defaultColDef={defaultColDef}
                    rowData={this.state.rowData}
                    onSelectionChanged={this.onSelectionChanged}
                    onGridReady={this.onGridReady}
                    rowSelection={this.state.rowSelection}
                />

                <ListFooter
                    total={this.state.total}
                    onPageSizeChange={(pageNo, pageSize) =>
                        this.fetchGridData(pageNo === 0 ? 1 : pageNo, pageSize)
                    }
                />
            </>
        );
    }
}

export default withRouter(Users);
