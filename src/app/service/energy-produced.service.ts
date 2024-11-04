import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnergyProduced } from '../class/energy-produced';
import { EnergyProductionData } from '../interface/energy-production-data';

@Injectable({
  providedIn: 'root'
})
export class EnergyProducedService {

  private url: string="http://localhost:8080/energyProduced"

  constructor(private http:HttpClient) { }

  getEnergyProducedList(): Observable<EnergyProduced[]>{
    return this.http.get<EnergyProduced[]>(this.url)
  }

  getEnergyProduced(id:number): Observable<EnergyProduced>{
    return this.http.get<EnergyProduced>(`${this.url}/${id}`)
  }

  getEnergyProducedSorted(): Observable<EnergyProductionData[]>{
    return this.http.get<EnergyProductionData[]>(`${this.url}/totalSummary`)
  }

  getEnergyProducedByType(energyType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/byEnergy?energyName=${energyType}`);
  }

   createEnergyProduced(data: any): Observable<EnergyProduced> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<EnergyProduced>(this.url, data, { headers });
  }

  updateEnergyProduced(id: number, data: any): Observable<EnergyProduced> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<EnergyProduced>(`${this.url}/${id}`, data, { headers });
  }

  deleteEnergyProduced(id:number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}
