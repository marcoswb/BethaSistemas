import { Login } from './../models/login';
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from 'src/models/user'


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly base_url = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  authenticationUser(user: Login): Observable<Login> {
    const url = `${this.base_url}/login`

    let headers = new HttpHeaders();
        headers  = headers.append('username', user.username);
        headers  = headers.append('password', user.password);

       let params = new HttpParams();
       params = params.append('username', user.username);
       params = params.append('password', user.password);



    return this.http.get<Login>(url, {headers, params})
  }

  createLogin(user: Login): Observable<Login> {
    const url = `${this.base_url}/login`

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Login>(url, user, {headers})
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.base_url}/users`

    return this.http.get<User[]>(url)
  }

  getUserById(user_id): Observable<User> {
    const url = `${this.base_url}/users/${user_id}`

    return this.http.get<User>(url)
  }

  createUser(user: User): Observable<User>{
    const url = `${this.base_url}/user`

    return this.http.post<User>(url, user)
  }

  updateUser(user_id, user: User): Observable<Object> {
    const url = `${this.base_url}/user/${user_id}`

    return this.http.put<Object>(url, user)
  }

  deleteUser(user_id): Observable<Object> {
    const url = `${this.base_url}/user/${user_id}`

    return this.http.delete<Object>(url)
  }
}
