import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './config'

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get server() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.server;
  }

  get username() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.username;
  }

  get password() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.password;
  }

  get skippedWidgetTypes() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.skippedWidgetTypes;
  }

  get dashboard() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.dashboard;
  }

  get widgetsList() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.widgetsList;
  }
}