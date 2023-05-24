import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  



  ApiUrl = environment.apiUrl;

  addCustomer(data: any) {
    return this.http.post(this.ApiUrl + "/newCustomer/addCustomer", data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    });
  };

  getCustomer(){
    return this.http.get(this.ApiUrl + "/newCustomer/get/")
  }
}
