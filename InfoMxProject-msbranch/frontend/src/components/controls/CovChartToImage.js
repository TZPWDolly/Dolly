import React, { useRef, useEffect, useState } from 'react'
import _ from 'lodash';
import ChartJsImage from 'chartjs-to-image';
import 'chartjs-plugin-datalabels';

export const CovChartToImage  = (name, cdata) => {

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
            alldata.village = a.TOTALVILLAGE;
            alldata.clinic = a.TOTALCLINIC;
            if (!alldata?.village) alldata.TOTALVILLAGE = 0;
            if (!alldata?.clinic) alldata.TOTALCLINIC = 0;
            alldata.names = getTName;
            datas.push(alldata);
        } else {
            let temp = datas;
            temp[index].village = a.TOTALVILLAGE;
            temp[index].clinic = a.TOTALCLINIC;
            datas = temp;
        }
    }
    for (let d of datas) {
        c.push(d.names);
        m.push(d.village);
        f.push(d.clinic);
    }
    console.log({ m }, { f }, { c });

    myChart.setConfig({
        type: 'bar',
        data: {
            labels: c,
            datasets: [{
                label: 'Village',
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
                label: 'Clinic',
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
        },

        /* options : {
            plugins: {
              datalabels: {
                display: true,
                color: "black",
                align: "end",
                anchor: "end",
                font: { size: "14" }
              }
            },
            legend: {
              display: false
            }
          }, */
          /* options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (value) {
                      return '$' + value;
                    },
                  },
                },
              ],
            }, 
          },*/
    });
    myChart.toFile('/tmp/mychart.jpeg');
    console.log("My Chart's URL ====> " + myChart.getUrl());
    return myChart.getUrl();
}


