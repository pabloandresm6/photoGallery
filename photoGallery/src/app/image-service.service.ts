import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public baseUrl: string;
  public visibleImages = [];
  visibleImagesChanged: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://127.0.0.1:3000/';
    this.visibleImagesChanged.subscribe((value) => {
      this.visibleImages = value;
  });

  }

/*** GET METHOD *******/
  async GET<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url, {headers: this.getHeader()});
  }
  
/*** GET METHOD *******/

/*** POST METHOD *******/
async POST<T>(url: string, data: any) {
  return await this.http.post<T>(this.baseUrl + url, data, {headers: new HttpHeaders()});
}

async POST_PARAMS<T>(url: string, data: any) {
  return await this.http.post<T>(this.baseUrl + url, this.getParams(data), {headers: new HttpHeaders()});
}
/*** POST METHOD *******/

/*** PUT METHOD *******/
async PUT<T>(url: string, data: any) {
  return await this.http.put<T>(this.baseUrl + url, data, {headers: this.getHeaderPost()});
}
/*** PUT METHOD *******/

/*** DELETE METHOD *******/
async DELETE<T>(url: string) {
  return await this.http.delete<T>(this.baseUrl + url, {headers: this.getHeader()});
}
/*** DELETE METHOD *******/

async POSTFORMDATA<T>(url: string, data: any) {
  return await this.http.post<T>(this.baseUrl + url, data, {headers: new HttpHeaders()});
}

  private getHeader() {
    let header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin','*'); 
    return header;
  }

  private getHeaderPost() {
    let header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin','*'); 
    header.append('Content-Type','application/json'); 
    header.append('Accept','application/json'); 
    return header;
  }

  private getParams (body: any) {
    const params = new HttpParams().set('body', body);
    return params;
  }

}



