import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Energy } from '../class/energy';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private url:string="http://localhost:8080/energy"

  constructor(private http:HttpClient) { }

  getEnergyList():Observable<Energy[]>{
    return this.http.get<Energy[]>(this.url)
  }

  getEnergy(id: number): Observable<Energy> {
    return this.http.get<Energy>(`${this.url}/${id}`);
  }

  createEnergy(data: Energy): Observable<Energy> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Energy>(this.url, data, { headers });
  }

  updateEnergy(id: number, data: Energy): Observable<Energy> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Energy>(`${this.url}/${id}`, data, { headers });
  }

  deleteEnergy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
