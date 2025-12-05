export default {

    margin: {
        "top": 50,
        "right": 130,
        "bottom": 50,
        "left": 60
    },


    // FOR LINING AND DOTS IN COLOR
    // defs: [
    //     {
    //         "id": "dots",
    //         "type": "patternDots",
    //         "background": "inherit",
    //         "color": "#38bcb2",
    //         "size": 4,
    //         "padding": 1,
    //         "stagger": true
    //     },
    //     {
    //         "id": "lines",
    //         "type": "patternLines",
    //         "background": "inherit",
    //         "color": "#eed312",
    //         "rotation": -45,
    //         "lineWidth": 6,
    //         "spacing": 10
    //     }
    // ],
    // UI_META
    // fill: [
    //     {
    //         "match": {
    //             "id": "fries"
    //         },
    //         "id": "dots"
    //     },
    //     {
    //         "match": {
    //             "id": "sandwich"
    //         },
    //         "id": "lines"
    //     },

    // ],
    axis: {
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "",
        "legendPosition": "middle",

    },

    legends: [
        {
            "dataFrom": "keys",
            "anchor": "bottom-right",
            "direction": "column",
            "justify": false,
            "translateX": 120,
            "translateY": 0,
            "itemsSpacing": 2,
            "itemWidth": 100,
            "itemHeight": 20,
            "itemDirection": "left-to-right",
            "itemOpacity": 0.85,
            "symbolSize": 20,
            "effects": [
                {
                    "on": "hover",
                    "style": {
                        "itemOpacity": 2
                    }
                }
            ]
        }
    ]
}
