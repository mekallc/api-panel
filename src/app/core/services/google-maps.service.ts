import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";

const api_key = environment.maps;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  constructor(private http: HttpClient) {}

  apiLoaded() {
    const URL = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries`;
    return this.http.jsonp(URL, 'callback').pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}

