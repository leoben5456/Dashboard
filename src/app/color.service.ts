import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  selectedColor: BehaviorSubject<string>;

  constructor() {
    const savedColor = localStorage.getItem('color') || '#A5CCD1';
    this.selectedColor = new BehaviorSubject<string>(savedColor);
  }

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
}




