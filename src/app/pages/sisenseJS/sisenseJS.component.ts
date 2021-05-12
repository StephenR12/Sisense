import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';

declare let Sisense: any;

@Component({
  selector: "app-sisenseJS",
  templateUrl: "sisenseJS.component.html"
})
export class SisenseJSComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    Sisense.connect('https://stephen.sisensepoc.com/')
      .then(function (app) {

        app.setTheme('609998ea704be000366484bc').then(function(){
          console.log('Theme was applied');
        });
        
        //replace with your dashboard id
        app.dashboards.load('5fca9190ef069e002b5f4c3f')
          .then(function (dash) {

            // replace with your widgets' id
            // and make this for each of your widgets
            const widgets = [
              { id: '6070bd3d9ce0ea002dcc38e9', containerId: 'widget1' },
              { id: '6070bfa89ce0ea002dcc38ed', containerId: 'widget2' },
              { id: '6074ee359ce0ea002dcc38f3', containerId: 'widget3' },
              { id: '6074f77c9ce0ea002dcc38fd', containerId: 'widget4' },
            ];
            widgets.forEach((w) => {
              dash.widgets.get(w.id).container = document.getElementById(w.containerId);
            });

            // refresh your dashboard   
            dash.refresh();
          });
      });
  }

}
