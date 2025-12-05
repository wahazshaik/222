export default {
    margin: {top: 50, right: 110, bottom: 50, left: 60},
    xScale: {type: 'point'},
    yScale: {type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false},
    axisBottom: {orient: 'bottom'},
    axisLeft: {orient: 'left'},
    legend: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]
}