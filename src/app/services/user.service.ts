import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logOut(data: any) {
    return this.http.post(`${this.apiUrl}/logout`, data);
  }

  getUsers(offset:any, role:any, search:any) {
    let param = new HttpParams().append('limit',offset);
    if(role) param = param.append('role', role);
    if(search) param = param.append('search', search);
    return this.http.get(`${this.apiUrl}/users`, {params: param});
  }

  getProfile(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  addUser(user: any) {
    return this.http.post(`${this.apiUrl}/users/add`, user);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/users/edit/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`);
  }

}
