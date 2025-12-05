import React, {Component} from "react";
import {Button, Divider, Select} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";

const {Option} = Select;

export default class ColumnListViewFilters extends Component {

    state = {
        addNewFilter: [],
        multiFilter: 0,
        breadCrumbs: null,
        displayBreadCrumbs: false,
        disableClearAll: true,
        setColumnValue: [],
    };

    handleClick = (e) => {
        if (this.state.multiFilter === 0) {
            const obj = {
                ["field" + this.state.multiFilter]: null,
                ["op" + this.state.multiFilter]: null,
                ["value" + this.state.multiFilter]: null,
            };
            this.setState({
                addNewFilter: [...this.state.addNewFilter, obj],
                multiFilter: this.state.multiFilter + 1,
            });
        }
    };

    handleChange = (value) => {
        this.setState({
            setColumnValue: value,
        });
    };

    handleIconClick = (id) => {
        this.props.onColumnReset();
        this.setState({
            addNewFilter: this.state.addNewFilter.filter((_, i) => i !== id),
            multiFilter: this.state.multiFilter - 1,
            displayBreadCrumbs: false,
        });
    };

    handleApplyClick = () => {
        let columnList = [];
        this.state.setColumnValue.forEach((value, index) => {
            if (value.includes(".")) {
                columnList.push(value.split(".")[0]);
            } else {
                columnList.push(value);
            }
        });
        this.props.onColumnFilter(columnList);
    };

    handleResetClick = () => {
        this.props.onColumnReset();
        this.setState({
            breadCrumbs: [],
            displayBreadCrumbs: false,
            disableClearAll: true,
        });
    };

    getFilterData = () => {
        let filterData = [];
        this.state.breadCrumbs.forEach((item, id) => {
            filterData.push(item["field" + id] + " " + item["op" + id] + " '" + item["value" + id] + "'");
        });
        return filterData;
    };

    render() {
        if (this.props.handleColumnFilterClick) {
            this.handleClick();
        }
        const items = this.state.addNewFilter.map((item, id) => {
            return (
                <div style={{marginTop: "15px", marginBottom: "5px"}}>
                    <p>Select Columns</p>
                    <div
                        style={{
                            width: "85%",
                            display: "inline-block",
                            paddingRight: "10px",
                        }}
                    >
                        <Select
                            mode="multiple"
                            size="default"
                            placeholder="Please select"
                            defaultValue={[]}
                            onChange={this.handleChange}
                            style={{width: "100%"}}
                        >
                            {this.props.columnDefs.map((element) => {
                                return (
                                    <Option key={element.field} value={element.field}>
                                        {element.headerName}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div
                        style={{
                            width: "10%",
                            display: "inline-block",
                            paddingRight: "0px",
                        }}
                    >
                        <Button
                            htmlType={"submit"}
                            type="primary"
                            style={{width: "100%"}}
                            onClick={this.handleApplyClick}
                        >
                            Apply
                        </Button>
                    </div>
                    <CloseCircleOutlined
                        style={{width: "5%", fontSize: "20px", textAlign: "center"}}
                        onClick={() => this.handleIconClick(0)}
                    />
                </div>
            );
        });

        return (
            <div style={this.state.displayBreadCrumbs ? {marginTop: "10px"} : {}}>
                <Divider hidden={!(items.length > 0)}/>

                <div>
                    <Select
                        mode="tags"
                        bordered={false}
                        hidden={!this.state.displayBreadCrumbs}
                        value={this.state.displayBreadCrumbs ? this.getFilterData() : []}
                    />
                    <Button
                        type="link"
                        hidden={!this.state.displayBreadCrumbs}
                        style={{float: "right"}}
                        onClick={this.handleResetClick}
                    >
                        Clear All
                    </Button>
                </div>
                {items}
            </div>
        );
    }
}
