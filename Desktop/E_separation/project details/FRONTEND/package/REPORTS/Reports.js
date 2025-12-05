import React from "react";
import ListViewContent from "../MDM/MDMScreens/ListView/ListViewContent";
import {gridViewConfig} from "../AppConfigs";
import {
    excel_export_api_call,
    file_download_api_call,
    get_all_data_api_call,
    options_api_call,
    options_api_header_call,
} from "../COMS/Utils/ApiCommunicaton";
import {error, openNotification, success, warning} from "../COMS/NotificationMessageMapping";
import {
    apiCall,
    notificationMessage,
    notificationTitle,
    openNotificationType,
} from "../MDM/MDMUIConfigs/MDMUIMappings";


class Report extends React.Component {
    state = {
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
        if (this.props.columnDefs) {
            this.setState({columnDefs: this.props.columnDefs})
        } else {
            this.fetchColumnsData();
        }
        this.fetchGridData(this.state.currentPage);
    }

    onPaginationChange = (page, pageSize) => {
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
            options_api_call(this.props.app, this.props.model + apiCall.listViewOptionsCall)
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
            options_api_header_call(this.props.app, this.props.model + apiCall.headerCall, {columnData: columnList,})
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
        get_all_data_api_call(this.props.app, this.props.model + apiCall.listViewCall, values)
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
        excel_export_api_call(this.props.app, this.props.model, data).then((res) => {
            if (res.ok) {
            	 if(res.status==204){
                    success("You will receive the exported data in your email shortly!")
                }else{
	                res.blob().then((blob) => {
	                    if (navigator.appVersion.toString().indexOf(".NET") > 0) {
	                        window.navigator.msSaveBlob(blob, this.props.model + ".xlsx");
	                    } else {
	                        let url = window.URL.createObjectURL(blob);
	                        let a = document.createElement("a");
	                        a.href = url;
	                        a.download = this.props.model + ".xlsx";
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
        this.setState({searchQuery: quer_param}, () => this.fetchGridData(1));
    };


    render() {

        return (
            <div>
                <ListViewContent
                    {...this.state}
                    context={this}
                    excelExport={this.excelExport}
                    onGridReady={this.onGridReady}
                    checkVersions={this.checkVersions}
                    onSelectionChanged={this.onSelectionChanged}
                    onRowDoubleClicked={this.editField}
                    onFilter={this.handleFilterApply}
                    onResetFilter={this.handleResetFilter}
                    onResetSearch={this.handleResetSearch}
                    onColumnFilter={this.handleColumnFilter}
                    onColumnReset={this.handleColumnResetFilter}
                    onSearch={this.handleSearchApply}
                    onPaginationChange={this.onPaginationChange}
                />
            </div>
        );
    }
}

export default Report;