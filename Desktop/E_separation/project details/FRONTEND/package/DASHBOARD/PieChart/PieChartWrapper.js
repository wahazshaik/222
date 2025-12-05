import React from 'react'
import {ResponsivePie} from '@nivo/pie'
import '../style.css'
import constants from './constants'

class PieChart extends React.Component {

    render() {
        return (
            <div className="chart" style={{height: this.props.height, width: this.props.width}}>
                <p className="chart-card-title">{this.props.chartTitle}</p>
                <ResponsivePie
                    data={this.props.chartData}
                    margin={this.props.margin ? this.props.margin : constants.margin}
                    cornerRadius={this.props.cornerRadius ? this.props.cornerRadius : 1}
                    sortByValue={this.props.sortByValue ? this.props.sortByValue : false}
                    colors={{scheme: this.props.colorScheme ? this.props.colorScheme : 'nivo'}}
                    borderWidth={4}
                    borderColor={this.props.borderColor ? this.props.borderColor : constants.borderColor}
                    radialLabelsSkipAngle={this.props.radialLabelsSkipAngle ? this.props.radialLabelsSkipAngle : 0}
                    radialLabelsTextColor={this.props.radialLabelsTextColor ? this.props.radialLabelsTextColor : {theme: 'labels.text.fill'}}
                    slicesLabelsSkipAngle={this.props.slicesLabelsSkipAngle ? this.props.slicesLabelsSkipAngle : 10}
                    slicesLabelsTextColor={this.props.slicesLabelsTextColor ? this.props.slicesLabelsTextColor : {theme: "labels.text.fill"}}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={this.props.legends ? this.props.legends : constants.legends}
                />
            </div>
        )
    }
}

export default PieChart