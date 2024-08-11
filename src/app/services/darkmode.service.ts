import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  darkmode:BehaviorSubject<boolean>;
  private dark: boolean;
  constructor() {
    this.dark = localStorage.getItem('darkmode') === 'false';
    this.darkmode = new BehaviorSubject<boolean>(this.dark);
  }

  setdarkmode(darkmode: boolean) {
    this.darkmode.next(darkmode);
    this.savedarkmode(darkmode);
  }

  getdarkmode() {
    return this.darkmode.asObservable();
  }

  savedarkmode(darkmode: boolean) {
    localStorage.setItem('darkmode', darkmode ? 'true' : 'false');
  }
}
