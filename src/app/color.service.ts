import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  selectedColor: BehaviorSubject<string>;
  fontColor:BehaviorSubject<string>;

  constructor() {
    const savedColor = localStorage.getItem('color') || '#A5CCD1';
    this.selectedColor = new BehaviorSubject<string>(savedColor);
    const savedfontColor = localStorage.getItem('fontcolor') || '#000000';
    this.fontColor = new BehaviorSubject<string>(savedfontColor);
  }

  //cards Color Functions start
  setcolor(color: string) {
    this.selectedColor.next(color);
    this.savecolor(color);
  }

  getcolor(): Observable<string> {
    return this.selectedColor.asObservable();
  }

  savecolor(color: string) {
    localStorage.setItem('color', color);
  }
  //cards Color Functions end


  //font Color Functions start
  setfontcolor(color: string) {
    this.fontColor.next(color);
    this.savefontcolor(color);
  }
  getfontcolor(): Observable<string> {
    return this.fontColor.asObservable();
  }
  savefontcolor(color: string) {
    localStorage.setItem('fontcolor', color);
  }
  //font Color Functions end
}




