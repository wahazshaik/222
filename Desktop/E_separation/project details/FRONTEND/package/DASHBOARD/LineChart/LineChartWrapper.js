import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import constants from './constants'
import '../style.css'

class LineChart extends React.Component {

    render() {
        return (
            <div className="chart" style={{height: this.props.height, width: this.props.width}}>
                <p className="chart-card-title">{this.props.chartTitle}</p>
                <ResponsiveLine
                    data={this.props.chartData}
                    margin={this.props.margin ? this.props.margin : constants.margin}
                    xScale={this.props.xScale ? this.props.xScale : constants.xScale}
                    yScale={this.props.yScale ? this.props.yScale : constants.yScale}
                    axisTop={this.props.axisTop ? this.props.axisTop : null}
                    axisRight={this.props.axisRight ? this.props.axisRight : null}
                    axisBottom={this.props.axisBottom ? this.props.axisBottom : constants.axisBottom}
                    axisLeft={this.props.axisLeft ? this.props.axisLeft : constants.axisLeft}
                    colors={{scheme: this.props.colorScheme ? this.props.colorScheme : "nivo"}}
                    lineWidth={this.props.lineWidth ? this.props.lineWidth : 2} //DEFAULT 2
                    enablePoints={this.props.enablePoints}
                    pointSize={this.props.pointSize ? this.props.pointSize : 6} //DEFAULT 6 - - Dependent on enable points
                    pointColor={this.props.pointColor ? this.props.pointColor : {
                        from: 'color',
                        modifiers: []
                    }} //DEFAULT : INHERIT -  - Dependent on enable points
                    pointBorderWidth={this.props.pointBorderWidth ? this.props.pointBorderWidth : 2} //DEFAULT : 2 -  - Dependent on enable points
                    pointBorderColor={this.props.pointBorderColor ? this.props.pointBorderColor : {from: 'serieColor'}} //DEFAULT : THEME : BACKGROUND -  - Dependent on enable points
                    enableArea={this.props.enableArea ? true : false}
                    areaOpacity={this.props.areaOpacity ? this.props.areaOpacity : 0.2}
                    useMesh={true} //MOUSE INTERACTIVITY
                    legends={this.props.legend ? this.props.legend : constants.legend}
                />
            </div>
        )
    }
}

export default LineChart