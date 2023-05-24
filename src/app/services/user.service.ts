import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from '../auth/auth.guard'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  ApiUrl = environment.apiUrl;

  signup(data: any) {
    return this.http.post(this.ApiUrl + "/user/signup", data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    });
  };
  login(data: any) {
    return this.http.post(this.ApiUrl + "/user/login/", data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    });
  };
  
  
}
