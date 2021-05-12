import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import Chart from 'chart.js';

@Component({
  selector: "app-iFrame",
  templateUrl: "iFrame.component.html"
})
export class IFrameComponent implements OnInit {
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  basePath: string = "https://stephen.sisensepoc.com/app/main#/dashboards/";
  dashboard: string = "5fca9190ef069e002b5f4c3f";

  urlSales: string = this.buildUrl(this.basePath,this.dashboard,"/widgets/6070bd3d9ce0ea002dcc38e9?embed=true");
  urlSalesSafe: SafeResourceUrl;
  urlStability: string = this.buildUrl(this.basePath,this.dashboard,"/widgets/6070bfa89ce0ea002dcc38ed?embed=true");
  urlStabilitySafe: SafeResourceUrl;
  urlCustomers: string = this.buildUrl(this.basePath,this.dashboard,"/widgets/6074ee359ce0ea002dcc38f3?embed=true");
  urlCustomersSafe: SafeResourceUrl;
  urlSin: string = this.buildUrl(this.basePath,this.dashboard,"/widgets/6074f77c9ce0ea002dcc38fd?embed=true");
  urlSinSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    
    this.urlSalesSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlSales);
    this.urlStabilitySafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlStability);
    this.urlCustomersSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlCustomers);
    this.urlSinSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlSin);
  }

  buildUrl(basePath: string, dashboard: string, widgetId: string) {
    return basePath + dashboard + widgetId;
  }

}
