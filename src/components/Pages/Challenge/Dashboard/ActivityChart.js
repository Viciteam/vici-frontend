import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

class ActivityChart extends React.Component {

    render () {
        const options = {
            responsive: true,
            plugins: {
             /*  legend: {
                position: 'right'
              }, */
              title: {
                display: false,
                text: 'Chart.js Line Chart',
              },
            },
            elements: {
                line: {
                    tension: 0.4 // disables bezier curves
                }
            },
        };
        const labels = ['01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12'];
        const data = {
            labels,
            datasets: [
              {
                //label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
                borderColor: '#A6CEE3',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          };
        return (
            <div>
                <Line options={options} data={data} />
            </div>
        )
    }
}

export default ActivityChart