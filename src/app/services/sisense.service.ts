import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class SisenseService {
  
    constructor(private http: HttpClient) { }

    server: string = 'http://stephen.sisensepoc.com';

    ngOnInit() {
        let ws = this;

    }
  
  }
