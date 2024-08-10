import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { ColorService } from '../color.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels,
  ApexOptions
} from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';
import { TranslateService } from '@ngx-translate/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponentt implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  colors: string[] = [];

  constructor(private colorService: ColorService,private translate:TranslateService) { }

  ngOnInit(): void {
    

    this.chartOptions = {
      series: [{
        name: 'Vip',
        data: [44, 55, 41, 67, 22, 43, 21, 49],
      }, {
        name: 'Premium',
        data: [13, 23, 20, 8, 13, 27, 33, 12],
      }, {
        name: 'Basic',
        data: [11, 17, 15, 15, 21, 14, 15, 13],
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
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
      },
      colors: this.colors
    };

    this.colorService.colors$.subscribe(colors => {
      this.colors = colors;
      this.updateChartColors();
    });

    var chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
    chart.render();
  }

  updateChartColors(): void {
    this.chartOptions.colors = this.colors;
    if (this.chart) {
      this.chart.updateOptions({
        colors: this.colors
      });
    }
  }
}
