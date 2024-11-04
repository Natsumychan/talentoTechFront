import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from '../class/users';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    private url:string = "http://localhost:8080/user"

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http:HttpClient) { };

  getUserList():Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.url);
  }

  getUser(id:Number):Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.url}/${id}`);
  }

  updateUser(id:number, data: Usuarios) : Observable<Usuarios> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.put<Usuarios>(`${this.url}/${id}`, data, {headers});
  }

  createUser (data:Usuarios): Observable<Usuarios> {
    const headers = new HttpHeaders ({
      'Content-type' : 'application/json'
    });
    return this.http.post<Usuarios>(this.url, data, {headers});
  }

  login(documentId: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.url}/login`, { documentId, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  handleLoginSuccess(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }
}
