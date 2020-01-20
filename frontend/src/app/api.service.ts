import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { User } from 'src/models/user'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly url = 'http://localhost:8090/'

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  getUserById(userid): Observable<User> {
    const apiurl = `${this.url}/users/${userid}`
    return this.http.get<User>(apiurl)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, user)
  }

  updateUser(userid, user: User): Observable<User> {
    const apiurl = `${this.url}/user/${userid}`
    return this.http.put<User>(apiurl, user)
  }

  deleteUser(userid): Observable<User> {
    const apiurl = `${this.url}/user/${userid}`
    return this.http.delete<User>(apiurl)
  }
}
