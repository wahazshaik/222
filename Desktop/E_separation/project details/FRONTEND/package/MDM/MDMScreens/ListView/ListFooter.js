import React, {Component} from "react";
import {Pagination} from "antd";
import {gridViewConfig} from "../../../AppConfigs"

export default class ListFooter extends Component {
    render() {
        return (
            <div style={{textAlign: "end"}}>
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    current={this.props.currentPage}
                    defaultPageSize={gridViewConfig.paginationPageSize}
                    showSizeChanger
                    showTotal={()=>`Total ${this.props.total} items`}
                    total={this.props.total}
                    onChange={(page, pageSize) => this.props.onPaginationChange(page, pageSize)}
                    //onShowSizeChange={(current, pageSize) => this.props.onPaginationChange(null, pageSize)}
                />
            </div>
        );
    }
}
