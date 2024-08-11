import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ColorService } from '../services/color.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
import * as ApexCharts from 'apexcharts';

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
export class PieChartComponent implements OnInit, OnDestroy {
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
    this.translate.get(['labels.Male', 'labels.Female']).subscribe(translations => {
      this.chartOptions = {
        series: [55, 45],
        chart: {
          type: 'donut',
          width: '150%',
          offsetX: -60,
          offsetY: 30
        },
        labels: [
          translations['labels.Male'],
          translations['labels.Female']
        ],
        colors: this.colors,
        responsive: [
          {
            breakpoint: 300,
            options: {
              chart: {
                width: '140%'
              }
            }
          },
          {
            breakpoint: 430,
            options: {
              chart: {
                width: '130%'
              },
              legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'center'
              }
            }
          },
          {
            breakpoint: 500,
            options: {
              chart: {
                width: '140%'
              }
            }
          },
          {
            breakpoint: 600,
            options: {
              chart: {
                width: '140%'
              }
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
