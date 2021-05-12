import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  //Necessary for SisenseJS to work
  containerId = 'sisenseApp';
  title = "black-dashboard-angular";
}
