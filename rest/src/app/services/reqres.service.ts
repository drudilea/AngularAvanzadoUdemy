import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {
  // This variable "private http" will allow to make requests
  constructor( private http: HttpClient ) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
}
