import React, {Component} from "react";
import PropTypes from "prop-types";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default class GridViewWrapper extends Component {

    state={
        height: "500px"
    }
    static get propTypes() {
        return {
            listview: PropTypes.any,
            defaultColDef: PropTypes.any,
            rowData: PropTypes.any,
            onGridReady: PropTypes.func,
            rowSelection: PropTypes.any,
            onSelectionChanged: PropTypes.func,
            shouldResizeColumns: PropTypes.any
        };
    }

    // onFirstDataRendered = params => {
    //     if (this.props.hasOwnProperty("columnDefs") && this.props.columnDefs.length <= 6) {
    //         params.api.sizeColumnsToFit();
    //     }
    //     // var allColumnIds = [];
    //     // params.columnApi.getAllColumns().forEach(function (column) {
    //     //     allColumnIds.push(column.colId);
    //     // });
    //     // params.columnApi.autoSizeColumns(allColumnIds, false);
    // };

    onFirstDataRendered = (params) => {
        if (this.props.hasOwnProperty("columnDefs") && this.props.columnDefs.length <= 6) {
            params.api.sizeColumnsToFit();
        }
        this.setState({height: window.innerHeight-300 + "px"})
       
    };


    render() {
        let height = this.props.hasOwnProperty('height')?this.props.height:this.state.height
        return (
            <div id="grid" style={{...this.props.containerStyle, height: height}}
                 className="table-responsive table-bordered
                table table-hover table-bordered results
                ag-theme-balham gridViewDisplay">

                <AgGridReact
                    {...this.props}
                    columnDefs={this.props.columnDefs}
                    defaultColDef={this.props.defaultColDef}
                    animateRows={true}
                    rowData={this.props.rowData}
                    pagination={false}
                    suppressRowClickSelection={false}
                    onRowDoubleClicked={this.props.onRowDoubleClicked}
                    onGridReady={this.props.onGridReady}
                    rowSelection={this.props.rowSelection}
                    onSelectionChanged={this.props.onSelectionChanged}
                    onFirstDataRendered={this.onFirstDataRendered}
                />
            </div>
        );
    }
}
