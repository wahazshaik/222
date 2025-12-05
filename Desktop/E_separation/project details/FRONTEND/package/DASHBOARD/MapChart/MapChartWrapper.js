import React from 'react'
import {ResponsiveChoropleth} from '@nivo/geo'
import constants from './constants'
import features from './features'
import '../style.css'

class MapChart extends React.Component {

    render() {
        return (
            <div className="chart" style={{height: this.props.height, width: this.props.width}}>
                <p className="chart-card-title"> {this.props.chartTitle}</p>
                <ResponsiveChoropleth
                    data={this.props.data}
                    features={features.features}
                    margin={this.props.margin ? this.props.margin : constants.margin}
                    colors={this.props.colorScheme ? this.props.colorScheme : "nivo"}
                    domain={this.props.domain ? this.props.domain : [0, 1000000]}
                    unknownColor={this.props.unknownColor ? this.props.unknownColor : "nivo"}
                    label={this.props.label ? this.props.label : "id"}
                    valueFormat={this.props.valueFormat ? this.props.valueFormat : ".2s"}
                    enableGraticule={true}
                    graticuleLineColor={this.props.graticuleLineColor ? this.props.graticuleLineColor : '#999999'}
                    borderWidth={this.props.borderWidth ? this.props.borderWidth : 0}
                    borderColor={this.props.borderColor ? this.props.borderColor : "#000000"}
                    legends={this.props.legends ? this.props.legends : constants.legends}
                />
            </div>
        )
    }
}

export default MapChart