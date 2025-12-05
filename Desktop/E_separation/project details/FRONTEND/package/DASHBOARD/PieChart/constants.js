export default {
    margin: {top: 40, right: 80, bottom: 80, left: 80},
    borderColor: {"from": "color", "modifiers": [["darker", 1]]},
    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]
}