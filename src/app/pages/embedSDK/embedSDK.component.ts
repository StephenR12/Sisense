import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppConfigService } from '../../services/app-config.service'

import Chart from 'chart.js';

declare let embedSDK: any;

@Component({
  selector: "app-embedSDK",
  templateUrl: "embedSDK.component.html"
})
export class EmbedSDKComponent implements OnInit {

  configUrl: string;
  configDashboard: string;
  
  constructor(public sanitizer: DomSanitizer, private appConfigService: AppConfigService) { }

  ngOnInit() {

    this.configUrl = this.appConfigService.server;
    this.configDashboard = this.appConfigService.dashboard;

    const { SisenseFrame, enums } = window['sisense.embed'];

    let sisenseFrame = new SisenseFrame({
      url: this.configUrl,
      dashboard: this.configDashboard,
      settings: {
        showToolbar: false,
        showLeftPane: false,
        showRightPane: false
      },
      element: document.getElementById('sisense-iframe')
    });

    sisenseFrame.render().then(() => {
      console.log("Sisense frame rendered!");
      sisenseFrame.app.setTheme('609998ea704be000366484bc').then(function() {
        console.log('new theme applied');
      });
    });


  }

  ngAfterViewInit() {
    
  }

  //TODO 
  // add slider for date 
  // number of items in cart

  createRegionFilter(region: number){
    if (region && region > 0 && region < 6){
      return {
        "jaql" : {
          "title": "Region",
          "dim": "[Restaurants.Region]",
          "datatype": "text",
          "filter": {
            "members": "[" + region.toString + "]"
          }
        }
      }
    }
    return {
      "jaql": {
        "title": "error"
      }
    }
  }
  
}
