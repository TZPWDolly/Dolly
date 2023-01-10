import React, { useRef, useEffect, useState } from 'react'
import _ from 'lodash';
import ChartJsImage from 'chartjs-to-image';

export const CovPopChartToImage = (name, cdata) => {

    const myChart = new ChartJsImage();

    let datas = [];
    let m = [];
    let f = [];
    let c = [];
    for (const a of cdata) {
        let alldata = {};
        const indiName = a.TSPNAME;
        const index = _.findIndex(datas, { names: indiName });
        if (index === -1) {
            const getTName = a.TSPNAME;
            alldata.population = a.TOTALPOP
            alldata.household = a.TOTALHHOLD
            if (!alldata?.population) alldata.TOTALPOP = 0;
            if (!alldata?.household) alldata.TOTALHHOLD = 0;
            alldata.names = getTName;
            datas.push(alldata);
        } else {
            let temp = datas;
            temp[index].population = a.TOTALPOP
            temp[index].household = a.TOTALHHOLD;
            datas = temp;
        }
    }
    for (let d of datas) {
        c.push(d.names);
        m.push(d.population);
        f.push(d.household);
    }
    console.log({ m }, { f }, { c });

    myChart.setConfig({
        type: 'bar',
        data: {
            labels: c,
            datasets: [{
                label: 'Population',
                datalabels: {
                    display: true,
                    color: 'rgb(72,38,66)',
                    align: "end",
                    anchor: "end",
                    font: { size: "6" }
                  },
                data: m,
                backgroundColor: 'rgb(57,153,222)',
            }, /* {
                label: 'Household',
                data: f,
                backgroundColor: 'rgb(72,38,66)',
            }  */]
        }
    });
    myChart.toFile('/tmp/mychart.jpeg');
    console.log("My Chart's URL ====> " + myChart.getUrl());
    return myChart.getUrl();
}


