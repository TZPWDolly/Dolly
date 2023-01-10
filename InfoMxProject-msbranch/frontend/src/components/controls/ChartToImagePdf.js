import React, { useRef, useEffect, useState } from 'react'
import _ from 'lodash';
import ChartJsImage from 'chartjs-to-image';

export const chartToImage  = (name, cdata) => {

    const myChart = new ChartJsImage();

    let datas = [];
    let m = [];
    let f = [];
    let c = [];
    for (const a of cdata) {
        let alldata = {};
        const indiName = name === 'Organization' ? a.ORGNAME : a.TSPNAME;
        const index = _.findIndex(datas, { names: indiName });
        if (index === -1) {
            const getTName = name === 'Organization' ? a.ORGNAME : a.TSPNAME;
            a.GENDER === 1 ? alldata.male = a.COUNTDATA : alldata.female = a.COUNTDATA;
            if (!alldata?.male) alldata.male = 0;
            if (!alldata?.female) alldata.female = 0;
            alldata.names = getTName;
            datas.push(alldata);
        } else {
            let temp = datas;
            a.GENDER === 1 ? temp[index].male = a.COUNTDATA : temp[index].female = a.COUNTDATA;
            datas = temp;
        }
    }
    for (let d of datas) {
        c.push(d.names);
        m.push(d.male);
        f.push(d.female);
    }
    console.log({ m }, { f }, { c });

    myChart.setConfig({
        type: 'bar',
        data: {
            labels: c,
            datasets: [{
                label: 'Male',
                datalabels: {
                    display: true,
                    color: 'rgb(57,153,222)',
                    align: "end",
                    anchor: "end",
                    font: { size: "6" }
                  },
                data: m,
                backgroundColor: 'rgb(57,153,222)',
            }, {
                label: 'Female',
                datalabels: {
                    display: true,
                    color: 'rgb(72,38,66)',
                    align: "end",
                    anchor: "end",
                    font: { size: "6" }
                  },
                data: f,
                backgroundColor: 'rgb(72,38,66)',
            }]
        }
    });
    myChart.toFile('/tmp/mychart.jpeg');
    console.log("My Chart's URL ====> " + myChart.getUrl());
    return myChart.getUrl();
}


