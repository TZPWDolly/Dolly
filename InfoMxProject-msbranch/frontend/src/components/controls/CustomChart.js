import React, { useRef, useEffect, useState } from 'react'
//import Highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash';

const CustomChart = (props) => {
    const { name, cdata, title } = props //name = orgName or tspName
    const [femaleList, setFemaleList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [maleList, setMaleList] = useState([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        
        console.log(title,' --- ', cdata);
        getData();
        
      }, []) 
    
    const getData = async (value) => {
                let datas = await [];
                let m = await [];
                let f = await [];
                let c = await [];
                for(const a of cdata) {
                    let alldata = await {};
                    const indiName = await name === 'Organization' ? a.ORGNAME : a.TSPNAME;
                    const index = await  _.findIndex(datas, {names: indiName});
                        if(index === -1) {
                            const getTName = await name === 'Organization' ? a.ORGNAME : a.TSPNAME;
                            a.GENDER === 1 ?  alldata.male = await a.COUNTDATA : alldata.female = await a.COUNTDATA;
                            if(!alldata?.male) alldata.male = await 0;
                            if(!alldata?.female) alldata.female = await 0;
                            alldata.names = await getTName;
                            await datas.push(alldata);
                        } else {
                            let temp = await datas;
                            a.GENDER === 1 ?  temp[index].male = await a.COUNTDATA : temp[index].female = await a.COUNTDATA;
                            datas = await temp;
                        }
                    }
                for(let d of datas) {
                    await c.push(d.names);
                    await m.push(d.male);
                    await f.push(d.female);
                }
                    await setChartData(c)
                    await setMaleList(m);
                    await setFemaleList(f)
                    await setDone(!done);
                    console.log({m}, {f}, {c});
                return await datas;

        }

    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
        },
        xAxis: {
            type: 'category',
            categories: chartData,
            crosshair: true,
            title: {
                text: name
            },
            min: 0,
            max: chartData.length >= 3 ? 2 : chartData.length - 1
        },
        scrollbar: {
            enabled: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Gender',
                align: 'high'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
            },
            column: {
                pointPadding: 0
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Male',
            color: '#3999DE',
            data: maleList

        }, {
            name: 'Female',
            color: '#53344d',
            data: femaleList

        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                }
            }]
        },

    }

    return (
            <HighchartsReact
            options={options}
            highcharts={Highcharts}
            containerProps={{ style: { width: "100%" } }}>
        </HighchartsReact>
    )
}

export default CustomChart;