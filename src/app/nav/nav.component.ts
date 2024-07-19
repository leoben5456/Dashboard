import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],


})
export class NavComponent implements OnInit{
  [x: string]: any;
  isHandset: boolean = false;
  lang='';
  showstyle='display:block';
  torighticon = 'left: 210px';
  searchboxwidth = 'width:20%';
  phone_mode='display:block';
  currentLang: any;
  @ViewChild('searchIcon') searchIcon!: ElementRef;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()


    );

    ngOnInit():void{
      this.lang=localStorage.getItem('lang')||'en';
      this.currentLang = localStorage.getItem('lang')
      if(localStorage.getItem('lang')=='en'){
        this.currentLang = 'Eng';
      }
      else if(localStorage.getItem('lang')=='fr'){
        this.currentLang = 'Fr';
      }
      else if(localStorage.getItem('lang')=='fr'){
        this.currentLang = 'Sp';
      }
      this.isHandset$.subscribe((isHandset) => {
        this.isHandset = isHandset;
      });

    }

    Changelang(lang:any){
      localStorage.setItem('lang',lang);
      this.translateService.use(lang);
      if(lang=='en'){
        this.currentLang = 'Eng';
      }
      else if(lang=='fr'){
        this.currentLang = 'Fr';
      }
      else if(lang=='fr'){
        this.currentLang = 'Sp';
      }

    }
    constructor(private translateService:TranslateService){

    }
    hidden = false;

    toggleBadgeVisibility() {
    this.hidden = !this.hidden;
    }

    inputValue: string = '';
    clearInput() {
      this.inputValue = '';
    }


    toggleDarkTheme(): void {
      document.body.classList.toggle('dark-theme');
   }

}



