import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { Observable, of } from "rxjs";
import { AppConfigService } from '../../services/app-config.service';
import { Config } from '../../services/config';

declare let Sisense: any;

@Component({
  selector: "app-sisenseJS",
  templateUrl: "sisenseJS.component.html"
})
export class SisenseJSComponent {

  configUrl: string;
  configDashboard: string;
  configWidgets: string[];
  
  tagId: string = 'sisenseScript';
  dashboardPrefix: string = '_gallery';
  skippedTypes: string[] = ['richtexteditor'];

  sisenseApp: any;
  dashboard: any;
  widgetsObserver: Observable<string>;

  constructor(private appConfigService: AppConfigService) { 
    //Get inputs from configuration 
    this.configUrl = this.appConfigService.server;
    this.configDashboard = this.appConfigService.dashboard;
    this.configWidgets = this.appConfigService.widgetsList;
  }

  ngOnInit() {
    this.addSisenseJS();
  }

  //  Step 1: Function to load the sisense.js library
  addSisenseJS(): void {

    //  Define the script tag to add
    let tag = document.createElement('script');
    tag.src = this.configUrl + '/js/sisense.v1.js';
    tag.id = this.tagId;
    tag.type = 'text/javascript';
    tag.charset = 'utf-8';

    //  Mark the starting time
    let startTime = new Date().getTime();

    //  Add event handler for when the script loads
    let connectFunc = this.connect.bind(this);
    tag.onload = function(){

      //  Figure out how long it took to load
      let endTime = new Date().getTime();
      let duration = Math.round((endTime - startTime) / 1000);

      //  Log the output
      console.log(`Sisensejs: Loaded in ${duration} seconds`);
      connectFunc();
    }

    //  Add the tag to the web page
    document.getElementsByTagName('body')[0].appendChild(tag);
    console.log('Sisensejs: Adding Sisense.js script tag');
  }

  //  Step 2: Connect to sisense, and save a reference to the sisense application
  connect(): void {

    //  start a new timer
    let startTime = new Date().getTime(); 

    //  Bind this object to the sisense connect function, and run
    let ws = this;
    Sisense.connect(this.configUrl)
      .then(function(app) {
        
        //  Figure out how long it took to connect
        let endTime = new Date().getTime();
        let duration = Math.round((endTime - startTime) / 1000);
        console.log(`Sisensejs: Connected to your Sisense server in ${duration} seconds`);

        app.dashboards.load(ws.configDashboard)
          .then(function (dash) {
            // replace with your widgets' id
            // and make this for each of your widgets
            const widgets = [
              { id: ws.configWidgets[0], containerId: 'widget1' },
              { id: ws.configWidgets[1], containerId: 'widget2' },
              { id: ws.configWidgets[2], containerId: 'widget3' },
              { id: ws.configWidgets[3], containerId: 'widget4' },
            ];
            widgets.forEach((w) => {
              dash.widgets.get(w.id).container = document.getElementById(w.containerId);
            });

            // refresh your dashboard   
            dash.refresh();
          });
      })
  }

  getWidgets(): Observable<string[]> {
    return of(this.configWidgets);
  }

  getDashboard(): Observable<string> {
    return of(this.configDashboard);
  }

}
