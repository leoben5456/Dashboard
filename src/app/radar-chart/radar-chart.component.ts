import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ChartComponent,
  ApexStroke,
  ApexPlotOptions,
  ApexYAxis,
  ApexMarkers
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Clients",
          data: [0, 100, 90, 80, 100, 50, 73]
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        type: "radar"

      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        radar: {
          size: 150,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"]
            }
          }
        }
      },
      title: {
        text: "Radar with Polygon Fill"
      },
      colors: ["#A0B9BF"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#9DACB2"],
        strokeWidth: 2
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
            return val;
          }
        }
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ]
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function(val: number, i: number): string{
            if (i % 2 === 0) {
               return val.toString();
            } else {
              return "";
            }
          }
        }
      }
    };
  }

}
