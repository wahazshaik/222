import React, {Component} from "react";
import {Button, DatePicker, Divider, Input, Select} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";

const {Option} = Select;

const intOptions = [
    {
        option: "greater than",
        op: "=gt_",
    },
    {
        option: "less than",
        op: "=lt_",
    },
    {
        option: "greater than equals",
        op: "=gte_",
    },
    {
        option: "less than equals",
        op: "=lte_",
    },
    {
        option: "equals",
        op: "=",
    },
];
const charOptions = [{
    option: "contains",
    op: "=icontains_",
},
    {
        option: "equals",
        op: "=",
    },
];
const dateTimeOptions = [{
    option: "after",
    op: "=after_",
},
    {
        option: "before",
        op: "=before_",
    },
    {
        option: "equals",
        op: "=exact_",
    },
];
const dateOptions = [{
    option: "after",
    op: "=after_",
},
    {
        option: "before",
        op: "=before_",
    },
    {
        option: "equals",
        op: "=exact_",
    },
];

export default class ListViewFilters extends Component {

    state = {
        addNewFilter: [],
        multiFilter: 0,
        breadCrumbs: null,
        displayBreadCrumbs: false,
        disableClearAll: true,
        currentSelection: {}
    };

    handleClick = (e) => {
        const obj = {
            ["field" + this.state.multiFilter]: null,
            ["op" + this.state.multiFilter]: null,
            ["value" + this.state.multiFilter]: null,
        };
        this.setState({
            addNewFilter: [...this.state.addNewFilter, obj],
            multiFilter: this.state.multiFilter + 1,
        });
    };

    handleFieldSelect = (e, key, type) => {
        let x = [...this.state.addNewFilter];
        let y = {
            ...x[key]
        };
        y["field" + key] = e;
        x[key] = y;
        const {
            currentSelection
        } = this.state;
        const listItem = this.props.columnDefs.filter(listItem => listItem.field === e);
        currentSelection["field_type"] = listItem[0].type;
        this.setState({
            currentSelection,
            addNewFilter: x
        });
    };

    handleOperationSelect = (e, key) => {
        let x = [...this.state.addNewFilter];
        let y = {
            ...x[key]
        };
        y["op" + key] = e;
        x[key] = y;
        const {
            currentSelection
        } = this.state;
        currentSelection["operation"] = e;
        this.setState({
            currentSelection,
            addNewFilter: x
        });
    };

    handleChange = (e, key) => {
        let x = [...this.state.addNewFilter];
        let y = {
            ...x[key]
        };
        y["value" + key] = e.target.value;
        x[key] = y;
        this.setState({
            addNewFilter: x,
        });
    };

    handleIconClick = (id) => {
        this.setState({
            addNewFilter: this.state.addNewFilter.filter((_, i) => i !== id),
            multiFilter: this.state.multiFilter - 1,
            displayBreadCrumbs: false,
        });
    };

    handleApplyClick = () => {
        let queryString = "";
        this.state.addNewFilter.forEach((item) => {
            queryString = queryString + Object.values(item)
                .toString()
                .replace(/,/g, "") + "&";
        });
        this.props.onFilter(queryString);
        this.setState({
            breadCrumbs: [...this.state.addNewFilter],
            multiFilter: 0,
            displayBreadCrumbs: true,
            addNewFilter: [],
            disableClearAll: false,
        });
    };

    handleResetClick = () => {
        this.props.onResetFilter();
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
        if (this.props.handleFilterClick) {
            this.handleClick();
        }

        const items = this.state.addNewFilter.map((item, id) => {
            let valueInput = null;
            this.props.columnDefs.forEach((element) => {
                if (element.field === item["field" + id]) {
                    if (element.type.trim() === "date" || element.type.trim() === "datetime") {
                        valueInput = <DatePicker
                            style={{width: "100%"}}
                            onChange={(date, dateString) => {
                                this.handleChange({target: {value: dateString}}, id)
                            }}/>
                    } else {
                        valueInput = <Input
                            style={{width: "100%"}}
                            placeholder="Enter Value"
                            onChange={(e) => this.handleChange(e, id)}
                        />
                    }
                }
            });
            if (valueInput === null) {
                valueInput = <Input
                    style={{width: "100%"}}
                    placeholder="Enter Value"
                    onChange={(e) => this.handleChange(e, id)}
                />
            }
            return (
                <div style={{marginTop: "15px", marginBottom: "5px"}}>
                    <p>Filter</p>
                    <div
                        style={{
                            width: "29%",
                            display: "inline-block",
                            paddingRight: "10px",
                        }}>
                        <Select
                            showSearch
                            key={"field" + id}
                            style={{width: "100%"}}
                            placeholder="Select field"
                            optionFilterProp="children"
                            value={item.field}
                            onSelect={(e) => this.handleFieldSelect(e, id)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {this.props.columnDefs.map((element) => {
                                if (element.headerName.toLowerCase() === 'id') {
                                    return null;
                                }
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
                            width: "27%",
                            display: "inline-block",
                            paddingRight: "10px",
                        }}>
                        <Select
                            showSearch
                            style={{width: "100%"}}
                            placeholder="Select operator"
                            optionFilterProp="children"
                            value={item.op}
                            onSelect={(e) => this.handleOperationSelect(e, id)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {this.props.columnDefs.map((element) => {
                                if (element.field === item["field" + id]) {
                                    if (element.type.trim() === "integer") {
                                        return intOptions.map((item) => {
                                            return <Option value={item.op}>{item.option}</Option>;
                                        });
                                    } else if (element.type.trim() === "text") {
                                        return charOptions.map((item) => {
                                            return <Option value={item.op}>{item.option}</Option>;
                                        });
                                    } else if (element.type.trim() === "datetime") {
                                        return dateTimeOptions.map((item) => {
                                            return <Option value={item.op}>{item.option}</Option>;
                                        });
                                    } else if (element.type.trim() === "date") {
                                        return dateOptions.map((item) => {
                                            return <Option value={item.op}>{item.option}</Option>;
                                        });
                                    } else {
                                        return <Option value="=">Equals</Option>;
                                    }
                                }
                                return null;
                            })}
                        </Select>
                    </div>
                    <div
                        style={{
                            width: "29%",
                            display: "inline-block",
                            paddingRight: "20px",
                        }}>
                        {valueInput}

                    </div>
                    <div
                        style={{
                            width: "10%",
                            display: "inline-block",
                            paddingRight: "0px",
                        }}>
                        <Button
                            htmlType={"submit"}
                            type="primary"
                            style={{width: "100%"}}
                            onClick={this.handleApplyClick}>
                            Apply
                        </Button>
                    </div>
                    <CloseCircleOutlined
                        style={{width: "5%", fontSize: "20px", textAlign: "center"}}
                        onClick={() => this.handleIconClick(id)}/>
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
                        disabled={true}
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
