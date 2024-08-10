import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { ColorService } from '../color.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
export class ChartComponentt implements OnInit, OnDestroy {
  @ViewChild("chart", { static: false }) chartElement!: ElementRef;
  public chartOptions!: Partial<ChartOptions>;
  colors: string[] = [];
  private langChangeSub!: Subscription;
  private chartInstance: ApexCharts | undefined;

  constructor(private colorService: ColorService, private translate: TranslateService) { }

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
      'months.January', 'months.February', 'months.March', 'months.April',
      'months.May', 'months.June', 'months.July', 'months.August'
    ]).subscribe(translations => {
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
          categories: [
            translations['months.January'],
            translations['months.February'],
            translations['months.March'],
            translations['months.April'],
            translations['months.May'],
            translations['months.June'],
            translations['months.July'],
            translations['months.August']
          ],
        },
        legend: {
          position: 'right',
          offsetX: 0,
          offsetY: 50
        },
        colors: this.colors
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
