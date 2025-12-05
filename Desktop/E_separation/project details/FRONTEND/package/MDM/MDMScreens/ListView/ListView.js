import React from "react";
import ListViewContent from "./ListViewContent";
import {APP_NAME, gridViewConfig, settings} from "../../../AppConfigs";
import {
    delete_multi_data_api_call,
    delete_single_data_api_call,
    excel_export_api_call,
    excel_import_api_call,
    file_download_api_call,
    get_all_data_api_call,
    options_api_call,
    options_api_header_call,
    options_main_api_call,
} from "../../../COMS/Utils/ApiCommunicaton";
import {error, openNotification, success, warning} from "../../../COMS/NotificationMessageMapping";
import {
    apiCall,
    notificationMessage,
    notificationTitle,
    openNotificationType,
    routeMode
} from "../../MDMUIConfigs/MDMUIMappings";
import QuickForm from '../QuickFormView/QuickFormView'

const APP = APP_NAME.MASTER;

class ListView extends React.Component {

    state = {
        routeName: process.env.REACT_APP_PROJECT_ROUTE==="/null"?this.props.location.pathname.substr(1).split("/")[0]:this.props.location.pathname.substr(1).split("/")[1],
        routeState: null,
        columnDefs: null,
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
        },
        rowData: null,
        rowSelection: "multiple",
        selectedRow: null,
        versionList: null,
        permissions: null,
        addButton: false,
        uploadExcelButton: false,
        deleteButton: false,
        editButton: false,
        columnFilterButton: false,
        pageSize: gridViewConfig.paginationPageSize,
        searchQuery: null,
        filterQuery: null,
        total: 0,
        currentPage: 1,
    };


    componentDidMount() {
        this.fetchColumnsData();
        this.fetchGridData(this.state.currentPage);
        this.fetchPermissions();
    }

    onPaginationChange = (page, pageSize) => {
        console.log(page, pageSize);
        if (page === 0 || page === null) {
            page = 1
        }
        this.gridApi.showLoadingOverlay();
        this.setState({pageSize: pageSize, currentPage: page}, () => {
            this.fetchGridData(page);
        });
    };

    fetchColumnsData(columnList = null) {
        if (columnList === null || columnList === undefined) {
            options_api_call(APP, this.state.routeName + apiCall.listViewOptionsCall)
                .then((res) => res.json())
                .then((columnDefs) => {
                    let hasFiles = columnDefs.filter(item => item.field === "is_filefield");
                    if (hasFiles.length > 0) {
                        columnDefs.push(
                            {
                                headerName: "Files",
                                field: "files",
                                editable: false,
                                type: "text",
                                width: 100,
                                pinned: "right",
                                cellRendererFramework: function (params) {
                                    return (
                                        <p style={params.node.data.files === null ? {
                                            color: "lightgrey",
                                            cursor: "pointer"
                                        } : {color: "#1890ff", cursor: "pointer"}} type="link" onClick={() => {
                                            if (params.node.data.files === null) {
                                                return;
                                            }
                                            Object.values(params.node.data.files).forEach(files => {
                                                files.forEach(file => {
                                                    params.agGridReact.props.context.fileDownload(file)
                                                });
                                            });
                                        }}>
                                            Download
                                        </p>
                                    )

                                },
                            }
                        )
                    }
                    this.setState({columnDefs}, () => console.log(columnDefs))
                });
        } else {
            options_api_header_call(APP, this.state.routeName + apiCall.headerCall, {columnData: columnList,})
                .then((res) => res.json())
                .then((columnDefs) => this.setState({columnDefs}));
        }
    }

    fileDownload = (file) => {
        file_download_api_call(file.uid).then((res) => {
            if (res.ok) {
                res.blob().then((blob) => {
                    if (navigator.appVersion.toString().indexOf(".NET") > 0) {
                        window.navigator.msSaveBlob(blob, file.name);
                    } else {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = file.name;
                        a.click();
                    }
                });
            } else {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.api,
                    notificationMessage.apiConnectionError
                );
            }
        });
    };

    fetchPermissions() {
        options_main_api_call(APP, apiCall.mainOptionsCall)
            .then((res) => res.json())
            .then((permissions) => {
                this.setState({permissions}, () => {
                    this.state.permissions.forEach(section => {
                        section.screens.forEach((item) => {
                            if (item && item.permissions !== undefined) {
                                item.permissions.forEach((item) => {
                                    if (item.codename.includes("add") && item.codename.includes(this.state.routeName.toLowerCase())) {
                                        this.setState({addButton: true});
                                    }
                                    if (item.codename.includes("change") && item.codename.includes(this.state.routeName.toLowerCase())) {
                                        this.setState({editButton: true});
                                    }
                                    if (item.codename.includes("delete") && item.codename.includes(this.state.routeName.toLowerCase())) {
                                        this.setState({deleteButton: true});
                                    }
                                    if (item.codename.includes("columnfilter") && item.codename.includes(this.state.routeName.toLowerCase())) {
                                        this.setState({columnFilterButton: true});
                                    }
                                    if (item.codename.includes("upload") && item.codename.includes(this.state.routeName.toLowerCase())) {
                                        this.setState({uploadExcelButton: true});
                                    }
                                });
                            }
                        });
                    });
                });
            });
    }

    fetchGridData(pageNo) {
        let values = "";
        if (pageNo !== null) {
            values = "?page=" + pageNo;
        }

        if (this.state.pageSize !== null) {
            values += "&pageSize=" + this.state.pageSize;
        }

        if (this.state.searchQuery !== null) {
            values += "&" + this.state.searchQuery;
        }

        if (this.state.filterQuery !== null) {
            values += "&" + this.state.filterQuery + "filter=1";
        }
        get_all_data_api_call(APP, this.state.routeName + apiCall.listViewCall, values)
            .then((res) => {
                if (res.ok) {
                    res.json().then((rowData) => {
                        try {
                            this.gridApi.hideOverlay();
                        } catch (e) {
                        }
                        this.setState({total: rowData.total, rowData: rowData.results});
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.api,
                        notificationMessage.apiConnectionError
                    );
                }
            })
            .catch(() => {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.api,
                    notificationMessage.apiConnectionError
                );
            });
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
    };

    onSelectionChanged = () => {
        let selectedRows = this.gridApi.getSelectedRows();
        this.setState(() => ({
            selectedRow: selectedRows,
        }));
    };

    deleteField = () => {
        if (this.state.selectedRow != null) {
            if (this.state.selectedRow.length === 1) {
                const temp = this.state.columnDefs[0].primarykeyfield;
                const id = this.state.selectedRow[0][temp];
                delete_single_data_api_call(APP, this.state.routeName, id).then(
                    (res) => {
                        if (res.ok) {
                            this.setState({currentPage:1},()=>this.fetchGridData(1));
                            success(notificationMessage.listDeleteSuccess);
                        } else {
                            error(notificationMessage.listDeleteError);
                        }
                        this.setState({selectedRow: null});
                    }
                );
            } else {
                let listItems = [];
                const temp = this.state.columnDefs[0].primarykeyfield;
                for (let i = 0; i < this.state.selectedRow.length; i++) {
                    const id = this.state.selectedRow[i][temp];
                    listItems.push({[temp]: id});
                }

                delete_multi_data_api_call(APP, this.state.routeName + apiCall.listViewCall, listItems).then((res) => {
                    if (res.ok) {
                        // Reupdating grid data on successfull deletion
                         this.setState({currentPage:1},()=>this.fetchGridData(1));
                        success(notificationMessage.listMultipleDeleteSuccess);
                    } else {
                        error(notificationMessage.listDeleteError);
                    }
                    this.setState({selectedRow: null});
                });
            }
        } else {
            openNotification(
                openNotificationType.warning,
                notificationTitle.delete,
                notificationMessage.listDeleteDataNotSelected
            );
        }
    };

    editField = () => {
        if (!this.state.editButton) {
            return;
        }
        if (this.state.selectedRow != null) {
            if (this.state.selectedRow.length === 1) {
                const temp = this.state.columnDefs[0].primarykeyfield;
                const id = this.state.selectedRow[0][temp];
                if(settings.quickForm){
                    this.setState({routeState:id});
                }else{
                    this.props.history.push({
                        pathname: this.state.routeName + "/" + id,
                    });
                }
            } else {
                openNotification(
                    openNotificationType.warning,
                    notificationTitle.edit,
                    notificationMessage.listMultipleEditDataSelected
                );
            }
        } else {
            openNotification(
                openNotificationType.warning,
                notificationTitle.edit,
                notificationMessage.listEditDataNotSelected
            );
        }
    };

    addField = () => {
        if(settings.quickForm){
            this.setState({routeState:routeMode.new});
        }else{
            this.props.history.push({
                pathname: this.state.routeName + "/" + routeMode.new,
            });
        }
        
    };

    excelExport = () => {
        if (this.state.selectedRow == null || this.state.selectedRow.length === 0) {
            this.excelDownload("all");
        } else {
            this.excelDownload(null);
        }
    };

    excelDownload(allExport) {
        let listItems = [];
        let columns = [];
        for (let i = 0; i < this.state.columnDefs.length; i++) {
            let value = this.state.columnDefs[i].field;
            if (value.includes(".")) {
                columns.push(value.split(".")[0]);
            } else {
                if (value.toLowerCase() === 'files') {
                    continue;
                }
                columns.push(value);
            }
        }
        if (allExport) {
            listItems = "all"
        } else {
            for (let i = 0; i < this.state.selectedRow.length; i++) {
                listItems.push(this.state.selectedRow[i]);
            }
        }
        let data = {
            results: listItems,
            columns: columns,
            search: this.state.searchQuery,
            filter: this.state.filterQuery ? this.state.filterQuery.slice(0, -1) : null,
            primary_key: this.state.columnDefs.filter((item)=> item.hasOwnProperty('primarykeyfield'))[0]['primarykeyfield']
        };
        allExport ? warning("Please wait! Exporting all data") : warning("Please wait! Exporting selected data");
        excel_export_api_call(APP, this.state.routeName, data).then((res) => {
            if (res.ok) {
                if(res.status===204){
                    success("You will receive the exported data in your email shortly!")
                }else{
                    res.blob().then((blob) => {
                        if (navigator.appVersion.toString().indexOf(".NET") > 0) {
                            window.navigator.msSaveBlob(blob, this.state.routeName + ".xlsx");
                        } else {
                            let url = window.URL.createObjectURL(blob);
                            let a = document.createElement("a");
                            a.href = url;
                            a.download = this.state.routeName + ".xlsx";
                            a.click();
                        }
                        this.setState({selectedRow: null});
                    });
                    success(" Successfully Exported to Excel ");
                }
            } else {
                error(" Error Exporting Data to Excel ");
            }
        });
    }

    excelImport = (file) => {
        warning(notificationMessage.excelImportWait);
        let formData = new FormData();
        formData.append('file', file);
        formData.set("abc", "xyz");
        excel_import_api_call(APP, this.state.routeName, formData)
            .then((res) => {
                if (res.ok) {
                    res.text().then(responseText => {
                        openNotification(
                            openNotificationType.success,
                            responseText
                        );
                        this.gridApi.showLoadingOverlay();
                        this.setState({currentPage:1},()=>this.fetchGridData(1));
                    })
                } else {
                    if (res.status === 404) {
                        openNotification(
                            openNotificationType.error,
                            notificationTitle.api,
                            notificationMessage.excelImportError
                        );
                    } else {
                        res.text().then((errorMessage) => {
                            openNotification(
                                openNotificationType.error,
                                errorMessage
                            );
                        });
                        
                    }

                }
            })
            .catch(() => {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.api,
                    notificationMessage.apiConnectionError
                );
            });

    };

    handleColumnFilter = (columnList) => {
        this.fetchColumnsData(columnList);
    };


    handleFilterApply = (querystring) => {
        this.gridApi.showLoadingOverlay();
        this.setState({filterQuery: querystring, currentPage: 1}, () => this.fetchGridData(1));
    };

    handleResetFilter = () => {
        this.gridApi.showLoadingOverlay();
        this.setState({selectedRow: null, filterQuery: null, currentPage: 1}, () => this.fetchGridData(1));
    };

    handleResetSearch = () => {
        this.gridApi.showLoadingOverlay();
        this.setState({selectedRow: null});
    };

    handleColumnResetFilter = () => {
        this.fetchColumnsData(null);
    };

    handleSearchApply = (value) => {
        this.gridApi.showLoadingOverlay();
        let quer_param = "search=" + value;
        if (value === "") {
            quer_param = null;
        }
        this.setState({searchQuery: quer_param, currentPage:1}, () => this.fetchGridData(1));
    };

    removeRouteState = () => this.setState({routeState: null}, ()=>this.fetchGridData(this.state.currentPage));

    render() {

        return (
            <div>
                <ListViewContent
                    {...this.state}
                    context={this}
                    addField={this.addField}
                    deleteField={this.deleteField}
                    excelExport={this.excelExport}
                    onGridReady={this.onGridReady}
                    onSelectionChanged={this.onSelectionChanged}
                    onRowDoubleClicked={this.editField}
                    onFilter={this.handleFilterApply}
                    onResetFilter={this.handleResetFilter}
                    onResetSearch={this.handleResetSearch}
                    onColumnFilter={this.handleColumnFilter}
                    onColumnReset={this.handleColumnResetFilter}
                    onSearch={this.handleSearchApply}
                    onPaginationChange={this.onPaginationChange}
                    excelImport={this.excelImport}
                />
                {this.state.routeState?
                <QuickForm 
                    routeState={this.state.routeState}
                    removeRouteState = {this.removeRouteState}
                    routeName={this.state.routeName} 
                />:null
                }
                
            </div>
        );
    }
}

export default ListView;