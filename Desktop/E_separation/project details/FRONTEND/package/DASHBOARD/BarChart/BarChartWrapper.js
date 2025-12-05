import React from 'react'
import {ResponsiveBar} from '@nivo/bar'
import constants from './constants'
import '../style.css'

class Chart extends React.Component {

    render() {
        return (
            <div className="chart" style={{height: this.props.height, width: this.props.width}}>
                <p className="chart-card-title">{this.props.chartTitle}</p>
                <ResponsiveBar
                    data={this.props.chartData ? this.props.chartData : {}}
                    keys={this.props.keys}
                    indexBy={this.props.chartIndexBy}
                    margin={this.props.chartMargin ? this.props.chartMargin : constants.margin}
                    padding={this.props.chartPadding ? this.props.chartPadding : 0.3}
                    colors={{scheme: this.props.colorScheme ? this.props.colorScheme : "nivo"}}
                    labelTextColor={this.props.chartLabelTextColor ? this.props.chartLabelTextColor : "inherit:darker(1.6)"}
                    axisTop={this.props.axisTop ? this.props.axisTop : null}
                    axisRight={this.props.axisRight ? this.props.axisRight : null}
                    axisBottom={this.props.axisBottom ? this.props.axisBottom : constants.axis}
                    axisLeft={this.props.axisLeft ? this.props.axisLeft : constants.axis}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={this.props.chartLegends ? this.props.chartLegends : constants.legends}
                />

            </div>
        )
    }
}

export default Chart