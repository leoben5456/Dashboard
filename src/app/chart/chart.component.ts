import { Component,ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { Chart, registerables } from 'chart.js';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexDataLabels
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  color: any[];
};
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponentt{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [{
        name: 'Vip',
        data: [44, 55, 41, 67, 22, 43, 21, 49],
        color:'#A5CCD1',
      }, {
        name: 'Premieum',
        data: [13, 23, 20, 8, 13, 27, 33, 12],
        color:'#949BA0',
      }, {
        name: 'Basic',
        data: [11, 17, 15, 15, 21, 14, 15, 13],
        color:'#A0B9BF',
      }],
        chart: {
        toolbar: {
            show: false
        },
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August'
        ],
      },

      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
      },
      };

      var chart = new ApexCharts(document.querySelector("#chart"),this.chartOptions);
      chart.render();
    }
  }

