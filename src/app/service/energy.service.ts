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



}
