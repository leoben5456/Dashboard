import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ColorService } from '../color.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};

@Component({
  selector: 'app-radialbar',
  templateUrl: './radialbar.component.html',
  styleUrls: ['./radialbar.component.css']
})
export class RadialbarComponent implements OnInit, OnDestroy {
  @ViewChild("chart", { static: false }) chartElement!: ElementRef;
  public chartOptions!: Partial<ChartOptions> | any;
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
      'labels.18-25 years', 'labels.26-35 years', 'labels.36-50 years', 'labels.51-65 years'
    ]).subscribe(translations => {
      this.chartOptions = {
        series: [76, 67, 61, 90],
        chart: {
          height: 390,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        colors: this.colors,
        labels: [
          translations['labels.18-25 years'],
          translations['labels.26-35 years'],
          translations['labels.36-50 years'],
          translations['labels.51-65 years']
        ],
        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "left",
          offsetX: 50,
          offsetY: 10,
          labels: {
            useSeriesColors: true
          },
          formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            horizontal: 3
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                show: false
              }
            }
          }
        ] as ApexResponsive[]
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
