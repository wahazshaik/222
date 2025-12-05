import React, {Component} from "react";
import GridViewWrapper from "../../../../UI/AgGrid/GridViewWrapper";
import {withRouter} from "react-router-dom";
import {openNotification} from "../../../../COMS/NotificationMessageMapping";
import ListFooter from "../../../../MDM/MDMScreens/ListView/ListFooter";
import ListHeader from "../../../../MDM/MDMScreens/ListView/ListHeader";
import {GroupsDataProvider} from "../GroupsDataProvider";
import {notificationMessage, notificationTitle, openNotificationType,} from "../../../Config/Mappings";
import {defaultColDef, groupGridColumns, rowSelection,} from "../../../constants";
import {GROUPS_ENDPOINT} from "../../../Config/API";

class Groups extends Component {
    dataProvider = new GroupsDataProvider();

    state = {
        rowData: [],
        selectedData: [],
    };

    componentDidMount() {
        this.getData();
    }

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

    getData = () => {
        this.dataProvider.getGroupsApi().then((res) => {
            if (res.ok) {
                return res.json().then((response) => {
                    this.setState({rowData: response});
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

    addGroup = () => {
        this.props.history.replace({
            pathname: GROUPS_ENDPOINT + "/new",
        });
    };

    deleteGroup = () => {
        if (this.state.selectedData.length === 0) {
            openNotification(
                openNotificationType.warning,
                notificationTitle.delete,
                notificationMessage.listDeleteDataNotSelected
            );
        } else {
            let id = this.state.selectedData[0].id;

            this.dataProvider.deleteGroupApi(id).then((res) => {
                if (res.ok) {
                    return res.json().then((response) => {
                        openNotification(
                            openNotificationType.success,
                            notificationTitle.success,
                            notificationMessage.listDeleteSuccess
                        );
                        this.getData();
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

    editGroup = () => {
        if (this.state.selectedData.length > 0) {
            this.props.history.push({
                data: this.state.selectedData[0].id,
                pathname: GROUPS_ENDPOINT + "/" + this.state.selectedData[0].name,
            });
        } else {
            openNotification(
                openNotificationType.warning,
                notificationTitle.edit,
                notificationMessage.listEditDataNotSelected
            );
        }
    };

    render() {
        return (
            <>
                <ListHeader
                    addButton={true}
                    deleteButton={true}
                    editButton={false}
                    addField={this.addGroup}
                    deleteField={this.deleteGroup}
                    listview={groupGridColumns}
                    excelExport={() => console.log("Export")}
                    onSearch={(q) => console.log("search")}
                    onFilter={(q) => console.log("Filter")}
                    onReset={() => console.log("Reset Filter")}
                />

                <GridViewWrapper
                    columnDefs={groupGridColumns}
                    rowSelection={rowSelection}
                    onRowDoubleClicked={this.editGroup}
                    defaultColDef={defaultColDef}
                    rowData={this.state.rowData}
                    onSelectionChanged={this.onSelectionChanged}
                    shouldResizeColumns={true}
                    onGridReady={this.onGridReady}
                />

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

export default withRouter(Groups);
