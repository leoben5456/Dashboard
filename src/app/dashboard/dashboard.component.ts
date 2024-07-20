import { Component, inject, HostListener, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { BlacklistTableComponent } from '../blacklist-table/blacklist-table.component';
import { ChartComponentt} from '../chart/chart.component';
import { RadarChartComponent } from '../radar-chart/radar-chart.component';
import { RadialbarComponent } from '../radialbar/radialbar.component';
import { TransactionsComponent } from '../transactions/transactions.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent {
  @Input() smallVersion: boolean = false;
  cols = 4;
  colss=2;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result)=>{
      if(result.matches){
        this.cols=1;
        this.colss=1;
      }
      else{
        this.cols=4;
        this.colss=2;
      }
    })
  }


  tiles = [
    { id: 1, title: 'Revenue', icon: 'fa-solid fa-dollar-sign', value: 300, color: '#BCD4DE' },
    { id: 2, title: 'Clients', icon: 'fa-solid fa-user', value: 250, color: '#A5CCD1' },
    { id: 3, title: 'Visitors', icon: 'fa-solid fa-eye', value: 300, color: '#9DACB2' },
    { id: 4, title: 'Trainers', icon: 'fa-solid fa-person-chalkboard', value: 12, color: '#949BA0' }
  ];
  chartTiles = [
    { title: 'Monthly Client Traffic', component: ChartComponentt, colspan:this.colss, rowspan: 1 },
    { title: 'Clients Gender Overview', component: PieChartComponent, colspan: 1, rowspan: 1 },
    { title: 'Member Age Distribution', component: RadialbarComponent, colspan: this.colss, rowspan: 1 },
    { title: 'Radar Insights: Clients by Day', component: RadarChartComponent, colspan: this.colss, rowspan: 1 },
    { title: 'Blacklisted Clients', component: BlacklistTableComponent, colspan: 2, rowspan: 2 },
    {title: 'Transaction', component: TransactionsComponent, colspan: 1, rowspan: 1}
  ];
  ngOnInit() {
    this.loadTiles();
    this.loadChartTiles();
  }

  drop(event: CdkDragDrop<{ id: number; title: string; icon: string; value: number; color: string }[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
    this.saveTiles();
  }

  dropChart(event: CdkDragDrop<{ title: string;colspan: number;rowspan: number; component: any }[]>) {
    moveItemInArray(this.chartTiles, event.previousIndex, event.currentIndex);
    this.saveChartTiles();
  }

  saveTiles() {
    localStorage.setItem('dashboardTiles', JSON.stringify(this.tiles));
  }

  loadTiles() {
    const savedTiles = localStorage.getItem('dashboardTiles');
    if (savedTiles) {
      this.tiles = JSON.parse(savedTiles);
    }
  }

  saveChartTiles() {
    const serializedChartTiles = this.chartTiles.map(chartTile => ({
      ...chartTile,
      component: chartTile.component.name
    }));
    localStorage.setItem('chartTiles', JSON.stringify(serializedChartTiles));
  }

  loadChartTiles() {
    const savedChartTiles = localStorage.getItem('chartTiles');
    if (savedChartTiles) {
      const parsedChartTiles = JSON.parse(savedChartTiles);
      this.chartTiles = parsedChartTiles.map((chartTile: any) => ({
        ...chartTile,
        component: this.getComponentByName(chartTile.component) // Convert name back to component
      }));
    }
  }

  getComponentByName(name: string): any {
    switch (name) {
      case 'ChartComponentt':
        return ChartComponentt;
      case 'PieChartComponent':
        return PieChartComponent;
      case 'RadialbarComponent':
        return RadialbarComponent;
      case 'RadarChartComponent':
        return RadarChartComponent;
      case 'BlacklistTableComponent':
        return BlacklistTableComponent;
      case 'TransactionsComponent':
        return TransactionsComponent;
      default:
        return null;
    }
  }


}



