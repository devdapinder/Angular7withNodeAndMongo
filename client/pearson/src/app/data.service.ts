import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiRootPath: string = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  getDummyUsers() {
    return this.http
    .get('https://reqres.in/api/users');
  }

  getActualUsers() {
    return this.http
    .get(this.apiRootPath + 'users');
  }
}
