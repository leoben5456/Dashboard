import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  selectedColor: BehaviorSubject<string>;
  fontColor: BehaviorSubject<string>;
  private colorsSubject = new BehaviorSubject<string[]>([]);
  colors$ = this.colorsSubject.asObservable();
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  palleteColors = [
    '#E0F2E9', '#CEB5A7', '#A17C6B', '#5B7B7A', '#3C887E', '#F0C987', '#DB4C40',
    '#89BD9E', '#8B1E3F', '#FAE8EB', '#F6CACA', '#E4C2C6', '#393D3F', '#D5BBB1',
    '#264027', '#B38A58', '#3C5233', '#7EA3CC', '#255C99', '#CCAD8F', '#62BBC1',
    '#326273', '#5C9EAD', '#E39774'
  ];

  constructor() {
    this.generateOrLoadColors();
    const savedColor = localStorage.getItem('color') || '#A5CCD1';
    this.selectedColor = new BehaviorSubject<string>(savedColor);
    const savedFontColor = localStorage.getItem('fontcolor') || '#000000';
    this.fontColor = new BehaviorSubject<string>(savedFontColor);
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    this.darkModeSubject.next(savedDarkMode);
  }

  // Card Color Functions start
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
  // Card Color Functions end

  // Font Color Functions start
  setfontcolor(color: string) {
    if (this.fontColor.value !== color) {
      this.fontColor.next(color);
      this.savefontcolor(color);
    }
  }

  getfontcolor(): Observable<string> {
    return this.fontColor.asObservable();
  }

  savefontcolor(color: string) {
    localStorage.setItem('fontcolor', color);
  }
  // Font Color Functions end

  // Generate or Load palette colors
  generateOrLoadColors() {
    const savedColors = localStorage.getItem('colors');
    if (savedColors) {
      this.colorsSubject.next(JSON.parse(savedColors));
    } else {
      this.generateRandomColors();
    }
  }

  generateRandomColors() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * this.palleteColors.length);
      colors.push(this.palleteColors[randomIndex]);
    }
    this.colorsSubject.next(colors);
    this.saveColors(colors);
    return colors;
  }

  saveColors(colors: string[]) {
    localStorage.setItem('colors', JSON.stringify(colors));
  }

  // Dark Mode Functions start
  toggleDarkMode() {
    const currentMode = this.darkModeSubject.value;
    this.setDarkMode(!currentMode);
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }
  // Dark Mode Functions end
}
