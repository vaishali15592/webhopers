import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {

  constructor(public http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'Basic ' +
  //     btoa('username:password')); 
  // }


  public put(path: string, data: object):Observable<any> {
    return this.http.put(this.baseUrl + path, data);
  }

  public post(path: string, data: object):Observable<any> {
    return this.http.post(this.baseUrl + path, data);
  }

  public patch(path: string, data: object, headers: any):Observable<any> {
    // let headers = new Headers();
     
    // this.createAuthorizationHeader(headers);
    return this.http.patch(this.baseUrl + path, data, headers);
  }
}
