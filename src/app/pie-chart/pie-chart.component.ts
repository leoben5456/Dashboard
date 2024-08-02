import { Component,ViewChild } from '@angular/core';
import { Legend } from 'chart.js';
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
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: any[];
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [55, 45],
      chart: {
        type: 'donut',
        width: '150%',
        offsetX:-60,
        offsetY:30
      },
      labels: ['Male', 'Female'],
      colors: ["#BCD4DE","#949BA0"],

      responsive: [
        {
          breakpoint: 300,
          options: {
            chart: {
              width:'140%',

            },
          }
        },
        {
          breakpoint: 430,
          options: {
            chart: {
              width:'130%',

            },
            legend: {
              show: true,
              position: 'top',
              horizontalAlign: 'center'
            },

          }

        },
        {
          breakpoint: 500,
          options: {
            chart: {
              width:'140%',

            },
          }
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width:'140%',

            },
          }
        }
      ],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center'
      },
      dataLabels: {
        enabled: true,
        formatter(value: any, opts: any): any {
          return opts.w.config.series[opts.seriesIndex];
        },
      }
    };
  }
}
