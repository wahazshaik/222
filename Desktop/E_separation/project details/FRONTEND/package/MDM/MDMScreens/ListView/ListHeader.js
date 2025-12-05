import React, {Component} from "react";
import {Button, Dropdown, Input, Menu, Upload} from "antd";
import ListViewFilters from "./ListViewFilters";
import ColumnListViewFilters from "./ColumnListViewFilters";

const {Search} = Input;

export default class ListHeader extends Component {

    state = {
        addButton: true,
        deleteButton: true,
        editButton: true,
        filterClicked: false,
        columnfilterClicked: false,
        searchValue: "",
        searchClicked: false,
    };

    handleSearch = (value) => {
        this.setState({searchClicked: true, searchValue: value});
        this.props.onSearch(value);
    };

    handleFilterClick = () => {
        this.setState({filterClicked: true}, () => {
            this.setState({filterClicked: false});
        });
    };

    handleColumnFilterClick = () => {
        this.setState({columnfilterClicked: true}, () => {
            this.setState({columnfilterClicked: false});
        });
    };

    handleBeforeUpload = (file) => {
        this.props.excelImport(file);
        return false;
    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item
                    key="1"
                    hidden={!this.props.deleteButton}
                    onClick={this.props.deleteField}
                >
                    Delete data
                </Menu.Item>
                <Menu.Item key="2" onClick={this.props.excelExport}>
                    Export to excel
                </Menu.Item>
                <Menu.Item
                    hidden={this.props.uploadExcelButton}>
                    <Upload
                        beforeUpload={this.handleBeforeUpload}
                        accept={".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
                        fileList={[]}
                        multiple="false">
                        Import from excel
                    </Upload>
                </Menu.Item>

            </Menu>
        );

        if (this.props.showListHeader === false) {
            return null;
        } else {
            return (
                <div>
                    <div className="header_buttons">
                        <div
                            className="search_header"
                            hidden={this.props.hide_search ? this.props.hide_search : false}>
                            <Search
                                placeholder="Search in table"
                                onSearch={this.handleSearch}
                                value={this.state.searchValue}
                                onChange={(e) => {
                                    this.setState({searchValue: e.target.value});
                                }}
                                style={{float: "left", width: "65%"}}
                                hidden={this.props.hide_search ? this.props.hide_search : false}
                                enterButton/>
                            <div style={{display: "inline-block"}}>
                                <Button
                                    type="link"
                                    hidden={!this.state.searchClicked}
                                    onClick={() => {
                                        this.handleSearch("");
                                        this.setState({searchClicked: false});
                                        this.props.onResetSearch();
                                    }}>
                                    Reset
                                </Button>
                            </div>
                        </div>
                        <Button
                            className={"add_header"}
                            type="primary"
                            onClick={this.props.addField}
                            hidden={!this.props.addButton}>
                            New
                        </Button>
                        <Dropdown className={"drop_down_header"} overlay={menu}>
                        <Button hidden={this.props.addAction} className={"drop_down_header"}>Action</Button>
                        </Dropdown>
                        <Button
                            className={"drop_down_header"}
                            onClick={this.handleFilterClick}
                            hidden={this.props.addFilters}
                            >
                            Add Filters
                        </Button>
                        {this.props.columnFilterButton ? (
                            <Button
                                className={"drop_down_header"}
                                onClick={this.handleColumnFilterClick}>
                                Column Filter
                            </Button>) : null}

                        <ColumnListViewFilters
                            {...this.props}
                            handleColumnFilterClick={this.state.columnfilterClicked}/>
                        <ListViewFilters
                            {...this.props}
                            handleFilterClick={this.state.filterClicked}/>
                    </div>
                </div>
            );
        }
    }
}
