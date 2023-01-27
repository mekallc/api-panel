import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url: string = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  constructor(private http: HttpClient) { }

  getData(query: string): Observable<any> {
    return this.http.get<any>(`${url}/${query}`);
  }
  postData(query: string, data: any): Observable<any> {
    return this.http.post<any>(`${url}/${query}`, data);
  }
  patchData(query: string, data: any): Observable<any> {
    return this.http.patch<any>(`${url}/${query}`, data);
  }

  deleteData(query: string): Observable<any> {
    return this.http.delete<any>(`${url}/${query}`)
  }
}
