import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppConfigService } from '../../services/app-config.service'

import Chart from 'chart.js';

@Component({
  selector: "app-iFrame",
  templateUrl: "iFrame.component.html"
})
export class IFrameComponent implements OnInit {
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  //Config Variables
  configUrl: string;
  configDashboard: string;
  configWidgets: string[];

  //Created URL iframes for widgets
  urlSales: string;
  urlSalesSafe: SafeResourceUrl;
  urlStability: string;
  urlStabilitySafe: SafeResourceUrl;
  urlCustomers: string;
  urlCustomersSafe: SafeResourceUrl;
  urlSin: string;
  urlSinSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer, private appConfigService: AppConfigService) {}

  ngOnInit() {

    //Get inputs from configuration 
    this.configUrl = this.appConfigService.server;
    this.configDashboard = this.appConfigService.dashboard;
    this.configWidgets = this.appConfigService.widgetsList;

    //Generating Urls
    this.urlSales = this.buildUrl(this.configUrl,this.configDashboard,this.configWidgets[0]);
    this.urlStability = this.buildUrl(this.configUrl,this.configDashboard,this.configWidgets[1]);
    this.urlCustomers = this.buildUrl(this.configUrl,this.configDashboard,this.configWidgets[2]);
    this.urlSin = this.buildUrl(this.configUrl,this.configDashboard,this.configWidgets[3]);
    
    //Creating safe resource url
    this.urlSalesSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlSales);
    this.urlStabilitySafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlStability);
    this.urlCustomersSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlCustomers);
    this.urlSinSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlSin);
  }

  buildUrl(basePath: string, dashboard: string, widgetId: string) {
    return basePath + '/app/main#/dashboards/' + dashboard + '/widgets/' + widgetId + '?embed=true';
  }

}
