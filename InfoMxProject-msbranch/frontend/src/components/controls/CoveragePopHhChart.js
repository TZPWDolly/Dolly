import React, { useRef, useEffect, useState } from 'react'
//import Highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash';
import { Card } from '@material-ui/core';

const CoveragePopHhChart = (props) => {
    console.log('coveragePop chart props ---- --- ', props);
    const { name, cData, title } = props
    const [householdList, setHouseholdList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [populationList, setPopulationList] = useState([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const fn = async () => {
            await getData()
        }
        fn();
    }, [cData])

    const getData = async () => {
        let datas = await [];
        let m = await [];
        let f = await [];
        let c = await [];

        for (const a of cData) {
            let alldata = await {};
            const indiName = await a.TSPNAME;
            const index = await _.findIndex(datas, { names: indiName });
            if (index === -1) {
                const getTName = a.TSPNAME;
                alldata.population = await a.TOTALPOP
                alldata.household = await a.TOTALHHOLD
                if (!alldata?.population) alldata.TOTALPOP = await 0;
                if (!alldata?.household) alldata.TOTALHHOLD = await 0;
                alldata.names = await getTName;
                await datas.push(alldata);
            } else {
                let temp = await datas;
                temp[index].population = await a.TOTALPOP
                temp[index].household = await a.TOTALHHOLD;
                datas = await temp;
            }
        }

        for (let d of datas) {
            await c.push(d.names);
            await m.push(d.population);
            await f.push(d.household);
        }
        await setChartData(c)
        await setPopulationList(m)
        await setHouseholdList(f);
        await setDone(!done);
        console.log({ m }, { f }, { c });
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
                text: '',
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
            name: 'Population',
            color: '#3999DE',
            data: populationList

        }, /* {
            name: 'Household',//Household
            color: '#53344d',
            data: householdList

        } */],
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
        <Card>
            <HighchartsReact
                options={options}
                highcharts={Highcharts}
                containerProps={{ style: { width: "100%" } }}>
            </HighchartsReact>
        </Card>

    )
}

export default CoveragePopHhChart;