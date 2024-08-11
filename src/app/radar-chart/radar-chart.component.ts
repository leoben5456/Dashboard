import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ColorService } from '../services/color.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
import * as ApexCharts from 'apexcharts';

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
export class RadarChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart", { static: false }) chartElement!: ElementRef;
  public chartOptions!: Partial<ChartOptions>;
  colors: string[] = [];
  private langChangeSub!: Subscription;
  private chartInstance: ApexCharts | undefined;

  constructor(private colorService: ColorService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.initializeChart();

    // Subscribe to language changes
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.reinitializeChart();
    });

    this.colorService.colors$.subscribe(colors => {
      this.colors = colors;
      this.updateChartColors();
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription and destroy the chart when the component is destroyed
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  initializeChart(): void {
    this.translate.get([
      'days.Sunday', 'days.Monday', 'days.Tuesday', 'days.Wednesday',
      'days.Thursday', 'days.Friday', 'days.Saturday'
    ]).subscribe(translations => {
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
        colors: this.colors,
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
            translations['days.Sunday'],
            translations['days.Monday'],
            translations['days.Tuesday'],
            translations['days.Wednesday'],
            translations['days.Thursday'],
            translations['days.Friday'],
            translations['days.Saturday']
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

      if (this.chartElement && this.chartElement.nativeElement) {
        this.chartInstance = new ApexCharts(this.chartElement.nativeElement, this.chartOptions);
        this.chartInstance.render();
      }
    });
  }

  reinitializeChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.initializeChart();
  }

  updateChartColors(): void {
    if (this.chartOptions && this.chartOptions.colors) {
      this.chartOptions.colors = this.colors;
      if (this.chartInstance) {
        this.chartInstance.updateOptions({
          colors: this.colors
        });
      }
    }
  }
}
