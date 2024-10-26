import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../class/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url:string="http://localhost:8080/country"

  constructor(private http:HttpClient) { }

  getCountryList():Observable<Country[]>{
    return this.http.get<Country[]>(this.url)
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.url}/${id}`);
  }

  createCountry(data: Country): Observable<Country> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Country>(this.url, data, { headers });
  }

  updateCountry(id: number, data: Country): Observable<Country> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Country>(`${this.url}/${id}`, data, { headers });
  }

  deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }



}
